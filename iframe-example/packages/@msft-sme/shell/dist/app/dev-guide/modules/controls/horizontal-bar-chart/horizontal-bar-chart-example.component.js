import { Component, ViewChild, ViewChildren } from '@angular/core';
import { ByteUnitConverterPipe } from '../../../../../angular';
var HorizontalBarChartExampleComponent = /** @class */ (function () {
    function HorizontalBarChartExampleComponent() {
        this.showCapacityLabelTooltip = false;
        this.byteUnitConverter = new ByteUnitConverterPipe();
    }
    HorizontalBarChartExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-horizontal-bar-chart';
    };
    /**
     * Gets random data to demonstrate chart refreshing
     */
    HorizontalBarChartExampleComponent.prototype.getRandomDataForHorizontalBarChart = function () {
        var tmpTotal = 100;
        var tmpData0 = Math.floor(Math.random() * 30);
        var tmpData1 = Math.floor(Math.random() * 60);
        var tmpData2 = tmpTotal - tmpData0 - tmpData1;
        return [tmpData0, tmpData1, tmpData2];
    };
    HorizontalBarChartExampleComponent.prototype.getRandomDataForCapacityChart = function () {
        var randomTotal = 10000000000 * Math.random();
        var randomUsed = Math.random() * randomTotal;
        var freeCapacity = randomTotal - randomUsed;
        var usedLabel = this.byteUnitConverter.transform(randomUsed, 1024);
        var freeLabel = this.byteUnitConverter.transform(freeCapacity, 1024);
        var totalLabel = this.byteUnitConverter.transform(randomTotal, 1024);
        return {
            totalCapacity: randomTotal,
            capacityUsed: randomUsed,
            usedLabel: usedLabel,
            freeLabel: freeLabel,
            totalLabel: totalLabel
        };
    };
    HorizontalBarChartExampleComponent.prototype.redrawCharts = function () {
        var newHorizontalBarChartData = this.getRandomDataForHorizontalBarChart();
        this.chart1.update(newHorizontalBarChartData);
        var newCapacityData = this.getRandomDataForCapacityChart();
        this.chart2QueryList.forEach(function (chart) {
            chart.update(newCapacityData);
        });
    };
    HorizontalBarChartExampleComponent.prototype.getStartingData = function () {
        var total = 100;
        var data1 = 30;
        var data2 = 60;
        var data3 = total - data1 - data2;
        return {
            total: total,
            labels: [''],
            datasets: [
                {
                    label: 'bar 1',
                    backgroundColor: 'green',
                    data: [data1]
                },
                {
                    label: 'bar 2',
                    backgroundColor: 'orange',
                    data: [data2]
                },
                {
                    label: 'bar 3',
                    backgroundColor: 'black',
                    data: [data3]
                }
            ]
        };
    };
    HorizontalBarChartExampleComponent.prototype.ngOnInit = function () {
        var randomCapacityData = this.getRandomDataForCapacityChart();
        this.randomTotal = randomCapacityData.totalCapacity;
        this.randomUsed = randomCapacityData.capacityUsed;
        this.randomFree = this.randomTotal - this.randomUsed;
        this.multiBarData = this.getStartingData();
        this.legend = { display: true };
        this.tooltips = { enabled: true };
        this.animation = { duration: 1000 };
        this.criticalChartTotal = 100000000000;
        this.criticalChartUsed = 90807000000;
        this.criticalChartFree = this.criticalChartTotal - this.criticalChartUsed;
    };
    HorizontalBarChartExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-horizontal-bar-chart-example',
                    template: "\n      <h4>Multi-Bar Charts</h4>\n      <p>Chart uses default height of 50px. However, the legend does take up some of those 50px. So the height here is set to 75px. No tooltips here.</p>\n      <sme-horizontal-bar-chart [legend]=\"legend\" [height]=\"75\" [data]=\"multiBarData\"></sme-horizontal-bar-chart>\n\n      <p>Chart uses default height of 50px. No legend, but hover over the chart segments to see the tooltips.</p>\n      <sme-horizontal-bar-chart [tooltips]=\"tooltips\" [data]=\"multiBarData\"></sme-horizontal-bar-chart>\n    \n      <p>Animated: moves on chart load and redraw.</p>\n      <sme-horizontal-bar-chart [animation]=\"animation\" [data]=\"multiBarData\"></sme-horizontal-bar-chart>\n\n      <h4>Two-Bar Capacity Charts</h4>\n      <em>Capacity charts do not support chart tooltips or legends at this time! Label tooltips are supported.<em>\n      <p>Tooltip for top label. Hover over ? icon to expose tooltip. At a future point in time, the tooltip will be dismissable, but for now it is dismissed by mouseleave on ? icon.\n      <div class=\"col-md-24 clearfix\">\n          <div class=\"col-md-16\">\n              <sme-capacity-bar-chart (onTooltipToggle)=\"showCapacityLabelTooltip = !showCapacityLabelTooltip\" [labelTooltip]=\"true\" chartTitle=\"Capacity\" [totalLabel]=\"100 | smeByteUnitConverter:1024\" [usedLabel]=\"81 | smeByteUnitConverter:1024\" [freeLabel]=\"19 | smeByteUnitConverter:1024\" [totalCapacity]=\"100\" [capacityUsed]=\"81\"></sme-capacity-bar-chart>\n          </div>\n          <div *ngIf=\"showCapacityLabelTooltip\" class=\"col-md-8\">The component for tooltip will go here.</div>\n          <!--TODO: make the tooltip dismissable and have that close the tooltip rather than a mosueleave event!-->\n      </div>\n\n      <sme-capacity-bar-chart chartTitle=\"Capacity Chart OK\" [totalCapacity]=\"100\" [capacityUsed]=\"79\"></sme-capacity-bar-chart>\n\n      <p>Chart uses default height of 50px. However, the legend does take up some of those 50px.</p>\n      <sme-capacity-bar-chart chartTitle=\"Capacity Chart Warning\" totalLabel=\"100 units\" [totalCapacity]=\"100\" [capacityUsed]=\"89\"></sme-capacity-bar-chart>\n\n      <p>Animated: moves on chart load and redraw.</p>\n      <sme-capacity-bar-chart  chartTitle=\"Capacity Chart Critical\" [animationTime]=\"1000\" [totalLabel]=\"criticalChartTotal | smeByteUnitConverter:1024\" [usedLabel]=\"criticalChartUsed | smeByteUnitConverter:1024\" [freeLabel]=\"criticalChartFree | smeByteUnitConverter:1024\" [totalCapacity]=\"criticalChartTotal\" [capacityUsed]=\"criticalChartUsed\" ></sme-capacity-bar-chart>\n\n      <p> Warning threshold and Critical threshold have been disabled. The chart will always be blue.</p>\n      <sme-capacity-bar-chart criticalAt=\"disabled\"  chartTitle=\"Capacity Chart Critical and Warning Colors Disabled\" [totalLabel]=\"criticalChartTotal | smeByteUnitConverter:1024\" [usedLabel]=\"criticalChartUsed | smeByteUnitConverter:1024\" [freeLabel]=\"criticalChartFree | smeByteUnitConverter:1024\" [totalCapacity]=\"criticalChartTotal\" [capacityUsed]=\"criticalChartUsed\" ></sme-capacity-bar-chart>\n\n      <p>This chart has no labels and no title. Warning threshold has been set to 25% instead of default 80%.</p>\n      <sme-capacity-bar-chart [warningAt]=\"0.25\"  [height]=\"25\" [totalCapacity]=\"100\" [capacityUsed]=\"25\"></sme-capacity-bar-chart>\n\n      <p>This chart has no labels and no title. Height changed to 10 px instead of default 50px. Critical threshold has been set to 12% instead of default 90%.</p>\n      <sme-capacity-bar-chart [criticalAt]=\"0.12\"  [height]=\"10\" [totalCapacity]=\"100\" [capacityUsed]=\"12\"></sme-capacity-bar-chart>\n\n      <h4>Redrawing Charts</h4>\n      <p>Click this button to redraw the two charts below.</p>\n      <button (click)=\"redrawCharts()\">Redraw</button>\n      <p>This chart updates with random data, without animation. </p>\n      <sme-horizontal-bar-chart #chart1 [data]=\"multiBarData\"></sme-horizontal-bar-chart>\n      <p>Capacity chart updating with random data, and the animation occurs again on update.</p>\n      <sme-capacity-bar-chart #chart2a [animationTime]=\"5000\"  chartTitle=\"Random Data\" [totalLabel]=\"randomTotal | smeByteUnitConverter:1024\" [usedLabel]=\"randomUsed | smeByteUnitConverter:1024\" [freeLabel]=\"randomFree | smeByteUnitConverter:1024\" [totalCapacity]=\"randomTotal\" [capacityUsed]=\"randomUsed\"></sme-capacity-bar-chart>\n      <p>Same Chart but without animation</p>\n      <sme-capacity-bar-chart #chart2b chartTitle=\"Random Data\" [totalLabel]=\"randomTotal | smeByteUnitConverter:1024\" [usedLabel]=\"randomUsed | smeByteUnitConverter:1024\" [freeLabel]=\"randomFree | smeByteUnitConverter:1024\" [totalCapacity]=\"randomTotal\" [capacityUsed]=\"randomUsed\"></sme-capacity-bar-chart>\n    "
                },] },
    ];
    /** @nocollapse */
    HorizontalBarChartExampleComponent.ctorParameters = function () { return []; };
    HorizontalBarChartExampleComponent.propDecorators = {
        'chart1': [{ type: ViewChild, args: ['chart1',] },],
        'chart2QueryList': [{ type: ViewChildren, args: ['chart2a, chart2b',] },],
    };
    return HorizontalBarChartExampleComponent;
}());
export { HorizontalBarChartExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9ob3Jpem9udGFsLWJhci1jaGFydC9ob3Jpem9udGFsLWJhci1jaGFydC1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE4QixTQUFBLEVBQVcsWUFBQSxFQUFhLE1BQU8sZUFBQSxDQUFnQjtBQUV0RixPQUFPLEVBRUgscUJBQXFCLEVBS3hCLE1BQU0sd0JBQUEsQ0FBeUI7QUFHaEM7SUFBQTtRQWNXLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUtqQyxzQkFBaUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7SUF3SjNELENBQUM7SUF0SmlCLGtEQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrRUFBa0MsR0FBekM7UUFDSSxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFOUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sMEVBQTZCLEdBQXBDO1FBQ0ksSUFBSSxXQUFXLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDO1FBQzdDLElB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QyxpQkFBaUIsQ0FBQztJQUM5RSxDQUFDO0lBQ0UsNkNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxRQUFRLEVBQUUseXZKQWdEVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsaURBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDSyxpREFBYyxHQUEyQztRQUNoRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFHLEVBQUUsRUFBRTtRQUNwRCxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRyxFQUFFLEVBQUU7S0FDekUsQ0FBQztJQUNGLHlDQUFDO0NBM0tELEFBMktDLElBQUE7U0EzS1ksa0NBQWtDIiwiZmlsZSI6Imhvcml6b250YWwtYmFyLWNoYXJ0LWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==