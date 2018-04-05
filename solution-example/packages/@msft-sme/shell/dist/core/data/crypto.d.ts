/**
 * Web Crypto interface class.
 */
export declare class Crypto {
    private static algRsaOaepSha1Key;
    private static algHmacSha256Key;
    /**
     * hash with SHA-256
     * (If it doesn't support web based crypto, encode as base64.)
     * @param data the original data to hash.
     * @return Promise<string> the hash generated.
     */
    static getSha256(data: string): Promise<string>;
    /**
     * encrypt with RSA/SHA-1
     *
     * @param jwk the JSON Web key format.
     * @param data the original data to hash.
     * @return PromiseV<string> the hash generated.
     */
    static encryptRsaSha1(jwk: string, data: string): Promise<string>;
    /**
     * sign with HMAC/SHA-256
     *
     * @param key the key (base64 encoded).
     * @param data the original data to hash. (unicode - not utf8)
     * @return Promise<string> the hash generated.
     */
    static signHmac(key: string, data: string): Promise<string>;
    /**
     * Hash with SHA-256 for WebAPI.
     *
     * @param subtle the Web API subtle.
     * @param data the original data to hash.
     * @return PromiseV<string> the hash generated.
     */
    private static hash256WebAPI(subtle, data);
    /**
     * Hash with SHA-256 for IE/Older API.
     *
     * @param subtle the older API subtle.
     * @param data the original data to hash.
     * @return PromiseV<string> the hash generated.
     */
    private static hash256IE(subtle, data);
    /**
     * Encrypt with RSA/SHA-1 for WebAPI.
     *
     * @param subtle the Web API subtle.
     * @param jwkObject the JSON Web key object or ArrayBufferView on webkit.
     * @param data the original data to encrypt.
     * @return PromiseV<string> the encrypted base64 string.
     */
    private static encryptRsaWebAPI(subtle, jwkObject, data);
    /**
     * Encrypt with RSA/SHA-1 for IE/Older API.
     *
     * @param subtle the older API subtle.
     * @param jwk the JSON Web key format (Stringfiy).
     * @param data the original data to hash.
     * @return PromiseV<string> the encrypted base64 string.
     */
    private static encryptRsaIE(subtle, jwk, data);
    /**
     * Sign with HMAC for WebAPI.
     *
     * @param subtle the Web API subtle.
     * @param key the key.
     * @param data the original data to encrypt.
     * @return PromiseV<string> the encrypted base64 string.
     */
    private static signHmacWebAPI(subtle, key, data);
    /**
     * Sign with HMAC for IE/Older API.
     *
     * @param subtle the older API subtle.
     * @param jwk the key.
     * @param data the original data to hash.
     * @return PromiseV<string> the encrypted base64 string.
     */
    private static signHmacIE(subtle, key, data);
    /**
     * Create hex string from byte raw data.
     *
     * @param bytes the array buffer.
     * @return string the hex string.
     */
    private static toHexString(bytes);
    /**
     * Create Uint8Array from a string.
     *
     * @param data The string data.
     * @return Uint8Array The bytes array.
     */
    private static toUint8Array(data);
    /**
     * Create ArrayBuffer from a string with unicode.
     *
     * @param data The string data.
     * @return ArrayBuffer The bytes array.
     */
    private static toUtf8ArrayBuffer(data);
    /**
     * Encode utf8 string.
     *
     * @param data the unencoded string.
     */
    private static utf8Encode(data);
    /**
     * Create ArrayBuffer from a string with unicode.
     *
     * @param data The string data.
     * @return ArrayBuffer The bytes array.
     */
    private static toArrayBuffer(data);
    /**
     * Create ArrayBufferView from a string with unicode.
     *
     * @param data The string data.
     * @return ArrayBuffer The bytes array.
     */
    private static toArrayBufferView(data);
    /**
     * Create base64 from byte data.
     *
     * @param data The byte data.
     * @return string The base64 encodeded data.
     */
    private static createBase64(data);
}
