import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { readFileSync } from "node:fs";

function worker() {
  const origin="https://wordgrid.test";
  const handlers: Record<string,(event: Record<string,unknown>)=>void> = {};
  const stores = new Map<string,Map<string,Response>>();
  const messages: unknown[] = [];
  let offline = false, failPath = "", skipped = false;
  const key = (value: Request | string, ignoreSearch=false) => {
    const url=new URL(typeof value==="string"?value:value.url,origin);
    return ignoreSearch ? url.origin+url.pathname : url.href;
  };
  const network = async (request: Request | string) => {
    const url=new URL(typeof request==="string"?request:request.url,origin);
    if (offline || url.pathname===failPath) throw new Error("Network unavailable");
    return new Response(`network:${url.pathname}`,{headers:{"Content-Type":url.pathname.endsWith(".json")?"application/json":"text/html"}});
  };
  const cachesMock = {
    async open(name: string) {
      if (!stores.has(name)) stores.set(name,new Map());
      const store=stores.get(name)!;
      return {
        async put(request: Request|string,response: Response) {store.set(key(request),response.clone());},
        async match(request: Request|string,options?:{ignoreSearch:boolean}) {
          const pair=[...store].find(([saved])=>key(saved,options?.ignoreSearch)===key(request,options?.ignoreSearch));
          return pair?.[1].clone();
        },
        async addAll(requests: Request[]) { for (const request of requests) store.set(key(request),await network(request)); },
      };
    },
    async keys(){return [...stores.keys()];},
    async delete(name: string){return stores.delete(name);},
    async match(request: Request|string, options?:{ignoreSearch:boolean}) {
      for (const name of stores.keys()) { const hit=await (await this.open(name)).match(request,options); if(hit)return hit; }
    },
  };
  const selfMock = {
    location:{origin},clients:{async claim(){},async matchAll(){return [{postMessage:(message: unknown)=>messages.push(message)}];}},
    addEventListener(type:string,handler:(event:Record<string,unknown>)=>void){handlers[type]=handler;},
    async skipWaiting(){skipped=true;},
  };
  class RelativeRequest extends Request { constructor(value:string,options?:RequestInit){super(new URL(value,origin),options);} }
  const template=readFileSync("scripts/offline-worker.js","utf8").replace('const CONFIG = { version: "template", urls: [], routes: [] }; // BUILD_CONFIG','const CONFIG = {version:"test",urls:["/complete/","/complete/index.txt","/offline/","/data/complete/bank-v2.json"],routes:["/complete/","/offline/"]};');
  runInNewContext(template,{self:selfMock,caches:cachesMock,fetch:network,URL,Request:RelativeRequest,Response});
  async function lifetime(type:string,data:Record<string,unknown>={}) {
    let promise: Promise<unknown>|undefined;
    handlers[type]({...data,waitUntil:(value:Promise<unknown>)=>{promise=value;}});
    await promise;
  }
  function fetchRequest(path:string,options:{mode?:string;method?:string;headers?:Record<string,string>}={}) {
    let response: Promise<Response>|undefined;
    handlers.fetch({request:{url:new URL(path,origin).href,method:options.method||"GET",mode:options.mode||"same-origin",headers:new Headers(options.headers)},respondWith:(value:Promise<Response>)=>{response=value;}});
    return response;
  }
  return {stores,messages,caches:cachesMock,lifetime,fetchRequest,setOffline:(value:boolean)=>{offline=value;},setFailPath:(path:string)=>{failPath=path;},skipped:()=>skipped};
}

test("offline installation is atomic, preserves the active release on failure and requires explicit update",async()=>{
  const app=worker();
  await app.caches.open("wordgrid-offline-old");
  app.setFailPath("/offline/");
  await assert.rejects(app.lifetime("install"));
  assert.ok(app.stores.has("wordgrid-offline-old"));
  assert.ok(!app.stores.has("wordgrid-offline-test"));
  app.setFailPath("");await app.lifetime("install");
  assert.equal(app.skipped(),false);
  await app.lifetime("message",{data:{type:"WORDGRID_UPDATE"}});
  assert.equal(app.skipped(),true);
});

test("activation keeps current and previous releases without deleting unrelated caches",async()=>{
  const app=worker();
  for(const name of ["unrelated","wordgrid-offline-older","wordgrid-offline-previous"])await app.caches.open(name);
  await app.lifetime("install");await app.lifetime("activate");
  assert.deepEqual(await app.caches.keys(),["unrelated","wordgrid-offline-previous","wordgrid-offline-test"]);
});

test("offline navigations retain date queries in the shell, cache RSC as text, and recover on reconnect",async()=>{
  const app=worker();await app.lifetime("install");app.setOffline(true);
  const response=await app.fetchRequest("/complete/?date=2026-10-14",{mode:"navigate"});
  assert.equal(await response!.text(),"network:/complete/");
  const rsc=await app.fetchRequest("/complete/?_rsc=test",{headers:{RSC:"1"}});
  assert.equal(await rsc!.text(),"network:/complete/index.txt");
  const bank=await app.fetchRequest("/data/complete/bank-v2.json");
  assert.equal(await bank!.text(),"network:/data/complete/bank-v2.json");
  const missing=await app.fetchRequest("/data/complete/missing.json");
  assert.equal(missing!.status,503);
  assert.deepEqual(JSON.parse(JSON.stringify(app.messages.at(-1))),{type:"WORDGRID_NETWORK",online:false});
  app.setOffline(false);await app.fetchRequest("/complete/",{mode:"navigate"});
  assert.deepEqual(JSON.parse(JSON.stringify(app.messages.at(-1))),{type:"WORDGRID_NETWORK",online:true});
});

test("worker never intercepts score submissions, API responses or third-party analytics",()=>{
  const app=worker();
  assert.equal(app.fetchRequest("/api/complete/score?date=2026-11-21"),undefined);
  assert.equal(app.fetchRequest("/api/complete/score",{method:"POST"}),undefined);
  assert.equal(app.fetchRequest("https://www.googletagmanager.com/gtag/js"),undefined);
});
