import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const args = new Map(process.argv.slice(2).map(arg => { const [key,...value]=arg.replace(/^--/,"").split("=");return [key,value.join("=")||"true"]; }));
const port = Number(args.get("port") || 4180);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("Use --port=1024..65535");
const root = path.resolve("out");
const mime = {".html":"text/html; charset=utf-8",".js":"text/javascript",".css":"text/css",".json":"application/json",".txt":"text/plain; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".ico":"image/x-icon",".woff2":"font/woff2"};
await stat(path.join(root,"sw.js"));
let fixture;
if (args.get("fixture") === "v2") {
  const bank=JSON.parse(await readFile(path.join(root,"data/complete/bank-v2.json"),"utf8"));
  const sample=bank.puzzles.find(p=>p.dictionaryVersion==="wordgrid-editorial-2");
  fixture={version:"2",startDate:"2026-10-14",endDate:"2026-10-14",puzzles:[{...sample,id:"qa-v2-fixed",date:"2026-10-14"}]};
}
const server = http.createServer(async (request,response) => {
  try {
    const url=new URL(request.url,`http://127.0.0.1:${port}`);
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("X-Content-Type-Options","nosniff");
    if(args.has("deny-sharing"))response.setHeader("Permissions-Policy","clipboard-write=(), clipboard-read=(), web-share=()");
    if(url.pathname.startsWith("/api/")) {
      response.writeHead(request.method==="GET"?200:503,{"Content-Type":"application/json"});
      response.end(JSON.stringify(request.method==="GET"?{entries:[],remote:false}:{error:"QA server never submits scores."}));return;
    }
    if(fixture && url.pathname==="/data/complete/bank-v2.json") {
      response.writeHead(200,{"Content-Type":"application/json"});response.end(JSON.stringify(fixture));return;
    }
    let file=path.resolve(root,"."+decodeURIComponent(url.pathname));
    if(file!==root&&!file.startsWith(root+path.sep)){response.writeHead(403);response.end();return;}
    const info=await stat(file);
    if(info.isDirectory()) {
      if(!url.pathname.endsWith("/")){response.writeHead(301,{Location:url.pathname+"/"+url.search});response.end();return;}
      file=path.join(file,"index.html");
    }
    response.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream"});
    response.end(await readFile(file));
  } catch {
    response.writeHead(404,{"Content-Type":"text/plain"});response.end("Not found");
  }
});
server.listen(port,"127.0.0.1",()=>console.log(`QA server: http://127.0.0.1:${port} | fixture=${fixture?"v2 fixed sample":"published bank"} | sharing=${args.has("deny-sharing")?"blocked for fallback testing":"browser default"} | GET-only leaderboard stub; no score writes.`));
process.on("SIGTERM",()=>server.close(()=>process.exit(0)));
process.on("SIGINT",()=>server.close(()=>process.exit(0)));
