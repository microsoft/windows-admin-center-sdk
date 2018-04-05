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
import { NotificationConnection } from '../../core';
import { RpcService } from './rpc.service';
/**
 * Notification service class.
 */
var NotificationService = /** @class */ (function (_super) {
    __extends(NotificationService, _super);
    /**
     * Initializes a new instance of the NotificationConnectionService class.
     *
     * @param rpcService the RPC service.
     * @param connectionService the connection service.
     */
    function NotificationService(rpcService) {
        return _super.call(this, rpcService) || this;
    }
    NotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return [
        { type: RpcService, },
    ]; };
    return NotificationService;
}(NotificationConnection));
export { NotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sWUFBQSxDQUFhO0FBQ3BELE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRTNDOztHQUVHO0FBRUg7SUFBeUMsdUNBQXNCO0lBQzNEOzs7OztPQUtHO0lBQ0gsNkJBQVksVUFBc0I7ZUFDOUIsa0JBQU0sVUFBVSxDQUFDO0lBQ3JCLENBQUM7SUFDRSw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7S0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLDBCQUFDO0NBakJELEFBaUJDLENBakJ3QyxzQkFBc0IsR0FpQjlEO1NBakJZLG1CQUFtQiIsImZpbGUiOiJub3RpZmljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=