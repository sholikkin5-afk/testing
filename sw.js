const CACHE_NAME = 'sarahmart-v1';
const urlsToCache = [
  '/sarahmart.html',
  '/keranjang.html',
  '/index.html',
  '/logo-sarahmart.png',
  '/manifest.json'
];

// PAS INSTALL
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// PAS FETCH
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// PAS UPDATE
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    })
  );
});