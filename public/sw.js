// Cleaner Service Worker to unregister itself and clear caches

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => caches.delete(key))
      )
    ).then(() => {
      self.clients.claim();
      // Unregister this service worker
      self.registration.unregister().then(() => {
        console.log('Service worker unregistered successfully.');
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Pass-through: do not intercept or cache anything
});
