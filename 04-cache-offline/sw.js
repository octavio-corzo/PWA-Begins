//Detectar cuando no hay conexion o cuando la red falla

self.addEventListener("fetch", (event) => {
  const offlineResp = new Response(`
    
        Bienvenido a mi pagina web

        Disculpa, pero para usarla, necesitas tener conexion a internet
    
    `);

  const resp = fetch(event.request).catch(() => {
    return offlineResp;
  });

  event.respondWith(resp);
});
