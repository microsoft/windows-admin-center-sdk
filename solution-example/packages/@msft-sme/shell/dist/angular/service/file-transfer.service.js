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
var FileTransferService = (function (_super) {
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
    return FileTransferService;
}(FileTransfer));
export { FileTransferService };
FileTransferService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FileTransferService.ctorParameters = function () { return [
    { type: NodeService, },
    { type: GatewayService, },
    { type: AuthorizationService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9maWxlLXRyYW5zZmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUN6RCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sWUFBQSxDQUFhO0FBQzFDLE9BQU8sRUFBRSxvQkFBQSxFQUFxQixNQUFPLHlCQUFBLENBQTBCO0FBQy9ELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUNuRCxPQUFPLEVBQUUsV0FBQSxFQUFZLE1BQU8sZ0JBQUEsQ0FBaUI7QUFHN0M7O0dBRUc7QUFDSDtJQUF5Qyx1Q0FBWTtJQUNqRDs7Ozs7O09BTUc7SUFDSCw2QkFBWSxXQUF3QixFQUFFLGNBQThCLEVBQUcsb0JBQTBDO2VBQzdHLGtCQUFNLFdBQVcsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUM7SUFDNUQsQ0FBQztJQVVMLDBCQUFDO0FBQUQsQ0FwQkEsQUFvQkMsQ0FwQndDLFlBQVk7O0FBVzlDLDhCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtDQUNuQixDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztJQUNyQixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7SUFDeEIsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEdBQUc7Q0FDN0IsRUFKNkYsQ0FJN0YsQ0FBQyIsImZpbGUiOiJmaWxlLXRyYW5zZmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9