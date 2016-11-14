/*
{
  C : "C"
  O : "O",
  OU1 : "OU",
  OU2 : "OU",
  OU3 : "OU",
  CN : "CN"
}
*/

var forge = require("node-forge");

function domainDefault(data, keyPair) {
  var csr = forge.pki.createCertificationRequest();
  csr.publicKey = keyPair.publicKey;
  csr.setSubject([{
      shortName: 'C',
      value: data.C
    }, {
      shortName: 'O',
      value: data.O
    }, {
      shortName: 'OU',
      value: data.OU1
    }, {
      shortName: 'OU',
      value: data.OU2
    }, {
      shortName: 'OU',
      value: data.OU3
    }, {
      shortName: 'CN',
      value: data.CN
    },{
      shortName: 'L',
      value: data.L
    }
  ]);

  csr.sign(keyPair.privateKey,forge.md.sha256.create());
  return forge.pki.certificationRequestToPem(csr);
}

module.exports = domainDefault;
