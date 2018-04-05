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
import { Observable, Subject } from 'rxjs';
import { headerConstants, HttpStatusCode } from '../data/http-constants';
import { Net } from '../data/net';
import { RpcForwarder, RpcServiceForwarder } from '../rpc/rpc-forwarder';
/**
 * Authorization Manager class. Handles SME authentication for service requests.
 */
var AuthorizationManager = /** @class */ (function (_super) {
    __extends(AuthorizationManager, _super);
    /**
     * Initializes a new instance of the Authorization Manager class
     * @param authorize An AuthorizationHandler with which to retrieve user credentials
     * @param rpc The rpc to forward auth requests to a parent window
     */
    function AuthorizationManager(authorize, rpc) {
        var _this = _super.call(this, 'authorization-manager', rpc) || this;
        _this.authorize = authorize;
        /**
         * Create a map of nodeNames to token objects to hold node specific tokens.
         */
        _this.nodeTokens = {};
        return _this;
    }
    Object.defineProperty(AuthorizationManager.prototype, "manageAsToken", {
        /**
         * Gets the current manage as token
         */
        get: function () {
            return this.token;
        },
        /**
         * Sets the current manage as token
         * If running with an Rpc child, notify of the change
         */
        set: function (token) {
            this.token = token;
            this.forwardNotify(1 /* Child */, 'manageAsToken', token);
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(AuthorizationManager.prototype, "authAwaiter", {
        /**
         * Gets an observable the emits when the authorization token is ready
         */
        get: function () {
            if (this.tokenAwaiter && !this.tokenAwaiter.closed) {
                // return the global token
                return this.tokenAwaiter;
            }
            // return the global token
            return Observable.of({ appliesTo: null, token: this.manageAsToken });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * defines the conditions under which the AuthorizationManager can handle an ajax error
     */
    AuthorizationManager.prototype.canHandleAjaxFailure = function (code, error) {
        // we can handle ajax errors if we have a getter defined, and the code is Unauthorized (403) or we get a cim authorization failure
        var isAuthError = Net.isEncapsulatedAuthorizationError(error);
        return this.authorize && (isAuthError || code === HttpStatusCode.Unauthorized);
    };
    /**
     * When canHandle returns true for an ajax error, this method can be called to handle that error.
     */
    AuthorizationManager.prototype.handleAjaxFailure = function (code, request, error, nodeName) {
        var _this = this;
        return this.getNewToken(nodeName).flatMap(function (response) {
            // There may be multiple nodes requesting authentication, but we can only ask the user for one.
            // check if the result if for our node, otherwise try again.
            // It looks for inside of array only for first name.
            var names = response.appliesTo;
            var isTokenForNode = !names || names === nodeName || (Array.isArray(names) && names[0] === nodeName);
            if (isTokenForNode) {
                // this token applies to our node, so continue
                _this.addAuthorizationRequestHeader(request, nodeName);
                return Observable.of(request);
            }
            else {
                // this token did not apply to our node. Ask again.
                return _this.handleAjaxFailure(code, request, error, nodeName);
            }
        });
    };
    AuthorizationManager.prototype.getNewToken = function (nodeNames) {
        var _this = this;
        // if we are already awaiting a token, then hook into the current request and try using that token
        if (this.tokenAwaiter && !this.tokenAwaiter.closed) {
            return this.tokenAwaiter;
        }
        // ensure input is an array only if not null.
        if (nodeNames && !Array.isArray(nodeNames)) {
            nodeNames = [nodeNames];
        }
        // define a new subject for multiple requests to wait on
        this.tokenAwaiter = new Subject();
        // try to forward execute getNewToken from our parent
        var parentExecuter = this.forwardExecute(0 /* Parent */, 'getNewToken', [nodeNames]);
        if (parentExecuter) {
            return this.tokenAwaiter;
        }
        // since we could not forward the request We must ask for the auth token ourselves
        this.authorize(nodeNames)
            .flatMap(function (credentials) {
            if (credentials.applyToAllNodes) {
                _this.nodeTokens = {};
                var forward = _this.forwardExecute(1 /* Child */, 'clearNodeTokens', []);
                if (forward) {
                    return forward.map(function () { return credentials; });
                }
            }
            return Observable.of(credentials);
        })
            .map(function (credentials) {
            var appliesTo = credentials.applyToAllNodes ? null : nodeNames || null;
            var token = _this.createToken({
                username: credentials.username,
                password: credentials.password,
                useLaps: credentials.useLaps,
                lapsLocalAdminName: credentials.lapsLocalAdminName
            });
            return {
                token: token,
                appliesTo: appliesTo
            };
        })
            .take(1)
            .subscribe(function (result) {
            _this.completeTokenAwaiter(result);
            _this.forwardNotify(1 /* Child */, 'setNodeToken', result);
        }, function (error) {
            _this.completeTokenAwaiter(null, error);
            _this.forwardNotify(1 /* Child */, 'setNodeTokenError', RpcForwarder.ensureSerializable(error));
        });
        return this.tokenAwaiter;
    };
    /**
     * Creates a token from the given options that may be used for node authentication
     * @param options The token creation options
     */
    AuthorizationManager.prototype.createToken = function (options) {
        // ensure a valid value for laps local admin name
        if (MsftSme.isNullOrWhiteSpace(options.lapsLocalAdminName)) {
            options.lapsLocalAdminName = AuthorizationManager.defaultLapsLocalAdminName;
        }
        // ensure username has a valid value
        if (MsftSme.isNullOrWhiteSpace(options.username)) {
            options.username = null;
        }
        if (options.useLaps || !options.username) {
            return {
                value: null,
                username: null,
                useLaps: options.useLaps,
                lapsLocalAdminName: options.lapsLocalAdminName
            };
        }
        // ensure password has a valid value
        if (MsftSme.isNullOrWhiteSpace(options.password)) {
            options.password = null;
        }
        var username;
        if (options.username.indexOf('@') >= 0) {
            username = options.username.split('@').reverse();
        }
        else {
            username = options.username.split('\\');
        }
        var token = Net.createEncodedAuthenticationHeader(username, options.password);
        return {
            value: token,
            username: options.username,
            useLaps: false,
            lapsLocalAdminName: null
        };
    };
    /**
     * Completes the token awaiter
     */
    AuthorizationManager.prototype.completeTokenAwaiter = function (result, error) {
        var _this = this;
        if (error) {
            if (this.tokenAwaiter) {
                var awaiter = this.tokenAwaiter;
                this.tokenAwaiter = null;
                awaiter.error(error);
            }
        }
        else {
            if (!result.appliesTo) {
                this.manageAsToken = result.token;
            }
            else if (Array.isArray(result.appliesTo)) {
                result.appliesTo.forEach(function (nodeName) {
                    _this.nodeTokens[nodeName.toLocaleLowerCase()] = result.token;
                });
            }
            else {
                this.nodeTokens[result.appliesTo.toLocaleLowerCase()] = result.token;
            }
            if (this.tokenAwaiter) {
                var awaiter = this.tokenAwaiter;
                this.tokenAwaiter = null;
                awaiter.next(result);
                awaiter.complete();
            }
        }
    };
    /**
     * Get the saved Auth token for a node.
     *
     * @param nodeName The nodeName to get token for.
     */
    AuthorizationManager.prototype.getSavedNodeToken = function (nodeName) {
        if (nodeName && this.nodeTokens[nodeName.toLocaleLowerCase()]) {
            return this.nodeTokens[nodeName.toLocaleLowerCase()];
        }
        return this.manageAsToken;
    };
    /**
     * Adds a authorization header to a request given a node with a manageAsToken
     * @param request The request to add headers to
     * @param nodeName optional. The node to add headers for if not provided, the global token will be used
     * @param token optional. The token to use for the headers. if provided, the nodeName is not used.
     */
    AuthorizationManager.prototype.addAuthorizationRequestHeader = function (request, nodeName, token) {
        if (!token) {
            token = this.manageAsToken;
            if (nodeName && this.nodeTokens[nodeName.toLocaleLowerCase()]) {
                token = this.nodeTokens[nodeName.toLocaleLowerCase()];
            }
        }
        if (token) {
            if (token.value) {
                // If username and password are explicitly provided, we only add the Authorization header. 
                request.headers[headerConstants.SME_AUTHORIZATION] = token.value;
                request.headers[headerConstants.EMT_AUTHENTICATION] = token.value;
            }
            else {
                // If not, we add useLaps header.
                request.headers[headerConstants.USE_LAPS] = token.useLaps;
                request.headers[headerConstants.LAPS_LOCALADMINNAME] = token.lapsLocalAdminName;
            }
        }
    };
    /**
     * Create token headers.
     *
     * @param nodeName the node name.
     * @param token the token to override current setting (optional).
     */
    AuthorizationManager.prototype.createTokenHeaders = function (nodeName, token) {
        var headers = {};
        token = token || this.getSavedNodeToken(nodeName);
        if (token) {
            if (token.value) {
                // If username and password are explicitly provided, we only add the Authorization header. 
                headers[headerConstants.SME_AUTHORIZATION] = token.value;
            }
            else {
                // If not, we add useLaps header.
                headers[headerConstants.USE_LAPS] = token.useLaps ? 'true' : 'false';
                headers[headerConstants.LAPS_LOCALADMINNAME] = token.lapsLocalAdminName;
            }
        }
        return headers;
    };
    /**
     * Adds a authorization header to a request given a node with a manageAsToken
     */
    AuthorizationManager.prototype.addAuthorizationTokensToMultiPartBody = function (body, nodeName, token) {
        if (!token) {
            token = this.manageAsToken;
            if (nodeName && this.nodeTokens[nodeName.toLocaleLowerCase()]) {
                token = this.nodeTokens[nodeName.toLocaleLowerCase()];
            }
        }
        if (token) {
            if (token.value) {
                // If username and password are explicitly provided, we only add the Authorization header. 
                body.push(headerConstants.SME_AUTHORIZATION + ': ' + token.value);
                body.push(headerConstants.EMT_AUTHENTICATION + ': ' + token.value);
            }
            else {
                // If not, we add useLaps header.
                body.push(headerConstants.USE_LAPS + ': ' + token.useLaps);
                body.push(headerConstants.LAPS_LOCALADMINNAME + ': ' + token.lapsLocalAdminName);
            }
        }
    };
    /**
     * Called on a child service instance when onForwardInit returns from the parent
     * @param data The response from the forwardInit call
     */
    AuthorizationManager.prototype.onForwardInitResponse = function (data) {
        if (data && data.error) {
            // if there is an error, we cannot continue, so throw it
            throw data.error;
        }
        this.manageAsToken = data.result.manageAsToken;
        this.nodeTokens = data.result.nodeTokens;
    };
    /**
     * Called when a new instance of the service in another window is initialized and needs to synchronize with its parent
     * @param from The RpcRelationshipType that this request is from
     * @returns an observable for the all the values needed to initialize the service
     */
    AuthorizationManager.prototype.onForwardInit = function () {
        // authorization manager doesn't pass any properties to child services at this time.
        return Observable.of({
            manageAsToken: this.manageAsToken,
            nodeTokens: this.nodeTokens
        });
    };
    /**
     * Called when the forwarded services counterpart wants to get data from the parent
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the method to forward to
     * @param args The arguments of the method
     * @returns an observable for the result of the method call
     */
    AuthorizationManager.prototype.onForwardExecute = function (from, name, args) {
        var _this = this;
        // command comes from child
        if (from === 1 /* Child */ && name === 'getNewToken') {
            // start getting the new token, but return immediately to avoid timeout
            var subscription_1 = this.getNewToken(args ? args[0] : null).subscribe(function (result) {
                subscription_1.unsubscribe();
            }, function (error) {
                subscription_1.unsubscribe();
                _this.forwardNotify(1 /* Child */, 'setNodeTokenError', RpcForwarder.ensureSerializable(error));
            });
            return Observable.of(null);
        }
        // command comes from parent
        if (from === 0 /* Parent */) {
            if (name === 'clearNodeTokens') {
                this.nodeTokens = {};
                // if we also have children, forward the request on
                var forward = this.forwardExecute(1 /* Child */, 'clearNodeTokens', args);
                return forward || Observable.of(null);
            }
        }
        // command not implemented
        return this.nameNotFound(name);
    };
    /**
     * Called when the forwarded services counterpart sends a notify message
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the property to change
     * @param value The new value of the property
     * @returns an observable that completes when the property has been changed.
     */
    AuthorizationManager.prototype.onForwardNotify = function (from, name, value) {
        // allow our parent to give us a new token        
        if (from === 0 /* Parent */) {
            if (name === 'manageAsToken') {
                this.manageAsToken = value;
                // if we also have children, forward the notification on
                var forward = this.forwardNotify(1 /* Child */, 'manageAsToken', value);
                return forward || Observable.of(null);
            }
            if (name === 'setNodeToken') {
                if (!value) {
                    var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.InvalidValue.message;
                    return Observable.throw(message.format('setNodeToken'));
                }
                this.completeTokenAwaiter(value);
                var forward = this.forwardNotify(1 /* Child */, 'setNodeToken', value);
                return forward || Observable.of(null);
            }
            if (name === 'setNodeTokenError') {
                if (!value) {
                    var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.InvalidValue.message;
                    return Observable.throw(message.format('setNodeTokenError'));
                }
                this.completeTokenAwaiter(null, value);
                var forward = this.forwardNotify(1 /* Child */, 'setNodeTokenError', value);
                return forward || Observable.of(null);
            }
        }
        return this.nameNotFound(name);
    };
    /**
     * If no laps local admin name is defined, it will default to 'administrator'
     */
    AuthorizationManager.defaultLapsLocalAdminName = 'administrator';
    return AuthorizationManager;
}(RpcServiceForwarder));
export { AuthorizationManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvYXV0aG9yaXphdGlvbi1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQTBCLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSWxDLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQXdEekU7O0dBRUc7QUFDSDtJQUEwQyx3Q0FBbUI7SUFnRHpEOzs7O09BSUc7SUFDSCw4QkFDWSxTQUFtQyxFQUMzQyxHQUFRO1FBRlosWUFHSSxrQkFBTSx1QkFBdUIsRUFBRSxHQUFHLENBQUMsU0FDdEM7UUFIVyxlQUFTLEdBQVQsU0FBUyxDQUEwQjtRQS9DL0M7O1dBRUc7UUFDSSxnQkFBVSxHQUEwQyxFQUFFLENBQUM7O0lBK0M5RCxDQUFDO0lBcENELHNCQUFXLCtDQUFhO1FBS3hCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBZEQ7OztXQUdHO2FBQ0gsVUFBeUIsS0FBeUI7WUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsZ0JBQTRCLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxRSxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFPRCxDQUFDO0lBT0Ysc0JBQVcsNkNBQVc7UUFIdEI7O1dBRUc7YUFDSDtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELDBCQUEwQjtnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQztZQUVELDBCQUEwQjtZQUMxQixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBNkIsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNyRyxDQUFDOzs7T0FBQTtJQWFEOztPQUVHO0lBQ0ksbURBQW9CLEdBQTNCLFVBQTRCLElBQW9CLEVBQUUsS0FBZ0I7UUFDOUQsa0lBQWtJO1FBQ2xJLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRDs7T0FFRztJQUNJLGdEQUFpQixHQUF4QixVQUNJLElBQW9CLEVBQ3BCLE9BQW9CLEVBQ3BCLEtBQWdCLEVBQ2hCLFFBQWlCO1FBSnJCLGlCQW9CQztRQWZHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7WUFDOUMsK0ZBQStGO1lBQy9GLDREQUE0RDtZQUM1RCxvREFBb0Q7WUFDcEQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUMvQixJQUFJLGNBQWMsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDckcsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDakIsOENBQThDO2dCQUM5QyxLQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osbURBQW1EO2dCQUNuRCxNQUFNLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFRTSwwQ0FBVyxHQUFsQixVQUFtQixTQUE2QjtRQUFoRCxpQkE0REM7UUEzREcsa0dBQWtHO1FBQ2xHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQztRQUVELDZDQUE2QztRQUM3QyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRUQsd0RBQXdEO1FBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQThCLENBQUM7UUFFOUQscURBQXFEO1FBQ3JELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLGlCQUFtQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQztRQUVELGtGQUFrRjtRQUNsRixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQzthQUNwQixPQUFPLENBQUMsVUFBQSxXQUFXO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLGNBQWMsZ0JBQTRCLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQUEsV0FBVztZQUNaLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN6QixRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVE7Z0JBQzlCLFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUTtnQkFDOUIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO2dCQUM1QixrQkFBa0IsRUFBRSxXQUFXLENBQUMsa0JBQWtCO2FBQ3JELENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBNkI7Z0JBQy9CLEtBQUssRUFBRSxLQUFLO2dCQUNaLFNBQVMsRUFBRSxTQUFTO2FBQ3ZCLENBQUM7UUFDTixDQUFDLENBQUM7YUFHRCxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsU0FBUyxDQUNWLFVBQUEsTUFBTTtZQUNGLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsYUFBYSxnQkFBNEIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFFLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxLQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxhQUFhLGdCQUE0QixtQkFBbUIsRUFBRSxZQUFZLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvRyxDQUFDLENBQUMsQ0FBQztRQUVQLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSSwwQ0FBVyxHQUFsQixVQUFtQixPQUF3QztRQUN2RCxpREFBaUQ7UUFDakQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxPQUFPLENBQUMsa0JBQWtCLEdBQUcsb0JBQW9CLENBQUMseUJBQXlCLENBQUM7UUFDaEYsQ0FBQztRQUNELG9DQUFvQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQztnQkFDSCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87Z0JBQ3hCLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxrQkFBa0I7YUFDakQsQ0FBQztRQUNOLENBQUM7UUFFRCxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQztRQUVELElBQUksUUFBa0IsQ0FBQztRQUN2QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLE9BQU8sRUFBRSxLQUFLO1lBQ2Qsa0JBQWtCLEVBQUUsSUFBSTtTQUMzQixDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0ssbURBQW9CLEdBQTVCLFVBQTZCLE1BQWtDLEVBQUUsS0FBVztRQUE1RSxpQkF5QkM7UUF4QkcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7b0JBQzdCLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqRSxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDekUsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxnREFBaUIsR0FBeEIsVUFBeUIsUUFBZ0I7UUFDckMsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksNERBQTZCLEdBQXBDLFVBQXFDLE9BQW9CLEVBQUUsUUFBaUIsRUFBRSxLQUEwQjtRQUNwRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVCxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUUzQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUMxRCxDQUFDO1FBQ0wsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFZCwyRkFBMkY7Z0JBQzNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDakUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFSixpQ0FBaUM7Z0JBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQzFELE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1lBQ3BGLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksaURBQWtCLEdBQXpCLFVBQTBCLFFBQWdCLEVBQUUsS0FBMEI7UUFDbEUsSUFBSSxPQUFPLEdBQThCLEVBQUUsQ0FBQztRQUM1QyxLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsMkZBQTJGO2dCQUMzRixPQUFPLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUM3RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRUosaUNBQWlDO2dCQUNqQyxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNyRSxPQUFPLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1lBQzVFLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxvRUFBcUMsR0FBNUMsVUFBNkMsSUFBYyxFQUFFLFFBQWlCLEVBQUUsS0FBMEI7UUFDdEcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1QsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNMLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRWQsMkZBQTJGO2dCQUMzRixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFSixpQ0FBaUM7Z0JBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDckYsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ08sb0RBQXFCLEdBQS9CLFVBQWdDLElBQTREO1FBQ3hGLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQix3REFBd0Q7WUFDeEQsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFFN0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyw0Q0FBYSxHQUF2QjtRQUNJLG9GQUFvRjtRQUNwRixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBcUM7WUFDckQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUM5QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sK0NBQWdCLEdBQTFCLFVBQTJCLElBQXlCLEVBQUUsSUFBWSxFQUFFLElBQVc7UUFBL0UsaUJBMkJDO1FBMUJHLDJCQUEyQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLGtCQUE4QixJQUFJLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQy9ELHVFQUF1RTtZQUN2RSxJQUFJLGNBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ2hFLFVBQUEsTUFBTTtnQkFDRixjQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDL0IsQ0FBQyxFQUNELFVBQUEsS0FBSztnQkFDRCxjQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxhQUFhLGdCQUE0QixtQkFBbUIsRUFBRSxZQUFZLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvRyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFRCw0QkFBNEI7UUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxtQkFBK0IsQ0FBQyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ3JCLG1EQUFtRDtnQkFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsZ0JBQTRCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN0RixNQUFNLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsQ0FBQztRQUNMLENBQUM7UUFFRCwwQkFBMEI7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLDhDQUFlLEdBQXpCLFVBQTBCLElBQXlCLEVBQUUsSUFBWSxFQUFFLEtBQVU7UUFDekUsa0RBQWtEO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksbUJBQStCLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDM0Isd0RBQXdEO2dCQUN4RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxnQkFBNEIsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwRixNQUFNLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztvQkFDL0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO2dCQUVELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsZ0JBQTRCLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkYsTUFBTSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztvQkFDL0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsZ0JBQTRCLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4RixNQUFNLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBOWFEOztPQUVHO0lBQ1csOENBQXlCLEdBQUcsZUFBZSxDQUFDO0lBNGE5RCwyQkFBQztDQWpiRCxBQWliQyxDQWpieUMsbUJBQW1CLEdBaWI1RDtTQWpiWSxvQkFBb0IiLCJmaWxlIjoiYXV0aG9yaXphdGlvbi1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==