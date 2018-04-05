import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule, IconModule, PipesModule } from '../../../angular';
import { AppBarComponent } from './app-bar.component';
import { AppBarService } from './app-bar.service';
import { SolutionsListComponent } from './solutions-list/solutions-list.component';
var AppBarModule = /** @class */ (function () {
    function AppBarModule() {
    }
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
                        DropdownModule,
                        PipesModule
                    ],
                    exports: [AppBarComponent],
                    providers: [AppBarService]
                },] },
    ];
    /** @nocollapse */
    AppBarModule.ctorParameters = function () { return []; };
    return AppBarModule;
}());
export { AppBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcC1iYXIvYXBwLWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsY0FBQSxFQUFnQixVQUFBLEVBQVksV0FBQSxFQUFZLE1BQU8sa0JBQUEsQ0FBbUI7QUFDM0UsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxxQkFBQSxDQUFzQjtBQUN0RCxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sbUJBQUEsQ0FBb0I7QUFDbEQsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sMkNBQUEsQ0FBNEM7QUFHbkY7SUFBQTtJQW9CQSxDQUFDO0lBcEJrQyx1QkFBVSxHQUEwQjtRQUN2RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsV0FBVztxQkFDWjtvQkFDRCxPQUFPLEVBQUUsQ0FBRSxlQUFlLENBQUU7b0JBQzVCLFNBQVMsRUFBRSxDQUFFLGFBQWEsQ0FBRztpQkFDOUIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsbUJBQUM7Q0FwQkQsQUFvQkMsSUFBQTtTQXBCWSxZQUFZIiwiZmlsZSI6ImFwcC1iYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==