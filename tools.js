// https://github.com/digitalbazaar/forge/blob/4dfc87ce0f7a2709d4feccb12b0d04a0184271e8/js/rsa.js
// Detect
function _detectSubtleCrypto(fn) {
  return (typeof window !== 'undefined' &&
    typeof window.crypto === 'object' &&
    typeof window.crypto.subtle === 'object' &&
    typeof window.crypto.subtle[fn] === 'function');
}
function _detectSubtleMsCrypto(fn) {
  return (typeof window !== 'undefined' &&
    typeof window.msCrypto === 'object' &&
    typeof window.msCrypto.subtle === 'object' &&
    typeof window.msCrypto.subtle[fn] === 'function');
}

exports.hasNativeCrypto =  function() {
  return (_detectSubtleCrypto('generateKey') && _detectSubtleCrypto('exportKey')) || (_detectSubtleMsCrypto('generateKey') && _detectSubtleMsCrypto('exportKey'));
};
