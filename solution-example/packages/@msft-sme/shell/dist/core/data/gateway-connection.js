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
import { Observable } from 'rxjs';
import { EnvironmentModule } from '../manifest/environment-modules';
import { RpcServiceForwarder } from '../rpc/rpc-forwarder';
import { Http } from './http';
import { headerConstants } from './http-constants';
import { Net } from './net';
/**
 * The Gateway Connection class for creating requests and calling the Gateway's REST API
 */
var GatewayConnection = (function (_super) {
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
        _this.moduleName = null;
        /**
         * The gateway to connect to. By default this is the same as the window origin.
         */
        _this.gatewayUrl = window.location.origin;
        return _this;
    }
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
        request.headers[headerConstants.MODULE_NAME] = this.nameOfModule;
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
        if (!this.gatewayUrl) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.GatewayNameRequired.message;
            throw new Error(message);
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
        return Observable.of({
            gatewayName: this.gatewayUrl
        });
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
    Object.defineProperty(GatewayConnection.prototype, "nameOfModule", {
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
    return GatewayConnection;
}(RpcServiceForwarder));
export { GatewayConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9nYXRld2F5LWNvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBNkIsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRXpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSXBFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxJQUFJLEVBQThDLE1BQU0sUUFBUSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBcUM1Qjs7R0FFRztBQUNIO0lBQXVDLHFDQUFtQjtJQVN0RDs7Ozs7T0FLRztJQUNILDJCQUFtQixJQUFVLEVBQUUsR0FBUTtRQUF2QyxZQUNJLGtCQUFNLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxTQUNuQztRQUZrQixVQUFJLEdBQUosSUFBSSxDQUFNO1FBYnJCLGdCQUFVLEdBQUcsSUFBSSxDQUFDO1FBRTFCOztXQUVHO1FBQ0ksZ0JBQVUsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzs7SUFVbkQsQ0FBQztJQUtELHNCQUFXLDBDQUFXO1FBSHRCOztXQUVHO2FBQ0g7WUFDSSxnSEFBZ0g7WUFDaEgsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNJLGdDQUFJLEdBQVgsVUFBWSxXQUFtQixFQUFFLElBQVUsRUFBRSxPQUF3QjtRQUNqRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsQyxDQUFD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SUFFRDs7OztPQUlHO0lBQ08seUNBQWEsR0FBdkI7UUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLDRDQUFnQixHQUExQixVQUEyQixJQUF5QixFQUFFLElBQVksRUFBRSxJQUFXO1FBQzNFLGlFQUFpRTtRQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sMkNBQWUsR0FBekIsVUFBMEIsSUFBeUIsRUFBRSxJQUFZLEVBQUUsS0FBVTtRQUN6RSxrRUFBa0U7UUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUtELHNCQUFZLDJDQUFZO1FBSHhCOztXQUVHO2FBQ0g7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3hELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUNMLHdCQUFDO0FBQUQsQ0F6TkEsQUF5TkMsQ0F6TnNDLG1CQUFtQixHQXlOekQiLCJmaWxlIjoiZ2F0ZXdheS1jb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==