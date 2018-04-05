import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolutionContainerRoutingModule } from './solution-container-routing.module';
import { SolutionContainerComponent } from './solution-container.component';
import { SolutionGuardService } from './solution-guard.service';
import { SolutionRootConnectionsGuardService, SolutionRootPathGuardService } from './solution-root-guard.service';
var SolutionContainerModule = (function () {
    function SolutionContainerModule() {
    }
    return SolutionContainerModule;
}());
export { SolutionContainerModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL3NvbHV0aW9uLWNvbnRhaW5lci9zb2x1dGlvbi1jb250YWluZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUV6QyxPQUFPLEVBQUUsOEJBQUEsRUFBK0IsTUFBTyxxQ0FBQSxDQUFzQztBQUNyRixPQUFPLEVBQUUsMEJBQUEsRUFBMkIsTUFBTyxnQ0FBQSxDQUFpQztBQUM1RSxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTywwQkFBQSxDQUEyQjtBQUNoRSxPQUFPLEVBQUUsbUNBQUEsRUFBcUMsNEJBQUEsRUFBNkIsTUFBTywrQkFBQSxDQUFnQztBQUdsSDtJQUFBO0lBbUJBLENBQUM7SUFBRCw4QkFBQztBQUFELENBbkJBLEFBbUJDOztBQW5CNkMsa0NBQVUsR0FBMEI7SUFDbEYsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyQixZQUFZLEVBQUU7b0JBQ1YsMEJBQTBCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWiw4QkFBOEI7aUJBQ2pDO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxvQkFBb0I7b0JBQ3BCLG1DQUFtQztvQkFDbkMsNEJBQTRCO2lCQUMvQjthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxzQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJzb2x1dGlvbi1jb250YWluZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==