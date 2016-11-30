[![npm version](https://badge.fury.io/js/csr-helper.svg)](https://badge.fury.io/js/csr-helper)

## Install:
`npm install csr-helper`
## Usage:
``` javascript
var api = require("csr-helper");
```
## Example:
``` javascript
var api = require("csr-helper");
api.create.keypair(2048).then(function(keypair){
  var csr1 = api.create.csr.ServerPass({
    CN : "test.de",
    L : "UnknownCity",
    O : "testOrganization",
    C : "DE"
  },keypair.privateKey, keypair.publicKey);

  console.log(api.export.csr(csr1));

  var csr2 = api.create.csr.Email({
    O : "T-Systems",
    C : "DE",
    OU1 : "TeleSecTest-ShortTerm",
    OU2 : "Test-1ke",
    OU3 : "test",
    firstname : "Max",
    lastname : "Example",
    emails : [
      "test1@example.com",
      "test2@example.com",
      "test3@example.com",
      "test4@example.com"
    ]
  },keypair.privateKey, keypair.publicKey);

  console.log(api.export.csr(csr2));
},function(err){
  console.error(err);
});
```
## Key Generation
 * nodejs => local installation of openssl
 * browser => web crypto API (http://caniuse.com/#feat=cryptography)

## API:
* create
  * keypair(keylength) : promise.\<keypair\>
  * p12(\<forge private key\> privateKey, \<forge pkcs7\> pkcs7, (optional) \<string\> friendlyName) : \<forge p12\>
  * csr
    * ServerPass(\<ServerPassData\>, \<forge private key\> privateKey, \<forge public key\> publicKey) : \<forge csr\>
    * Email(\<EmailData\>, \<forge private key\> privateKey, \<forge public key\> publicKey) : \<forge csr\>
* display
  * csr(\<forge csr\>) : <object> // object contains filtered data from the csr for displaying usage
* export
  * keypair
    * privateKey(\<forge private key\> privateKey, (optional) \<string\> password) : \<(encrypted) pem private key\>
    * publicKey(\<forge public key\> publicKey) : \<pem public key\>
  * csr(\<forge csr\>) : \<pem csr\>
  * p12(\<forge p12\>) : \<der p12\>
* import
  * keypair(\<forge private key\> privateKey, (optional) \<string\> password) : \<keypair\>
  * csr(\<pem csr\>) : \<forge csr\>
  * p7(\<pem/der pkcs7\>) : \<forge pkcs7\>
* hasNativeCrypto() : \<boolean\> // check if the script is running on the browser and web crypto is available

  Any other function than api.create.keypair will return false if the input is invalid.

``` javascript
keypair = {  // \<keypair\>
  privateKey : \<forge private key\>,
  publicKey : \<forge pkcs7\>
}
```

``` javascript
ServerPassData = {  // <ServerPassData>
  CN : <string>,
  L : <string>,
  O : <string>,
  C : <string>,
  (optional) OU1 : <string>,
  (optional) OU2 : <string>,
  (optional) OU3 : <string>,
  (optional) OU4 : <string>,
  (optional) OU5 : <string>,
  (optional) streetAddress : <string>,
  (optional) postalCode : <string>
}
```

``` javascript
EmailData = {  // <EmailData>
  O : <string>,
  C : <string>,
  firstname : <string>,
  lastname : <string>,
  emails : <array, 1-4 e-mails>,
  OU1 : <string>,
  OU2 : <string>,
  (optional) OU3 : <string>
}
```
