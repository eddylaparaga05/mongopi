self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('mongopi-cache').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './logo.png',
        './icon-192.png',
        './icon-512.png',
        './admin.html',
        './kelola-menu.html'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});