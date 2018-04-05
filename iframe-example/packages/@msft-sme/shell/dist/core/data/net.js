/**
 * Net communication class.
 */
var Net = /** @class */ (function () {
    function Net() {
    }
    Object.defineProperty(Net, "errorCodeMap", {
        get: function () {
            if (!Net.cachedErrorCodeMap) {
                var strings = MsftSme.resourcesStrings().MsftSmeShell.Core;
                Net.cachedErrorCodeMap = {
                    // added from https://msdn.microsoft.com/en-us/library/aa392154(v=vs.85).aspx
                    0: strings.ErrorCode.Code0.message,
                    5: strings.ErrorCode.Code5.message,
                    50: strings.ErrorCode.Code50.message,
                    87: strings.ErrorCode.Code87.message,
                    110: strings.ErrorCode.Code110.message,
                    1323: strings.ErrorCode.Code1323.message,
                    1326: strings.ErrorCode.Code1326.message,
                    1355: strings.ErrorCode.Code1355.message,
                    2224: strings.ErrorCode.Code2224.message,
                    2691: strings.ErrorCode.Code2691.message,
                    2692: strings.ErrorCode.Code2692.message,
                    0x80041087: strings.ErrorCode.Code8004108.message
                };
            }
            return Net.cachedErrorCodeMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Encode a string with base64url.
     *
     * @param data the input string.
     * @return string the encoded string.
     */
    Net.base64urlEncode = function (data) {
        // base64URL encoding: RFC4648: http://tools.ietf.org/html/rfc4648#page-7
        var temp = window.btoa(data);
        var pad = temp.indexOf('=');
        if (pad > 0) {
            temp = temp.substr(0, pad);
        }
        temp = temp.replaceAll('+', '-').replaceAll('/', '_');
        return temp;
    };
    /**
     * Decode a base64 url string.
     *
     * @param data the string to decode.
     * @return string the decoded string.
     */
    Net.base64urlDecode = function (data) {
        while (data.length % 4 !== 0) {
            data += '=';
        }
        data = data.replaceAll('-', '+').replaceAll('_', '/');
        return window.atob(data);
    };
    /**
     * Encode utf8 string.
     *
     * @param data the unencoded string.
     */
    Net.utf8Encode = function (data) {
        return unescape(encodeURIComponent(data));
    };
    /**
     * Decode utf8 string.
     *
     * @param data the encoded UTF8 string.
     */
    Net.utf8Decode = function (data) {
        return decodeURIComponent(escape(data));
    };
    /**
     * Encode with utf8 (first) and base64url (second).
     *
     * @param data data the original string to encode. The string can be full unicode character string.
     * @return string the encoded string used on a part of URL.
     */
    Net.utf8Base64UrlEncode = function (data) {
        var utf8 = Net.utf8Encode(data);
        return Net.base64urlEncode(utf8);
    };
    /**
     * Decode with utf8 (second) and base64url (first).
     *
     * @param data data the encoded URL string to decode.
     * @return string the decoded unicode string.
     */
    Net.utf8Base64UrlDecode = function (data) {
        var utf8 = Net.base64urlDecode(data);
        return Net.utf8Decode(utf8);
    };
    /**
     * Create a key name from key value pairs.
     *
     * @param properties the key value pairs.
     * @return string the key name.
     */
    Net.cimCreateName = function (properties) {
        var data = JSON.stringify(properties);
        var utf8 = Net.utf8Encode(data);
        return Net.base64urlEncode(utf8);
    };
    /**
     * Get properties of the item from the response.
     *
     * @param data the item in the response object.
     * @return any the properties.
     */
    Net.getItemProperties = function (data) {
        if (data && data.properties) {
            return data.properties;
        }
        return data;
    };
    /**
     * Get properties of first item from the response.
     *
     * @param data the response object.
     * @return any the properties.
     */
    Net.getFirstProperties = function (data) {
        if (data && data.value && data.value.length) {
            if (data.value[0].properties) {
                return data.value[0].properties;
            }
        }
        else if (data && data.length) {
            return data[0];
        }
        return Net.getItemProperties(data);
    };
    /**
     * Get array of items from the response.
     *
     * @param data the response object.
     * @return any the item array.
     */
    Net.getItemArray = function (data) {
        if (data && data.value) {
            return data.value;
        }
        return data;
    };
    /**
     * Create JSON string with properties.
     *
     * @param data the input data.
     * @return string the JSON string with properties.
     */
    Net.createPropertiesJSONString = function (data) {
        return JSON.stringify({
            properties: data
        });
    };
    /**
     * Creates an encoded authentication header.
     *
     * @param usersName name of user.
     * @param password the password.
     * @return string the target uri.
     */
    Net.createEncodedAuthenticationHeader = function (userNames, password) {
        var creds = {
            // if only a username was provided, use '.' (shorthand for the locale machine hostname)
            domain: userNames.length === 1 ? '.' : userNames[0],
            username: userNames.length === 1 ? userNames[0] : userNames[1],
            password: password
        };
        return window.btoa(Net.utf8Encode(JSON.stringify(creds)));
    };
    /**
     * Create /api/nodes URL with relativeUrl.
     *
     * @param gatewayName The name of gateway.
     * @param nodeName The name of node.
     * @param relativeUrl The relative Url.
     */
    Net.gatewayNodeApi = function (gatewayName, nodeName, relativeUrl) {
        if (!relativeUrl) {
            relativeUrl = '';
        }
        if (!relativeUrl.startsWith('/')) {
            relativeUrl = '/' + relativeUrl;
        }
        if (!nodeName) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ArgumentNullError.message;
            throw new Error(message.format('Net/gatewayNodeApi', 'nodeName'));
        }
        return Net.gatewayApi(gatewayName, "/nodes/" + nodeName + relativeUrl);
    };
    /**
     * Create /api URL with relativeUrl.
     *
     * @param gatewayName The name of gateway.
     * @param nodeName The name of node.
     * @param relativeUrl The relative Url.
     */
    Net.gatewayApi = function (gatewayName, relativeUrl) {
        if (!gatewayName) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ArgumentNullError.message;
            throw new Error(message.format('Net/gatewayApi', 'gatewayName'));
        }
        if (!relativeUrl) {
            relativeUrl = '';
        }
        if (!relativeUrl.startsWith('/')) {
            relativeUrl = '/' + relativeUrl;
        }
        gatewayName = gatewayName.toLowerCase();
        if (!gatewayName.startsWith('http://') && !gatewayName.startsWith('https://')) {
            gatewayName = 'https://' + gatewayName;
        }
        return gatewayName + "/api" + relativeUrl;
    };
    /**
     * Get error message from ajax result or any other error result and optionally includes native error message.
     *
     * @param error the error context from Net.ajax.
     * @param options add additional optional error message: such as native error messages if possible
     * @return string the error message.
     */
    Net.getErrorMessage = function (error, options) {
        var xhr = error && error.xhr;
        if (xhr && xhr.response) {
            var message = Net.parseErrorResponse(xhr.response, options);
            if (message) {
                return message;
            }
        }
        var statusText = xhr && xhr.statusText;
        if (statusText) {
            return statusText;
        }
        if (error && error.message) {
            return error.message;
        }
        var strings = MsftSme.resourcesStrings().MsftSmeShell.Core;
        throw new Error(strings.Error.NoResponseError.message);
    };
    /**
     * Get error message from PowerShell ajax response.
     * Can be used by a PowerShell batch consumer to get error message in batch response.
     *
     * @param response the ajax response.
     * @return string the error message.
     */
    Net.getPowerShellErrorMessage = function (response) {
        var message = Net.parseErrorResponse(response);
        if (message) {
            return message;
        }
        var strings = MsftSme.resourcesStrings().MsftSmeShell.Core;
        throw new Error(strings.Error.NoResponseError.message);
    };
    /**
     * Get error code from ajax result.
     *
     * @param error the error context from Net.ajax.
     * @return string the error code.
     */
    Net.getErrorCode = function (error) {
        var strings = MsftSme.resourcesStrings().MsftSmeShell.Core;
        var err = error && error.xhr && error.xhr.response && error.xhr.response.error;
        if (!err) {
            throw new Error(strings.Error.NoResponseError.message);
        }
        if (err.code) {
            return err.code;
        }
        throw new Error(strings.Error.NoCode.message);
    };
    /**
     * Examines an error message from ajax result to see if it contains an authorization error
     *
     * @param error the error context from an ajax request
     * @return true if the error contains an authorization error.
     */
    Net.isEncapsulatedAuthorizationError = function (error) {
        // return false if the properties we need dont exist
        if (!error
            || !error.xhr
            || !error.xhr.response) {
            return false;
        }
        // Chrome lets us access these properties directly, IE/Edge do not
        var parsedError = null;
        if (!error.xhr.response.error && typeof error.xhr.response === 'string') {
            try {
                parsedError = JSON.parse(error.xhr.response);
            }
            catch (nested) {
                /* noop */
            }
        }
        else {
            parsedError = error.xhr.response;
        }
        if (!parsedError
            || !parsedError.error
            || !parsedError.error.code
            || !parsedError.error.message
            || typeof parsedError.error.message !== 'string') {
            return false;
        }
        // return false if the error is not a Cim or Powershell error
        if (parsedError.error.code !== 'CimException' && parsedError.error.code !== 'PSRemotingTransportException') {
            return false;
        }
        // TODO: This would fail if on localized environment.
        // if the message contains 'Access is denied' then return true
        return parsedError.error.message.search('Access is denied') > -1;
    };
    /**
     * Get error message from ajax result excluding error stackTrace
     *
     * @param error the error context from Net.ajax.
     * @return string the error.
     */
    Net.getErrorMessageWithoutStacktrace = function (error) {
        var errorMessage = Net.getErrorMessage(error);
        if (errorMessage) {
            var stackTraceIndex = errorMessage.toLowerCase().indexOf('stacktrace');
            if (stackTraceIndex > 0) {
                errorMessage = errorMessage.substring(0, stackTraceIndex);
            }
        }
        return errorMessage;
    };
    /**
     * Translates error code to string
     *
     * @param code the error code
     * @return string the related error string.
     */
    Net.translateErrorCode = function (code) {
        var strings = MsftSme.resourcesStrings().MsftSmeShell.Core;
        var message = Net.errorCodeMap[code];
        if (message) {
            return strings.ErrorCode.Translated.message.format(message, code);
        }
        return strings.ErrorCode.Generic.message.format(code);
    };
    /**
     * Parse error message from standard ajax error and PowerShell errors.
     *
     * @param response the ajax response.
     * @return string the error message.
     */
    Net.parseErrorResponse = function (response, options) {
        var strings = MsftSme.resourcesStrings().MsftSmeShell.Core;
        var err = response && response.error;
        if (err && err.message) {
            var errorMessage = err.message;
            if (options && options.addNativeError && err.detailRecord) {
                return strings.Error.AddNativeErrorCode.message.format(errorMessage, err.detailRecord.nativeErrorCode);
            }
            return errorMessage;
        }
        var psErrors = response && response.errors;
        if (psErrors && psErrors.length > 0) {
            if (psErrors.length === 1) {
                if (options && options.addNativeError && psErrors[0].detailRecord) {
                    return strings.ErrorFormat.Single.Details.message.format(psErrors[0].errorType, psErrors[0].message, psErrors[0].detailRecord.nativeErrorCode);
                }
                return strings.ErrorFormat.Single.message.format(psErrors[0].errorType, psErrors[0].message);
            }
            var joinedMessage = '';
            for (var i = 0; i < psErrors.length; i++) {
                if (options && options.addNativeError && psErrors[i].detailRecord) {
                    joinedMessage += strings.ErrorFormat.Multiple.Details.message.format(i + 1, psErrors[i].errorType, psErrors[i].message, psErrors[i].detailRecord.nativeErrorCode);
                }
                else {
                    joinedMessage += strings.ErrorFormat.Multiple.message.format(i + 1, psErrors[i].errorType, psErrors[i].message);
                }
            }
            return joinedMessage;
        }
        if (response && response.exception) {
            return response.exception;
        }
        return null;
    };
    /**
     * The static definition of Web API URLs.
     */
    Net.apiRoot = '/api/{0}';
    Net.batch = '/batch';
    Net.streamSocket = '{0}/api/streams/socket/{1}';
    Net.downlevel = 'features/downlevelSupport';
    Net.downlevelInstall = Net.downlevel + '/install';
    Net.downlevelComponents = Net.downlevel + '/components';
    Net.cimClass = 'features/cim/namespaces/{0}/classes/{1}';
    Net.cimQuery = 'features/cim/query';
    Net.cimInvoke = '/methods/{0}/invoke';
    Net.powerShellApiInvokeCommand = 'features/powershellApi/invokeCommand';
    Net.powerShellApiSessions = 'features/powershellApi/pssessions/{0}';
    Net.powerShellApiExecuteCommand = Net.powerShellApiSessions + '/invokeCommand';
    Net.powerShellApiRetrieveOutput = Net.powerShellApiSessions + '?$expand=output';
    Net.powerShellApiCancelCommand = Net.powerShellApiSessions + '/cancel';
    Net.powerShellConsoleSessions = 'features/powershellConsole/pssessions/{0}';
    Net.powerShellConsoleExecuteCommand = Net.powerShellConsoleSessions + '/invokeCommand';
    Net.powerShellConsoleRetrieveOutput = Net.powerShellConsoleSessions + '?$expand=output';
    Net.stopCommand = Net.powerShellConsoleSessions + '/cancel';
    Net.tabCommand = Net.powerShellConsoleSessions + '/tab';
    Net.userProfile = '/profile';
    Net.fileTransferFormat = 'features/fileTransfer/files/{0}';
    Net.fileTransferDownloadPost = Net.fileTransferFormat + '/download';
    Net.fileTransferUpload = Net.fileTransferFormat + '/uploadlink';
    // {HttpMethod} {relativeNodeUrl}  HTTP/1.1
    Net.multiPartCallBodyUrl = '{0} {1} HTTP/1.1';
    return Net;
}());
export { Net };
//# sourceMappingURL=data:application/json;base64,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