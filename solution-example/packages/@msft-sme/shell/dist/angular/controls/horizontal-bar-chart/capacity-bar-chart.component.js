import 'chart.js';
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * This component will create a horizontal bar chart two segments.
 *  The first segment represents the amount of total currently used, and the other repressing the free amount left out of  the total.
 *  They will completely fill the width of the chart.
 */
var CapacityBarChartComponent = (function () {
    function CapacityBarChartComponent() {
        this.onTooltipToggle = new EventEmitter();
        this.strings = MsftSme.resourcesStrings();
    }
    CapacityBarChartComponent.prototype.getColor = function (yellowThreshold, redThreshold) {
        if (yellowThreshold === void 0) { yellowThreshold = 0.8; }
        if (redThreshold === void 0) { redThreshold = 0.9; }
        var redColor = '#f64747';
        var yellowColor = '#fbbc05';
        var greenColor = '#02a28c';
        if (yellowThreshold === 'disabled' || redThreshold === 'disabled') {
            return greenColor;
        }
        // determine the color for the bar chart based on capacity used
        if (this.percentCapacity >= redThreshold) {
            return redColor;
        }
        if (this.percentCapacity >= yellowThreshold) {
            return yellowColor;
        }
        return greenColor;
    };
    CapacityBarChartComponent.prototype.prepareInputDataForUX = function (pData) {
        this.freeCapacity = pData.totalCapacity - pData.capacityUsed;
        this.percentCapacity = pData.totalCapacity > 0 ? pData.capacityUsed / pData.totalCapacity : 0;
        this.displayPercentCapacity = '{0}%'.format(Math.round(this.percentCapacity * 100));
        // update the chart used and free labels if it has them already
        this.usedLabel = this.usedLabel ? pData.usedLabel : '';
        this.freeLabel = this.freeLabel ? pData.freeLabel : '';
        this.totalLabel = this.totalLabel ? pData.totalLabel : '';
        this.totalMessage = this.strings.MsftSmeShell.Angular.CapacityBarChart.totalFormat.format(this.totalLabel);
        this.usedMessage = this.strings.MsftSmeShell.Angular.CapacityBarChart.usedFormat.format(this.usedLabel, this.displayPercentCapacity);
        this.freeMessage = this.strings.MsftSmeShell.Angular.CapacityBarChart.freeFormat.format(this.freeLabel);
        this.usedBarColor = this.getColor(this.warningAt, this.criticalAt);
    };
    CapacityBarChartComponent.prototype.update = function (pData) {
        this.prepareInputDataForUX(pData);
    };
    CapacityBarChartComponent.prototype.toggleLabelTooltip = function () {
        this.onTooltipToggle.emit();
    };
    CapacityBarChartComponent.prototype.ngOnInit = function () {
        this.height = this.height ? this.height : 36; // set default height
        this.animationTime = this.animationTime ? this.animationTime : 0; // set no animation as default
        this.widthTransitionStyle = 'width {0}ms'.format(this.animationTime);
        this.heightStyle = '{0}px'.format(this.height);
        var initialData = {
            totalCapacity: this.totalCapacity,
            capacityUsed: this.capacityUsed,
            usedLabel: this.usedLabel,
            freeLabel: this.freeLabel,
            totalLabel: this.totalLabel
        };
        this.prepareInputDataForUX(initialData);
    };
    return CapacityBarChartComponent;
}());
export { CapacityBarChartComponent };
CapacityBarChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-capacity-bar-chart',
                template: "\n      <div *ngIf=\"chartTitle\" class=\"pull-left stat-title\">{{ chartTitle }}</div>\n      <div *ngIf=\"totalLabel\" class=\"pull-right\">\n          {{ totalMessage }}   \n          <span *ngIf=\"labelTooltip\" class=\"sme-icon icon-win-unknown button-icon\" (mouseover)=\"toggleLabelTooltip()\" (mouseleave)=\"toggleLabelTooltip()\"></span>              \n      </div>\n\n      <div class=\"divchart\" [style.height]=\"heightStyle\">\n          <div class=\"divchart-bar\" [style.transition]=\"widthTransitionStyle\" [style.width]=\"displayPercentCapacity\" [style.background-color]=\"usedBarColor\" ></div>\n      </div>\n\n      <div *ngIf=\"usedLabel\" class=\"pull-left\">{{ usedMessage }}</div>\n      <div *ngIf=\"freeLabel\" class=\"pull-right\">{{ freeMessage }}</div>\n    ",
                styles: ["\n      .bar-chart{\n          display:block;\n          clear: both;\n      }\n\n      .stat-title {\n          font-weight: bold;\n      }\n\n      .divchart {\n          clear: both;\n          width: 100%;\n          background: #DDD;\n          position: relative;\n          z-index: 1;\n      }\n\n      .divchart-bar {\n          position: absolute;\n          left: 0;\n          top: 0;\n          height: inherit;\n          z-index: 2;\n      }\n    "]
            },] },
];
/** @nocollapse */
CapacityBarChartComponent.ctorParameters = function () { return []; };
CapacityBarChartComponent.propDecorators = {
    'animationTime': [{ type: Input },],
    'height': [{ type: Input },],
    'capacityUsed': [{ type: Input },],
    'totalCapacity': [{ type: Input },],
    'warningAt': [{ type: Input },],
    'criticalAt': [{ type: Input },],
    'chartTitle': [{ type: Input },],
    'totalLabel': [{ type: Input },],
    'usedLabel': [{ type: Input },],
    'freeLabel': [{ type: Input },],
    'labelTooltip': [{ type: Input },],
    'onTooltipToggle': [{ type: Output },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvaG9yaXpvbnRhbC1iYXItY2hhcnQvY2FwYWNpdHktYmFyLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQUEsQ0FBVztBQUVsQixPQUFPLEVBQUUsU0FBQSxFQUFXLFlBQUEsRUFBYyxLQUFBLEVBQWUsTUFBQSxFQUFPLE1BQU8sZUFBQSxDQUFnQjtBQU0vRTs7OztHQUlHO0FBRUg7SUFBQTtRQXdEWSxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFhdEMsWUFBTyxHQUFZLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDO0lBZ0lsRSxDQUFDO0lBOUhVLDRDQUFRLEdBQWYsVUFBZ0IsZUFBc0MsRUFBRSxZQUFtQztRQUEzRSxnQ0FBQSxFQUFBLHFCQUFzQztRQUFFLDZCQUFBLEVBQUEsa0JBQW1DO1FBQ3ZGLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFNLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDOUIsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxVQUFVLElBQUksWUFBWSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsK0RBQStEO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN2QixDQUFDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRU0seURBQXFCLEdBQTVCLFVBQTZCLEtBQWlDO1FBQzFELElBQUks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