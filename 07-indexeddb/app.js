// indexedDB: Reforzamiento
let request = window.indexedDB.open("mi-db", 1);

//Se actualiza cuando se crea o se sube de version la DB
request.onupgradeneeded = (event) => {
  console.log("actualizacion de db");

  let db = event.target.result;

  db.createObjectStore("heroes", {
    keyPath: "id",
  });
};

// Manejo de errores
request.onerror = (event) => {
  console.log("DB error", event.target.error);
};

//Insertar datos
request.onsuccess = (event) => {
  let db = event.target.result;

  let heroesData = [
    { id: "1111", heroe: "Spiderman", mensaje: "Holaaaaaaa" },
    { id: "2222", heroe: "Ironman", mensaje: "Mark 50" },
  ];

  let heroesTransaction = db.transaction("heroes", "readwrite");

  heroesTransaction.onerror = (event) => {
    console.log("error guardando", event.target.error);
  };

  //Informa sobre el exito de la transaccion

  heroesTransaction.oncomplete = (event) => {
    console.log("Transaccion hecha", event);
  };

  let heroresStore = heroesTransaction.objectStore("heroes");

  for (let heroe of heroesData) {
    heroresStore.add(heroe);
  }

  heroresStore.onsuccess = (event) => {
    console.log("Nuevo item agregado a la DB");
  };
};
