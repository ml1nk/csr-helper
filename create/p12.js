const forge = require('node-forge');

module.exports = (privateKey, pkcs7, friendlyName, password) => {
    let result;
    let array = pkcs7.certificates.reverse();
    let i = 0;

    // Wurde der passende Private Schlüssel mitgegeben?
    for (i; i < array.length; i++) {
        try {
            /* Teste ob die Keys zueinander passen */
            let decrypted = privateKey.decrypt(
                array[i].publicKey.encrypt('42'));
            if (decrypted === '42') {
                break;
            }
        } catch (err) {
            /* empty */
        }
    }

    // Im Array konnte der passende Öffentliche Schlüssel nicht gefunden werden,
    // der gegebene Private Key passt also nicht.
    if (i === array.length) {
        return false;
    }

    // Der eigene Schlüssel muss an den Anfang
    array.unshift(array.splice(i, 1)[0]);

    let config = {
        algorithm: '3des',
    };

    if (typeof friendlyName === 'string' && friendlyName!=='') {
      config.friendlyName = friendlyName;
    }

    try {
        result = forge.pkcs12.toPkcs12Asn1(
            privateKey, array, password, config);
    } catch (err) {
        return false;
    }

    if (!result) {
        return false;
    }
    return result;
};
