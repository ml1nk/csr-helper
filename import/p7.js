const forge = require('node-forge');

module.exports = (pkcs7) => {
  let result;
  try {
    result = forge.pkcs7.messageFromPem(pkcs7);
  } catch (err1) {
    try {
      result = forge.pkcs7.messageFromAsn1(forge.asn1.fromDer(pkcs7));
    } catch (err2) {
      return false;
    }
  }

  // Möglicherweise gibt eine der Funktionen
  // auch nur NULL ohne weiteren Fehler zurück
  if (!result) {
    return false;
  }
  return result;
};
