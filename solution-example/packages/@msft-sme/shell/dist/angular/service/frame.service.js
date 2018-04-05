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
import { FrameConnection } from '../../core';
import { RpcService } from './rpc.service';
/**
 * The CIM service class.
 */
var FrameService = (function (_super) {
    __extends(FrameService, _super);
    /**
     * Initializes a new instance of the FrameService class.
     *
     * @param rpcService the RpcService class instance injected.
     */
    function FrameService(rpc) {
        return _super.call(this, rpc) || this;
    }
    return FrameService;
}(FrameConnection));
export { FrameService };
FrameService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FrameService.ctorParameters = function () { return [
    { type: RpcService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9mcmFtZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLFlBQUEsQ0FBYTtBQUM3QyxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUczQzs7R0FFRztBQUNIO0lBQWtDLGdDQUFlO0lBQzdDOzs7O09BSUc7SUFDSCxzQkFBWSxHQUFlO2VBQ3ZCLGtCQUFNLEdBQUcsQ0FBQztJQUNkLENBQUM7SUFRTCxtQkFBQztBQUFELENBaEJBLEFBZ0JDLENBaEJpQyxlQUFlOztBQVMxQyx1QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7Q0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJmcmFtZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==