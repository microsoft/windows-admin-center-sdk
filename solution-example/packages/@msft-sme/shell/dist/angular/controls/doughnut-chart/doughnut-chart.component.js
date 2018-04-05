import 'chart.js';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
var DoughnutChartComponent = (function () {
    function DoughnutChartComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
         * List of data to be shown on the chart
         */
        this.doughnutChartData = [];
        /**
         * True to display the info button tooltip
         */
        this.showTooltip = false;
        /**
         * Emits tooltip toggled event
         */
        this.onTooltipToggle = new EventEmitter();
    }
    DoughnutChartComponent.prototype.ngOnInit = function () {
        this.options = {
            animation: false,
            cutoutPercentage: 95.55,
            tooltips: {
                enabled: false
            },
            maintainAspectRatio: true,
            responsive: true,
            title: {
                display: false
            },
            legend: {
                display: false
            }
        };
        this.updateChartData();
    };
    DoughnutChartComponent.prototype.updateChartData = function () {
        var labels = [];
        var values = [];
        var colors = [];
        var borderwidth = [];
        this.doughnutChartData.forEach(function (chartData) {
            labels.push(chartData.label);
            values.push(chartData.value);
            colors.push(chartData.color);
            borderwidth.push(0);
        });
        this.data = {
            datasets: [
                {
                    labels: labels,
                    backgroundColor: colors,
                    borderWidth: borderwidth,
                    data: values
                }
            ]
        };
    };
    /**
     * refreshed the chart data
     */
    DoughnutChartComponent.prototype.refresh = function () {
        this.updateChartData();
        // TODO: figure out if there is a way to reliably refresh without detect changes
        this.changeDetectorRef.detectChanges();
        this.chart.refresh();
    };
    /**
     * emits event on tool tip toggled
     */
    DoughnutChartComponent.prototype.toggleTooltip = function () {
        this.onTooltipToggle.emit();
    };
    DoughnutChartComponent.prototype.ngOnDestroy = function () {
        this.changeDetectorRef.detach();
    };
    return DoughnutChartComponent;
}());
export { DoughnutChartComponent };
DoughnutChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-doughnut-chart',
                template: "\n      <div class=\"doughnut-title-block\">\n        <div class=\"doughnut-title pull-left\">{{chartTitle}}</div>\n        <div *ngIf=\"showTooltip\" class=\"sme-icon icon-win-info pull-left doughnut-tooltip\" (click)=\"toggleTooltip()\"></div>\n      </div>\n\n      <!-- TODO: wrap legend entries -->\n      <div class=\"legend-container\">\n        <div *ngFor=\"let data of doughnutChartData\">\n          <div class=\"legend-entry\" *ngIf=\"data.showLegend\">\n            <th>\n              <div class=\"legend-box\" [ngStyle]=\"{'background-color': data.color}\"></div>\n            </th>\n            <td>\n              {{data.label}}\n            </td>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"doughnut-container\">\n        <p-chart class=\"auto-flex-size\" #chart type=\"doughnut\" [data]=\"data\" [options]=\"options\"></p-chart>\n        <div class=\"doughnut-summary\">\n          <div class=\"doughnut-center\">{{ centerChartText }}</div>\n          <div class=\"doughnut-center-sub\">{{ centerChartSubtext }}</div>\n        </div>\n      </div>\n    ",
                styles: ["\n      .doughnut-container {\n          position: relative;\n          height: 180px;\n          width: 180px;\n          margin: 32px 24px;\n      }\n\n      .doughnut-title {\n          padding: 0;\n          top: 0;\n          left: 0;\n          text-align: center;\n          font-size: 15px;\n          color: #000000;\n          font-family: \"Segoe UI Semibold\",\"Segoe UI\",\"Selawik Semibold\",Tahoma,Verdana,Arial,sans-serif;\n      }\n\n      .doughnut-title-block {\n          height: 25px;\n      }\n\n      .doughnut-summary {\n          position: absolute;\n          width: 100%;\n          top: 66px;\n          left: 0;\n      }\n\n      .doughnut-center {\n          text-align: center;\n          font-size: 24px;\n          font-family: \"Segoe UI Semilight\",\"Segoe UI\",\"Selawik Semilight\",Tahoma,Verdana,Arial,sans-serif;\n          line-height: 24px;\n          color: #333333;\n      }\n\n      .doughnut-center-sub {\n          text-align: center;\n          font-size: 13px;\n          line-height: 13px;\n          margin-top: 4px;\n          color: #333333;\n      }\n\n      .doughnut-tooltip {\n          padding-left: 10px;\n      }\n\n      .legend-container{\n          width: 228px;\n          display: flex;\n          flex-wrap: wrap;\n          flex-direction: row;\n      }\n\n      .legend-entry {\n          vertical-align: middle;\n          padding-right: 18px;\n          font-size: 11px;\n          color: #666666\n      }\n\n      .legend-entry th {\n          padding: 0px;\n      }\n\n      .legend-box {\n          height: 16px;\n          width: 4px;\n          margin-right: 4px;\n      }\n    "]
            },] },
];
/** @nocollapse */
DoughnutChartComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
DoughnutChartComponent.propDecorators = {
    'doughnutChartData': [{ type: Input },],
    'chartTitle': [{ type: Input },],
    'centerChartText': [{ type: Input },],
    'centerChartSubtext': [{ type: Input },],
    'showTooltip': [{ type: Input },],
    'onTooltipToggle': [{ type: Output },],
    'chart': [{ type: ViewChild, args: ['chart',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZG91Z2hudXQtY2hhcnQvZG91Z2hudXQtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBQSxDQUFXO0FBRWxCLE9BQU8sRUFBRSxpQkFBQSxFQUFtQixTQUFBLEVBQVcsWUFBQSxFQUFjLEtBQUEsRUFBMEIsTUFBQSxFQUFRLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUEwQnhIO0lBa0NJLGdDQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQWpDeEQ7O1dBRUc7UUFDSyxzQkFBaUIsR0FBd0IsRUFBRSxDQUFDO1FBaUJwRDs7V0FFRztRQUNLLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTVCOztXQUVHO1FBQ0ssb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUtULENBQUM7SUFFdEQseUNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxTQUFTLEVBQUUsS0FBSztZQUNoQixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLFFBQVEsRUFBRTtnQkFDTixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELG1CQUFtQixFQUFFLElBQUk7WUFDekIsVUFBVSxFQUFFLElBQUk7WUFDaEIsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sZ0RBQWUsR0FBdEI7UUFDSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDUixRQUFRLEVBQUU7Z0JBQ047b0JBQ0ksTUFBTSxFQUFFLE1BQU07b0JBQ2QsZUFBZSxFQUFFLE1BQU07b0JBQ3ZCLFdBQVcsRUFBRSxXQUFXO29CQUN4QixJQUFJLEVBQUUsTUFBTTtpQkFDZjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNJLHdDQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsZ0ZBQWdGO1FBQ2hGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNJLDhDQUFhLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRU0sNENBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQXdITCw2QkFBQztBQUFELENBNU5BLEFBNE5DOztBQXZITSxpQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSw0a0NBMkJUO2dCQUNELE1BQU0sRUFBRSxDQUFDLHNuREF3RVIsQ0FBQzthQUNMLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxxQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7Q0FDMUIsRUFGNkYsQ0FFN0YsQ0FBQztBQUNLLHFDQUFjLEdBQTJDO0lBQ2hFLG1CQUFtQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDdkMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDaEMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNyQyxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3hDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ2pDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDdEMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRyxFQUFFLEVBQUU7Q0FDakQsQ0FBQyIsImZpbGUiOiJkb3VnaG51dC1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9