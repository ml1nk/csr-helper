const forge = require('node-forge');

module.exports = (data, privateKey, publicKey) => {
  let csr = forge.pki.createCertificationRequest();
  csr.publicKey = publicKey;

  let subject = [{
      shortName: 'CN',
      value: forge.util.encodeUtf8(data.CN),
    }, {
      shortName: 'L',
      value: forge.util.encodeUtf8(data.L),
    }, {
      shortName: 'O',
      value: forge.util.encodeUtf8(data.O),
    }, {
      shortName: 'C',
      value: forge.util.encodeUtf8(data.C),
    },
  ];

  for (let i=1; i<=5; i++) {
    if (data.hasOwnProperty('OU'+i) && data['OU'+i]!=='') {
      subject.push({
        shortName: 'OU',
        value: forge.util.encodeUtf8(data['OU'+i]),
      });
    }
  }

  if (data.hasOwnProperty('ST') && data.ST!=='') {
    subject.push({
      shortName: 'ST',
      value: forge.util.encodeUtf8(data.ST),
    });
  }

  if (data.hasOwnProperty('streetAddress') && data.streetAddress!=='') {
    subject.push({
      name: 'streetAddress',
      type: '2.5.4.9',
      value: forge.util.encodeUtf8(data.streetAddress),
    });
  }

  if (data.hasOwnProperty('postalCode') && data.postalCode!=='') {
    subject.push({
      name: 'postalCode',
      type: '2.5.4.17',
      value: forge.util.encodeUtf8(data.postalCode),
    });
  }

  csr.setSubject(subject);
  csr.sign(privateKey, forge.md.sha256.create());

  return csr;
};
