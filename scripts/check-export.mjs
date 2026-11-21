import assert from "node:assert/strict";
import { readFile,stat } from "node:fs/promises";
import path from "node:path";
const root=path.resolve("out");
const sitemap=await readFile(path.join(root,"sitemap.xml"),"utf8");
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
for(const url of urls){
  const file=path.join(root,new URL(url).pathname,"index.html");
  const html=await readFile(file,"utf8");
  const canonical=[...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(canonical,[url],url);
  assert.ok(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html),url);
}
const manifest=JSON.parse(await readFile(path.join(root,"offline-manifest.json"),"utf8"));
assert.ok(manifest.routes.includes("/complete/archive/"));
assert.ok(manifest.urls.includes("/data/words.txt")&&manifest.urls.includes("/data/complete/bank-v2.json"));
let bytes=0;
for(const url of manifest.urls)bytes+=(await stat(path.join(root,url.endsWith("/")?`${url}index.html`:url))).size;
assert.equal(bytes,manifest.bytes);
assert.ok(bytes<=10*1024*1024);
assert.ok((await readFile(path.join(root,"sw.js"),"utf8")).includes(manifest.version));
for(const route of manifest.routes){
  const html=await readFile(path.join(root,route,"index.html"),"utf8");
  for(const match of html.matchAll(/(?:src|href)="(\/_next\/[^"?]+)/g))assert.ok(manifest.urls.includes(match[1]),`${route}: uncached asset ${match[1]}`);
}
console.log(`Export verified: ${urls.length} sitemap URLs, ${manifest.routes.length} offline routes, ${manifest.urls.length} offline resources (${(bytes/1024/1024).toFixed(2)} MiB).`);
