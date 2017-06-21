const forge = require('node-forge');
const papa = require('papaparse');
const windows1252 = require('windows-1252');
const api = require('./../api.js');

module.exports = function(csv, ou1, ou2) {
  csv = windows1252.decode(csv);
  let rows = papa.parse(csv, {
    delimiter: ';',
    comments: '#',
    skipEmptyLines: true,
  }).data;

  _check(rows);

  let res = {};
  for (let i=0; i<rows.length; i++) {
    let row = rows[i];
    res[row[0]] = _convert(row, ou1, ou2);
  }

  return _rows(res);
};

function _check(rows) {
  if (rows.length === 0) {
    throw {code: 'rows'};
  }

  let obj = {};
  for (let i=0; i<rows.length; i++) {
    let row = rows[i];
    if (row.length<7) {
      throw {code: 'columns', line: i};
    }

    if (obj.hasOwnProperty(row[0])) {
        throw {code: 0, data: row[0], line: i};
    }

    obj[row[0]] = null;

    if (row.length>12 && row[12]!=='' && row[12].length<6) {
        throw {code: 12, data: row[12], line: i};
    }
  }
}

function _convert(row, ou1, ou2) {
  let password;

  let data = {
    C: row[1],
    O: row[2],
    OU1: ou1,
    OU2: ou2,
    firstname: row[4],
    lastname: row[5],
    emails: [row[6]],
  };

  if (row[3] !== '') {
    data.OU3 = row[3];
  }

  if (row.length>12 && row[12].length>=6) {
    password = row[12];
  } else {
    password = forge.util.encode64(forge.random.getBytesSync(12));
  }

  if (row.length>15 && row[15] !== '') {
    data.emails.push(row[15]);
  }

  if (row.length>16 && row[16] !== '') {
    data.emails.push(row[16]);
  }

  if (row.length>17 && row[17] !== '') {
    data.emails.push(row[17]);
  }

  return {
    password: password,
    data: data,
  };
}

function _rows(bulk) {
    let obj = {};
    for (let id in bulk) {
      if (bulk.hasOwnProperty(id)) {
        obj[id] = _row(bulk[id]);
      }
    }
    return obj;
}

function _row(row) {
  let data = api.create.keypair(2048).then((keypair)=>{
      let csr = api.create.csr.email(
        row.data,
        keypair.privateKey,
        keypair.publicKey);
      return {
        csr: csr,
        keypair: keypair,
      };
  });
  return {
    data: data,
    password: row.password,
  };
}
