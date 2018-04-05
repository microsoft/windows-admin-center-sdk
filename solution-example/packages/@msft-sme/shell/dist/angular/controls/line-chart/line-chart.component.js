import 'chart.js';
import { DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
export var LineChartType;
(function (LineChartType) {
    /**
     * Line chart takes in data as number[]
     */
    LineChartType[LineChartType["Line"] = 1] = "Line";
    /**
     * Scatter chart takes in data as ChartPoint[] with x and y coordinates
     */
    LineChartType[LineChartType["Scatter"] = 2] = "Scatter";
    /**
     * Historical chart takes in data at ChartPoint[] with x and y coordinates
     * x coordinates or historical chart are in the format of an integer timestamp
     * so that the tooltips can format the appropriate date
     */
    LineChartType[LineChartType["Historical"] = 3] = "Historical";
})(LineChartType || (LineChartType = {}));
var LineChartComponent = (function () {
    function LineChartComponent(datePipe) {
        this.datePipe = datePipe;
        this.gradientStartColor = 'rgba(201, 212, 217, 1.000)';
        this.gradientStopColor = 'rgba(255, 255, 255, 1.000)';
        this.chartLineGray = '#8397A0';
        this.overrideData = {
            borderColor: this.chartLineGray,
            borderWidth: 2,
            pointHoverBackgroundColor: this.chartLineGray
        };
    }
    /**
     * Angular lifecycle hook, called after the component is initialized
     */
    LineChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.validateChartType();
        this.chartOptions = {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return _this.getTooltipLabel(tooltipItem, data);
                    }
                }
            },
            scales: {
                yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                            min: 0,
                            max: this.lineChartData ? this.lineChartData.ymaxValue : undefined,
                            maxTicksLimit: 1
                        }
                    }],
                xAxes: [{
                        display: false,
                        ticks: {
                            min: this.lineChartData ? this.lineChartData.xAxisMin : undefined,
                            max: this.lineChartData ? this.lineChartData.xAxisMax : undefined
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ]
            },
            animation: {
                duration: 0
            },
            title: {
                display: false
            },
            legend: {
                display: false
            }
        };
    };
    /**
     * Angular lifecycle hook, called after the view is initialized
     */
    LineChartComponent.prototype.ngAfterViewInit = function () {
        this.refresh();
    };
    // Override user provided values to give the charts standard appearance across the whole application.
    LineChartComponent.prototype.override = function () {
        var _this = this;
        if (!this.chart || !this.lineChartData || !this.lineChartData.chartData || !this.lineChartData.chartData.datasets) {
            return;
        }
        var dataSets = this.lineChartData.chartData.datasets;
        if (dataSets.length === 1) {
            var canvas = this.chart.el.nativeElement.querySelector('canvas');
            var context = canvas.getContext('2d');
            var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0.000, this.gradientStartColor);
            gradient.addColorStop(0.845, this.gradientStopColor);
            dataSets[0].backgroundColor = gradient;
        }
        // TODO: Handling 3 or more datasets in the same chart
        if (dataSets.length === 2) {
            dataSets[1].borderDash = [5, 5];
            dataSets.forEach(function (ds) {
                ds.backgroundColor = 'rgba(0,0,0,0)';
            });
        }
        this.lineChartData.chartData.datasets.forEach(function (ds) {
            ds.borderColor = _this.overrideData.borderColor;
            ds.borderWidth = _this.overrideData.borderWidth;
            ds.pointHoverBackgroundColor = _this.overrideData.pointHoverBackgroundColor;
        });
    };
    /**
     * Throw error if consumer is trying to graph a scatter plot without x y coordinates
     */
    LineChartComponent.prototype.validateChartType = function () {
        var _this = this;
        if (!this.lineChartData) {
            return;
        }
        this.lineChartData.chartData.datasets.forEach(function (dataset) {
            // Note: this would be better written with a check on every element of the array,
            // However tsc is unable to typecheck Array.every on a union of array types.
            // So we assume the type is number[] if the first element is a number.
            var isNumArray = dataset.data && dataset.data.length > 0 && typeof dataset.data[0] === 'number';
            if (isNumArray && _this.lineChartData && _this.lineChartData.type && _this.lineChartData.type !== LineChartType.Line) {
                throw new Error('Historical and Scatter chart types require all dataset data to be of type ChartPoint[]');
            }
        });
    };
    /**
     * return the string for the type of line chart
     * @param type the type of line chart
     */
    LineChartComponent.prototype.getTypeString = function (type) {
        return type === LineChartType.Scatter || type === LineChartType.Historical ? 'scatter' : 'line';
    };
    /**
     * Returns tool tip label according to the type of chart being used
     * @param tooltipItem - the specific item that needs a tooltip
     * @param data - the linearchartdata object
     */
    LineChartComponent.prototype.getTooltipLabel = function (tooltipItem, data) {
        var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        var value = '';
        var label = '';
        if (this.lineChartData.type === LineChartType.Historical) {
            // this is where tooltip pretty printing needs to happen
            value = this.tooltipFormatter ? this.tooltipFormatter(dataPoint.y) : dataPoint.y;
            label = this.datePipe.transform(dataPoint.x, 'short');
        }
        else if (this.lineChartData.type === LineChartType.Scatter) {
            value = this.tooltipFormatter ? this.tooltipFormatter(dataPoint.y) : dataPoint.y;
            label = dataPoint.x;
        }
        else {
            var tmpValue = dataPoint.y ? dataPoint.y : dataPoint;
            value = this.tooltipFormatter ? this.tooltipFormatter(tmpValue) : tmpValue;
            label = data.labels[tooltipItem.index];
        }
        return '{0}: {1}'.format(label, value);
    };
    /**
     * Refresh the chart when new data is added to lineChartData input
     */
    LineChartComponent.prototype.refresh = function () {
        this.override();
        if (this.lineChartData && this.chartOptions) {
            var scalesChanged = this.chartOptions.scales.yAxes[0].ticks.max !== this.lineChartData.ymaxValue
                || this.chartOptions.scales.xAxes[0].ticks.min !== this.lineChartData.xAxisMin
                || this.chartOptions.scales.xAxes[0].ticks.max !== this.lineChartData.xAxisMax;
            if (scalesChanged) {
                this.chartOptions.scales.yAxes[0].ticks.max = this.lineChartData.ymaxValue;
                this.chartOptions.scales.xAxes[0].ticks.min = this.lineChartData.xAxisMin;
                this.chartOptions.scales.xAxes[0].ticks.max = this.lineChartData.xAxisMax;
                if (this.chart) {
                    this.chart.reinit();
                }
            }
        }
        if (this.chart) {
            this.chart.refresh();
        }
    };
    return LineChartComponent;
}());
export { LineChartComponent };
LineChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-line-chart',
                template: "\n      <div *ngIf=\"lineChartData\">\n        <div class=\"line-chart-header\"> {{ lineChartData.title }}</div>\n\n        <div class=\"line-chart-subheader\">\n          <div *ngIf=\"lineChartData.currentValueLabel\">{{ lineChartData.currentValueLabel }}<span class=\"line-chart-units\">{{ lineChartData.unitLabel }}</span></div>\n\n          <div *ngIf=\"lineChartData.firstCurrentValueLabel\" class=\"hero-values hero-legend\">\n            <span class=\"line-chart-units\">{{ lineChartData.firstLabel }}</span>\n            <span class=\"current-value\">{{ lineChartData.firstCurrentValueLabel }}</span>\n          </div>\n          <div *ngIf=\"lineChartData.secondCurrentValueLabel\" class=\"hero-values hero-legend-dotted\">\n            <span class=\"line-chart-units\">{{ lineChartData.secondLabel }}</span>\n            <span class=\"current-value\">{{ lineChartData.secondCurrentValueLabel }}</span>\n          </div>\n          <div *ngIf=\"lineChartData.totalCurrentValueLabel\" class=\"hero-values\">\n            <span class=\"line-chart-units\">{{ lineChartData.totalLabel }}</span>\n            <span class=\"current-value\" >{{ lineChartData.totalCurrentValueLabel }}</span>\n          </div>\n\n        </div>\n\n        <div class=\"flex-layout\">\n          <div class=\"line-chart-container\">\n            <p-chart class=\"fixed-flex-size line-chart\" #linechart [type]=\"getTypeString(lineChartData.type)\" [data]=\"lineChartData.chartData\"\n            [options]=\"chartOptions\"></p-chart>\n            <div class=\"scale-limit x-axis-label\">\n              <div class=\"pull-left\">{{ lineChartData.xAxisMaxLabel }}</div>\n              <div class=\"pull-right\">{{ lineChartData.xAxisMinLabel }}</div>\n            </div>\n          </div>\n          <div class=\"auto-flex-size flex-layout vertical y-axis-label scale-limit\">\n            <div class=\"pull-right no-wrap\">{{ lineChartData.yAxisMaxLabel }}</div>\n            <div class=\"pull-right no-wrap\">{{ lineChartData.yAxisMinLabel }}</div>\n          </div>\n        </div>\n\n      </div>\n    ",
                styles: ["\n      .line-chart-header{\n          font-size: 15px;\n          vertical-align: middle;\n          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n          color: #333333;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          white-space: nowrap;\n          margin-bottom: 2px;\n      }\n\n      .line-chart-subheader{\n          color: #333333;\n          font-size: 24px;\n          line-height: 24px;\n          font-weight: 600;\n          margin-bottom: 38px;\n      }\n\n      .hero-values {\n          display: inline-block;\n          margin-right: 5px;\n      }\n\n      .hero-legend {\n          border-left: 3px solid #8397a0;\n      }\n\n      .hero-legend-dotted {\n          border-left: 3px dotted #8397a0;\n      }\n\n      .current-value {\n          font-size: 15px;\n      }\n\n      .line-chart-units {\n          color: #333333;\n          margin-left: 3px;\n          font-size: 15px;\n          font-weight: 400;\n          line-height: 15px;\n      }\n\n      .scale-limit {\n          font-size: 11px;\n          color: #686868;\n          height: 14px;\n          line-height: 11px;\n      }\n\n      .line-chart{\n          border-right: 1px solid #DDDDDD;\n          border-bottom: 1px solid #DDDDDD;\n          display: block;\n      }\n\n      .line-chart-container {\n        width: 100%;\n      }\n\n      .y-axis-label {\n          margin-left: 6px;\n          margin-bottom: 20px;\n          justify-content: space-between;\n          height: inherit;\n      }\n\n      .x-axis-label {\n          margin-top: 6px;\n      }\n    "],
                providers: [DatePipe]
            },] },
];
/** @nocollapse */
LineChartComponent.ctorParameters = function () { return [
    { type: DatePipe, },
]; };
LineChartComponent.propDecorators = {
    'chart': [{ type: ViewChild, args: ['linechart',] },],
    'tooltipFormatter': [{ type: Input },],
    'lineChartData': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGluZS1jaGFydC9saW5lLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQUEsQ0FBVztBQUVsQixPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8saUJBQUEsQ0FBa0I7QUFDM0MsT0FBTyxFQUFpQixTQUFBLEVBQVcsS0FBQSxFQUFlLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLbkYsTUFBTSxDQUFOLElBQVksYUFpQlg7QUFqQkQsV0FBWSxhQUFBO0lBQ1I7O09BRUc7SUFDSCxpREFBTyxDQUFBO0lBRVA7O09BRUc7SUFDSCx1REFBVSxDQUFBO0lBRVY7Ozs7T0FJRztJQUNILDZEQUFhLENBQUE7QUFDakIsQ0FBQyxFQWpCVyxhQUFBLEtBQUEsYUFBQSxRQWlCWDtBQXlCRDtJQWtCSSw0QkFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVRyQix1QkFBa0IsR0FBRyw0QkFBNEIsQ0FBQztRQUNsRCxzQkFBaUIsR0FBRyw0QkFBNEIsQ0FBQztRQUNqRCxrQkFBYSxHQUFHLFNBQVMsQ0FBQztRQUMxQixpQkFBWSxHQUFrQjtZQUMzQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDL0IsV0FBVyxFQUFFLENBQUM7WUFDZCx5QkFBeUIsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNoRCxDQUFDO0lBRXdDLENBQUM7SUFFM0M7O09BRUc7SUFDSSxxQ0FBUSxHQUFmO1FBQUEsaUJBMENDO1FBekNHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDaEIsUUFBUSxFQUFFO2dCQUNOLFNBQVMsRUFBRTtvQkFDUCxLQUFLLEVBQUUsVUFBQyxXQUFXLEVBQUUsSUFBSTt3QkFDckIsTUFBTSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuRCxDQUFDO2lCQUNK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