var forge = require("node-forge");

module.exports = function(csr) {
  try {
    return forge.pki.certificationRequestToPem(csr);
  } catch(e) {
    return false;
  }
};
