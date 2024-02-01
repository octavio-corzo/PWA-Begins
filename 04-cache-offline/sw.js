// const CACHE_NAME = "cache-1";

const CACHE_STATIC_NAME = "static-v2";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
const CACHE_DYNAMIC_LIMIT = 50;

function limpiarCache(cacheName, numerItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > numerItems) {
        cache.delete(keys[0]).then(limpiarCache(cacheName, numerItems));
      }
    });
  });
}

self.addEventListener("install", (e) => {
  const cacheProm = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "/",
      "/index.html",
      "/css/style.css",
      "/img/main.jpg",
      "/js/app.js",
      "/img/no-img.jpg",
    ]);
  });

  const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then((cache) => {
    return cache.addAll([
      "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
    ]);
  });

  e.waitUntil(Promise.all([cacheProm, cacheInmutable]));
});

self.addEventListener("fetch", (e) => {
  //1 - Cache Only es usada cuando queremos que toda la app sea accedida desde el cache.
  // e.respondWith(caches.match(e.request));
  //2 - Cache with network fallback intenta leer el cache si no funciona intenta leer la red.
  // const respuestaCache = caches.match(e.request).then((res) => {
  //   //Existe el archivo en el cache
  //   if (res) return res;
  //   //No existe el archivo en el cache
  //   console.log("No existe", e.request.url);
  //   return fetch(e.request).then((newResp) => {
  //     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
  //       cache.put(e.request, newResp);
  //       limpiarCache(CACHE_DYNAMIC_NAME, 5);
  //     });
  //     return newResp.clone();
  //   });
  // });
  // e.respondWith(respuestaCache);
  // //3 - Network With cache fallback primero intenta obtener de internet si no puede lo obtiene del cache
  // const respuesta = fetch(e.request)
  //   .then((res) => {
  //     if (!res) return caches.match(e.request);
  //     console.log("Fetch", res);
  //     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
  //       cache.put(e.request, res);
  //       limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
  //     });
  //     return res.clone();
  //   })
  //   .catch((err) => {
  //     return caches.match(e.request);
  //   });
  // e.respondWith(respuesta);
  // //4 - Cache with network update
  // // Es muy util cuando el rendimiento es critico
  // // Las actualizaciones siempre estaran un paso atras
  // if (e.request.url.includes("bootstrap")) {
  //   return e.respondWith(caches.match(e.request));
  // }
  // const respuesta = caches.open(CACHE_STATIC_NAME).then((cache) => {
  //   fetch(e.request).then((newRes) => cache.put(e.request, newRes));
  //   return cache.match(e.request);
  // });
  // e.respondWith(respuesta);

  //5 - Cache & Network Race
  // Le brindara al usuario la respuesta que sea mas rapida en las peticiones

  const respuesta = new Promise((resolve, reject) => {
    let rechazada = false;

    const falloUnaVez = () => {
      if (rechazada) {
        if (/\.(png|jpg)$/i.test(e.request.url)) {
          resolve(caches.match("/img/no-img.jpg"));
        } else {
          reject("No se encontro respuesta");
        }
      } else {
        rechazada = true;
      }
    };

    fetch(e.request)
      .then((res) => {
        res.ok ? resolve(res) : falloUnaVez();
      })
      .catch(falloUnaVez);

    caches
      .match(e.request)
      .then((res) => {
        res ? resolve(res) : falloUnaVez();
      })
      .catch(falloUnaVez);
  });

  e.respondWith(respuesta);
});
