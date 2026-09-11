/* Mojimelt minimal offline service worker — cache-first app shell */
const CACHE = 'mojimelt-v1';
const CORE = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request, { ignoreSearch: false }).then(
      (hit) =>
        hit ||
        fetch(request).then((res) => {
          const copy = res.clone();
          if (res.ok && new URL(request.url).origin === self.location.origin) {
            caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
          }
          return res;
        }).catch(() => caches.match('./index.html'))
    )
  );
});
