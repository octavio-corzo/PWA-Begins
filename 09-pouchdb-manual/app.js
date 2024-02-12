// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajesW
let db = new PouchDB("mensajes");

// Objeto a grabar en base de datos
let mensaje = {
  _id: new Date().toISOString(),
  user: "spiderman",
  mensaje: "Mi tía hizo unos panqueques muy buenos",
  sincronizado: false,
};

// 2- Insertar en la base de datos
db.put(mensaje).then(console.log("Mensaje insertado"));

// 3- Leer todos los mensajes offline
db.allDocs({ include_docs: true, decending: false }).then((doc) => {
  console.log(doc);
});

// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
// db.allDocs({ include_docs: true, decending: false }).then((docs) => {
//   console.log(doc);
//   docs.rows.forEach((row) => {
//     let doc = row.doc;
//     doc.sincronizado = true;
//     db.put(doc);
//   });
// });

// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización
db.allDocs({ include_docs: true }).then((docs) => {
  docs.rows.forEach((row) => {
    let doc = row.doc;
    if (doc.sincronizado) {
      db.remove(doc);
    }
  });
});
