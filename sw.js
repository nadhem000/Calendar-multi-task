const CACHE_NAME = 'multi-calendar-v1';
const PRECACHE_URLS = [
  '/',
  '/assets/icons/ios/icon-192.png',
  '/assets/icons/android/icon-192.png',
  '/assets/icons/android/icon-512.png',
  '/assets/backgrounds/background.jpg',
  '/assets/screenshots/screenshot_01.png',
  '/assets/screenshots/screenshot_02.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request);
      })
  );
});