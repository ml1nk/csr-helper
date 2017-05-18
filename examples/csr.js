const path = require("path");
const fs = require("fs");

// const api = require("csr-helper");
const api = require(path.join(__dirname,"..","api.js"));


let privateKeyPem = fs.readFileSync(path.join(__dirname,'keypair','privateKey.pem'), 'utf8');
let keypair = api.import.keypair(privateKeyPem);

console.log("create csr for ServerPass");

let ServerPassData = {
  CN : "CN",
  L : "L",
  O : "O",
  C : "C",
  OU1 : "OU1",
  OU2 : "OU2",
  OU3 : "OU3",
  OU4 : "OU4",
  OU5 : "OU5",
  streetAddress : "streetAddress",
  postalCode : "postalCode"
}

let csr = api.create.csr.ServerPass(ServerPassData,keypair.privateKey,keypair.publicKey);

console.log(api.export.csr(csr));
console.log(JSON.stringify(api.display.csr(csr),null,4));

console.log("\n\n\n");

console.log("create csr for Email");

let EmailData = {
  O : "O",
  C : "C",
  firstname : "firstname",
  lastname : "lastname",
  emails : ["ein@mail.test","zwei@mail.test","drei@mail.test","vier@mail.test"],
  OU1 : "OU1",
  OU2 : "OU2",
  OU3 : "OU3"
}

csr = api.create.csr.Email(EmailData,keypair.privateKey,keypair.publicKey);

console.log(api.export.csr(csr));
console.log(JSON.stringify(api.display.csr(csr),null,4));
