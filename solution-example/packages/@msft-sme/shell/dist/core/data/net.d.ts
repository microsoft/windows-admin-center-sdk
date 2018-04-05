/**
 * Net communication class.
 */
export declare class Net {
    private static cachedErrorCodeMap;
    private static readonly errorCodeMap;
    /**
     * The static definition of Web API URLs.
     */
    static apiRoot: string;
    static batch: string;
    static streamSocket: string;
    static downlevel: string;
    static downlevelInstall: string;
    static downlevelComponents: string;
    static cimClass: string;
    static cimQuery: string;
    static cimInvoke: string;
    static powerShellApiInvokeCommand: string;
    static powerShellApiSessions: string;
    static powerShellApiExecuteCommand: string;
    static powerShellApiRetrieveOutput: string;
    static powerShellApiCancelCommand: string;
    static powerShellConsoleSessions: string;
    static powerShellConsoleExecuteCommand: string;
    static powerShellConsoleRetrieveOutput: string;
    static stopCommand: string;
    static tabCommand: string;
    static userProfile: string;
    static fileTransferFormat: string;
    static fileTransferDownloadPost: string;
    static fileTransferUpload: string;
    static multiPartCallBodyUrl: string;
    /**
     * Encode a string with base64url.
     *
     * @param data the input string.
     * @return string the encoded string.
     */
    static base64urlEncode(data: string): string;
    /**
     * Decode a base64 url string.
     *
     * @param data the string to decode.
     * @return string the decoded string.
     */
    static base64urlDecode(data: string): string;
    /**
     * Encode utf8 string.
     *
     * @param data the unencoded string.
     */
    static utf8Encode(data: string): string;
    /**
     * Decode utf8 string.
     *
     * @param data the encoded UTF8 string.
     */
    static utf8Decode(data: string): string;
    /**
     * Encode with utf8 (first) and base64url (second).
     *
     * @param data data the original string to encode. The string can be full unicode character string.
     * @return string the encoded string used on a part of URL.
     */
    static utf8Base64UrlEncode(data: string): string;
    /**
     * Decode with utf8 (second) and base64url (first).
     *
     * @param data data the encoded URL string to decode.
     * @return string the decoded unicode string.
     */
    static utf8Base64UrlDecode(data: string): string;
    /**
     * Create a key name from key value pairs.
     *
     * @param properties the key value pairs.
     * @return string the key name.
     */
    static cimCreateName(properties: any): string;
    /**
     * Get properties of the item from the response.
     *
     * @param data the item in the response object.
     * @return any the properties.
     */
    static getItemProperties(data: any): any;
    /**
     * Get properties of first item from the response.
     *
     * @param data the response object.
     * @return any the properties.
     */
    static getFirstProperties(data: any): any;
    /**
     * Get array of items from the response.
     *
     * @param data the response object.
     * @return any the item array.
     */
    static getItemArray(data: any): any;
    /**
     * Create JSON string with properties.
     *
     * @param data the input data.
     * @return string the JSON string with properties.
     */
    static createPropertiesJSONString(data: any): string;
    /**
     * Creates an encoded authentication header.
     *
     * @param usersName name of user.
     * @param password the password.
     * @return string the target uri.
     */
    static createEncodedAuthenticationHeader(userNames: string[], password: string): string;
    /**
     * Create /api/nodes URL with relativeUrl.
     *
     * @param gatewayName The name of gateway.
     * @param nodeName The name of node.
     * @param relativeUrl The relative Url.
     */
    static gatewayNodeApi(gatewayName: string, nodeName: string, relativeUrl?: string): string;
    /**
     * Create /api URL with relativeUrl.
     *
     * @param gatewayName The name of gateway.
     * @param nodeName The name of node.
     * @param relativeUrl The relative Url.
     */
    static gatewayApi(gatewayName: string, relativeUrl?: string): string;
    /**
     * Get error message from ajax result or any other error result.
     *
     * @param error the error context from Net.ajax.
     * @return string the error message.
     */
    static getErrorMessage(error: any): string;
    /**
     * Get error message from PowerShell ajax response.
     * Can be used by a PowerShell batch consumer to get error message in batch response.
     *
     * @param response the ajax response.
     * @return string the error message.
     */
    static getPowerShellErrorMessage(response: any): string;
    /**
     * Get error code from ajax result.
     *
     * @param error the error context from Net.ajax.
     * @return string the error code.
     */
    static getErrorCode(error: any): string;
    /**
     * Examines an error message from ajax result to see if it contains an authorization error
     *
     * @param error the error context from an ajax request
     * @return true if the error contains an authorization error.
     */
    static isEncapsulatedAuthorizationError(error: any): boolean;
    /**
     * Get error message from ajax result excluding error stackTrace
     *
     * @param error the error context from Net.ajax.
     * @return string the error.
     */
    static getErrorMessageWithoutStacktrace(error: any): string;
    /**
     * Translates error code to string
     *
     * @param code the error code
     * @return string the related error string.
     */
    static translateErrorCode(code: number): string;
    /**
     * Parse error message from standard ajax error and PowerShell errors.
     *
     * @param response the ajax response.
     * @return string the error message.
     */
    private static parseErrorResponse(response);
}
