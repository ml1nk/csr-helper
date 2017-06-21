const forge = require('node-forge');
const openssl = (typeof window !== 'object')
    ? require('openssl-wrapper').exec
    : ()=>{};

const hasNativeCrypto = require('./../hasNativeCrypto.js');
const importKeypair = require('./../import/keypair.js');

function gen(keylength) {
  if (typeof window !== 'object') {
    return _genOpenssl(keylength);
  } else {
    return hasNativeCrypto()
        ? _genForge(keylength)
        : Promise.reject('noNativeCrypto');
  }
}

module.exports = gen;

function _genOpenssl(keylength) {
    return new Promise((fulfill, reject)=>{
        require('crypto').randomBytes(32, (err, buffer) => {
            if (err) {
                reject(err);
                return;
            }
            let token = buffer.toString('hex');
            let config = {};
                config.des3 = true;
                config.passout = 'pass:'+token;
                config[keylength] = false;

            openssl('genrsa', config, (err, buffer) => {
                if (err) {
                    reject(err);
                    return;
                }
                let keypair = importKeypair(buffer.toString(), token);
                if (keypair === false) {
                  reject('invalidPemFromOpenssl');
                } else {
                  fulfill(keypair);
                }
            });
        });
    });
}

function _genForge(keylength) {
  return new Promise((fulfill, reject) => {
      let rsa = forge.pki.rsa;
      rsa.generateKeyPair({
          bits: keylength,
      }, (err, keypair) => {
          if (err) {
              reject(err);
          } else {
              fulfill(keypair);
          }
      });
  });
}
