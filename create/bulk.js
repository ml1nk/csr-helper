var forge = require("node-forge");

module.exports = function(bulk) {
    var obj = {};
    for(var id in bulk) {
      obj[id] = _row(bulk[id]);
    }
    return obj;
};

function _row(row) {
  var api = require("./../api.js");
  return api.create.keypair(2048).then(function(keypair){
      var csr = api.create.csr.Email(row.data,keypair.privateKey, keypair.publicKey);
      return {
        csr : csr,
        keypair : keypair
      };
  });
}
