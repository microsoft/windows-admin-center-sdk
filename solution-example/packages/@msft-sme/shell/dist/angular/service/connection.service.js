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
var ConnectionService = (function (_super) {
    __extends(ConnectionService, _super);
    function ConnectionService(rpc, gatewayService) {
        return _super.call(this, rpc, gatewayService) || this;
    }
    return ConnectionService;
}(ConnectionManager));
export { ConnectionService };
ConnectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ConnectionService.ctorParameters = function () { return [
    { type: RpcService, },
    { type: GatewayService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9jb25uZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUN6RCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxZQUFBLENBQWE7QUFDL0MsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLG1CQUFBLENBQW9CO0FBRW5ELE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRzNDO0lBQXVDLHFDQUFpQjtJQUNwRCwyQkFBWSxHQUFlLEVBQUUsY0FBOEI7ZUFDdkQsa0JBQU0sR0FBRyxFQUFFLGNBQWMsQ0FBQztJQUM5QixDQUFDO0lBU0wsd0JBQUM7QUFBRCxDQVpBLEFBWUMsQ0Fac0MsaUJBQWlCOztBQUlqRCw0QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLGdDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7SUFDcEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0NBQ3ZCLEVBSDZGLENBRzdGLENBQUMiLCJmaWxlIjoiY29ubmVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==