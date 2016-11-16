var forge = require("../forge.min.js");

function load(privateKey, password) {

    if(typeof password !== "string") {
      password = "";
    }

    try {
        privateKey = forge.pki.decryptRsaPrivateKey(privateKey, password);
    } catch (err) {
        return false;
    }

    if (!privateKey) {
        return false;
    }

    /*
    if (privateKey.n.bitLength() < 2048) {
        return false;
    }*/

    var publicKey = forge.pki.rsa.setPublicKey(privateKey.n, privateKey.e);

    return {
      publicKey : publicKey,
      privateKey : privateKey
    };
}

module.exports = load;
