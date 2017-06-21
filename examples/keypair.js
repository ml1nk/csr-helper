const path = require('path');
const fs = require('fs');

// const api = require("csr-helper");
const api = require(path.join(__dirname, '..', 'api.js'));

(async()=>{
    console.log('create new keypair');
    let keypair = await api.create.keypair(2048);
    console.log(api.export.keypair.privateKey(keypair.privateKey));
    console.log(api.export.keypair.privateKey(keypair.privateKey, '1234'));
    console.log(api.export.keypair.publicKey(keypair.publicKey));

    console.log('\n\n\n');

    console.log('import keypair from privateKey PEM without password');
    let privateKeyPem = fs.readFileSync(
        path.join(__dirname, 'keypair', 'privateKey.pem'),
        'utf8');
    keypair = api.import.keypair(privateKeyPem);
    console.log(api.export.keypair.publicKey(keypair.publicKey));

    console.log('\n\n\n');

    console.log('import keypair from privateKey PEM with password');
    privateKeyPem = fs.readFileSync(
        path.join(__dirname, 'keypair', 'privateKey-1234.pem'),
        'utf8');
    keypair = api.import.keypair(privateKeyPem, '1234');
    console.log(api.export.keypair.publicKey(keypair.publicKey));
})();
