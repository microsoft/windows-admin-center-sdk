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
import { PowerShellConnection } from '../../core';
import { BatchService } from './batch.service';
import { LifetimeService } from './lifetime.service';
import { NodeService } from './node.service';
/**
 * The PowerShell service class.
 */
var PowerShellService = (function (_super) {
    __extends(PowerShellService, _super);
    /**
     * Initializes a new instance of the PowerShellService class.
     *
     * @param lifetimeService the lifetimeService class instance injected.
     * @param nodeService the NodeService class instance injected.
     * @param batchService the BatchService class instance injected.
     */
    function PowerShellService(lifetimeService, nodeService, batchService) {
        return _super.call(this, lifetimeService, nodeService, batchService) || this;
    }
    return PowerShellService;
}(PowerShellConnection));
export { PowerShellService };
PowerShellService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PowerShellService.ctorParameters = function () { return [
    { type: LifetimeService, },
    { type: NodeService, },
    { type: BatchService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9wb3dlcnNoZWxsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBRSxvQkFBQSxFQUFxQixNQUFPLFlBQUEsQ0FBYTtBQUNsRCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxvQkFBQSxDQUFxQjtBQUNyRCxPQUFPLEVBQUUsV0FBQSxFQUFZLE1BQU8sZ0JBQUEsQ0FBaUI7QUFHN0M7O0dBRUc7QUFDSDtJQUF1QyxxQ0FBb0I7SUFDdkQ7Ozs7OztPQU1HO0lBQ0gsMkJBQVksZUFBZ0MsRUFBRSxXQUF3QixFQUFFLFlBQTBCO2VBQzlGLGtCQUFNLGVBQWUsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDO0lBQ3JELENBQUM7SUFVTCx3QkFBQztBQUFELENBcEJBLEFBb0JDLENBcEJzQyxvQkFBb0I7O0FBV3BELDRCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtDQUNuQixDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsZ0NBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRztJQUN6QixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7SUFDckIsRUFBQyxJQUFJLEVBQUUsWUFBWSxHQUFHO0NBQ3JCLEVBSjZGLENBSTdGLENBQUMiLCJmaWxlIjoicG93ZXJzaGVsbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==