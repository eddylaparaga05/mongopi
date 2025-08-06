const CACHE_NAME = 'mongopi-cache-v2';
const FILES_TO_CACHE = [
  '/mongopi/',
  '/mongopi/index.html',
  '/mongopi/login.html',
  '/mongopi/admin.html',
  '/mongopi/kasir.html',
  '/mongopi/dashboard.html',
  '/mongopi/kelola-menu.html',
  '/mongopi/pembukuan.html',
  '/mongopi/manifest.json',
  '/mongopi/logo.png',
  '/mongopi/icon-192.png',
  '/mongopi/icon-512.png',
  '/mongopi/notif.mp3'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching files');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch files
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
