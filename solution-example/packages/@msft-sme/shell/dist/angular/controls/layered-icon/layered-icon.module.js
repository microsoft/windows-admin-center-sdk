import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconLayerComponent } from './layer/icon-layer.component';
import { LayeredIconComponent } from './layered-icon.component';
import { StatusIconComponent } from './status/status-icon.component';
var IconModule = (function () {
    function IconModule() {
    }
    return IconModule;
}());
export { IconModule };
IconModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    LayeredIconComponent,
                    IconLayerComponent,
                    StatusIconComponent
                ],
                declarations: [
                    LayeredIconComponent,
                    IconLayerComponent,
                    StatusIconComponent
                ],
                imports: [
                    CommonModule
                ]
            },] },
];
/** @nocollapse */
IconModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGF5ZXJlZC1pY29uL2xheWVyZWQtaWNvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBRXpDLE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLDhCQUFBLENBQStCO0FBQ2xFLE9BQU8sRUFBRSxvQkFBQSxFQUFxQixNQUFPLDBCQUFBLENBQTJCO0FBQ2hFLE9BQU8sRUFBYyxtQkFBQSxFQUFvQixNQUFPLGdDQUFBLENBQWlDO0FBR2pGO0lBQUE7SUFvQkEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FwQkEsQUFvQkM7O0FBcEJnQyxxQkFBVSxHQUEwQjtJQUNyRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sRUFBRTtvQkFDTCxvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsbUJBQW1CO2lCQUN0QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLG1CQUFtQjtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7aUJBQ2Y7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gseUJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoibGF5ZXJlZC1pY29uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=