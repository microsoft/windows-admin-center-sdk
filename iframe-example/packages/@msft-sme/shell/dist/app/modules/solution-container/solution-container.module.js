import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolutionContainerRoutingModule } from './solution-container-routing.module';
import { SolutionContainerComponent } from './solution-container.component';
import { SolutionGuardService } from './solution-guard.service';
import { SolutionRootConnectionsGuardService, SolutionRootPathGuardService } from './solution-root-guard.service';
var SolutionContainerModule = /** @class */ (function () {
    function SolutionContainerModule() {
    }
    SolutionContainerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SolutionContainerComponent
                    ],
                    imports: [
                        CommonModule,
                        SolutionContainerRoutingModule
                    ],
                    providers: [
                        SolutionGuardService,
                        SolutionRootConnectionsGuardService,
                        SolutionRootPathGuardService
                    ]
                },] },
    ];
    /** @nocollapse */
    SolutionContainerModule.ctorParameters = function () { return []; };
    return SolutionContainerModule;
}());
export { SolutionContainerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NvbHV0aW9uLWNvbnRhaW5lci9zb2x1dGlvbi1jb250YWluZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUV6QyxPQUFPLEVBQUUsOEJBQUEsRUFBK0IsTUFBTyxxQ0FBQSxDQUFzQztBQUNyRixPQUFPLEVBQUUsMEJBQUEsRUFBMkIsTUFBTyxnQ0FBQSxDQUFpQztBQUM1RSxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTywwQkFBQSxDQUEyQjtBQUNoRSxPQUFPLEVBQUUsbUNBQUEsRUFBcUMsNEJBQUEsRUFBNkIsTUFBTywrQkFBQSxDQUFnQztBQUdsSDtJQUFBO0lBbUJBLENBQUM7SUFuQjZDLGtDQUFVLEdBQTBCO1FBQ2xGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsWUFBWSxFQUFFO3dCQUNWLDBCQUEwQjtxQkFDN0I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osOEJBQThCO3FCQUNqQztvQkFDRCxTQUFTLEVBQUU7d0JBQ1Asb0JBQW9CO3dCQUNwQixtQ0FBbUM7d0JBQ25DLDRCQUE0QjtxQkFDL0I7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHNDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsOEJBQUM7Q0FuQkQsQUFtQkMsSUFBQTtTQW5CWSx1QkFBdUIiLCJmaWxlIjoic29sdXRpb24tY29udGFpbmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=