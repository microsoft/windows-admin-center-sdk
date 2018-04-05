import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/primeng';
import { LoadingWheelModule } from '../loading-wheel';
import { LineChartComponent } from './line-chart.component';
import { TabbedLineChartGroupComponent } from './tabbed-line-chart-group/tabbed-line-chart-group.component';
var LineChartModule = /** @class */ (function () {
    function LineChartModule() {
    }
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
    return LineChartModule;
}());
export { LineChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGluZS1jaGFydC9saW5lLWNoYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBQSxFQUFjLFFBQUEsRUFBUyxNQUFPLGlCQUFBLENBQWtCO0FBQ3pELE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxpQkFBQSxDQUFrQjtBQUM5QyxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxrQkFBQSxDQUFtQjtBQUN0RCxPQUFPLEVBQUUsa0JBQUEsRUFBaUQsTUFBTyx3QkFBQSxDQUF5QjtBQUMxRixPQUFPLEVBQUUsNkJBQUEsRUFBOEIsTUFBTyw2REFBQSxDQUE4RDtBQUc1RztJQUFBO0lBdUJBLENBQUM7SUF2QnFDLDBCQUFVLEdBQTBCO1FBQzFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFO3dCQUNMLGtCQUFrQjt3QkFDbEIsNkJBQTZCO3FCQUNoQztvQkFDRCxZQUFZLEVBQUU7d0JBQ1Ysa0JBQWtCO3dCQUNsQiw2QkFBNkI7cUJBQ2hDO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsa0JBQWtCO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsUUFBUTtxQkFDWDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsOEJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRixzQkFBQztDQXZCRCxBQXVCQyxJQUFBO1NBdkJZLGVBQWUiLCJmaWxlIjoibGluZS1jaGFydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9