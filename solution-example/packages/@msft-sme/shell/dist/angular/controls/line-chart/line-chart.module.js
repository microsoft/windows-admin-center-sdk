import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/primeng';
import { LoadingWheelModule } from '../loading-wheel';
import { LineChartComponent } from './line-chart.component';
import { TabbedLineChartGroupComponent } from './tabbed-line-chart-group/tabbed-line-chart-group.component';
var LineChartModule = (function () {
    function LineChartModule() {
    }
    return LineChartModule;
}());
export { LineChartModule };
LineChartModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    LineChartComponent,
                    TabbedLineChartGroupComponent
                ],
                declarations: [
                    LineChartComponent,
                    TabbedLineChartGroupComponent
                ],
                imports: [
                    CommonModule,
                    ChartModule,
                    LoadingWheelModule
                ],
                providers: [
                    DatePipe
                ]
            },] },
];
/** @nocollapse */
LineChartModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGluZS1jaGFydC9saW5lLWNoYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFjLFFBQUEsRUFBUyxNQUFPLGlCQUFBLENBQWtCO0FBQ3pELE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxpQkFBQSxDQUFrQjtBQUM5QyxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxrQkFBQSxDQUFtQjtBQUN0RCxPQUFPLEVBQUUsa0JBQUEsRUFBaUQsTUFBTyx3QkFBQSxDQUF5QjtBQUMxRixPQUFPLEVBQUUsNkJBQUEsRUFBOEIsTUFBTyw2REFBQSxDQUE4RDtBQUc1RztJQUFBO0lBdUJBLENBQUM7SUFBRCxzQkFBQztBQUFELENBdkJBLEFBdUJDOztBQXZCcUMsMEJBQVUsR0FBMEI7SUFDMUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyQixPQUFPLEVBQUU7b0JBQ0wsa0JBQWtCO29CQUNsQiw2QkFBNkI7aUJBQ2hDO2dCQUNELFlBQVksRUFBRTtvQkFDVixrQkFBa0I7b0JBQ2xCLDZCQUE2QjtpQkFDaEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxrQkFBa0I7aUJBQ3JCO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxRQUFRO2lCQUNYO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImxpbmUtY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==