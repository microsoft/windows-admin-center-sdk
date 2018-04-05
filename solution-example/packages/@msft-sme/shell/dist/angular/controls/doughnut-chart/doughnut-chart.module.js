import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/primeng';
import { CapacityDoughnutChartComponent } from './capacity-doughnut-chart/capacity-doughnut-chart.component';
import { DoughnutChartComponent } from './doughnut-chart.component';
var DoughnutChartModule = (function () {
    function DoughnutChartModule() {
    }
    return DoughnutChartModule;
}());
export { DoughnutChartModule };
DoughnutChartModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    DoughnutChartComponent,
                    CapacityDoughnutChartComponent
                ],
                declarations: [
                    DoughnutChartComponent,
                    CapacityDoughnutChartComponent
                ],
                imports: [
                    CommonModule,
                    ChartModule
                ]
            },] },
];
/** @nocollapse */
DoughnutChartModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZG91Z2hudXQtY2hhcnQvZG91Z2hudXQtY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsV0FBQSxFQUFZLE1BQU8saUJBQUEsQ0FBa0I7QUFDOUMsT0FBTyxFQUFFLDhCQUFBLEVBQStCLE1BQU8sNkRBQUEsQ0FBOEQ7QUFDN0csT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNEJBQUEsQ0FBNkI7QUFHcEU7SUFBQTtJQW1CQSxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQW5CQSxBQW1CQzs7QUFuQnlDLDhCQUFVLEdBQTBCO0lBQzlFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFO29CQUNMLHNCQUFzQjtvQkFDdEIsOEJBQThCO2lCQUNqQztnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysc0JBQXNCO29CQUN0Qiw4QkFBOEI7aUJBQ2pDO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7aUJBQ2Q7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiZG91Z2hudXQtY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==