import { Observable } from 'rxjs';
import { headerConstants } from './http-constants';
/**
 * The Node Connection class for creating requests and calling the Gateway's Node API
 */
var NodeConnection = /** @class */ (function () {
    /**
     * Initializes a new instance of the GatewayService class.
     *
     * @param gateway the gateway Connection
     * @param authorizationManager the authorization manager.
     */
    function NodeConnection(gateway, authorizationManager) {
        this.gateway = gateway;
        this.authorizationManager = authorizationManager;
    }
    /**
     * Makes a POST call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object.
     */
    NodeConnection.prototype.post = function (nodeName, relativeUrl, body, request) {
        relativeUrl = this.getNodeUrl(nodeName, relativeUrl);
        request = this.createNodeRequest(request || {}, nodeName);
        return this.gateway.post(relativeUrl, body, request);
    };
    /**
     * Makes a GET call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param request the node request object.
     */
    NodeConnection.prototype.get = function (nodeName, relativeUrl, request) {
        relativeUrl = this.getNodeUrl(nodeName, relativeUrl);
        request = this.createNodeRequest(request || {}, nodeName);
        return this.gateway.get(relativeUrl, request);
    };
    /**
     * Makes a PUT call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object.
     */
    NodeConnection.prototype.put = function (nodeName, relativeUrl, body, request) {
        relativeUrl = this.getNodeUrl(nodeName, relativeUrl);
        request = this.createNodeRequest(request || {}, nodeName);
        return this.gateway.put(relativeUrl, body, request);
    };
    /**
     * Makes a PATCH call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object.
     */
    NodeConnection.prototype.patch = function (nodeName, relativeUrl, body, request) {
        relativeUrl = this.getNodeUrl(nodeName, relativeUrl);
        request = this.createNodeRequest(request || {}, nodeName);
        return this.gateway.patch(relativeUrl, body, request);
    };
    /**
     * Makes a DELETE call to the gateway node api
     *
     * @param nodeName the name of the node to call the API for
     * @param relativeUrl the relative Url after "/api/nodes/<nodeName>"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object.
     */
    NodeConnection.prototype.delete = function (nodeName, relativeUrl, body, request) {
        relativeUrl = this.getNodeUrl(nodeName, relativeUrl);
        request = this.createNodeRequest(request || {}, nodeName);
        return this.gateway.delete(relativeUrl, body, request);
    };
    /**
     * Adds default parameters to a NodeRequest
     *
     * @param method the http method to use
     * @param relativeUrl the relative Url after "/api/"
     * @param body the body string JSON.stringfy'ed
     * @param request the node request object to extend.
     */
    NodeConnection.prototype.createNodeRequest = function (request, nodeName) {
        var _this = this;
        // if we did not specify no auth, and we are not using a custom token... 
        if (!request.noAuth && !request.authToken) {
            // ...then add node specific authorization handlers
            request.retryHandlers = (request.retryHandlers || []).concat([{
                    canHandle: function (code, error) { return _this.authorizationManager.canHandleAjaxFailure(code, error); },
                    handle: function (code, originalRequest, error) {
                        return _this.authorizationManager.handleAjaxFailure(code, originalRequest, error, nodeName);
                    }
                }]);
        }
        var oldBeforeCall = request.beforeCall;
        // Add before call handler to wait for any pending node authorization
        request.beforeCall = function (pendingRequest) {
            var observable = null;
            if (!request.authToken) {
                // if we dont have an authToken, then make sure we are not waiting on one.
                observable = _this.authorizationManager.authAwaiter.map(function () {
                    _this.authorizationManager.addAuthorizationRequestHeader(pendingRequest, nodeName);
                });
            }
            else {
                observable = Observable.of(_this.authorizationManager.addAuthorizationRequestHeader(pendingRequest, nodeName, request.authToken));
            }
            if (oldBeforeCall) {
                return oldBeforeCall(request).flatMap(function () { return observable; });
            }
            return observable;
        };
        request.headers = request.headers || {};
        if (request.logAudit === true || request.logAudit === false) {
            request.headers[headerConstants.LOG_AUDIT] = request.logAudit ? 'true' : 'false';
        }
        if (request.logTelemetry === true || request.logTelemetry === false) {
            request.headers[headerConstants.LOG_TELEMETRY] = request.logTelemetry ? 'true' : 'false';
        }
        return request;
    };
    /**
     * Creates a Node url
     *
     * @param nodeName the name of the node to make a call against
     * @param relativeUrl the relative Url after "/nodes/<nodeName>/"
     */
    NodeConnection.prototype.getNodeUrl = function (nodeName, relativeUrl) {
        // create node url from current url
        if (!relativeUrl.startsWith('/')) {
            relativeUrl = "/" + relativeUrl;
        }
        return "/nodes/" + nodeName + relativeUrl;
    };
    return NodeConnection;
}());
export { NodeConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9ub2RlLWNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUE2QixVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBcUNuRDs7R0FFRztBQUNIO0lBRUk7Ozs7O09BS0c7SUFDSCx3QkFBb0IsT0FBMEIsRUFBVSxvQkFBMEM7UUFBOUUsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQUksQ0FBQztJQUV2Rzs7Ozs7OztPQU9HO0lBQ0ksNkJBQUksR0FBWCxVQUFZLFFBQWdCLEVBQUUsV0FBbUIsRUFBRSxJQUFVLEVBQUUsT0FBcUI7UUFDaEYsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksNEJBQUcsR0FBVixVQUFXLFFBQWdCLEVBQUUsV0FBbUIsRUFBRSxPQUFxQjtRQUNuRSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckQsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSw0QkFB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LFVBQVUsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUN0QixLQUFJLENBQUMsb0JBQW9CLENBQUMsNkJBQTZCLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3ZHLENBQUM7WUFDTixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBTSxPQUFBLFVBQVUsRUFBVixDQUFVLENBQUMsQ0FBQztZQUM1RCxDQUFDO1lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUM7UUFFRixPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNyRixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzdGLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLG1DQUFVLEdBQWpCLFVBQWtCLFFBQWdCLEVBQUUsV0FBbUI7UUFDbkQsbUNBQW1DO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsV0FBVyxHQUFHLE1BQUksV0FBYSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxNQUFNLENBQUMsWUFBVSxRQUFRLEdBQUcsV0FBYSxDQUFDO0lBQzlDLENBQUM7SUFDTCxxQkFBQztBQUFELENBbEpBLEFBa0pDLElBQUEiLCJmaWxlIjoibm9kZS1jb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==