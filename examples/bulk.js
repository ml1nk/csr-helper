const path = require('path');
const fs = require('fs');

// const api = require("csr-helper");
const api = require(path.join(__dirname, '..', 'api.js'));

console.log('import bulk-template-doubleid.csv (invalid file)');
let csv1 = fs.readFileSync(
    path.join(__dirname, 'bulk', 'bulk-template-doubleid.csv')
  ).toString('binary');
console.log('<bulk> = api.import.bulk(<csv content>,"OU1","OU2"):');
try {
  api.import.bulk(csv1, 'OU1', 'OU2');
} catch (e) {
  console.log('exception:', e);
}

console.log('\n\n\n');

console.log('import bulk-template-shortpassword.csv (invalid file)');
let csv2 = fs.readFileSync(
    path.join(__dirname, 'bulk', 'bulk-template-shortpassword.csv')
  ).toString('binary');
console.log('<bulk> = api.import.bulk(<csv content>,"OU1","OU2"):');
try {
  api.import.bulk(csv2, 'OU1', 'OU2');
} catch (e) {
  console.log('exception:', e);
}

console.log('\n\n\n');

console.log('import bulk-template-wrongcount.csv (invalid file)');
let csv3 = fs.readFileSync(
    path.join(__dirname, 'bulk', 'bulk-template-wrongcount.csv')
  ).toString('binary');
console.log('<bulk> = api.import.bulk(<csv content>,"OU1","OU2"):');
try {
  api.import.bulk(csv3, 'OU1', 'OU2');
} catch (e) {
  console.log('exception:', e);
}

console.log('\n\n\n');

console.log('import bulk-template-empty.csv (invalid file)');
let csv4 = fs.readFileSync(
    path.join(__dirname, 'bulk', 'bulk-template-empty.csv')
  ).toString('binary');
console.log('<bulk> = api.import.bulk(<csv content>,"OU1","OU2"):');
try {
  api.import.bulk(csv4, 'OU1', 'OU2');
} catch (e) {
  console.log('exception:', e);
}

console.log('\n\n\n');

console.log('import bulk-template.csv (valid file)');
let csv5 = fs.readFileSync(
    path.join(__dirname, 'bulk', 'bulk-template.csv')
  ).toString('binary');
console.log('<bulk> = api.import.bulk(<csv content>,"OU1","OU2"):');
let bulk = api.import.bulk(csv5, 'OU1', 'OU2');
console.log(bulk);
console.log('await api.export.bulk(<bulk>,"nodebuffer") > bulk.zip');
let bulkZip = api.export.bulk(bulk, 'nodebuffer');
bulkZip.then((zip)=>{
  fs.writeFileSync(path.join(__dirname, 'bulk.zip'), zip);
});
