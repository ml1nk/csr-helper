const forge = require("node-forge");

module.exports = (csr)=>{
  try {
    return forge.pki.certificationRequestToPem(csr);
  } catch(e) {
    return false;
  }
};
