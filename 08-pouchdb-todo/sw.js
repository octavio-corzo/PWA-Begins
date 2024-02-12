const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";
const DYNAMIC_CACHE_LIMIT = 500;

const APP_SHELL = [
  "/",
  "js/app.js",
  "js/base.js",
  "js/pouchdb-nightly.js",
  "style/base.css",
  "style/bg.png",
  "style/plain_sign_in_blue.png",
  "index.html",
];

self.addEventListener("install", (event) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  event.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
  const cache = fetch(e.request)
    .then((res) => {
      if (!res) return caches.match(e.request);

      caches.open(DYNAMIC_CACHE).then((cache) => {
        cache.put(e.request, res);
      });
      return res.clone();
    })
    .catch((err) => {
      return caches.match(e.request);
    });

  e.respondWith(cache);
});

self.addEventListener("activate", (event) => {
  console.log("SW2: Activo y listo para controlar la app!!!");
});
