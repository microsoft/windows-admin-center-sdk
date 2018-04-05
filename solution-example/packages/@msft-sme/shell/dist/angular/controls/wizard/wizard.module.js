import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppContextService } from '../../service';
import { LoadingWheelModule } from '../loading-wheel';
import { WizardComponent, WizardFooterComponent } from './';
var WizardModule = (function () {
    function WizardModule() {
    }
    return WizardModule;
}());
export { WizardModule };
WizardModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    WizardComponent,
                    WizardFooterComponent
                ],
                exports: [
                    WizardComponent,
                    WizardFooterComponent
                ],
                imports: [
                    CommonModule,
                    LoadingWheelModule
                ],
                providers: [
                    AppContextService
                ]
            },] },
];
/** @nocollapse */
WizardModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvd2l6YXJkL3dpemFyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBRXpDLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLGVBQUEsQ0FBZ0I7QUFDbEQsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sa0JBQUEsQ0FBbUI7QUFDdEQsT0FBTyxFQUFFLGVBQUEsRUFBaUIscUJBQUEsRUFBc0IsTUFBTyxJQUFBLENBQUs7QUFHNUQ7SUFBQTtJQXNCQSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQXRCQSxBQXNCQzs7QUF0QmtDLHVCQUFVLEdBQTBCO0lBQ3ZFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsWUFBWSxFQUFFO29CQUNWLGVBQWU7b0JBQ2YscUJBQXFCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsZUFBZTtvQkFDZixxQkFBcUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGtCQUFrQjtpQkFDckI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLGlCQUFpQjtpQkFDcEI7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsMkJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoid2l6YXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=