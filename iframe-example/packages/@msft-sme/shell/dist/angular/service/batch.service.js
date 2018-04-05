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
var BatchService = /** @class */ (function (_super) {
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
    BatchService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BatchService.ctorParameters = function () { return [
        { type: GatewayService, },
        { type: AuthorizationService, },
    ]; };
    return BatchService;
}(BatchConnection));
export { BatchService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9iYXRjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLFlBQUEsQ0FBYTtBQUM3QyxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTyx5QkFBQSxDQUEwQjtBQUMvRCxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8sbUJBQUEsQ0FBb0I7QUFHbkQ7O0dBRUc7QUFDSDtJQUFrQyxnQ0FBZTtJQUM3Qzs7Ozs7T0FLRztJQUNILHNCQUFZLGNBQThCLEVBQUUsb0JBQTBDO2VBQ2xGLGtCQUFNLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQztJQUMvQyxDQUFDO0lBQ0UsdUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO1FBQ3hCLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixHQUFHO0tBQzdCLEVBSDZGLENBRzdGLENBQUM7SUFDRixtQkFBQztDQWxCRCxBQWtCQyxDQWxCaUMsZUFBZSxHQWtCaEQ7U0FsQlksWUFBWSIsImZpbGUiOiJiYXRjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==