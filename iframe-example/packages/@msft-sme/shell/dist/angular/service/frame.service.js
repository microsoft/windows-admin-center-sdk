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
var FrameService = /** @class */ (function (_super) {
    __extends(FrameService, _super);
    /**
     * Initializes a new instance of the FrameService class.
     *
     * @param rpcService the RpcService class instance injected.
     */
    function FrameService(rpc) {
        return _super.call(this, rpc) || this;
    }
    FrameService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FrameService.ctorParameters = function () { return [
        { type: RpcService, },
    ]; };
    return FrameService;
}(FrameConnection));
export { FrameService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9mcmFtZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLFlBQUEsQ0FBYTtBQUM3QyxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUczQzs7R0FFRztBQUNIO0lBQWtDLGdDQUFlO0lBQzdDOzs7O09BSUc7SUFDSCxzQkFBWSxHQUFlO2VBQ3ZCLGtCQUFNLEdBQUcsQ0FBQztJQUNkLENBQUM7SUFDRSx1QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7S0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLG1CQUFDO0NBaEJELEFBZ0JDLENBaEJpQyxlQUFlLEdBZ0JoRDtTQWhCWSxZQUFZIiwiZmlsZSI6ImZyYW1lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9