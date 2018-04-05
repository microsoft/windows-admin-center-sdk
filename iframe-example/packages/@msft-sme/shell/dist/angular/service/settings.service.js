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
import { SettingsManager } from '../../core';
import { RpcService } from './rpc.service';
/**
 * The Settings service class.
 */
var SettingsService = /** @class */ (function (_super) {
    __extends(SettingsService, _super);
    /**
     * Initializes a new instance of the SettingsService class.
     *
     * @param rpcService the gateway service.
     */
    function SettingsService(rpcService) {
        return _super.call(this, rpcService) || this;
    }
    SettingsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SettingsService.ctorParameters = function () { return [
        { type: RpcService, },
    ]; };
    return SettingsService;
}(SettingsManager));
export { SettingsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLFlBQUEsQ0FBYTtBQUM3QyxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUczQzs7R0FFRztBQUNIO0lBQXFDLG1DQUFlO0lBQ2hEOzs7O09BSUc7SUFDSCx5QkFBWSxVQUFzQjtlQUM5QixrQkFBTSxVQUFVLENBQUM7SUFDckIsQ0FBQztJQUNFLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsOEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztLQUNuQixFQUY2RixDQUU3RixDQUFDO0lBQ0Ysc0JBQUM7Q0FoQkQsQUFnQkMsQ0FoQm9DLGVBQWUsR0FnQm5EO1NBaEJZLGVBQWUiLCJmaWxlIjoic2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=