const sumarUno = (num, callback) => {
  setTimeout(() => {
    callback(num + 1);
  }, 800);
};

sumarUno(5, function (nuevoValor) {
  sumarUno(nuevoValor, function (nuevoValor2) {
    console.log(nuevoValor2);
  });
});
