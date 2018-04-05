import { NativeQ } from './native-q';
/**
 * Web Crypto interface class.
 */
var Crypto = (function () {
    function Crypto() {
    }
    /**
     * hash with SHA-256
     * (If it doesn't support web based crypto, encode as base64.)
     * @param data the original data to hash.
     * @return Promise<string> the hash generated.
     */
    Crypto.getSha256 = function (data) {
        if (data == null) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ArgumentNullError.message;
            return Promise.reject(message.format('Crypto/getSha256', 'data'));
        }
        var root = window;
        var isIE = !!root.msCrypto;
        if (isIE && root.msCrypto.subtle) {
            return Crypto.hash256IE(root.msCrypto.subtle, data);
        }
        if (root.crypto) {
            var subtle = root.crypto.subtle || root.crypto.webkitSubtle;
            if (subtle) {
                return Crypto.hash256WebAPI(subtle, data);
            }
        }
        return Promise.resolve(window.btoa(data));
    };
    /**
     * encrypt with RSA/SHA-1
     *
     * @param jwk the JSON Web key format.
     * @param data the original data to hash.
     * @return PromiseV<string> the hash generated.
     */
    Crypto.encryptRsaSha1 = function (jwk, data) {
        var message = '';
        if (jwk == null) {
            message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ArgumentNullError.message;
            return Promise.reject(message.format('Crypto/encryptRsaSha1', 'jwk'));
        }
        if (data == null) {
            message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ArgumentNullError.message;
            return Promise.reject(message.format('Crypto/encryptRsaSha1', 'data'));
        }
        var root = window;
        var isIE = !!root.msCrypto;
        if (isIE && root.msCrypto.subtle) {
            return Crypto.encryptRsaIE(root.msCrypto.subtle, jwk, data);
        }
        if (root.crypto) {
            var subtle = root.crypto.subtle;
            if (subtle) {
                var jwkObject = JSON.parse(jwk);
                return Crypto.encryptRsaWebAPI(subtle, jwkObject, data);
            }
            subtle = root.crypto.webkitSubtle;
            if (subtle) {
                var jwkArray = Crypto.toArrayBufferView(jwk);
                return Crypto.encryptRsaWebAPI(subtle, jwkArray, data);
            }
        }
        message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.UnknownBrowser.message;
        return Promise.reject(message.format('Crypto/encryptRsaSha1'));
    };
    /**
     * sign with HMAC/SHA-256
     *
     * @param key the key (base64 encoded).
     * @param data the original data to hash. (unicode - not utf8)
     * @return Promise<string> the hash generated.
     */
    Crypto.signHmac = function (key, data) {
        var message = '';
        if (key == null) {
            message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ArgumentNullError.message;
            return Promise.reject(message.format('Crypto/signHmac', 'key'));
        }
        if (data == null) {
            message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ArgumentNullError.message;
            return Promise.reject(message.format('Crypto/encryptRsaSha1', 'data'));
        }
        var root = window;
        var isIE = !!root.msCrypto;
        if (isIE && root.msCrypto.subtle) {
            return Crypto.signHmacIE(root.msCrypto.subtle, key, data);
        }
        if (root.crypto) {
            var subtle = root.crypto.subtle || root.crypto.webkitSubtle;
            if (subtle) {
                return Crypto.signHmacWebAPI(subtle, key, data);
            }
        }
        message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.UnknownBrowser.message;
        return Promise.reject(message.format('Crypto/signHmac'));
    };
    /**
     * Hash with SHA-256 for WebAPI.
     *
     * @param subtle the Web API subtle.
     * @param data the original data to hash.
     * @return PromiseV<string> the hash generated.
     */
    Crypto.hash256WebAPI = function (subtle, data) {
        var deferred = NativeQ.defer();
        var array = Crypto.toUint8Array(data);
        subtle.digest({ name: 'SHA-256' }, array)
            .then(function (hash) {
            var hexText = Crypto.toHexString(hash);
            deferred.resolve(hexText);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    /**
     * Hash with SHA-256 for IE/Older API.
     *
     * @param subtle the older API subtle.
     * @param data the original data to hash.
     * @return PromiseV<string> the hash generated.
     */
    Crypto.hash256IE = function (subtle, data) {
        var deferred = NativeQ.defer();
        var array = Crypto.toUint8Array(data);
        var cryptoOp = subtle.digest({ name: 'SHA-256' }, array);
        cryptoOp.oncomplete = function (event) {
            var hexText = Crypto.toHexString(event.target.result);
            deferred.resolve(hexText);
        };
        cryptoOp.onerror = function (error) {
            if (!deferred.isFulfilled) {
                deferred.reject(error);
            }
        };
        cryptoOp.finish();
        return deferred.promise;
    };
    /**
     * Encrypt with RSA/SHA-1 for WebAPI.
     *
     * @param subtle the Web API subtle.
     * @param jwkObject the JSON Web key object or ArrayBufferView on webkit.
     * @param data the original data to encrypt.
     * @return PromiseV<string> the encrypted base64 string.
     */
    Crypto.encryptRsaWebAPI = function (subtle, jwkObject, data) {
        var deferred = NativeQ.defer();
        var array = Crypto.toUtf8ArrayBuffer(data);
        subtle.importKey('jwk', jwkObject, Crypto.algRsaOaepSha1Key, false, ['encrypt'])
            .then(function (publicKey) {
            return subtle.encrypt(Crypto.algRsaOaepSha1Key, publicKey, array);
        })
            .then(function (result) {
            deferred.resolve(Crypto.createBase64(result));
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    /**
     * Encrypt with RSA/SHA-1 for IE/Older API.
     *
     * @param subtle the older API subtle.
     * @param jwk the JSON Web key format (Stringfiy).
     * @param data the original data to hash.
     * @return PromiseV<string> the encrypted base64 string.
     */
    Crypto.encryptRsaIE = function (subtle, jwk, data) {
        var deferred = NativeQ.defer();
        var array = Crypto.toUtf8ArrayBuffer(data);
        var onerror = function (error) {
            if (!deferred.isFulfilled) {
                deferred.reject(error);
            }
        };
        var jwkBytes = Crypto.toArrayBuffer(jwk);
        var importKeyOp = subtle.importKey('jwk', jwkBytes, Crypto.algRsaOaepSha1Key, false, ['encrypt']);
        importKeyOp.oncomplete = function (importKeyOpOnCompleteEvent) {
            var publicKey = importKeyOpOnCompleteEvent.target.result;
            var encryptOp = subtle.encrypt(Crypto.algRsaOaepSha1Key, publicKey, array);
            encryptOp.oncomplete = function (encryptOpOnCompleteEvent) {
                deferred.resolve(Crypto.createBase64(encryptOpOnCompleteEvent.target.result));
            };
            encryptOp.onerror = onerror;
        };
        importKeyOp.onerror = onerror;
        return deferred.promise;
    };
    /**
     * Sign with HMAC for WebAPI.
     *
     * @param subtle the Web API subtle.
     * @param key the key.
     * @param data the original data to encrypt.
     * @return PromiseV<string> the encrypted base64 string.
     */
    Crypto.signHmacWebAPI = function (subtle, key, data) {
        var deferred = NativeQ.defer();
        var array = Crypto.toUtf8ArrayBuffer(data);
        var keyObject = Crypto.toArrayBufferView(window.atob(key));
        subtle.importKey('raw', keyObject, Crypto.algHmacSha256Key, false, ['sign'])
            .then(function (publicKey) {
            return subtle.sign(Crypto.algHmacSha256Key, publicKey, array);
        })
            .then(function (result) {
            deferred.resolve(Crypto.createBase64(result));
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    /**
     * Sign with HMAC for IE/Older API.
     *
     * @param subtle the older API subtle.
     * @param jwk the key.
     * @param data the original data to hash.
     * @return PromiseV<string> the encrypted base64 string.
     */
    Crypto.signHmacIE = function (subtle, key, data) {
        var deferred = NativeQ.defer();
        var array = Crypto.toUtf8ArrayBuffer(data);
        var onerror = function (error) {
            if (!deferred.isFulfilled) {
                deferred.reject(error);
            }
        };
        var keyBytes = Crypto.toArrayBuffer(window.atob(key));
        var importKeyOp = subtle.importKey('raw', keyBytes, Crypto.algHmacSha256Key, false, ['sign']);
        importKeyOp.oncomplete = function (importKeyOpEvent) {
            var publicKey = importKeyOpEvent.target.result;
            var encryptOp = subtle.sign(Crypto.algHmacSha256Key, publicKey, array);
            encryptOp.oncomplete = function (encryptOpEvent) {
                deferred.resolve(Crypto.createBase64(encryptOpEvent.target.result));
            };
            encryptOp.onerror = onerror;
        };
        importKeyOp.onerror = onerror;
        return deferred.promise;
    };
    /**
     * Create hex string from byte raw data.
     *
     * @param bytes the array buffer.
     * @return string the hex string.
     */
    Crypto.toHexString = function (bytes) {
        var array = new Uint8Array(bytes);
        var hexText = '';
        for (var i = 0; i < array.length; i++) {
            var hex = array[i].toString(16);
            hexText += (hex.length === 1 ? '0' : '') + hex;
        }
        return hexText;
    };
    /**
     * Create Uint8Array from a string.
     *
     * @param data The string data.
     * @return Uint8Array The bytes array.
     */
    Crypto.toUint8Array = function (data) {
        var temp = [];
        for (var i = 0; i < data.length; i++) {
            var ch = data.charCodeAt(i);
            /* tslint:disable:no-bitwise */
            temp.push((ch & 0x0ff00) >> 8);
            temp.push(ch & 0x0ff);
            /* tslint:enable:no-bitwise */
        }
        return new Uint8Array(temp);
    };
    /**
     * Create ArrayBuffer from a string with unicode.
     *
     * @param data The string data.
     * @return ArrayBuffer The bytes array.
     */
    Crypto.toUtf8ArrayBuffer = function (data) {
        var utf8 = Crypto.utf8Encode(data);
        return Crypto.toArrayBuffer(utf8);
    };
    /**
     * Encode utf8 string.
     *
     * @param data the unencoded string.
     */
    Crypto.utf8Encode = function (data) {
        return unescape(encodeURIComponent(data));
    };
    /**
     * Create ArrayBuffer from a string with unicode.
     *
     * @param data The string data.
     * @return ArrayBuffer The bytes array.
     */
    Crypto.toArrayBuffer = function (data) {
        var buffer = new ArrayBuffer(data.length);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < buffer.byteLength; i++) {
            view[i] = data.charCodeAt(i);
        }
        return buffer;
    };
    /**
     * Create ArrayBufferView from a string with unicode.
     *
     * @param data The string data.
     * @return ArrayBuffer The bytes array.
     */
    Crypto.toArrayBufferView = function (data) {
        var buffer = new ArrayBuffer(data.length);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < buffer.byteLength; i++) {
            view[i] = data.charCodeAt(i);
        }
        return view;
    };
    /**
     * Create base64 from byte data.
     *
     * @param data The byte data.
     * @return string The base64 encodeded data.
     */
    Crypto.createBase64 = function (data) {
        var array = new Uint8Array(data);
        var rawString = '';
        for (var i = 0; i < array.byteLength; i++) {
            rawString += String.fromCharCode(array[i]);
        }
        return window.btoa(rawString);
    };
    return Crypto;
}());
export { Crypto };
Crypto.algRsaOaepSha1Key = { name: 'RSA-OAEP', hash: { name: 'SHA-1' } };
Crypto.algHmacSha256Key = { name: 'HMAC', hash: { name: 'SHA-256' } };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9jcnlwdG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFrQixPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFRckQ7O0dBRUc7QUFDSDtJQUFBO0lBK1lBLENBQUM7SUEzWUc7Ozs7O09BS0c7SUFDVyxnQkFBUyxHQUF2QixVQUF3QixJQUFZO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ3BHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBRUQsSUFBSSxJQUFJLEdBQVEsTUFBTSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFB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