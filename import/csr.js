const forge = require("node-forge");

module.exports = (csr)=>{
    try {
        csr = forge.pki.certificationRequestFromPem(csr);
    } catch (err) {
        return false;
    }

    if (!csr) {
        return false;
    }
    return csr;
};
