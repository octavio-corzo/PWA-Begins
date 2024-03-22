const fs = require("fs");

const urlsafeBase64 = require("urlsafe-base64");
const vapid = require("./vapid.json");
const webpush = require("web-push");

const suscripciones = require("./subs-db.json");

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapid.publicKey,
  vapid.privateKey
);

module.exports.getKey = () => {
  return urlsafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  suscripciones.push(suscripcion);

  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));

  console.log(suscripciones);
};

module.exports.sendPush = (post) => {
  suscripciones.forEach((suscripcion, i) => {});
};
