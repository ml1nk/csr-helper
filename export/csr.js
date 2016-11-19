module.exports = function(csr) {
  return forge.pki.certificationRequestToPem(csr);
};
