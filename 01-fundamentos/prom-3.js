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
      resolve(num + 1);
    }, 100);
  });
};

Promise.all([sumarRapido(10), sumarLento(5)]).then((res) => {
  console.log(res);
});
