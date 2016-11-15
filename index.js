var gen = require("./keypair/gen.js");
var load = require("./keypair/load.js");
var save = require("./keypair/save.js");

var d = require("./csr/domainDefault.js");

gen(2048).then(function(keypair) {

  /*
  var a = save.privateKey(privateKey);
  var b = save.privateKey(privateKey,"test");
  console.log("a", load(a));
  console.log("b", load(b));
  console.log("c", load(b,"aadsfs"));
  console.log("d", load(b,"test"));*/

/*
  var a = save.privateKey(keypair.privateKey);
  console.log(a);
  var b = save.publicKey(keypair.publicKey);
  console.log(b);
*/

/*
  console.log(d({
    C : "DE",
    O : "O",
    L : "link-edv.de",
    OU1 : "OU",
    OU2 : "OU",
    OU3 : "OU",
    CN : "link-edv.de"
  }, keypair.privateKey, keypair.publicKey));
*/
});
