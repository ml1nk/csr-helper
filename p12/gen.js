var forge = require("node-forge");

module.exports = function(privateKey, pkcs7, friendlyName) {
    var result;
    var array = pkcs7.certificates.reverse();
    var i = 0;

    // Wurde der passende Private Schlüssel mitgegeben?
    for (i; i < array.length; i++) {
        try {
            /* Teste ob die Keys zueinander passen */
            var decrypted = privateKey.decrypt(array[i].publicKey.encrypt("42"));
            if (decrypted == "42") {
                break;
            }
        } catch (err) {}
    }

    // Im Array konnte der passende Öffentliche Schlüssel nicht gefunden werden,
    // der gegebene Private Key passt also nicht.
    if (i == array.length) {
        return false;
    }

    // Der eigene Schlüssel muss an den Anfang
    array.unshift(array.splice(i, 1)[0]);

    try {
        result = forge.pkcs12.toPkcs12Asn1(
            privateKey, array, password, {
                algorithm: '3des',
                friendlyName: friendlyName
            });
    } catch (err) {
        return false;
    }

    if (!result) {
        return false;
    }
    return forge.util.encode64(forge.asn1.toDer(result).getBytes());
};
