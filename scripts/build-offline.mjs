import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const root = path.resolve("out");
const template = await readFile("scripts/offline-worker.js","utf8");
const routes = ["/","/daily/","/complete/","/complete/archive/","/play/","/zen/","/weekly/","/training/","/solver/","/challenge/","/stats/","/offline/","/guides/boggle-dictionary/","/guides/boggle-generator/"];
const assets = [];
async function walk(folder) {
  for (const entry of await readdir(path.join(root,folder),{withFileTypes:true})) {
    const name = `${folder}/${entry.name}`;
    if (entry.isDirectory()) await walk(name);
    else if (!entry.name.endsWith(".map")) assets.push(`/${name}`);
  }
}
await walk("_next/static");
const urls = [...new Set([...routes,...routes.map(route=>`${route}index.txt`),...assets,"/data/words.txt","/data/complete/bank-v1.json","/data/complete/bank-v2.json","/manifest.json","/icon-192.png","/icon-512.png","/share-card-bg.png"])].sort();
const hash = createHash("sha256").update(template);
let bytes = 0;
for (const url of urls) {
  const file = path.join(root,url.endsWith("/") ? `${url}index.html` : url);
  bytes += (await stat(file)).size;
  hash.update(url).update(await readFile(file));
}
if (bytes > 10*1024*1024) throw new Error(`Offline cache exceeds 10 MiB budget: ${bytes}`);
const config = {version:hash.digest("hex").slice(0,16),urls,routes};
await writeFile(path.join(root,"sw.js"),template.replace('const CONFIG = { version: "template", urls: [], routes: [] }; // BUILD_CONFIG',`const CONFIG = ${JSON.stringify(config)};`));
await writeFile(path.join(root,"offline-manifest.json"),JSON.stringify({...config,bytes},null,2)+"\n");
console.log(`Offline release ${config.version}: ${routes.length} routes, ${urls.length} resources, ${(bytes/1024/1024).toFixed(2)} MiB.`);
