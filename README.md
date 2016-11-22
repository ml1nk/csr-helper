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
  var csr = api.create.csr.ServerPass({
    CN : "test.de",
    L : "UnknownCity",
    O : "testOrganization",
    C : "DE"
  },keypair.privateKey, keypair.publicKey);
  console.log(api.export.csr(csr));
},function(err){
  console.error(err);
});
```
## Key Generation
 * nodejs => local installation of openssl
 * browser => web crypto API (http://caniuse.com/#feat=cryptography)

## API:
* create
  * keypair(keylength) : promise.<keypair>
  * p12(<forge private key> privateKey, <forge pkcs7> pkcs7, (optional) <string> friendlyName) : <forge p12>
  * csr
    * ServerPass(<ServerPass>, <forge private key> privateKey, <forge public key> publicKey) : <forge csr>
* display
  * csr(<forge csr>) : <object> // object contains filtered data from the csr for displaying usage
* export
  * keypair
    * privateKey(<forge private key> privateKey, (optional) <string> password) : <(encrypted) pem private key>
    * publicKey(<forge public key> publicKey) : <pem public key>
  * csr(<forge csr>) : <pem csr>
  * p12(<forge p12>) : <der p12>
* import
  * keypair(<forge private key> privateKey, (optional) <string> password) : <keypair>
  * csr(<pem csr>) : <forge csr>
  * p7(<pem/der pkcs7) : <forge pkcs7>
* hasNativeCrypto() : <boolean> // check if the script is running on the browser and web crypto is available

Any other function than api.create.keypair will return false if the input is invalid.

``` javascript
keypair = {  // <keypair>
  privateKey : <forge private key>,
  publicKey : <forge pkcs7>
}
```

``` javascript
ServerPass = {  // <ServerPass>
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
