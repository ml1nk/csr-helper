var forge = require("node-forge");

module.exports = function(p12) {
  return forge.util.encode64(forge.asn1.toDer(p12).getBytes());
};
