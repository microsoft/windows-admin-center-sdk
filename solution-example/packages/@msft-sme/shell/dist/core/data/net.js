/**
 * Net communication class.
 */
var Net = (function () {
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
     * Get error message from ajax result or any other error result.
     *
     * @param error the error context from Net.ajax.
     * @return string the error message.
     */
    Net.getErrorMessage = function (error) {
        var xhr = error && error.xhr;
        if (xhr && xhr.response) {
            var message = Net.parseErrorResponse(xhr.response);
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
    Net.parseErrorResponse = function (response) {
        var err = response && response.error;
        if (err && err.message) {
            return err.message;
        }
        var psErrors = response && response.errors;
        if (psErrors && psErrors.length > 0) {
            var strings = MsftSme.resourcesStrings().MsftSmeShell.Core;
            if (psErrors.length === 1) {
                return strings.ErrorFormat.Single.message.format(psErrors[0].errorType, psErrors[0].message);
            }
            var joinedMessage = '';
            for (var i = 0; i < psErrors.length; i++) {
                joinedMessage += strings.ErrorFormat.Multiple.message.format(i + 1, psErrors[i].errorType, psErrors[i].message);
            }
            return joinedMessage;
        }
        if (response && response.exception) {
            return response.exception;
        }
        return null;
    };
    return Net;
}());
export { Net };
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
//# sourceMappingURL=data:application/json;base64,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