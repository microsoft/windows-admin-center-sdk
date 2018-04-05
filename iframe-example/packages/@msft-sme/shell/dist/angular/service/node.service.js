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
import { NodeConnection } from '../../core';
import { AuthorizationService } from './authorization.service';
import { GatewayService } from './gateway.service';
/**
 * The node service class.
 */
var NodeService = /** @class */ (function (_super) {
    __extends(NodeService, _super);
    /**
     * Initializes a new instance of the NodeService class.
     *
     * @param gatewayService the gateway service.
     * @param authorizationService the authorization service.
     */
    function NodeService(gatewayService, authorizationService) {
        return _super.call(this, gatewayService, authorizationService) || this;
    }
    NodeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NodeService.ctorParameters = function () { return [
        { type: GatewayService, },
        { type: AuthorizationService, },
    ]; };
    return NodeService;
}(NodeConnection));
export { NodeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9ub2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxZQUFBLENBQWE7QUFDNUMsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8seUJBQUEsQ0FBMEI7QUFDL0QsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLG1CQUFBLENBQW9CO0FBR25EOztHQUVHO0FBQ0g7SUFBaUMsK0JBQWM7SUFDM0M7Ozs7O09BS0c7SUFDSCxxQkFBWSxjQUE4QixFQUFFLG9CQUEwQztlQUNsRixrQkFBTSxjQUFjLEVBQUUsb0JBQW9CLENBQUM7SUFDL0MsQ0FBQztJQUNFLHNCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxvQkFBb0IsR0FBRztLQUM3QixFQUg2RixDQUc3RixDQUFDO0lBQ0Ysa0JBQUM7Q0FsQkQsQUFrQkMsQ0FsQmdDLGNBQWMsR0FrQjlDO1NBbEJZLFdBQVciLCJmaWxlIjoibm9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==