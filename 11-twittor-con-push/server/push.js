const urlsafeBase64 = require("urlsafe-base64");
const vapid = require("./vapid.json");

const suscripciones = [];

module.exports.getKey = () => {
  return urlsafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  suscripciones.push(suscripcion);

  console.log(suscripciones);
};
