var forge = require("../../forge.min.js");

function domainDefault(data, privateKey, publicKey) {
  var csr = forge.pki.createCertificationRequest();
  csr.publicKey = publicKey;

  var subject = [{
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
  ];

  for(let i=1; i<=5; i++) {
    if(data.hasOwnProperty("OU"+i) && data["OU"+i]!=="") {
      subject.push({
        shortName: 'OU',
        value: data["OU"+i]
      });
    }
  }

  if(data.hasOwnProperty("ST") && data.ST!=="") {
    subject.push({
      shortName: 'ST',
      value: data.ST
    });
  }

  if(data.hasOwnProperty("streetAddress") && data.streetAddress!=="") {
    subject.push({
      name: "streetAddress",
      type: '2.5.4.9',
      value: data.streetAddress
    });
  }

  if(data.hasOwnProperty("postalCode") && data.postalCode!=="") {
    subject.push({
      name: "postalCode",
      type: '2.5.4.17',
      value: data.postalCode
    });
  }


  csr.setSubject(subject);
  csr.sign(privateKey,forge.md.sha256.create());
  if(!csr.verify()) {
    return false;
  }
  return forge.pki.certificationRequestToPem(csr);
}

module.exports = domainDefault;
