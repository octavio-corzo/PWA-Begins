const sumOne = (num) => {
  let promesa = new Promise((resolve, reject) => {
    if (num >= 7) {
      reject("El numero es muy alto");
    }

    setTimeout(() => {
      resolve(num + 1);
    }, 800);
  });

  return promesa;
};

sumOne(5)
  .then(sumOne)
  .then(sumOne)
  .then(sumOne)
  .then((nuevoNumero) => {
    console.log(nuevoNumero);
  })
  .catch((error) => {
    console.log("El numero es demasiado alto");
  });
