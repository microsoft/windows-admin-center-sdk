import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertBarComponent } from './alert-bar.component';
import { AlertBarService } from './alert-bar.service';
var AlertBarModule = (function () {
    function AlertBarModule() {
    }
    return AlertBarModule;
}());
export { AlertBarModule };
AlertBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AlertBarComponent
                ],
                exports: [
                    AlertBarComponent
                ],
                imports: [
                    CommonModule,
                    RouterModule
                ],
                providers: [
                    AlertBarService
                ]
            },] },
];
/** @nocollapse */
AlertBarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWxlcnQtYmFyL2FsZXJ0LWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUUvQyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx1QkFBQSxDQUF3QjtBQUMxRCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLHFCQUFBLENBQXNCO0FBR3REO0lBQUE7SUFvQkEsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FwQkEsQUFvQkM7O0FBcEJvQyx5QkFBVSxHQUEwQjtJQUN6RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLFlBQVksRUFBRTtvQkFDVixpQkFBaUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxpQkFBaUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFlBQVk7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLGVBQWU7aUJBQ2xCO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDZCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImFsZXJ0LWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9