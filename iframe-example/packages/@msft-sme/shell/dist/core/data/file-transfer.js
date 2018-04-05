import { Observable } from 'rxjs/Observable';
import { EnvironmentModule } from '../manifest/environment-modules';
import { headerConstants } from './http-constants';
import { NativeQ } from './native-q';
import { Net } from './net';
var FileTransfer = /** @class */ (function () {
    /**
     * Initializes a new instance of the FileTransfer class.
     *
     * @param nodeConnection the NodeConnection class instance.
     * @param gatewayConnection the GatewayConnection class instance.
     * @param authorizationManager the AuthorizationManager class instance.
     */
    function FileTransfer(nodeConnection, gatewayConnection, authorizationManager) {
        this.nodeConnection = nodeConnection;
        this.gatewayConnection = gatewayConnection;
        this.authorizationManager = authorizationManager;
        this.moduleName = null;
    }
    /**
     * Downloads a blob of data
     *
     * @param blob the blob of data to download
     * @param fileName the name of the file for the user to download.
     */
    FileTransfer.downloadBlob = function (blob, fileName) {
        var useAnchorTagForDownload = true;
        if (window.navigator.msSaveOrOpenBlob) {
            // This is for IE and Edge < 16
            // for those cases the download anchor tag doesn't generate the right name so we use the MS download system instead
            // "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393"
            var ua = navigator.userAgent;
            var edgeIndex = ua.indexOf('Edge');
            if (edgeIndex > 0) {
                var dotIndex = ua.indexOf('.', edgeIndex);
                var versionNumber = 0;
                if (dotIndex > 0) {
                    var versionString = ua.substring(edgeIndex + 'Edge'.length + 1, dotIndex);
                    versionNumber = Number(versionString);
                }
                useAnchorTagForDownload = versionNumber > 15;
            }
            else {
                useAnchorTagForDownload = false;
            }
        }
        if (useAnchorTagForDownload) {
            var downloadLink = document.createElement('a');
            downloadLink.style.display = 'none';
            var url = URL.createObjectURL(blob);
            downloadLink.setAttribute('href', url);
            downloadLink.setAttribute('download', fileName);
            downloadLink.click();
            downloadLink.remove();
        }
        else {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        }
    };
    /**
     * The GET call to file transfer endpoint and manual download of stream
     *
     * @param nodeName the node to transfer the file from.
     * @param sourcePath the path of the remote file to transfer.
     * @param targetName the desired name for the downloaded file.
     * @param fileOptions the file options for the action.
     * @return Observable<Blob> the observable Blob object.
     */
    FileTransfer.prototype.transferFile = function (nodeName, sourcePath, targetName, fileOptions) {
        var relativeUrl = Net.fileTransferFormat.format(Net.utf8Base64UrlEncode(sourcePath));
        var headers = {
            Accept: 'application/octet-stream'
        };
        var request = { headers: headers, responseType: 'blob' };
        if (fileOptions) {
            request.logAudit = fileOptions.logAudit;
            request.logTelemetry = fileOptions.logTelemetry;
        }
        return this.nodeConnection.get(nodeName, relativeUrl, request).map(function (responseBlob) {
            FileTransfer.downloadBlob(responseBlob, targetName);
            return responseBlob;
        });
    };
    /**
     * Upload a file from fileObject.
     *
     * @param nodeName the node to upload the file to.
     * @param path the file path to store on the target node.
     * @param fileObject the file object created on the UI.
     * @param fileOptions the file options for the action.
     * @return Observable<any> the observable object.
     */
    FileTransfer.prototype.uploadFile = function (nodeName, path, fileObject, fileOptions) {
        var deferred = NativeQ.defer();
        var relativeUrl = Net.fileTransferFormat.format(Net.utf8Base64UrlEncode(path));
        var formData = new FormData();
        formData.append('file-0', fileObject);
        var request = new XMLHttpRequest();
        var url = Net.gatewayNodeApi(this.gatewayConnection.gatewayUrl, nodeName, relativeUrl);
        var handler = function () {
            if (request.readyState === 4 /* complete */) {
                if (request.status === 200) {
                    deferred.resolve(request.responseText);
                }
                else {
                    deferred.reject(request.response);
                }
            }
        };
        var tokenValue;
        var ajaxRequest = { headers: {} };
        this.authorizationManager.addAuthorizationRequestHeader(ajaxRequest, nodeName);
        request.open('PUT', url);
        tokenValue = ajaxRequest.headers[headerConstants.EMT_AUTHENTICATION];
        if (tokenValue) {
            request.setRequestHeader(headerConstants.EMT_AUTHENTICATION, tokenValue);
        }
        tokenValue = ajaxRequest.headers[headerConstants.SME_AUTHORIZATION];
        if (tokenValue) {
            request.setRequestHeader(headerConstants.SME_AUTHORIZATION, tokenValue);
        }
        tokenValue = ajaxRequest.headers[headerConstants.USE_LAPS];
        if (tokenValue) {
            request.setRequestHeader(headerConstants.USE_LAPS, tokenValue);
            // If ajaxRequest.headers[LAPS_LOCALADMINNAME] will always have default of 'administrator',
            // so no need to check if it exists and not null
            request.setRequestHeader(headerConstants.LAPS_LOCALADMINNAME, ajaxRequest.headers[headerConstants.LAPS_LOCALADMINNAME]);
        }
        if (fileOptions) {
            if (fileOptions.logAudit === true || fileOptions.logAudit === false) {
                request.setRequestHeader(headerConstants.LOG_AUDIT, fileOptions.logAudit ? 'true' : 'false');
            }
            if (fileOptions.logTelemetry === true || fileOptions.logTelemetry === false) {
                request.setRequestHeader(headerConstants.LOG_TELEMETRY, fileOptions.logTelemetry ? 'true' : 'false');
            }
        }
        request.setRequestHeader(headerConstants.MODULE_NAME, this.nameOfModule);
        request.onreadystatechange = handler;
        request.withCredentials = true;
        request.send(formData);
        return Observable.fromPromise(deferred.promise);
    };
    Object.defineProperty(FileTransfer.prototype, "nameOfModule", {
        /**
         * Gets the name of current shell or module.
         */
        get: function () {
            if (!this.moduleName) {
                this.moduleName = EnvironmentModule.getModuleName();
            }
            return this.moduleName;
        },
        enumerable: true,
        configurable: true
    });
    return FileTransfer;
}());
export { FileTransfer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9maWxlLXRyYW5zZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUdwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBZTVCO0lBK0NJOzs7Ozs7T0FNRztJQUNILHNCQUNZLGNBQThCLEVBQzlCLGlCQUFvQyxFQUNwQyxvQkFBMEM7UUFGMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQXZEOUMsZUFBVSxHQUFHLElBQUksQ0FBQztJQXVEZ0MsQ0FBQztJQXJEM0Q7Ozs7O09BS0c7SUFDVyx5QkFBWSxHQUExQixVQUEyQixJQUFVLEVBQUUsUUFBZ0I7UUFDbkQsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDcEMsK0JBQStCO1lBQy9CLG1IQUFtSDtZQUNuSCw2SEFBNkg7WUFDN0gsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUM3QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDMUMsSUFB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QUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXpFLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUM7UUFDckMsT0FBTyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUtELHNCQUFZLHNDQUFZO1FBSHhCOztXQUVHO2FBQ0g7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3hELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0F6S0EsQUF5S0MsSUFBQSIsImZpbGUiOiJmaWxlLXRyYW5zZmVyLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==