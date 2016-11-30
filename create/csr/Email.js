var forge = require("node-forge");

module.exports = function(data, privateKey, publicKey) {

  var csr = forge.pki.createCertificationRequest();
  csr.publicKey = publicKey;


  var subject = [{
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
    }];

  if(data.hasOwnProperty("OU3") && data.OU3!=="") {
    subject.push({
      shortName: 'OU',
      value: data.OU3
    });
  }

  subject.push({
    shortName: 'CN',
    value: data.firstname + " " + data.lastname
  });

  subject.push({
    name: 'emailAddress',
    value: data.emails[0]
  });

  subject.push({
    name: 'SURNAME',
    type: '2.5.4.4',
    value: data.lastname
  });

  subject.push({
    name: 'GIVENNAME',
    type: '2.5.4.42',
    value: data.firstname
  });

  csr.setSubject(subject);

  if (data.emails.length > 1) {
    var attributes = [];
    attributes[0] = {
      name: 'extensionRequest',
      extensions: [{
        name: 'subjectAltName',
        altNames: []
      }]
    };
    var i;
    for (i = 0; i < data.emails.length; i++) {
      attributes[0].extensions[0].altNames.push({
        type: 1,
        value: data.emails[i]
      });
    }
    csr.setAttributes(attributes);
  }

  csr.sign(privateKey,forge.md.sha256.create());

  return csr;
};
