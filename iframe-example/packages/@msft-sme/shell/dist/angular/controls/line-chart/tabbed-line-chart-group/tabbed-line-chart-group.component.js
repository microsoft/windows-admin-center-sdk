import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { LineChartComponent } from '../line-chart.component';
var TabbedLineChartGroupComponent = /** @class */ (function () {
    function TabbedLineChartGroupComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.chartsPerRow = 3;
        this.onTabClick = new EventEmitter();
    }
    TabbedLineChartGroupComponent.prototype.ngOnInit = function () {
        if (this.tabList) {
            this.selectedTab = MsftSme.first(this.tabList);
            this.getTabGroupDimensions();
            // tooltip formatting functions
            this.tooltipFormatters = this.tooltipFormatters ? this.tooltipFormatters : [];
            for (var i = 0; i < this.groupData.length; i++) {
                if (!this.tooltipFormatters[i]) {
                    // if no formatting funcion is supplied, then null ensures the data will not be formatted
                    this.tooltipFormatters[i] = null;
                }
            }
        }
        else {
            throw new Error('tabList input is required to render tabbed line chart group');
        }
    };
    TabbedLineChartGroupComponent.prototype.getTabGroupDimensions = function () {
        // two and three charts per row use custom css classes
        if (this.chartsPerRow !== 2 && this.chartsPerRow !== 3) {
            // add one to leave space for margins between graphs
            var tabPercent = 100 / (this.chartsPerRow + 1);
            this.tabGroupWidth = '{0}%'.format(tabPercent);
            this.tabGroupMargin = '16px';
        }
    };
    /**
     * Set selected tab and emit this event
     */
    TabbedLineChartGroupComponent.prototype.setTab = function (tab, index) {
        event.preventDefault();
        this.selectedTab = tab;
        this.onTabClick.emit(index);
        this.refresh();
    };
    /**
     * Refresh all of the charts when new data is added to lineChartData input
     */
    TabbedLineChartGroupComponent.prototype.refresh = function () {
        this.changeDetectorRef.detectChanges();
        if (this.lineChartComponents) {
            this.lineChartComponents.forEach(function (lineChart) {
                lineChart.refresh();
            });
        }
    };
    /**
     * Get line chart data for selected tab
     */
    TabbedLineChartGroupComponent.prototype.getLineChartData = function (tabChartData) {
        return tabChartData.get(this.selectedTab);
    };
    /**
     * Check whether the LineChartData.isLoading for that tab is set to  true or false
     */
    TabbedLineChartGroupComponent.prototype.dataIsLoading = function (tabChartData) {
        return this.getLineChartData(tabChartData).isLoading;
    };
    TabbedLineChartGroupComponent.prototype.ngOnDestroy = function () {
        this.changeDetectorRef.detach();
    };
    TabbedLineChartGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-tabbed-line-chart-group',
                    template: "\n      <ul  role=\"tablist\" class=\"nav nav-tabs tab-group\" [ngStyle]=\"{'margin-right': tabGroupMargin}\" *ngIf=\"tabList.length > 1\">\n          <li *ngFor=\"let tab of tabList; let i = index\" [ngClass]=\"{'active': tab === selectedTab}\">\n              <a role=\"tab\" data-toggle=\"tab\" (click)=\"setTab(tab, i)\" href=\"#\">{{ tab }}</a>\n          </li>\n      </ul>\n\n      <div class=\"dashboard\">\n          <div class=\"chart-group\" [ngClass]=\"{'two-col-group': chartsPerRow === 2, 'three-col-group': chartsPerRow === 3}\" [ngStyle]=\"{'width': tabGroupWidth, 'margin-right': tabGroupMargin}\" *ngFor=\"let tabChartData of groupData; let i = index\">\n              <sme-loading-wheel *ngIf=\"loadingWheels && dataIsLoading(tabChartData)\" [message]=\"loadingMessage\"></sme-loading-wheel>\n              <sme-line-chart class=\"sme-position-flex-none\" [tooltipFormatter]=\"tooltipFormatters[i]\" [lineChartData]=\"getLineChartData(tabChartData)\"></sme-line-chart>\n          </div>\n      </div>\n    ",
                    styles: ["\n      .tab-btn {\n        margin-right: 0px;\n        background-color: white;\n        min-width: 80px;\n      }\n\n      .tab-btn:hover,\n      .tab-btn:focus,\n      .tab-btn-active  {\n        background-color: #327cd4;\n        color: white;\n      }\n\n      .tab-btn:hover {\n        background-color: #E5F1FB;\n        color: #000;\n      }\n\n      .tab-group {\n        display: flex;\n        justify-content: flex-end;\n      }\n\n      .dashboard {\n        background: #fff;\n        position: relative;\n        padding: 0px;\n      }\n\n      .chart-group {\n        float: left;\n        position: relative;\n        min-height: 1px;\n      }\n\n      .two-col-group {\n          width: 534px;\n          margin-right: 72px;\n      }\n\n      .three-col-group {\n          width: 30%;\n          margin-right: 16px;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    TabbedLineChartGroupComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    TabbedLineChartGroupComponent.propDecorators = {
        'lineChartComponents': [{ type: ViewChildren, args: [LineChartComponent,] },],
        'groupData': [{ type: Input },],
        'tabList': [{ type: Input },],
        'chartsPerRow': [{ type: Input },],
        'loadingWheels': [{ type: Input },],
        'loadingMessage': [{ type: Input },],
        'tooltipFormatters': [{ type: Input },],
        'onTabClick': [{ type: Output },],
    };
    return TabbedLineChartGroupComponent;
}());
export { TabbedLineChartGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGluZS1jaGFydC90YWJiZWQtbGluZS1jaGFydC1ncm91cC90YWJiZWQtbGluZS1jaGFydC1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBR04sWUFBWSxFQUNmLE1BQU0sZUFBQSxDQUFnQjtBQUV2QixPQUFPLEVBQUUsa0JBQUEsRUFBa0MsTUFBTyx5QkFBQSxDQUEwQjtBQUc1RTtJQWdCSSx1Q0FBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFaaEQsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFPakIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFLWSxDQUFDO0lBRXRELGdEQUFRLEdBQWY7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFFN0IsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRTlFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3Qix5RkFBeUY7b0JBQ3pGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1FBQ25GLENBQUM7SUFDTCxDQUFDO0lBRU0sNkRBQXFCLEdBQTVCO1FBQ0ksc0RBQXNEO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxvREFBb0Q7WUFDcEQsSUFBSSxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDakMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLDhDQUFNLEdBQWIsVUFBYyxHQUFXLEVBQUUsS0FBYTtRQUNwQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7T0FFRztJQUNJLCtDQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztnQkFDdEMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLHdEQUFnQixHQUF2QixVQUF3QixZQUFpQjtRQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0kscURBQWEsR0FBcEIsVUFBcUIsWUFBaUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekQsQ0FBQztJQUVNLG1EQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFDRSx3Q0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRSxtZ0NBYVQ7b0JBQ0QsTUFBTSxFQUFFLENBQUMsbTFCQTZDUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCw0Q0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7S0FDMUIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNLLDRDQUFjLEdBQTJDO1FBQ2hFLHFCQUFxQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFHLEVBQUUsRUFBRTtRQUM5RSxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM3QixjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNsQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNuQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3BDLG1CQUFtQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDdkMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7S0FDaEMsQ0FBQztJQUNGLG9DQUFDO0NBcktELEFBcUtDLElBQUE7U0FyS1ksNkJBQTZCIiwiZmlsZSI6InRhYmJlZC1saW5lLWNoYXJ0LWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=