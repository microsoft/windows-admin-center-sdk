var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Observable, ReplaySubject } from 'rxjs';
import { EnvironmentModule } from '../manifest/environment-modules';
import { RpcServiceForwarder } from '../rpc/rpc-forwarder';
import { Http } from './http';
import { headerConstants } from './http-constants';
import { Net } from './net';
/**
 * The Gateway Connection class for creating requests and calling the Gateway's REST API
 */
var GatewayConnection = /** @class */ (function (_super) {
    __extends(GatewayConnection, _super);
    /**
     * Initializes a new instance of the Gateway class.
     *
     * @param http the Http object.
     * @param rpc the Rpc class.
     */
    function GatewayConnection(http, rpc) {
        var _this = _super.call(this, 'gateway-connection', rpc) || this;
        _this.http = http;
        /**
         * The replay subject for gateway url to settle.
         */
        _this.gatewayUrlAwaiter = new ReplaySubject(1);
        return _this;
    }
    Object.defineProperty(GatewayConnection.prototype, "gatewayUrl", {
        /**
         * Gets the gateway URL to connect to.
         */
        get: function () {
            return this.internalGatewayUrl;
        },
        /**
         * Sets the gateway URL to connect to.
         */
        set: function (value) {
            this.internalGatewayUrl = value;
            this.gatewayUrlAwaiter.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GatewayConnection.prototype, "gatewayInfo", {
        /**
         * Gets the gateway information.
         */
        get: function () {
            if (!this.internalGatewayUrl) {
                throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.GatewayUrlNotConfigured.message);
            }
            // RegEx: ('http' or 'https') '://' (('<gatewayName1>'):('<port>') or ('<gatewayName2>'))
            // 0: url
            // 1: https or http
            // 2: <gatewayName1>:<port> or <gatewayName2>
            // 3: <gatewayName1> or undefined
            // 4: <port> or undefined
            // 5: <gatewayName2>
            var url = MsftSme.trimEnd(this.internalGatewayUrl.toLowerCase(), '/');
            var match = url.match(/(http|https):\/\/((.+):(\d+)|(.+))/);
            if (!match) {
                throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.GatewayUrlMalformed.message);
            }
            var secure = (match[1] === 'https');
            var name = match[3] || match[2];
            var port = parseInt(match[4], 10) || (secure ? 443 : 80);
            return { name: name, secure: secure, port: port };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GatewayConnection.prototype, "gatewayName", {
        /**
         * Gets the gateway node name to make a CIM/PowerShell query to the gateway node.
         */
        get: function () {
            // localhost will be used to locally query gateway node. if this causes any access problem, need to be replaced.
            return 'localhost';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Makes a POST call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object.
     */
    GatewayConnection.prototype.post = function (relativeUrl, body, request) {
        var postRequest = this.createRequest(Http.methodPost, relativeUrl, body, request);
        return this.call(postRequest);
    };
    /**
     * Makes a GET call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param request the gateway request object.
     */
    GatewayConnection.prototype.get = function (relativeUrl, request) {
        var getRequest = this.createRequest(Http.methodGet, relativeUrl, null, request);
        return this.call(getRequest);
    };
    /**
     * Makes a PUT call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object.
     */
    GatewayConnection.prototype.put = function (relativeUrl, body, request) {
        var putRequest = this.createRequest(Http.methodPut, relativeUrl, body, request);
        return this.call(putRequest);
    };
    /**
     * Makes a PATCH call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object.
     */
    GatewayConnection.prototype.patch = function (relativeUrl, body, request) {
        var patchRequest = this.createRequest(Http.methodPatch, relativeUrl, body, request);
        return this.call(patchRequest);
    };
    /**
     * Makes a DELETE call to the gateway
     *
     * @param relativeUrl the relative Url after "/api"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object.
     */
    GatewayConnection.prototype.delete = function (relativeUrl, body, request) {
        var deleteRequest = this.createRequest(Http.methodDelete, relativeUrl, body, request);
        return this.call(deleteRequest);
    };
    /**
     * Creates a GatewayRequest.
     *
     * @param method the http method to use
     * @param relativeUrl the relative Url after "/api/"
     * @param body the body string JSON.stringfy'ed
     * @param request the gateway request object to extend.
     */
    GatewayConnection.prototype.createRequest = function (method, relativeUrl, body, request) {
        var defaultMaxRetry = 3;
        // if request is undefined, default to empty object
        request = request || {};
        request.headers = request.headers || {};
        request.headers[headerConstants.MODULE_NAME] = EnvironmentModule.getModuleName();
        request.headers[headerConstants.MODULE_VERSION] = EnvironmentModule.getModuleVersion();
        return Object.assign(request, {
            method: method,
            url: relativeUrl,
            // default to the passed in body, the request body, or an empty string
            body: body || request.body || '',
            // default to the request headers, or an empty object
            headers: request.headers,
            // for the next 2 props, default to true unless explicitly set to false
            withCredentials: request.withCredentials === false ? false : true,
            crossDomain: request.crossDomain === false ? false : true,
            // use default retry options if none are provided
            retryHandlers: request.retryHandlers || [],
            maxRetryCount: request.maxRetryCount === 0 ? 0 : request.maxRetryCount || defaultMaxRetry
        });
    };
    /**
     * Make a request.
     *
     * @param request the request to execute against the gateway.
     * @return Observable<any> the query result observable.
     */
    GatewayConnection.prototype.call = function (request) {
        var _this = this;
        if (!this.gatewayUrl) {
            return this.gatewayUrlAwaiter.flatMap(function () { return _this.call(request); });
        }
        // create gateway url from current url
        request.url = Net.gatewayApi(this.gatewayUrl, request.url);
        // create retry options from request
        var retryOptions = {
            handlers: request.retryHandlers,
            maxRetry: request.maxRetryCount
        };
        // create observable for our request
        var requestObservable = this.http.request(request, retryOptions).map(function (response) { return response ? response.response : {}; });
        if (request.beforeCall) {
            return request.beforeCall(request).flatMap(function () { return requestObservable; });
        }
        return requestObservable;
    };
    /**
     * Called on a child service instance when onForwardInit returns from the parent
     * @param data The response from the forwardInit call
     */
    GatewayConnection.prototype.onForwardInitResponse = function (data) {
        if (data.error) {
            // if there is an error, we cannot continue, so throw its
            throw data.error;
        }
        this.gatewayUrl = data.result.gatewayName;
    };
    /**
     * Called when a new instance of the service in another window is initialized and needs to synchronize with its parent
     * @param from The RpcRelationshipType that this request is from
     * @returns an observable for the all the values needed to initialize the service
     */
    GatewayConnection.prototype.onForwardInit = function () {
        if (this.gatewayUrl) {
            return Observable.of({ gatewayName: this.gatewayUrl });
        }
        else {
            // if gateway value hasnt been set yet, then wait for it.
            return this.gatewayUrlAwaiter.map(function (url) {
                return { gatewayName: url };
            });
        }
    };
    /**
     * Called when the forwarded services counterpart wants to get data from the parent
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the method to forward to
     * @param args The arguments of the method
     * @returns an observable for the result of the method call
     */
    GatewayConnection.prototype.onForwardExecute = function (from, name, args) {
        // gatewayConnection does not allow any method calls at this time
        return this.nameNotFound(name);
    };
    /**
     * Called when the forwarded services counterpart sends a notify message
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the property to change
     * @param value The new value of the property
     * @returns an observable that completes when the property has been changed.
     */
    GatewayConnection.prototype.onForwardNotify = function (from, name, value) {
        // gatewayConnection does not allow any notifications at this time
        return this.nameNotFound(name);
    };
    return GatewayConnection;
}(RpcServiceForwarder));
export { GatewayConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9nYXRld2F5LWNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBNkIsVUFBVSxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUV4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUlwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsSUFBSSxFQUE4QyxNQUFNLFFBQVEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQTBENUI7O0dBRUc7QUFDSDtJQUF1QyxxQ0FBbUI7SUFxRHREOzs7OztPQUtHO0lBQ0gsMkJBQW1CLElBQVUsRUFBRSxHQUFRO1FBQXZDLFlBQ0ksa0JBQU0sb0JBQW9CLEVBQUUsR0FBRyxDQUFDLFNBQ25DO1FBRmtCLFVBQUksR0FBSixJQUFJLENBQU07UUFyRDdCOztXQUVHO1FBQ0ssdUJBQWlCLEdBQUcsSUFBSSxhQUFhLENBQVMsQ0FBQyxDQUFDLENBQUM7O0lBb0R6RCxDQUFDO0lBL0NELHNCQUFXLHlDQUFVO1FBSHJCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ25DLENBQUM7UUFFRDs7V0FFRzthQUNILFVBQXNCLEtBQWE7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7OztPQVJBO0lBYUQsc0JBQVcsMENBQVc7UUFIdEI7O1dBRUc7YUFDSDtZQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxJ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Q0FBaUMsQ0FBQyxDQUFDO1FBRXBJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBRUQsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDTyxpREFBcUIsR0FBL0IsVUFBZ0MsSUFBdUQ7UUFDbkYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYix5REFBeUQ7WUFDekQsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7OztPQUlHO0lBQ08seUNBQWEsR0FBdkI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSix5REFBeUQ7WUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO2dCQUNqQyxNQUFNLENBQUMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLDRDQUFnQixHQUExQixVQUEyQixJQUF5QixFQUFFLElBQVksRUFBRSxJQUFXO1FBQzNFLGlFQUFpRTtRQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sMkNBQWUsR0FBekIsVUFBMEIsSUFBeUIsRUFBRSxJQUFZLEVBQUUsS0FBVTtRQUN6RSxrRUFBa0U7UUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0E5UEEsQUE4UEMsQ0E5UHNDLG1CQUFtQixHQThQekQiLCJmaWxlIjoiZ2F0ZXdheS1jb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==