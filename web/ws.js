const PREFIX = 'V2';

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PREFIX);
      console.log("cache")
      cache.add(new Request('/offline.html'));
    })()
  );
  console.log(`${PREFIX} Install`);
});

self.addEventListener("activate", () => {
  clients.claim()
  console.log(`${PREFIX} Active`);
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode == 'navigate') {
    console.log(`${PREFIX} Fetching : ${event.request.url}, Mode : ${event.request.mode}`);
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          return await fetch(event.request);
        } catch (e) {
          const cache = await caches.open(PREFIX);
          return await cache.match('/offline.html');
        }
      })());
  }
});
