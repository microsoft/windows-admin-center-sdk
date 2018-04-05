import 'jquery/dist/jquery.min.js';
import 'signalr/jquery.signalR.min.js';
/**
 * Socket message flags. These can be combined.
 */
export var SocketMessageFlags;
(function (SocketMessageFlags) {
    SocketMessageFlags[SocketMessageFlags["None"] = 0] = "None";
    SocketMessageFlags[SocketMessageFlags["Data"] = 1] = "Data";
    SocketMessageFlags[SocketMessageFlags["Progress"] = 2] = "Progress";
    SocketMessageFlags[SocketMessageFlags["Completed"] = 4] = "Completed";
    SocketMessageFlags[SocketMessageFlags["Error"] = 8] = "Error";
    SocketMessageFlags[SocketMessageFlags["ConnectionError"] = 16] = "ConnectionError";
    SocketMessageFlags[SocketMessageFlags["Exception"] = 32] = "Exception";
})(SocketMessageFlags || (SocketMessageFlags = {}));
/**
 * SignalR based socket class.
 */
var SocketSignalR = (function () {
    /**
     * Instantiates a new instance of the SocketSignalR class.
     */
    function SocketSignalR(gatewayUrl, connectionUrl, proxyName) {
        var _this = this;
        this.gatewayUrl = gatewayUrl;
        this.connectionUrl = connectionUrl;
        this.proxyName = proxyName;
        this.started = false;
        this.processHandler = function (message) { return _this.processMessage(message); };
        gatewayUrl = gatewayUrl ? gatewayUrl : '';
    }
    Object.defineProperty(SocketSignalR.prototype, "url", {
        /**
         * Gets signalR connection URL.
         */
        get: function () {
            return "" + this.gatewayUrl + this.connectionUrl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribe to the proxy with method name and handler.
     *
     * @param name the name of subscription for a method.
     * @return SignalR.Hub.Proxy the proxy.
     */
    SocketSignalR.prototype.subscribe = function (name) {
        this.init(this.proxyName);
        if (this.lastError) {
            // send last error;
            this.clientHandler({ type: SocketMessageFlags.Error, connectionError: this.lastError, message: null });
        }
        return this.proxy.on(name, this.processHandler);
    };
    /**
     * Unsubscribe to the subscribed method call.
     *
     * @param name the name of subscription for a method.
     */
    SocketSignalR.prototype.unsubscribe = function (name) {
        this.proxy.off(name, this.processHandler);
    };
    /**
     * Start request connection.
     */
    SocketSignalR.prototype.start = function () {
        var _this = this;
        return this.connection.start().then(function () { return _this.started = true; });
    };
    /**
     * Stop request connection.
     */
    SocketSignalR.prototype.stop = function () {
        this.started = false;
        return this.connection.stop(true);
    };
    /**
     * Invoke a method with parameters.
     *
     * @param name the method name to execute.
     * @param args the parameters to pass.
     * @return Promise the promise object.
     */
    SocketSignalR.prototype.invoke = function (name) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.started) {
            throw new Error('request socket has not been started.');
        }
        if (this.connection.state === 4 /* SignalR.ConnectionState.Disconnected: @types/signalr doesn't take conversion properly */) {
            return this.start().then(function () {
                return (_a = _this.proxy).invoke.apply(_a, [name].concat(args));
                var _a;
            });
        }
        return (_a = this.proxy).invoke.apply(_a, [name].concat(args));
        var _a;
    };
    /**
     * Initiate the connection to gateway and create a proxy.
     *
     * @param proxyName the proxy name.
     */
    SocketSignalR.prototype.init = function (proxyName) {
        var _this = this;
        this.connection = $.hubConnection(this.url);
        this.connection.error(function (error) { return _this.errorMessage(error); });
        this.proxy = this.connection.createHubProxy(proxyName);
        this.proxy.connection.error(function (error) { return _this.errorMessage(error); });
    };
    /**
     * Error message from signalr connection.
     *
     * @param error the error produced on the connection.
     */
    SocketSignalR.prototype.errorMessage = function (error) {
        if (this.clientHandler) {
            this.clientHandler({ type: SocketMessageFlags.ConnectionError, connectionError: error, message: null });
        }
        else {
            this.lastError = error;
        }
    };
    return SocketSignalR;
}());
export { SocketSignalR };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL3NvY2tldC1zaWduYWxyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sMkJBQTJCLENBQUM7QUFDbkMsT0FBTywrQkFBK0IsQ0FBQztBQUl2Qzs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGtCQVFYO0FBUkQsV0FBWSxrQkFBa0I7SUFDMUIsMkRBQVEsQ0FBQTtJQUNSLDJEQUFRLENBQUE7SUFDUixtRUFBWSxDQUFBO0lBQ1oscUVBQWEsQ0FBQTtJQUNiLDZEQUFTLENBQUE7SUFDVCxrRkFBb0IsQ0FBQTtJQUNwQixzRUFBYyxDQUFBO0FBQ2xCLENBQUMsRUFSVyxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBUTdCO0FBV0Q7O0dBRUc7QUFDSDtJQWNJOztPQUVHO0lBQ0gsdUJBQW9CLFVBQWtCLEVBQVUsYUFBcUIsRUFBVSxTQUFpQjtRQUFoRyxpQkFFQztRQUZtQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBZHhGLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsbUJBQWMsR0FBRyxVQUFDLE9BQVksSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUM7UUFhcEUsVUFBVSxHQUFHLFVBQVUsR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFURCxzQkFBWSw4QkFBRztRQUhmOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsS0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFlLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7SUFTRDs7Ozs7T0FLRztJQUNJLGlDQUFTLEdBQWhCLFVBQWlCLElBQVk7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsbUJBQW1CO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNHLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG1DQUFXLEdBQWxCLFVBQW1CLElBQVk7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBSyxHQUFaO1FBQUEsaUJBRUM7UUFERyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksOEJBQU0sR0FBYixVQUFjLElBQVk7UUFBMUIsaUJBVUM7UUFWMkIsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQywyRkFBMkYsQ0FBQyxDQUFDLENBQUM7WUFDMUgsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQU0sT0FBQSxDQUFBLEtBQUEsS0FBSSxDQUFDLEtBQUssQ0FBQSxDQUFDLE1BQU0sWUFBQyxJQUFJLFNBQUssSUFBSTs7WUFBL0IsQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQSxLQUFBLElBQUksQ0FBQyxLQUFLLENBQUEsQ0FBQyxNQUFNLFlBQUMsSUFBSSxTQUFLLElBQUksR0FBRTs7SUFDNUMsQ0FBQztJQWNEOzs7O09BSUc7SUFDSyw0QkFBSSxHQUFaLFVBQWEsU0FBaUI7UUFBOUIsaUJBS0M7UUFKRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssb0NBQVksR0FBcEIsVUFBcUIsS0FBOEI7UUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxlQUFlLEVBQUcsZUFBZSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM3RyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FwSEEsQUFvSEMsSUFBQSIsImZpbGUiOiJzb2NrZXQtc2lnbmFsci5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=