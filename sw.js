/* sw.js - MacroControlAPP
   Estrategia: network-first para index, cache-first para estáticos.
*/
// IMPORTANTE: cada release debe subir este identificador para forzar
// la limpieza de cachés antiguas en iOS/Safari (si no, verás la app “vieja”).
const CACHE = 'mcapp-cache-v1.5.9-r52';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  // Datos
  './macrocontrol_foods_merged_enriched.json',
  './rules_engine_v1.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).catch(()=>{})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE) ? caches.delete(k) : null));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if(event.data && event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if(req.method !== 'GET') return;

  const url = new URL(req.url);

  // Solo mismo origen
  if(url.origin !== self.location.origin) return;

  // HTML: network-first (para que actualice)
  if(req.headers.get('accept')?.includes('text/html')){
    event.respondWith((async () => {
      try{
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      }catch{
        const cached = await caches.match(req);
        return cached || caches.match('./index.html');
      }
    })());
    return;
  }

  // JSON de datos: network-first (para que las BD/reglas se refresquen)
  if(url.pathname.endsWith('.json')){
    event.respondWith((async () => {
      try{
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      }catch{
        const cached = await caches.match(req);
        return cached || Response.error();
      }
    })());
    return;
  }

  // Estáticos: cache-first
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if(cached) return cached;
    const fresh = await fetch(req);
    const cache = await caches.open(CACHE);
    cache.put(req, fresh.clone());
    return fresh;
  })());
});
