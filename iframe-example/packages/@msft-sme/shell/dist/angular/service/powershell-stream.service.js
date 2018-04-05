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
var PowerShellStreamService = /** @class */ (function (_super) {
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
    PowerShellStreamService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PowerShellStreamService.ctorParameters = function () { return [
        { type: WebsocketStreamService, },
        { type: AuthorizationService, },
    ]; };
    return PowerShellStreamService;
}(PowerShellStream));
export { PowerShellStreamService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9wb3dlcnNoZWxsLXN0cmVhbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxZQUFBLENBQWE7QUFDOUMsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8seUJBQUEsQ0FBMEI7QUFDL0QsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNEJBQUEsQ0FBNkI7QUFHcEU7O0dBRUc7QUFDSDtJQUE2QywyQ0FBZ0I7SUFDekQ7Ozs7O09BS0c7SUFDSCxpQ0FBWSxzQkFBOEMsRUFBRSxvQkFBMEM7ZUFDbEcsa0JBQU0sc0JBQXNCLEVBQUUsb0JBQW9CLENBQUM7SUFDdkQsQ0FBQztJQUNFLGtDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLHNCQUFzQixHQUFHO1FBQ2hDLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixHQUFHO0tBQzdCLEVBSDZGLENBRzdGLENBQUM7SUFDRiw4QkFBQztDQWxCRCxBQWtCQyxDQWxCNEMsZ0JBQWdCLEdBa0I1RDtTQWxCWSx1QkFBdUIiLCJmaWxlIjoicG93ZXJzaGVsbC1zdHJlYW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=