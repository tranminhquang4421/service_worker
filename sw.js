const cachedName = "version3";
const cachedAssets = ["index.html", "main.js", "style.css"];

// Step - Install Service Worker
self.addEventListener("install", (e) => {
  console.log("Service Worker Installed");
  // Step - Cache files
  e.waitUntil(
    caches
      .open(cachedName)
      .then((cache) => {
        console.log("caching files");
        cache.addAll(cachedAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});
// Step - Activate Service Worker
self.addEventListener("activate", (e) => {
  console.log("Service Worker Activated");
  //Step - Keep Cache light
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cachedName) {
            console.log("Cached Service worker is being cleared");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Step - Persisting cached assets
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(() => caches.match(event.request))
  );
});
