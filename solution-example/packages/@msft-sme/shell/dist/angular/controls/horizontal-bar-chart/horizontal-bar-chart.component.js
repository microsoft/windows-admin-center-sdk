import 'chart.js';
import { Component, Input, ViewChild } from '@angular/core';
/**
 * This component will create a horizontal bar chart with as many segments as desired. They will completely fill the width of the chart.
 */
var HorizontalBarChartComponent = (function () {
    function HorizontalBarChartComponent() {
        this.initialized = false;
    }
    HorizontalBarChartComponent.prototype.update = function (pData) {
        if (this.initialized) {
            this.data.datasets.forEach(function (dataset, index) {
                dataset.data = [pData[index]];
            });
            var chart = this.horizontalBarChart.chart;
            chart.update();
        }
    };
    HorizontalBarChartComponent.prototype.ngOnInit = function () {
        // set 50px as default height. Must be set here in the init.
        if (!this.height) {
            this.height = 50;
        }
        this.options = {
            legend: this.legend || { display: false },
            tooltips: this.tooltips || { enabled: false },
            animation: this.animation || false,
            // do not change these options:
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{
                        stacked: true,
                        // do not display the axes or tick marks!
                        display: false,
                        ticks: {
                            // only 2 tick marks: 0 and max, but not displayed at all so no padding, etc. the graph goes end to end!
                            maxTicksLimit: 2,
                            // max is total amount so the two (or more) segments always add up to full width
                            max: this.data.total
                        }
                    }],
                yAxes: [{
                        display: false
                    }]
            }
        };
    };
    HorizontalBarChartComponent.prototype.ngAfterViewInit = function () {
        this.initialized = true;
    };
    return HorizontalBarChartComponent;
}());
export { HorizontalBarChartComponent };
HorizontalBarChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-horizontal-bar-chart',
                template: "\n      <p-chart #horizontalBarChart class=\"auto-flex-size bar-chart\" type=\"horizontalBar\" [height]=\"height\" [data]=\"data\" [options]=\"options\"></p-chart>\n    ",
                styles: ["\n      .bar-chart{\n          display:block;\n          clear: both;\n      }\n\n      .stat-title {\n          font-weight: bold;\n      }\n\n      .divchart {\n          clear: both;\n          width: 100%;\n          background: #DDD;\n          position: relative;\n          z-index: 1;\n      }\n\n      .divchart-bar {\n          position: absolute;\n          left: 0;\n          top: 0;\n          height: inherit;\n          z-index: 2;\n      }\n    "]
            },] },
];
/** @nocollapse */
HorizontalBarChartComponent.ctorParameters = function () { return []; };
HorizontalBarChartComponent.propDecorators = {
    'legend': [{ type: Input },],
    'tooltips': [{ type: Input },],
    'animation': [{ type: Input },],
    'data': [{ type: Input },],
    'height': [{ type: Input },],
    'horizontalBarChart': [{ type: ViewChild, args: ['horizontalBarChart',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvaG9yaXpvbnRhbC1iYXItY2hhcnQvaG9yaXpvbnRhbC1iYXItY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBQSxDQUFXO0FBRWxCLE9BQU8sRUFBaUIsU0FBQSxFQUFXLEtBQUEsRUFBZSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSW5GOztHQUVHO0FBRUg7SUFBQTtRQW9DVyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQWdHL0IsQ0FBQztJQTVGVSw0Q0FBTSxHQUFiLFVBQWMsS0FBZTtRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSztnQkFDdEMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUNqRCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkIsQ0FBQztJQUNMLENBQUM7SUFFTSw4Q0FBUSxHQUFmO1FBQ0ksNERBQTREO1FBQzVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBa0I7WUFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUM3QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLO1lBRWxDLCtCQUErQjtZQUMvQixtQkFBbUIsRUFBRSxLQUFLO1lBQzFCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsQ0FBQzt3QkFDSixPQUFPLEVBQUUsSUFBSTt3QkFDYix5Q0FBeUM7d0JBQ3pDLE9BQU8sRUFBRSxLQUFLO3dCQUNkLEtBQUssRUFBRTs0QkFDSCx3R0FBd0c7NEJBQ3hHLGFBQWEsRUFBRSxDQUFDOzRCQUNoQixnRkFBZ0Y7NEJBQ2hGLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7eUJBQ3ZCO3FCQUNILENBQUM7Z0JBQ0gsS0FBSyxFQUFFLENBQUM7d0JBQ0osT0FBTyxFQUFFLEtBQUs7cUJBQ2hCLENBQUM7YUFDTjtTQUNKLENBQUM7SUFFTixDQUFDO0lBRU0scURBQWUsR0FBdEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBOENMLGtDQUFDO0FBQUQsQ0FwSUEsQUFvSUM7O0FBN0NNLHNDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFLDJLQUVUO2dCQUNELE1BQU0sRUFBRSxDQUFDLGdkQXlCUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDBDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBQ0ssMENBQWMsR0FBMkM7SUFDaEUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDNUIsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDOUIsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDL0IsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDMUIsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDNUIsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUcsRUFBRSxFQUFFO0NBQzNFLENBQUMiLCJmaWxlIjoiaG9yaXpvbnRhbC1iYXItY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==