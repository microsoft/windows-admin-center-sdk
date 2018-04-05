import { Component, ViewChild } from '@angular/core';
var DoughnutChartExampleComponent = /** @class */ (function () {
    function DoughnutChartExampleComponent() {
        this.doughnutChartData = [];
        this.capacityChartData = [];
        this.doughnutChartData.push({
            label: 'Computed',
            value: 50,
            color: 'blue'
        });
        this.doughnutChartData.push({
            label: 'Free',
            value: 50,
            color: '#DDD'
        });
        this.capacityChartData.push({
            label: 'VM',
            value: 80
        });
        this.capacityChartData.push({
            label: 'Non-VM',
            value: 16
        });
    }
    DoughnutChartExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-doughnut-chart';
    };
    DoughnutChartExampleComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // show yellow threshold
        setTimeout(function () {
            _this.capacityChartData[0].value = 72;
            _this.chart1.refresh();
            _this.chart2.refresh();
            _this.chart3.refresh();
        }, 5000);
        // show green threshold
        setTimeout(function () {
            _this.capacityChartData[0].value = 53;
            _this.chart1.refresh();
            _this.chart2.refresh();
            _this.chart3.refresh();
        }, 10000);
    };
    DoughnutChartExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-doughnut-chart-example',
                    template: "\n      <sme-doughnut-chart chartTitle=\"Storage\" [doughnutChartData]=\"doughnutChartData\" centerChartText=\"50GB\" centerChartSubtext=\"50GB free\"></sme-doughnut-chart>\n      <!-- TODO: make example tooltip -->\n      <sme-capacity-doughnut-chart #capacityChart1 chartTitle=\"Capacity Chart Wtih Default Thresholds\" [capacityChartData]=\"capacityChartData\" centerChartSubtext=\"space available\" [total]=\"100\" [showTooltip]=\"true\"></sme-capacity-doughnut-chart>\n      <sme-capacity-doughnut-chart #capacityChart2 chartTitle=\"Capacity Chart with No Red Threshold and Yellow Threshold of 0.6\" [capacityChartData]=\"capacityChartData\" centerChartSubtext=\"space available\" [total]=\"100\" [showTooltip]=\"true\" redThreshold=\"disabled\" [yellowThreshold]=\"0.6\"></sme-capacity-doughnut-chart>\n      <sme-capacity-doughnut-chart #capacityChart3 chartTitle=\"Capacity Chart With No Thresholds\" [capacityChartData]=\"capacityChartData\" centerChartSubtext=\"space available\" [total]=\"100\" [showTooltip]=\"true\" redThreshold=\"disabled\" yellowThreshold=\"disabled\"></sme-capacity-doughnut-chart>\n    "
                },] },
    ];
    /** @nocollapse */
    DoughnutChartExampleComponent.ctorParameters = function () { return []; };
    DoughnutChartExampleComponent.propDecorators = {
        'chart1': [{ type: ViewChild, args: ['capacityChart1',] },],
        'chart2': [{ type: ViewChild, args: ['capacityChart2',] },],
        'chart3': [{ type: ViewChild, args: ['capacityChart3',] },],
    };
    return DoughnutChartExampleComponent;
}());
export { DoughnutChartExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kb3VnaG51dC1jaGFydC9kb3VnaG51dC1jaGFydC1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQUEsRUFBVyxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBS3BFO0lBV0k7UUFQTyxzQkFBaUIsR0FBd0IsRUFBRSxDQUFDO1FBQzVDLHNCQUFpQixHQUFnQyxFQUFFLENBQUM7UUFPdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUN4QixLQUFLLEVBQUUsVUFBVTtZQUNqQixLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxNQUFNO1NBQ2hCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDeEIsS0FBSyxFQUFFLE1BQU07WUFDYixLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxNQUFNO1NBQ2hCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDeEIsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDeEIsS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUMsQ0FBQztJQUNQLENBQUM7SUExQmEsNkNBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLG9CQUFvQixDQUFDO0lBQ2hDLENBQUM7SUEwQk0sdURBQWUsR0FBdEI7UUFBQSxpQkFnQkM7UUFmRyx3QkFBd0I7UUFDeEIsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDckMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFVLElBQUksQ0FBQyxDQUFDO1FBRWpCLHVCQUF1QjtRQUN2QixVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNyQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQVUsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNFLHdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFLGttQ0FNVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNENBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDSyw0Q0FBYyxHQUEyQztRQUNoRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUcsRUFBRSxFQUFFO1FBQzVELFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRyxFQUFFLEVBQUU7UUFDNUQsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFHLEVBQUUsRUFBRTtLQUMzRCxDQUFDO0lBQ0Ysb0NBQUM7Q0F4RUQsQUF3RUMsSUFBQTtTQXhFWSw2QkFBNkIiLCJmaWxlIjoiZG91Z2hudXQtY2hhcnQtZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9