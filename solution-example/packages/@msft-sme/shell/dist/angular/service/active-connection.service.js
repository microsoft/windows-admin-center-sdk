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
import { ActiveConnection } from '../../core';
import { CimService } from './cim.service';
import { ConnectionService } from './connection.service';
import { FileTransferService } from './file-transfer.service';
import { PowerShellService } from './powershell.service';
/**
 * The active connection service class.
 */
var ActiveConnectionService = (function (_super) {
    __extends(ActiveConnectionService, _super);
    /**
     * Initializes a new instance of the ActiveConnectionService class.
     *
     * @param connectionService the connection service.
     */
    function ActiveConnectionService(connectionService, cimService, powerShellService, fileTransferService) {
        return _super.call(this, connectionService, cimService, powerShellService, fileTransferService) || this;
    }
    return ActiveConnectionService;
}(ActiveConnection));
export { ActiveConnectionService };
ActiveConnectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActiveConnectionService.ctorParameters = function () { return [
    { type: ConnectionService, },
    { type: CimService, },
    { type: PowerShellService, },
    { type: FileTransferService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9hY3RpdmUtY29ubmVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxZQUFBLENBQWE7QUFDOUMsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sc0JBQUEsQ0FBdUI7QUFDekQsT0FBTyxFQUFFLG1CQUFBLEVBQW9CLE1BQU8seUJBQUEsQ0FBMEI7QUFDOUQsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sc0JBQUEsQ0FBdUI7QUFHekQ7O0dBRUc7QUFDSDtJQUE2QywyQ0FBZ0I7SUFDekQ7Ozs7T0FJRztJQUNILGlDQUNJLGlCQUFvQyxFQUNwQyxVQUFzQixFQUN0QixpQkFBb0MsRUFDcEMsbUJBQXdDO2VBRXhDLGtCQUFNLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQztJQUNoRixDQUFDO0lBV0wsOEJBQUM7QUFBRCxDQXhCQSxBQXdCQyxDQXhCNEMsZ0JBQWdCOztBQWN0RCxrQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHNDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztJQUMzQixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7SUFDcEIsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7SUFDM0IsRUFBQyxJQUFJLEVBQUUsbUJBQW1CLEdBQUc7Q0FDNUIsRUFMNkYsQ0FLN0YsQ0FBQyIsImZpbGUiOiJhY3RpdmUtY29ubmVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==