var api = {
  create : {
    keypair : require("./create/keypair.js"),
    p12 : require("./create/p12.js"),
    csr : {
      ServerPass : require("./create/csr/ServerPass.js"),
      Email : require("./create/csr/Email.js")
    }
  },
  display : {
    csr : require("./display/csr.js")
  },
  export : {
    keypair : require("./export/keypair.js"),
    csr : require("./export/csr.js"),
    p12 : require("./export/p12.js")
  },
  import : {
    keypair : require("./import/keypair.js"),
    csr : require("./import/csr.js"),
    p7 : require("./import/p7.js")
  },
  hasNativeCrypto : require("./hasNativeCrypto.js")
};

module.exports = api;
