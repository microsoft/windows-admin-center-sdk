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
import { BatchConnection } from '../../core';
import { AuthorizationService } from './authorization.service';
import { GatewayService } from './gateway.service';
/**
 * The batch service class.
 */
var BatchService = (function (_super) {
    __extends(BatchService, _super);
    /**
     * Initializes a new instance of the BatchService class.
     *
     * @param gatewayService the gateway service.
     * @param authorizationService the authorization service.
     */
    function BatchService(gatewayService, authorizationService) {
        return _super.call(this, gatewayService, authorizationService) || this;
    }
    return BatchService;
}(BatchConnection));
export { BatchService };
BatchService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BatchService.ctorParameters = function () { return [
    { type: GatewayService, },
    { type: AuthorizationService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9iYXRjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLFlBQUEsQ0FBYTtBQUM3QyxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTyx5QkFBQSxDQUEwQjtBQUMvRCxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8sbUJBQUEsQ0FBb0I7QUFHbkQ7O0dBRUc7QUFDSDtJQUFrQyxnQ0FBZTtJQUM3Qzs7Ozs7T0FLRztJQUNILHNCQUFZLGNBQThCLEVBQUUsb0JBQTBDO2VBQ2xGLGtCQUFNLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQztJQUMvQyxDQUFDO0lBU0wsbUJBQUM7QUFBRCxDQWxCQSxBQWtCQyxDQWxCaUMsZUFBZTs7QUFVMUMsdUJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCwyQkFBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0lBQ3hCLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixHQUFHO0NBQzdCLEVBSDZGLENBRzdGLENBQUMiLCJmaWxlIjoiYmF0Y2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=