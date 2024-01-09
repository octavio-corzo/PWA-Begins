self.addEventListener("install", (e) => {
  const cacheProm = caches.open("cache-1").then((cache) => {
    return cache.addAll([
      "/",
      "/index.html",
      "/css/style.css",
      "/img/main.jpg",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
      "/js/app.js",
    ]);
  });

  e.waitUntil(cacheProm);
});

self.addEventListener("fetch", (e) => {
  //1 - Cache Only es usada cuando queremos que toda la app sea accedida desde el cache.
  e.respondWith(caches.match(e.request));
});
