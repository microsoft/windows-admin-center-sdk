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
import { ConnectionManager } from '../../core';
import { GatewayService } from './gateway.service';
import { RpcService } from './rpc.service';
var ConnectionService = /** @class */ (function (_super) {
    __extends(ConnectionService, _super);
    function ConnectionService(rpc, gatewayService) {
        return _super.call(this, rpc, gatewayService) || this;
    }
    ConnectionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ConnectionService.ctorParameters = function () { return [
        { type: RpcService, },
        { type: GatewayService, },
    ]; };
    return ConnectionService;
}(ConnectionManager));
export { ConnectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9jb25uZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUN6RCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxZQUFBLENBQWE7QUFDL0MsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLG1CQUFBLENBQW9CO0FBRW5ELE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRzNDO0lBQXVDLHFDQUFpQjtJQUNwRCwyQkFBWSxHQUFlLEVBQUUsY0FBOEI7ZUFDdkQsa0JBQU0sR0FBRyxFQUFFLGNBQWMsQ0FBQztJQUM5QixDQUFDO0lBQ0UsNEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztLQUN2QixFQUg2RixDQUc3RixDQUFDO0lBQ0Ysd0JBQUM7Q0FaRCxBQVlDLENBWnNDLGlCQUFpQixHQVl2RDtTQVpZLGlCQUFpQiIsImZpbGUiOiJjb25uZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9