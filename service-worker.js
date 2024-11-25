const CACHE_NAME = 'vchat-cache-v1';
const urlsToCache = [
  '/imgs/blank_user_icon.jpg',
  '/path/to/default-image.png',
  // Add other image URLs you want to cache
];

// Install a service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
	caches.open(CACHE_NAME)
	  .then((cache) => {
		return cache.addAll(urlsToCache);
	  })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
	caches.match(event.request)
	  .then((response) => {
		// Cache hit - return response
		if (response) {
		  return response;
		}
		return fetch(event.request);
	  })
  );
});

// Update a service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
	caches.keys().then((cacheNames) => {
	  return Promise.all(
		cacheNames.map((cacheName) => {
		  if (cacheWhitelist.indexOf(cacheName) === -1) {
			return caches.delete(cacheName);
		  }
		})
	  );
	})
  );
});