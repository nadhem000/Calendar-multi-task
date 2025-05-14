
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
const CACHE_NAME = 'multi-calendar-v3';
const OFFLINE_FALLBACK = '/offline.html';
const PRECACHE_URLS = [
	'/',
	'/index.html',
	'/log.txt',
	'/manifest.json',
	'/offline.html',
	'/README.md',
	'/sw.js',
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
// Offline Fallback
workbox.routing.setCatchHandler(async ({event}) => {
	if (event.request.destination === 'document') {
		return caches.match(OFFLINE_FALLBACK);
	}
	return Response.error();
});
workbox.routing.registerRoute(
  ({request}) => request.destination === 'document',
  new workbox.strategies.NetworkFirst()
);