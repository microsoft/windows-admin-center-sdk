import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule, GuidedPanelModule, IconModule, LoadingWheelModule, PipesModule, SmeStylesModule } from '../../angular';
import { DevGuideRoutingModule } from './dev-guide-routing.module';
import { DevGuideComponent } from './dev-guide.component';
import { LandingModule } from './landing/landing.module';
var DevGuideModule = (function () {
    function DevGuideModule() {
    }
    return DevGuideModule;
}());
export { DevGuideModule };
DevGuideModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DevGuideComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    SmeStylesModule,
                    DialogModule,
                    IconModule,
                    LoadingWheelModule,
                    GuidedPanelModule,
                    PipesModule,
                    LandingModule,
                    DevGuideRoutingModule
                ]
            },] },
];
/** @nocollapse */
DevGuideModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvZGV2LWd1aWRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFnQixRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3ZELE9BQU8sRUFBRSxXQUFBLEVBQWEsbUJBQUEsRUFBb0IsTUFBTyxnQkFBQSxDQUFpQjtBQUVsRSxPQUFPLEVBQ0gsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixVQUFVLEVBQ1Ysa0JBQWtCLEVBR2xCLFdBQVcsRUFFWCxlQUFlLEVBQ2xCLE1BQU0sZUFBQSxDQUFnQjtBQUN2QixPQUFPLEVBQUUscUJBQUEsRUFBc0IsTUFBTyw0QkFBQSxDQUE2QjtBQUNuRSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx1QkFBQSxDQUF3QjtBQUMxRCxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sMEJBQUEsQ0FBMkI7QUFHekQ7SUFBQTtJQXVCQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQXZCQSxBQXVCQzs7QUF2Qm9DLHlCQUFVLEdBQTBCO0lBQ3pFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsWUFBWSxFQUFFO29CQUNWLGlCQUFpQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGVBQWU7b0JBQ2YsWUFBWTtvQkFDWixVQUFVO29CQUNWLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixXQUFXO29CQUNYLGFBQWE7b0JBQ2IscUJBQXFCO2lCQUN4QjthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCw2QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJkZXYtZ3VpZGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==