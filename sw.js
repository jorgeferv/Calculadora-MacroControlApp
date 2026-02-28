/* Service Worker - MacroControl (r57c7)
   GitHub Pages + iOS: anti-caché
   - HTML/JSON: Network-first
   - Assets: Cache-first
*/
const CACHE_NAME = "macrocontrol-r57c7b";
const CORE = ["./", "./index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try { await cache.addAll(CORE); } catch(e) {}
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE_NAME) ? caches.delete(k) : Promise.resolve()));
    await self.clients.claim();
  })());
});

function isHTML(req) {
  return req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
}
function isJSON(url) { return url.pathname.endsWith(".json"); }
function isStatic(url) {
  return /\.(js|css|png|jpg|jpeg|webp|svg|ico)$/i.test(url.pathname);
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request, { cache: "no-store" });
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    throw e;
  }
}
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const fresh = await fetch(request);
  if (fresh && fresh.ok) cache.put(request, fresh.clone());
  return fresh;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isHTML(req)) return event.respondWith(networkFirst(req));
  if (isJSON(url)) return event.respondWith(networkFirst(req));
  if (isStatic(url)) return event.respondWith(cacheFirst(req));
  event.respondWith(networkFirst(req));
});
