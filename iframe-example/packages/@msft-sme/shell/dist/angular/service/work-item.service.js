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
import { WorkItemConnection } from '../../core';
import { GatewayService } from './gateway.service';
import { NodeService } from './node.service';
import { NotificationService } from './notification.service';
import { RpcService } from './rpc.service';
/**
 * Work item service class.
 */
var WorkItemService = /** @class */ (function (_super) {
    __extends(WorkItemService, _super);
    /**
     * Initializes a new instance of the WorkItemService class.
     *
     * @param rpcService the RPC service.
     * @param nodeService the Node service.
     * @param gatewayService the gateway service.
     * @param notificationService the notification service.
     */
    function WorkItemService(rpcService, nodeService, gatewayService, notificationService) {
        return _super.call(this, rpcService, gatewayService, nodeService, notificationService) || this;
    }
    WorkItemService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WorkItemService.ctorParameters = function () { return [
        { type: RpcService, },
        { type: NodeService, },
        { type: GatewayService, },
        { type: NotificationService, },
    ]; };
    return WorkItemService;
}(WorkItemConnection));
export { WorkItemService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS93b3JrLWl0ZW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sWUFBQSxDQUFhO0FBQ2hELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUNuRCxPQUFPLEVBQUUsV0FBQSxFQUFZLE1BQU8sZ0JBQUEsQ0FBaUI7QUFDN0MsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8sd0JBQUEsQ0FBeUI7QUFDN0QsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFFM0M7O0dBRUc7QUFFSDtJQUFxQyxtQ0FBa0I7SUFDbkQ7Ozs7Ozs7T0FPRztJQUNILHlCQUNJLFVBQXNCLEVBQ3RCLFdBQXdCLEVBQ3hCLGNBQThCLEVBQzlCLG1CQUF3QztlQUN4QyxrQkFBTSxVQUFVLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQztJQUN2RSxDQUFDO0lBQ0UsMEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCw4QkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztRQUNyQixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7UUFDeEIsRUFBQyxJQUFJLEVBQUUsbUJBQW1CLEdBQUc7S0FDNUIsRUFMNkYsQ0FLN0YsQ0FBQztJQUNGLHNCQUFDO0NBMUJELEFBMEJDLENBMUJvQyxrQkFBa0IsR0EwQnREO1NBMUJZLGVBQWUiLCJmaWxlIjoid29yay1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9