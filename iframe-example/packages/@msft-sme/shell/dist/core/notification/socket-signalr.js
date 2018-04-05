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
var SocketSignalR = /** @class */ (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL3NvY2tldC1zaWduYWxyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sMkJBQTJCLENBQUM7QUFDbkMsT0FBTywrQkFBK0IsQ0FBQztBQUl2Qzs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGtCQVFYO0FBUkQsV0FBWSxrQkFBa0I7SUFDMUIsMkRBQVEsQ0FBQTtJQUNSLDJEQUFRLENBQUE7SUFDUixtRUFBWSxDQUFBO0lBQ1oscUVBQWEsQ0FBQTtJQUNiLDZEQUFTLENBQUE7SUFDVCxrRkFBb0IsQ0FBQTtJQUNwQixzRUFBYyxDQUFBO0FBQ2xCLENBQUMsRUFSVyxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBUTdCO0FBV0Q7O0dBRUc7QUFDSDtJQWNJOztPQUVHO0lBQ0gsdUJBQW9CLFVBQWtCLEVBQVUsYUFBcUIsRUFBVSxTQUFpQjtRQUFoRyxpQkFFQztRQUZtQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBZHhGLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsbUJBQWMsR0FBRyxVQUFDLE9BQWUsSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUM7UUFhdkUsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQVRELHNCQUFZLDhCQUFHO1FBSGY7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxLQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWUsQ0FBQztRQUNyRCxDQUFDOzs7T0FBQTtJQVNEOzs7OztPQUtHO0lBQ0ksaUNBQVMsR0FBaEIsVUFBaUIsSUFBWTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0csQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksbUNBQVcsR0FBbEIsVUFBbUIsSUFBWTtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNJLDZCQUFLLEdBQVo7UUFBQSxpQkFFQztRQURHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSw0QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSw4QkFBTSxHQUFiLFVBQWMsSUFBWTtRQUExQixpQkFVQztRQVYyQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLDJGQUEyRixDQUFDLENBQUMsQ0FBQztZQUMxSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQztnQkFBTSxPQUFBLENBQUEsS0FBQSxLQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsTUFBTSxZQUFDLElBQUksU0FBSyxJQUFJOztZQUEvQixDQUFnQyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFBLEtBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFDLE1BQU0sWUFBQyxJQUFJLFNBQUssSUFBSSxHQUFFOztJQUM1QyxDQUFDO0lBY0Q7Ozs7T0FJRztJQUNLLDRCQUFJLEdBQVosVUFBYSxTQUFpQjtRQUE5QixpQkFLQztRQUpHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxvQ0FBWSxHQUFwQixVQUFxQixLQUE4QjtRQUMvQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLGVBQWUsRUFBRyxlQUFlLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdHLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7SUFDTCxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQXBIQSxBQW9IQyxJQUFBIiwiZmlsZSI6InNvY2tldC1zaWduYWxyLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==