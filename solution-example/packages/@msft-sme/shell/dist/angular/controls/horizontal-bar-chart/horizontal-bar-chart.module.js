import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/primeng';
import { CapacityBarChartComponent } from './capacity-bar-chart.component';
import { HorizontalBarChartComponent } from './horizontal-bar-chart.component';
var HorizontalBarChartModule = (function () {
    function HorizontalBarChartModule() {
    }
    return HorizontalBarChartModule;
}());
export { HorizontalBarChartModule };
HorizontalBarChartModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    HorizontalBarChartComponent,
                    CapacityBarChartComponent
                ],
                declarations: [
                    HorizontalBarChartComponent,
                    CapacityBarChartComponent
                ],
                imports: [
                    CommonModule,
                    ChartModule
                ]
            },] },
];
/** @nocollapse */
HorizontalBarChartModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvaG9yaXpvbnRhbC1iYXItY2hhcnQvaG9yaXpvbnRhbC1iYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsV0FBQSxFQUFZLE1BQU8saUJBQUEsQ0FBa0I7QUFDOUMsT0FBTyxFQUFFLHlCQUFBLEVBQTBCLE1BQU8sZ0NBQUEsQ0FBaUM7QUFDM0UsT0FBTyxFQUFFLDJCQUFBLEVBQTRCLE1BQU8sa0NBQUEsQ0FBbUM7QUFHL0U7SUFBQTtJQW1CQSxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQW5CQSxBQW1CQzs7QUFuQjhDLG1DQUFVLEdBQTBCO0lBQ25GLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFO29CQUNMLDJCQUEyQjtvQkFDM0IseUJBQXlCO2lCQUM1QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsMkJBQTJCO29CQUMzQix5QkFBeUI7aUJBQzVCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7aUJBQ2Q7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsdUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiaG9yaXpvbnRhbC1iYXItY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==