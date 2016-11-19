var forge = require("node-forge");
var crypto = require('crypto');
var openssl = require('openssl-wrapper').exec;
var hasNativeCrypto = require('./../hasNativeCrypto.js');
var importKeypair = require('./../import/keypair.js');

function gen(keylength) {
  if(typeof window !== "object") {
    return _genOpenssl(keylength);
  } else {
    return hasNativeCrypto() ? _genForge(keylength) : Promise.reject("noNativeCrypto");
  }
}

module.exports = gen;

function _genOpenssl(keylength) {
    return new Promise(function(fulfill, reject) {
        require('crypto').randomBytes(32, function(err, buffer) {
            if (err) {
                reject(err);
                return;
            }
            var token = buffer.toString('hex');
            openssl('genrsa', {
                des3: true,
                passout: 'pass:'+token,
                [keylength]: false
            }, function(err, buffer) {
                if (err) {
                    reject(err);
                    return;
                }
                var keypair = importKeypair(buffer.toString(), token);
                if(keypair === false) {
                  reject("invalidPemFromOpenssl");
                } else {
                  fulfill(keypair);
                }
            });
        });
    });
}

function _genForge(keylength) {
  return new Promise(function(fulfill, reject) {
      var rsa = forge.pki.rsa;
      rsa.generateKeyPair({
          bits: keylength
      }, function(err, keypair) {
          if (err) {
              reject(err);
          } else {
              fulfill(keypair);
          }
      });
  });
}
