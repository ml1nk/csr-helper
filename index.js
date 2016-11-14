var gen = require("./keypair/gen.js");
var d = require("./csr/domainDefault.js");

gen(2048).then(function(keyPair) {

  console.log(d({
    C : "DE",
    O : "O",
    L : "link-edv.de",
    OU1 : "OU",
    OU2 : "OU",
    OU3 : "OU",
    CN : "link-edv.de"
  },keyPair));

});
