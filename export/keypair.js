const forge = require("node-forge");

function privateKey(privateKey, password) {
  try {
    return (typeof password !== "string" || password === "") ? forge.pki.privateKeyToPem(privateKey) : forge.pki.encryptRsaPrivateKey(privateKey, password);
  } catch(e) {
    return false;
  }
}

function publicKey(publicKey) {
  try {
    return forge.pki.publicKeyToPem(publicKey);
  } catch(e) {
    return false;
  }
}

module.exports = {
  publicKey : publicKey,
  privateKey : privateKey
};
