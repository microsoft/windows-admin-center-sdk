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
import { UserProfileManager } from '../../core';
import { GatewayService } from './gateway.service';
/**
 * The User Profile service class.
 */
var UserProfileService = (function (_super) {
    __extends(UserProfileService, _super);
    /**
     * Initializes a new instance of the UserProfileService class.
     *
     * @param gatewayService the gateway service.
     */
    function UserProfileService(gatewayService) {
        return _super.call(this, gatewayService) || this;
    }
    return UserProfileService;
}(UserProfileManager));
export { UserProfileService };
UserProfileService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
UserProfileService.ctorParameters = function () { return [
    { type: GatewayService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS91c2VyLXByb2ZpbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFnQixVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQ3pELE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLFlBQUEsQ0FBYTtBQUVoRCxPQUFPLEVBQUUsY0FBQSxFQUFlLE1BQU8sbUJBQUEsQ0FBb0I7QUFHbkQ7O0dBRUc7QUFDSDtJQUF3QyxzQ0FBa0I7SUFDdEQ7Ozs7T0FJRztJQUNILDRCQUFZLGNBQThCO2VBQ3RDLGtCQUFNLGNBQWMsQ0FBQztJQUN6QixDQUFDO0lBUUwseUJBQUM7QUFBRCxDQWhCQSxBQWdCQyxDQWhCdUMsa0JBQWtCOztBQVNuRCw2QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLGlDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7Q0FDdkIsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJ1c2VyLXByb2ZpbGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=