var gen = require("./keypair/gen.js");
var load = require("./keypair/load.js");
var save = require("./keypair/save.js");
var ServerPass_Standard = require("./csr/gen/ServerPass_Standard.js");
var view = require("./csr/view.js");

exports.load = function(privateKey, password) {
  return api(load(privateKey,password));
};

exports.gen = function(keylength) {
  return gen(2048).then(function(keypair) {
    return api(keypair);
  });
};

exports.view = {
  csr : function(csr) {
    return csr(csr);
  }
};


function csr(keypair) {

  var save = {
    privateKey : function() {
      return save.privateKey(keypair.privateKey);
    },
    publicKey : function() {
      return save.publicKey(keypair.publicKey);
    }
  };

  var csr = {
    ServerPass_Standard : function(data) {
      return ServerPass_Standard(data, keypair.privateKey, keypair.publicKey);
    }
  };

  return {
    csr : csr,
    save : save
  };
}

/*
gen(2048).then(function(keypair) {

  var csr = ServerPass_Standard({
    CN : "*.link-edv.de",
    L : "Herdorf",
    O : "test",
    C : "DE"
  }, keypair.privateKey, keypair.publicKey);

  console.log(csr);

  console.log(view(csr));
});
*/
/*
gen(2048).then(function(keypair) {


  var a = save.privateKey(privateKey);
  var b = save.privateKey(privateKey,"test");
  console.log("a", load(a));
  console.log("b", load(b));
  console.log("c", load(b,"aadsfs"));
  console.log("d", load(b,"test"));

  var a = save.privateKey(keypair.privateKey);
  console.log(a);
  var b = save.publicKey(keypair.publicKey);
  console.log(b);

  console.log(d({
    CN : "*.link-edv.de",
    L : "Herdorf",
    O : "test",
    C : "DE"
  }, keypair.privateKey, keypair.publicKey));
}); */
