// Service Worker Sarahmart + AUTO VERSION TANGGAL
const CACHE_NAME = 'sarahmart-' + new Date().toISOString().split('T')[0];

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/sarahmart.html',
  '/keranjang.html', // <-- TAMBAH IKI
  '/pesanan.html', // <-- TAMBAH IKI
  '/manifest.json',
  '/logo-sarahmart.png'
];

self.addEventListener('install', (e) => {
  console.log('SW Installed:', CACHE_NAME);
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('SW Activated:', CACHE_NAME);
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k!== CACHE_NAME).map(k => caches.delete(k)))
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});