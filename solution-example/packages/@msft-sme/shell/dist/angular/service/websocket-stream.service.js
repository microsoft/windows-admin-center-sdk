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
import { WebsocketStream } from '../../core';
import { GatewayService } from './gateway.service';
/**
 * The Websocket Stream service class.
 */
var WebsocketStreamService = (function (_super) {
    __extends(WebsocketStreamService, _super);
    /**
     * Initializes a new instance of the WebsocketStreamService class.
     *
     * @param gatewayService the gateway service object.
     */
    function WebsocketStreamService(gatewayService) {
        var _this = _super.call(this, gatewayService) || this;
        _this.gatewayService = gatewayService;
        return _this;
    }
    return WebsocketStreamService;
}(WebsocketStream));
export { WebsocketStreamService };
WebsocketStreamService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebsocketStreamService.ctorParameters = function () { return [
    { type: GatewayService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS93ZWJzb2NrZXQtc3RyZWFtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8sWUFBQSxDQUFhO0FBQzdDLE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUduRDs7R0FFRztBQUNIO0lBQTRDLDBDQUFlO0lBQ3ZEOzs7O09BSUc7SUFDSCxnQ0FBbUIsY0FBOEI7UUFBakQsWUFDSSxrQkFBTSxjQUFjLENBQUMsU0FDeEI7UUFGa0Isb0JBQWMsR0FBZCxjQUFjLENBQWdCOztJQUVqRCxDQUFDO0lBUUwsNkJBQUM7QUFBRCxDQWhCQSxBQWdCQyxDQWhCMkMsZUFBZTs7QUFTcEQsaUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCxxQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0NBQ3ZCLEVBRjZGLENBRTdGLENBQUMiLCJmaWxlIjoid2Vic29ja2V0LXN0cmVhbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==