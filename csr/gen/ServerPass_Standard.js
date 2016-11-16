var forge = require("node-forge");

function domainDefault(data, privateKey, publicKey) {
  var csr = forge.pki.createCertificationRequest();
  csr.publicKey = publicKey;
  csr.setSubject([{
      shortName: 'CN',
      value: data.CN
    },{
      shortName: 'L',
      value: data.L
    },{
      shortName: 'O',
      value: data.O
    },{
      shortName: 'C',
      value: data.C
    }
  ]);
  csr.sign(privateKey,forge.md.sha256.create());
  if(!csr.verify()) {
    return false;
  }
  return forge.pki.certificationRequestToPem(csr);
}

module.exports = domainDefault;
