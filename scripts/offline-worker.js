/* Generated for each static export by build-offline.mjs. */
const CONFIG = { version: "template", urls: [], routes: [] }; // BUILD_CONFIG
const PREFIX = "wordgrid-offline-";
const CACHE = PREFIX + CONFIG.version;
let networkOnline = true;

async function reportNetwork(online) {
  if (networkOnline === online) return;
  networkOnline = online;
  for (const client of await self.clients.matchAll({type:"window"})) client.postMessage({type:"WORDGRID_NETWORK",online});
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE);
      await cache.addAll(CONFIG.urls.map(url => new Request(url, {cache:"reload"})));
    } catch (error) {
      await caches.delete(CACHE);
      throw error;
    }
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    // Retain one previous release for still-open tabs with old hashed assets.
    const older = (await caches.keys()).filter(name => name.startsWith(PREFIX) && name !== CACHE);
    await Promise.all(older.slice(0,-1).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  if (event.data?.type === "WORDGRID_UPDATE") event.waitUntil(self.skipWaiting());
  if (event.data?.type === "WORDGRID_STATUS") event.source?.postMessage({type:"WORDGRID_NETWORK",online:networkOnline});
});

async function cached(request) {
  const cache = await caches.open(CACHE);
  return cache.match(request, {ignoreSearch:true});
}

async function networkFirst(request, fallback, storePath) {
  try {
    const response = await fetch(request);
    if (response.status >= 500) throw new Error("Temporarily unavailable");
    await reportNetwork(true);
    if (response.ok && storePath) await (await caches.open(CACHE)).put(storePath, response.clone());
    return response;
  } catch {
    await reportNetwork(false);
    return await cached(fallback) || (request.mode === "navigate" ? await cached("/offline/") : null) || new Response("Connect once to prepare offline play.", {status:503,headers:{"Content-Type":"text/plain"}});
  }
}

self.addEventListener("fetch", event => {
  const request = event.request, url = new URL(request.url);
  // Never cache or queue API requests, player submissions, analytics or third parties.
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;
  if (request.mode === "navigate") {
    const pathname = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    event.respondWith(networkFirst(request, pathname, CONFIG.routes.includes(pathname) ? pathname : null));
    return;
  }
  if (url.pathname.startsWith("/data/complete/") || request.headers.get("RSC") === "1" || url.pathname.endsWith("/index.txt")) {
    const path = request.headers.get("RSC") === "1" && !url.pathname.endsWith(".txt") ? `${url.pathname.replace(/\/$/,"")}/index.txt` : url.pathname;
    event.respondWith(networkFirst(request, path, CONFIG.urls.includes(path) ? path : null));
    return;
  }
  if (CONFIG.urls.includes(url.pathname) || url.pathname.startsWith("/_next/static/")) {
    event.respondWith((async () => {
      const hit = await cached(url.pathname);
      if (hit) return hit;
      // Hashed resources may still be needed by a tab from the previous release.
      if (url.pathname.startsWith("/_next/static/")) {
        const older = await caches.match(request, {ignoreSearch:true});
        if (older) return older;
      }
      const response = await fetch(request);
      if (response.ok) await (await caches.open(CACHE)).put(url.pathname,response.clone());
      return response;
    })());
  }
});
