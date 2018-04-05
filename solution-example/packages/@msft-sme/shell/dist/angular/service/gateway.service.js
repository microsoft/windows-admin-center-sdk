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
var GatewayService = (function (_super) {
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
    return GatewayService;
}(GatewayConnection));
export { GatewayService };
GatewayService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GatewayService.ctorParameters = function () { return [
    { type: HttpService, },
    { type: RpcService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9nYXRld2F5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUN6RCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxZQUFBLENBQWE7QUFFL0MsT0FBTyxFQUFFLFdBQUEsRUFBWSxNQUFPLGdCQUFBLENBQWlCO0FBQzdDLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRzNDOztHQUVHO0FBQ0g7SUFBb0Msa0NBQWlCO0lBQ2pEOzs7OztPQUtHO0lBQ0gsd0JBQ0ksV0FBd0IsRUFDeEIsVUFBc0I7ZUFDdEIsa0JBQU0sV0FBVyxFQUFFLFVBQVUsQ0FBQztJQUNsQyxDQUFDO0lBU0wscUJBQUM7QUFBRCxDQXBCQSxBQW9CQyxDQXBCbUMsaUJBQWlCOztBQVk5Qyx5QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDZCQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7SUFDckIsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO0NBQ25CLEVBSDZGLENBRzdGLENBQUMiLCJmaWxlIjoiZ2F0ZXdheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==