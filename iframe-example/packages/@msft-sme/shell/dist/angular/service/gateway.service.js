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
import { Injectable } from '@angular/core';
import { GatewayConnection } from '../../core';
import { HttpService } from './http.service';
import { RpcService } from './rpc.service';
/**
 * The gateway service class.
 */
var GatewayService = /** @class */ (function (_super) {
    __extends(GatewayService, _super);
    /**
     * Initializes a new instance of the GatewayService class.
     *
     * @param http the Http object.
     * @param rpcService the RPC service.
     */
    function GatewayService(httpService, rpcService) {
        return _super.call(this, httpService, rpcService) || this;
    }
    GatewayService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GatewayService.ctorParameters = function () { return [
        { type: HttpService, },
        { type: RpcService, },
    ]; };
    return GatewayService;
}(GatewayConnection));
export { GatewayService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9nYXRld2F5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUN6RCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxZQUFBLENBQWE7QUFFL0MsT0FBTyxFQUFFLFdBQUEsRUFBWSxNQUFPLGdCQUFBLENBQWlCO0FBQzdDLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRzNDOztHQUVHO0FBQ0g7SUFBb0Msa0NBQWlCO0lBQ2pEOzs7OztPQUtHO0lBQ0gsd0JBQ0ksV0FBd0IsRUFDeEIsVUFBc0I7ZUFDdEIsa0JBQU0sV0FBVyxFQUFFLFVBQVUsQ0FBQztJQUNsQyxDQUFDO0lBQ0UseUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCw2QkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsV0FBVyxHQUFHO1FBQ3JCLEVBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztLQUNuQixFQUg2RixDQUc3RixDQUFDO0lBQ0YscUJBQUM7Q0FwQkQsQUFvQkMsQ0FwQm1DLGlCQUFpQixHQW9CcEQ7U0FwQlksY0FBYyIsImZpbGUiOiJnYXRld2F5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9