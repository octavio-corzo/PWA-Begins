if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
}

if (window.caches) {
  //Abre un cache y si no exite lo crea
  caches.open("prueba-1");
  caches.open("prueba-2");

  //Verifica si exite el cache
  caches.has("prueba-2").then(console.log);

  //   //Borra un cache
  //   caches.delete("prueba-1").then(console.log);

  caches.open("cache-v1.1").then((cache) => {
    //Agrega lo que queramos al cache
    cache.add("/index.html");

    //AddAll agrega nuevos caches para trabajar con el cache lo hacemos con una promesa
    cache.addAll(["/index.html", "/img/main.jpg"]).then(() => {
      //Eliminar un cache
      //   cache.delete("/index.html");

      //Remplazar cualquier cosa que se encuentre en el cache
      cache.put("index.html", new Response("Hola mundo"));
    });

    // Leer un archivo que se encuentra en el cache
    cache.match("/index.html").then((res) => {
      res.text().then(console.log);
    });
  });

  //Obtener todos los caches que existen
  caches.keys().then((keys) => {
    console.log(keys);
  });
}
