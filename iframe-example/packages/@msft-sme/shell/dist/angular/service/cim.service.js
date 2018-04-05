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
import { CimConnection } from '../../core';
import { BatchService } from './batch.service';
import { NodeService } from './node.service';
/**
 * The CIM service class.
 */
var CimService = /** @class */ (function (_super) {
    __extends(CimService, _super);
    /**
     * Initializes a new instance of the CimService class.
     *
     * @param nodeService the NodeService class instance injected.
     * @param batchService the BatchService class instance injected.
     */
    function CimService(nodeService, batchService) {
        return _super.call(this, nodeService, batchService) || this;
    }
    CimService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CimService.ctorParameters = function () { return [
        { type: NodeService, },
        { type: BatchService, },
    ]; };
    return CimService;
}(CimConnection));
export { CimService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9jaW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLGFBQUEsRUFBYyxNQUFPLFlBQUEsQ0FBYTtBQUMzQyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLFdBQUEsRUFBWSxNQUFPLGdCQUFBLENBQWlCO0FBRzdDOztHQUVHO0FBQ0g7SUFBZ0MsOEJBQWE7SUFFekM7Ozs7O09BS0c7SUFDSCxvQkFBWSxXQUF3QixFQUFFLFlBQTBCO2VBQzVELGtCQUFNLFdBQVcsRUFBRSxZQUFZLENBQUM7SUFDcEMsQ0FBQztJQUNFLHFCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gseUJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztRQUNyQixFQUFDLElBQUksRUFBRSxZQUFZLEdBQUc7S0FDckIsRUFINkYsQ0FHN0YsQ0FBQztJQUNGLGlCQUFDO0NBbkJELEFBbUJDLENBbkIrQixhQUFhLEdBbUI1QztTQW5CWSxVQUFVIiwiZmlsZSI6ImNpbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==