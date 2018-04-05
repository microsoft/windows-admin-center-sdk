import 'chart.js';
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * This component will create a horizontal bar chart two segments.
 *  The first segment represents the amount of total currently used, and the other repressing the free amount left out of  the total.
 *  They will completely fill the width of the chart.
 */
var CapacityBarChartComponent = /** @class */ (function () {
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
    CapacityBarChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-capacity-bar-chart',
                    template: "\n      <div *ngIf=\"chartTitle\" class=\"pull-left stat-title\">{{ chartTitle }}</div>\n      <div *ngIf=\"totalLabel\" class=\"pull-right\">\n          {{ totalMessage }}   \n          <span *ngIf=\"labelTooltip\" class=\"sme-icon sme-icon-unknown button-icon\" (mouseover)=\"toggleLabelTooltip()\" (mouseleave)=\"toggleLabelTooltip()\"></span>              \n      </div>\n\n      <div class=\"divchart\" [style.height]=\"heightStyle\">\n          <div class=\"divchart-bar\" [style.transition]=\"widthTransitionStyle\" [style.width]=\"displayPercentCapacity\" [style.background-color]=\"usedBarColor\" ></div>\n      </div>\n\n      <div *ngIf=\"usedLabel\" class=\"pull-left\">{{ usedMessage }}</div>\n      <div *ngIf=\"freeLabel\" class=\"pull-right\">{{ freeMessage }}</div>\n    ",
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
    return CapacityBarChartComponent;
}());
export { CapacityBarChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvaG9yaXpvbnRhbC1iYXItY2hhcnQvY2FwYWNpdHktYmFyLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQUEsQ0FBVztBQUVsQixPQUFPLEVBQUUsU0FBQSxFQUFXLFlBQUEsRUFBYyxLQUFBLEVBQWUsTUFBQSxFQUFPLE1BQU8sZUFBQSxDQUFnQjtBQU0vRTs7OztHQUlHO0FBRUg7SUFBQTtRQXdEWSxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFhdEMsWUFBTyxHQUFZLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDO0lBZ0lsRSxDQUFDO0lBOUhVLDRDQUFRLEdBQWYsVUFBZ0IsZUFBc0MsRUFBRSxZQUFtQztRQUEzRSxnQ0FBQSxFQUFBLHFCQUFzQztRQUFFLDZCQUFBLEVBQUEsa0JBQW1DO1FBQ3ZGLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFNLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDOUIsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxVQUFVLElBQUksWUFBWSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsK0RBQStEO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN2QixDQUFDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRU0seURBQXFCLEdBQTVCLFVBQTZCLEtBQWlDO1FBQzFELElBQUks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