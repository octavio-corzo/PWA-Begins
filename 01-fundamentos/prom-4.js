function sumarLento(num) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(num + 1);
    }, 800);
  });
}

const sumarRapido = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(num + 1);
      reject("Error en sumar rapido");
    }, 100);
  });
};

Promise.race([sumarLento(5), sumarRapido(10)])
  .then((respuesta) => {
    console.log(respuesta);
  })
  .catch((error) => console.log("Error en sumar rapido"));
