const forge = require('node-forge');

module.exports = (csr) => {
    let final = {
      valid: csr.verify(),
      subject: {
        attributes: [],
      },
      attributes: [],
    };

    if (typeof csr.subject !== 'undefined' &&
        typeof csr.subject.attributes !== 'undefined') {
          final.subject.attributes = csr.subject.attributes;
    }

    for (let i=0; i<csr.attributes.length; i++) {
      if (typeof csr.attributes[i].type !== 'undefined' &&
        csr.attributes[i].type === '1.2.840.113549.1.9.14') {
          let attribute = {};
          attribute.type = csr.attributes[i].type;
          attribute.name = csr.attributes[i].name;
          attribute.extensions = [];
          for (let p=0; p<csr.attributes[i].extensions.length; p++) {
            if (csr.attributes[i].extensions[p].id=='2.5.29.17') {
              attribute.extensions.push({
                id: csr.attributes[i].extensions[p].id,
                name: csr.attributes[i].extensions[p].name,
                altNames: csr.attributes[i].extensions[p].altNames,
              });
            } else {
              attribute.extensions.push(csr.attributes[i].extensions[p]);
            }
          }
          final.attributes.push(attribute);
      } else {
        final.attributes.push(csr.attributes[i]);
      }
    }

    if (typeof csr.publicKey !== 'undefined') {
      final.publicKey = forge.pki.publicKeyToPem(csr.publicKey)
        .replace(/^\s+|\s+$/g, '')
        .split('\r\n');
    }

    if (typeof csr.signatureOid !== 'undefined') {
      final.signature = {
        type: csr.signatureOid,
      };
      if (typeof forge.pki.oids[csr.signatureOid] !== 'undefined') {
        final.signature.name = forge.pki.oids[csr.signatureOid];
      }
    }

    return final;
};
