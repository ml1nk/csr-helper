var gen = require("./keypair/gen.js");
var keypairLoad = require("./keypair/load.js");
var keypairSave = require("./keypair/save.js");
var ServerPassStandard = require("./csr/gen/ServerPassStandard.js");
var view = require("./csr/view.js");

var p12Gen = require("./p12/gen.js");
var p12Load = require("./p12/load.js");



exports.load = function(privateKey, password) {
  var keypair = keypairLoad(privateKey,password);
  return keypair===false ? false : api(keypair);
};

exports.gen = function(keylength) {
  return gen(2048).then(function(keypair) {
    return api(keypair);
  });
};

exports.view = {
  csr : function(csr) {
    return view(csr);
  }
};


function api(keypair) {

  var save = {
    privateKey : function(password) {
      return keypairSave.privateKey(keypair.privateKey, password);
    },
    publicKey : function() {
      return keypairSave.publicKey(keypair.publicKey);
    }
  };

  var csr = {
    ServerPassStandard : function(data) {
      return ServerPassStandard(data, keypair.privateKey, keypair.publicKey);
    }
  };

  function p12(pkcs7, friendlyName) {
    var result = p12Load(pkcs7);
    if(result === false) {
      return false;
    }
    result = p12Gen(keypair.privateKey, result, friendlyName);
    if(result === false) {
      return true;
    }
    return result;
  }

  return {
    csr : csr,
    save : save,
    p12 : p12
  };
}

var openssl = require('openssl-wrapper').exec;
const password = 'github';

openssl('genrsa', {des3: true, passout: `pass:${password}`, '2048': false}, function(err, buffer) {
    console.log(buffer.toString());
});

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
