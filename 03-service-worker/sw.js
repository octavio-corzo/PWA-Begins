// Ciclo de vida del SW

self.addEventListener("install", (event) => {
  console.log("Instalando SW!");

  const instalacion = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("SW: Instalaciones terminadas");
      //Actualizacion del service worker sin cerrar las tabs
      self.skipWaiting();
      resolve();
    }, 0);
  });

  //Espera hasta que termine de realizar un proceso
  event.waitUntil(instalacion);
});

// Cuando el SW toma control de la app
self.addEventListener("activate", (event) => {
  //Borrar cache viejo
  console.log("SW2: Activo y listo para controlar la app!!!");
});

//Fetch: Manejo de peticiones HTTP

self.addEventListener("fetch", (event) => {
  //Aplicar estrategias del cache
  console.log("SW", event.request.url);

  if (event.request.url.includes("https://reqres.in/")) {
    const resp = new Response(`{ok: false, mensaje: 'jajaja'}`);

    event.respondWith(resp);
  }
});
