fetch("no-encontrado")
  .then((resp) => resp.text())
  .then((html) => {
    let body = document.querySelector("body");
    body.innerHTML = html;
    console.log(html);
  })
  .catch((error) => {
    console.log("Error en la peticion");
    console.log(error);
  });
