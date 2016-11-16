var forge = require("../forge.min.js");

function privateKey(privateKey, password) {
  return (typeof password !== "string" || password === "") ? forge.pki.privateKeyToPem(privateKey) : forge.pki.encryptRsaPrivateKey(privateKey, password);
}

function publicKey(publicKey) {
  return forge.pki.publicKeyToPem(publicKey);
}

module.exports = {
  publicKey : publicKey,
  privateKey : privateKey
};
