const Jszip = require('jszip');
const api = require('./../api.js');

module.exports = async(bulk, type) => {
  let zip = new Jszip();
  let running = [];
  for (let key in bulk) {
    if (bulk.hasOwnProperty(key)) {
      ((folder, key)=>{
        folder.file('password.txt', bulk[key].password);
        bulk[key].data.then((data) => {
          folder.file('request.csr', api.export.csr(data.csr));
          folder.file('privateKey.pem',
            api.export.keypair.privateKey(data.keypair.privateKey,
                                          bulk[key].password)
          );
        });
        running.push(bulk[key].data);
      })(zip.folder(key), key);
    }
  }

  await Promise.all(running);

  return await zip.generateAsync({type: type});
};
