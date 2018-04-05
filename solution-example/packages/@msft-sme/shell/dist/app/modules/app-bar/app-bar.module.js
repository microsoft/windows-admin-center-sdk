import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule, IconModule } from '../../../angular';
import { AppBarComponent } from './app-bar.component';
import { AppBarService } from './app-bar.service';
import { SolutionsListComponent } from './solutions-list/solutions-list.component';
var AppBarModule = (function () {
    function AppBarModule() {
    }
    return AppBarModule;
}());
export { AppBarModule };
AppBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AppBarComponent,
                    SolutionsListComponent
                ],
                imports: [
                    CommonModule,
                    IconModule,
                    RouterModule,
                    DropdownModule
                ],
                exports: [AppBarComponent],
                providers: [AppBarService]
            },] },
];
/** @nocollapse */
AppBarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcC1iYXIvYXBwLWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsY0FBQSxFQUFnQixVQUFBLEVBQVcsTUFBTyxrQkFBQSxDQUFtQjtBQUM5RCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLHFCQUFBLENBQXNCO0FBQ3RELE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyxtQkFBQSxDQUFvQjtBQUNsRCxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTywyQ0FBQSxDQUE0QztBQUduRjtJQUFBO0lBbUJBLENBQUM7SUFBRCxtQkFBQztBQUFELENBbkJBLEFBbUJDOztBQW5Ca0MsdUJBQVUsR0FBMEI7SUFDdkUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN2QixZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZixzQkFBc0I7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixjQUFjO2lCQUNmO2dCQUNELE9BQU8sRUFBRSxDQUFFLGVBQWUsQ0FBRTtnQkFDNUIsU0FBUyxFQUFFLENBQUUsYUFBYSxDQUFHO2FBQzlCLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwyQkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJhcHAtYmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=