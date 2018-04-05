import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
var CapacityDoughnutChartComponent = (function () {
    function CapacityDoughnutChartComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
         * True to show the info button tooltip
         */
        this.showTooltip = false;
        /**
         * Sets the yellow threshold. Default is 0.75, use yellowThreshold='disabled' to disable
         */
        this.yellowThreshold = 0.75;
        /**
         * Sets the red threshold. Default is 0.9, use redThreshold='disabled' to disable
         */
        this.redThreshold = 0.9;
        /**
         * Emits tool tip toggled event
         */
        this.onTooltipToggle = new EventEmitter();
        this.doughnutChartData = [];
        this.strings = MsftSme.resourcesStrings();
    }
    CapacityDoughnutChartComponent.prototype.ngOnInit = function () {
        this.updateChartData();
    };
    CapacityDoughnutChartComponent.prototype.getColorScheme = function (amountUsed) {
        var greenColorScheme = ['#02a28c', '#1bdbb6'];
        var redColorScheme = ['#f64747', '#ffb6b6'];
        var yellowColorScheme = ['#Fbbc05', '#FFEB4D'];
        if (this.redThreshold !== 'disabled' && amountUsed / this.total > this.redThreshold) {
            return redColorScheme;
        }
        if (this.yellowThreshold !== 'disabled' && amountUsed / this.total > this.yellowThreshold) {
            return yellowColorScheme;
        }
        return greenColorScheme;
    };
    CapacityDoughnutChartComponent.prototype.updateChartData = function () {
        var freeColor = '#DDD';
        var amountUsed = 0;
        this.capacityChartData.forEach(function (x) { return amountUsed += x.value; });
        if (!this.total || this.total <= 0 || this.total < amountUsed) {
            throw new Error('Total must be defined as greater than both zero and the sum of values in the chart');
        }
        var amountFree = this.total - amountUsed;
        var percentUsed = MsftSme.round(amountUsed / this.total * 100, 1);
        this.percentUsedText = '{0}%'.format(percentUsed);
        var colorScheme = this.getColorScheme(amountUsed);
        if (this.capacityChartData.length > colorScheme.length) {
            throw new Error('Too many data entries for a capacity doughnut chart. Please use a generic doughnut chart with color scheme specified.');
        }
        this.doughnutChartData = [];
        for (var i = 0; i < this.capacityChartData.length; i++) {
            var valuePercent = MsftSme.round(this.capacityChartData[i].value / this.total * 100, 1);
            this.doughnutChartData.push({
                label: '{0} ({1}%)'.format(this.capacityChartData[i].label, valuePercent),
                value: this.capacityChartData[i].value,
                color: colorScheme[i],
                showLegend: true
            });
        }
        var percentFree = MsftSme.round(amountFree / this.total * 100, 1);
        this.doughnutChartData.push({
            label: '{0} ({1}%)'.format(this.strings.MsftSmeShell.Angular.Common.free, percentFree),
            value: amountFree,
            color: freeColor,
            showLegend: false
        });
    };
    /**
     * emit tool tip event
     */
    CapacityDoughnutChartComponent.prototype.toggleTooltip = function () {
        this.onTooltipToggle.emit();
    };
    /**
     * refresh the chart data
     */
    CapacityDoughnutChartComponent.prototype.refresh = function () {
        this.updateChartData();
        // TODO: figure out if there is a way to reliably refresh without detect changes
        this.changeDetectorRef.detectChanges();
        this.chart.refresh();
    };
    CapacityDoughnutChartComponent.prototype.ngOnDestroy = function () {
        this.changeDetectorRef.detach();
    };
    return CapacityDoughnutChartComponent;
}());
export { CapacityDoughnutChartComponent };
CapacityDoughnutChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-capacity-doughnut-chart',
                template: "\n      <sme-doughnut-chart #chart [chartTitle]=\"chartTitle\" [doughnutChartData]=\"doughnutChartData\" [centerChartText]=\"percentUsedText\"\n        [centerChartSubtext]=\"centerChartSubtext\" [showTooltip]=\"showTooltip\" (onTooltipToggle)=\"toggleTooltip()\"></sme-doughnut-chart>\n    ",
                styles: ["\n      .doughnut-container {\n          position: relative;\n          height: 180px;\n          width: 180px;\n          margin: 32px 24px;\n      }\n\n      .doughnut-title {\n          padding: 0;\n          top: 0;\n          left: 0;\n          text-align: center;\n          font-size: 15px;\n          color: #000000;\n          font-family: \"Segoe UI Semibold\",\"Segoe UI\",\"Selawik Semibold\",Tahoma,Verdana,Arial,sans-serif;\n      }\n\n      .doughnut-title-block {\n          height: 25px;\n      }\n\n      .doughnut-summary {\n          position: absolute;\n          width: 100%;\n          top: 66px;\n          left: 0;\n      }\n\n      .doughnut-center {\n          text-align: center;\n          font-size: 24px;\n          font-family: \"Segoe UI Semilight\",\"Segoe UI\",\"Selawik Semilight\",Tahoma,Verdana,Arial,sans-serif;\n          line-height: 24px;\n          color: #333333;\n      }\n\n      .doughnut-center-sub {\n          text-align: center;\n          font-size: 13px;\n          line-height: 13px;\n          margin-top: 4px;\n          color: #333333;\n      }\n\n      .doughnut-tooltip {\n          padding-left: 10px;\n      }\n\n      .legend-container{\n          width: 228px;\n          display: flex;\n          flex-wrap: wrap;\n          flex-direction: row;\n      }\n\n      .legend-entry {\n          vertical-align: middle;\n          padding-right: 18px;\n          font-size: 11px;\n          color: #666666\n      }\n\n      .legend-entry th {\n          padding: 0px;\n      }\n\n      .legend-box {\n          height: 16px;\n          width: 4px;\n          margin-right: 4px;\n      }\n    "]
            },] },
];
/** @nocollapse */
CapacityDoughnutChartComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
CapacityDoughnutChartComponent.propDecorators = {
    'chartTitle': [{ type: Input },],
    'capacityChartData': [{ type: Input },],
    'centerChartSubtext': [{ type: Input },],
    'total': [{ type: Input },],
    'showTooltip': [{ type: Input },],
    'yellowThreshold': [{ type: Input },],
    'redThreshold': [{ type: Input },],
    'onTooltipToggle': [{ type: Output },],
    'chart': [{ type: ViewChild, args: ['chart',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZG91Z2hudXQtY2hhcnQvY2FwYWNpdHktZG91Z2hudXQtY2hhcnQvY2FwYWNpdHktZG91Z2hudXQtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBQSxFQUFtQixTQUFBLEVBQVcsWUFBQSxFQUFjLEtBQUEsRUFBMEIsTUFBQSxFQUFRLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFrQnhIO0lBOENJLHdDQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXpCeEQ7O1dBRUc7UUFDSyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUU1Qjs7V0FFRztRQUNLLG9CQUFlLEdBQXFCLElBQUksQ0FBQztRQUVqRDs7V0FFRztRQUNLLGlCQUFZLEdBQXFCLEdBQUcsQ0FBQztRQUU3Qzs7V0FFRztRQUNLLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFHOUQsc0JBQWlCLEdBQXdCLEVBQUUsQ0FBQztRQUU1QyxZQUFPLEdBQVksT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7SUFFSCxDQUFDO0lBRXJELGlEQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVEQUFjLEdBQXRCLFVBQXVCLFVBQWtCO1FBQ3JDLElBQU0sZ0JBQWdCLEdBQWEsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBTSxjQUFjLEdBQWMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBTSxpQkFBaUIsR0FBYSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLFVBQVUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZ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LEVBQUUsU0FBUztZQUNoQixVQUFVLEVBQUUsS0FBSztTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxzREFBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksZ0RBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2QixnRkFBZ0Y7UUFDaEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLG9EQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFrR0wscUNBQUM7QUFBRCxDQWhPQSxBQWdPQzs7QUFqR00seUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUUscVNBR1Q7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsc25EQXdFUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDZDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztDQUMxQixFQUY2RixDQUU3RixDQUFDO0FBQ0ssNkNBQWMsR0FBMkM7SUFDaEUsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDaEMsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUN2QyxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3hDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzNCLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ2pDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDckMsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDbEMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUN0QyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUUsRUFBRTtDQUNqRCxDQUFDIiwiZmlsZSI6ImNhcGFjaXR5LWRvdWdobnV0LWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=