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
var WebsocketStreamService = /** @class */ (function (_super) {
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
    WebsocketStreamService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebsocketStreamService.ctorParameters = function () { return [
        { type: GatewayService, },
    ]; };
    return WebsocketStreamService;
}(WebsocketStream));
export { WebsocketStreamService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS93ZWJzb2NrZXQtc3RyZWFtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8sWUFBQSxDQUFhO0FBQzdDLE9BQU8sRUFBRSxjQUFBLEVBQWUsTUFBTyxtQkFBQSxDQUFvQjtBQUduRDs7R0FFRztBQUNIO0lBQTRDLDBDQUFlO0lBQ3ZEOzs7O09BSUc7SUFDSCxnQ0FBbUIsY0FBOEI7UUFBakQsWUFDSSxrQkFBTSxjQUFjLENBQUMsU0FDeEI7UUFGa0Isb0JBQWMsR0FBZCxjQUFjLENBQWdCOztJQUVqRCxDQUFDO0lBQ0UsaUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxxQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0tBQ3ZCLEVBRjZGLENBRTdGLENBQUM7SUFDRiw2QkFBQztDQWhCRCxBQWdCQyxDQWhCMkMsZUFBZSxHQWdCMUQ7U0FoQlksc0JBQXNCIiwiZmlsZSI6IndlYnNvY2tldC1zdHJlYW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=