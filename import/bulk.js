var forge = require("node-forge");
var papa = require("papaparse");

module.exports = function(csv, ou1, ou2) {

  var rows = papa.parse(csv,{
  	delimiter: ";",
  	comments: "#",
  	skipEmptyLines: true
  }).data;

  var check = _check(rows);
  if(check !==true) {
    return check;
  }

  var res = {};
  for(var i=0; i<rows.length; i++) {
    var row = rows[i];
    res[row[0]] = _convert(row, ou1, ou2);
  }

  return res;
};

function _check(rows) {
  var obj = {};
  for(var i=0; i<rows.length; i++) {
    var row = rows[i];
    if(row.length<7) {
      return false;
    }
    if(obj.hasOwnProperty(row[0])) {
        return "0:"+row[0];
    } else {
        obj[row[0]] = null;
    }
    if(row.length>13 && row[13]!=="" && row[13].length<6) {
        return "13:"+row[13];
    }
  }
  return true;
}

function _convert(row, ou1, ou2) {

  var password;

  var data = {
    C : row[1],
    O : row[2],
    OU1 : ou1,
    OU2 : ou2,
    firstname : row[4],
    lastname : row[5],
    emails : [row[6]]
  };

  if(row[3] !== "") {
    data.OU3 = row[3];
  }

  if(row.length>13 && row[13].length>=6) {
    password = row[13];
  } else {
    password = forge.util.encode64(forge.random.getBytesSync(12));
  }

  if(row.length>15 && row[15] !== "") {
    data.emails.push(row[15]);
  }

  if(row.length>16 && row[16] !== "") {
    data.emails.push(row[16]);
  }

  if(row.length>17 && row[17] !== "") {
    data.emails.push(row[17]);
  }

  return {
    password : password,
    data : data,
  };
}
