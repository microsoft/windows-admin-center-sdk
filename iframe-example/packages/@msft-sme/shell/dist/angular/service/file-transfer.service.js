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
import { FileTransfer } from '../../core';
import { AuthorizationService } from './authorization.service';
import { GatewayService } from './gateway.service';
import { NodeService } from './node.service';
/**
 * The File Transfer service class.
 */
var FileTransferService = /** @class */ (function (_super) {
    __extends(FileTransferService, _super);
    /**
     * Initializes a new instance of the FileTransferService class.
     *
     * @param nodeService the node service.
     * @param gatewayService the gateway service.
     * @param authorizationService the authorization service.
     */
    function FileTransferService(nodeService, gatewayService, authorizationService) {
        return _super.call(this, nodeService, gatewayService, authorizationService) || this;
    }
    FileTransferService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FileTransferService.ctorParameters = function () { return [
        { type: NodeService, },
        { type: GatewayService, },
        { type: AuthorizationService, },
    ]; };
    return FileTransferService;
}(FileTransfer));
export { FileTransferService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9maWxlLXRyYW5zZmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUN6RCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sWUFBQSxDQUFhO0FBQzFDLE9BQU8sRUFBRSxvQkFBQSxFQUFxQixNQUFPLHlCQUFBLENBQTBCO0FBQy9ELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUNuRCxPQUFPLEVBQUUsV0FBQSxFQUFZLE1BQU8sZ0JBQUEsQ0FBaUI7QUFHN0M7O0dBRUc7QUFDSDtJQUF5Qyx1Q0FBWTtJQUNqRDs7Ozs7O09BTUc7SUFDSCw2QkFBWSxXQUF3QixFQUFFLGNBQThCLEVBQUcsb0JBQTBDO2VBQzdHLGtCQUFNLFdBQVcsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUM7SUFDNUQsQ0FBQztJQUNFLDhCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztRQUNyQixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7UUFDeEIsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEdBQUc7S0FDN0IsRUFKNkYsQ0FJN0YsQ0FBQztJQUNGLDBCQUFDO0NBcEJELEFBb0JDLENBcEJ3QyxZQUFZLEdBb0JwRDtTQXBCWSxtQkFBbUIiLCJmaWxlIjoiZmlsZS10cmFuc2Zlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==