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
import { ConnectionStream } from '../../core';
import { ConnectionService } from './connection.service';
import { GatewayService } from './gateway.service';
import { PowerShellService } from './powershell.service';
import { RpcService } from './rpc.service';
var ConnectionStreamService = /** @class */ (function (_super) {
    __extends(ConnectionStreamService, _super);
    function ConnectionStreamService(rpc, connectionService, gatewayService, powerShellService) {
        return _super.call(this, rpc, connectionService, powerShellService, gatewayService) || this;
    }
    ConnectionStreamService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ConnectionStreamService.ctorParameters = function () { return [
        { type: RpcService, },
        { type: ConnectionService, },
        { type: GatewayService, },
        { type: PowerShellService, },
    ]; };
    return ConnectionStreamService;
}(ConnectionStream));
export { ConnectionStreamService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9jb25uZWN0aW9uLXN0cmVhbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWdCLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekQsT0FBTyxFQUFFLGdCQUFBLEVBQWlCLE1BQU8sWUFBQSxDQUFhO0FBRTlDLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHNCQUFBLENBQXVCO0FBQ3pELE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUVuRCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUN6RCxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUczQztJQUE2QywyQ0FBZ0I7SUFDekQsaUNBQ1EsR0FBZSxFQUNmLGlCQUFvQyxFQUNwQyxjQUE4QixFQUM5QixpQkFBb0M7ZUFDeEMsa0JBQU0sR0FBRyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQztJQUNwRSxDQUFDO0lBQ0Usa0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxzQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUw2RixDQUs3RixDQUFDO0lBQ0YsOEJBQUM7Q0FsQkQsQUFrQkMsQ0FsQjRDLGdCQUFnQixHQWtCNUQ7U0FsQlksdUJBQXVCIiwiZmlsZSI6ImNvbm5lY3Rpb24tc3RyZWFtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9