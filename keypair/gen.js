var forge = require("node-forge");

function gen(keylength) {
  return new Promise(function(fulfill, reject) {
    var rsa = forge.pki.rsa;
    // generate an RSA key pair asynchronously (uses web workers if available)
    // use workers: -1 to run a fast core estimator to optimize # of workers
    rsa.generateKeyPair({
        bits: keylength,
        workers: -1
    }, function(err, keypair) {
        if(err) {
          reject(err);
        } else {
          fulfill(keypair);
        }
    });
  });
}
module.exports = gen;
