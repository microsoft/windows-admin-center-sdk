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
import { PowerShellStream } from '../../core';
import { AuthorizationService } from './authorization.service';
import { WebsocketStreamService } from './websocket-stream.service';
/**
 * The PowerShell Stream service class.
 */
var PowerShellStreamService = (function (_super) {
    __extends(PowerShellStreamService, _super);
    /**
     * Initializes a new instance of the PowerShellStreamService class.
     *
     * @param websocketStreamService the websocket stream class instance injected.
     * @param authorizationService the authorization manager service class instance injected.
     */
    function PowerShellStreamService(websocketStreamService, authorizationService) {
        return _super.call(this, websocketStreamService, authorizationService) || this;
    }
    return PowerShellStreamService;
}(PowerShellStream));
export { PowerShellStreamService };
PowerShellStreamService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PowerShellStreamService.ctorParameters = function () { return [
    { type: WebsocketStreamService, },
    { type: AuthorizationService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9wb3dlcnNoZWxsLXN0cmVhbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxZQUFBLENBQWE7QUFDOUMsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8seUJBQUEsQ0FBMEI7QUFDL0QsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNEJBQUEsQ0FBNkI7QUFHcEU7O0dBRUc7QUFDSDtJQUE2QywyQ0FBZ0I7SUFDekQ7Ozs7O09BS0c7SUFDSCxpQ0FBWSxzQkFBOEMsRUFBRSxvQkFBMEM7ZUFDbEcsa0JBQU0sc0JBQXNCLEVBQUUsb0JBQW9CLENBQUM7SUFDdkQsQ0FBQztJQVNMLDhCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsQ0FsQjRDLGdCQUFnQjs7QUFVdEQsa0NBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCxzQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsc0JBQXNCLEdBQUc7SUFDaEMsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEdBQUc7Q0FDN0IsRUFINkYsQ0FHN0YsQ0FBQyIsImZpbGUiOiJwb3dlcnNoZWxsLXN0cmVhbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==