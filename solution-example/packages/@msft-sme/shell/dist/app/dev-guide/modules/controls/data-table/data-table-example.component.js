import { Component, ViewChild } from '@angular/core';
import { TestData } from './testData';
var DataTableExampleComponent = (function () {
    function DataTableExampleComponent() {
        var _this = this;
        this.dataStreamingSortDirection = 1;
        this.tabIndex = 1;
        this.sampleData4 = [];
        this.sampleData5 = [];
        this.groupColumnField = 'City';
        this.groupSortMode = '0';
        setTimeout(function () {
            var newData = [];
            for (var i = 0; i < 250; i++) {
                newData.push({
                    field1: 'Field 1 ' + i,
                    field2: i,
                    field3: 'Field 3 ' + i,
                    field4: i,
                    field5: 'Field 5 ' + i,
                    description: i % 3 === 0 ?
                        'Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                        : 'short description'
                });
            }
            _this.sampleData1 = newData;
            newData = [];
            for (var i = 0; i < 2500; i++) {
                newData.push({
                    field1: 'Field 1 ' + i + '  for Sample 2',
                    field2: i * 2,
                    field3: 'Field 3 ' + i + ' for Sample 2',
                    field4: i,
                    field5: 'Field 5 ' + i + ' for Sample 2',
                    description: i % 3 === 0 ?
                        'Sample 2 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                        : 'Sample 2 short description'
                });
            }
            _this.sampleData2 = newData;
            _this.dataSource = _this.sampleData1;
            newData = [];
            for (var i = 0; i < 5000; i++) {
                newData.push({
                    field1: 'Field 1 ' + i + '  for Sample 3',
                    field2: i,
                    field3: 'Field 3 ' + i + ' for Sample 3',
                    field4: i,
                    field5: 'Field 5 ' + i + ' for Sample 3',
                    description: i % 3 === 0 ?
                        'Sample 3 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                        : 'Sample 3 short description'
                });
            }
            _this.sampleData3 = newData;
            _this.virtualCount = _this.sampleData3.length;
            _this.sampleData5 = TestData;
        }, 1000);
    }
    DataTableExampleComponent.prototype.onLazyLoad = function (event) {
        var _this = this;
        setTimeout(function () {
            var items = [];
            var sortedData = _this.sampleData3.sort(function (a, b) {
                return a[event.sortField] === b[event.sortField] ? 0 : (a[event.sortField] > b[event.sortField] ? 1 : -1);
            });
            if (event.sortOrder >= 0) {
                for (var i = event.start; i < event.start + event.length; i++) {
                    items.push(sortedData[i]);
                }
            }
            else {
                for (var i = _this.sampleData3.length - 1 - event.start; i >= _this.sampleData3.length - (event.start + event.length); i--) {
                    items.push(sortedData[i]);
                }
            }
            event.finishLoadingData(items);
        }, 500);
    };
    ;
    DataTableExampleComponent.prototype.useSample1 = function () {
        this.dataSource = this.sampleData1.map(function (item) { return item; });
    };
    DataTableExampleComponent.prototype.useSample2 = function () {
        this.dataSource = this.sampleData2.map(function (item) { return item; });
    };
    DataTableExampleComponent.prototype.customSortCompare = function (a, b, field) {
        var aValue = a.field5;
        var bValue = b.field5;
        var dataType = typeof aValue;
        if (dataType === 'number') {
            aValue = aValue || Number.MIN_VALUE;
            bValue = bValue || Number.MIN_VALUE;
        }
        else {
            aValue = aValue && aValue.toString && aValue.toString().toLocaleLowerCase() || '';
            bValue = bValue && aValue.toString && bValue.toString().toLocaleLowerCase() || '';
        }
        var result = 0;
        if (aValue.indexOf('field 5 2') === 0 && bValue.indexOf('field 5 2') === -1) {
            result = -1;
        }
        else if (aValue.indexOf('field 5 2') === -1 && bValue.indexOf('field 5 2') === 0) {
            result = 1;
        }
        else if (aValue > bValue) {
            result = 1;
        }
        else if (aValue < bValue) {
            result = -1;
        }
        return result;
    };
    DataTableExampleComponent.prototype.onGroupSortModeChanged = function () {
        this.groupDataTable.groupSortMode = parseInt(this.groupSortMode, 2);
    };
    DataTableExampleComponent.prototype.addData = function () {
        var start = this.sampleData4.length;
        for (var i = start; i < start + 100000; i++) {
            this.sampleData4.push({
                field1: 'Field 1 ' + i + '  for Sample 4',
                field2: i * 2,
                field3: 'Field 3 ' + i + ' for Sample 4',
                field4: i,
                field5: 'Field 5 ' + i + ' for Sample 4',
                description: i % 3 === 0 ?
                    'Sample 4 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                    : 'Sample 4 short description'
            });
        }
        this.dataTableForDataStreaming.refreshData();
    };
    DataTableExampleComponent.prototype.doCustomSort = function ($event) {
        if (this.sampleData4.length === 100) {
            $event.fallBackToDefaultSort();
        }
        else {
            if ($event.direction !== this.dataStreamingSortDirection) {
                this.dataStreamingSortDirection = $event.direction;
                this.sampleData4 = undefined;
                clearTimeout(this.dataStreamingTimer);
                if (this.dataStreamingSortDirection === 1) {
                    this.doDataStreaming(0);
                }
                else {
                    this.doDataStreamingReverse(5);
                }
            }
        }
    };
    DataTableExampleComponent.prototype.startDataStreaming = function () {
        this.doDataStreaming(0);
    };
    DataTableExampleComponent.prototype.stopDataStreaming = function () {
        clearTimeout(this.dataStreamingTimer);
    };
    DataTableExampleComponent.prototype.clickTab = function (tabIndex) {
        this.tabIndex = tabIndex;
    };
    DataTableExampleComponent.prototype.doDataStreaming = function (count) {
        var _this = this;
        var step = 500;
        if (count < Number.MAX_VALUE) {
            this.dataStreamingTimer = setTimeout(function () {
                if (!_this.sampleData4) {
                    _this.sampleData4 = [];
                }
                var start = _this.sampleData4.length;
                for (var i = start; i < start + step; i++) {
                    _this.sampleData4.push({
                        field1: 'Field 1 ' + i + '  for Sample 4',
                        field2: i * 2,
                        field3: 'Field 3 ' + i + ' for Sample 4',
                        field4: i,
                        field5: 'Field 5 ' + i + ' for Sample 4',
                        description: i % 3 === 0 ?
                            'Sample 4 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                            : 'Sample 4 short description'
                    });
                }
                _this.dataTableForDataStreaming.refreshData();
                _this.doDataStreaming(count + 1);
            }, 300);
        }
    };
    DataTableExampleComponent.prototype.getGroupSummary = function (data) {
        var _this = this;
        var filteredData = this.sampleData5.filter(function (item) {
            return ((item[_this.groupColumnField] && item[_this.groupColumnField].toString()) || undefined) === data;
        });
        return 'Count: ' + filteredData.length;
    };
    DataTableExampleComponent.prototype.onGroupColumnChanged = function () {
        var _this = this;
        var column = this.groupDataTable.columns.filter(function (currentColumn) { return currentColumn.field === _this.groupColumnField; })[0];
        this.groupDataTable.groupColumn = column;
    };
    DataTableExampleComponent.prototype.doDataStreamingReverse = function (count) {
        var _this = this;
        var step = 20;
        if (count > 0) {
            this.dataStreamingTimer = setTimeout(function () {
                if (!_this.sampleData4) {
                    _this.sampleData4 = [];
                }
                for (var i = count * step - 1; i >= (count - 1) * 20; i--) {
                    _this.sampleData4.push({
                        field1: 'Field 1 ' + i + '  for Sample 4',
                        field2: i * 2,
                        field3: 'Field 3 ' + i + ' for Sample 4',
                        field4: i,
                        field5: 'Field 5 ' + i + ' for Sample 4',
                        description: i % 3 === 0 ?
                            'Sample 4 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                            : 'Sample 4 short description'
                    });
                }
                _this.dataTableForDataStreaming.refreshData();
                _this.doDataStreamingReverse(count - 1);
            }, 300);
        }
    };
    return DataTableExampleComponent;
}());
export { DataTableExampleComponent };
DataTableExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-data-table-example',
                styles: ["\n      /* The following style is only for the example page to hardcode a height for the data table. */\n      /* In the actual UI code we don't do this to the data table. */\n      :host >>> .data-table-container{\n          position: relative;\n          height:300px\n      }\n\n      :host >>> .table-chart{\n          padding: 10px 0;\n          display: block;\n      }\n    "],
                template: "\n      <div class=\"stretch-absolute flex-layout vertical\">\n        <section class=\"fixed-flex-size\">\n          <h2>Data Table Component</h2>\n        </section>\n\n        <section class=\"fixed-flex-size\">\n          <br/>\n          <ul class=\"nav nav-tabs\" role=\"tablist\" role=\"presentation\">\n            <li [class.active]=\"tabIndex===1\">\n              <a (click)=\"clickTab(1)\">Simple Scenario</a>\n            </li>\n            <li [class.active]=\"tabIndex===2\">\n              <a (click)=\"clickTab(2)\">Multiple Selection</a>\n            </li>\n            <li [class.active]=\"tabIndex===3\">\n              <a (click)=\"clickTab(3)\">Lazy Loading</a>\n            </li>\n            <li [class.active]=\"tabIndex===4\">\n              <a (click)=\"clickTab(4)\">Data Streaming</a>\n            </li>\n            <li [class.active]=\"tabIndex===5\">\n              <a (click)=\"clickTab(5)\">Grouping</a>\n            </li>\n          </ul>\n          <br/>\n        </section>\n        <section *ngIf=\"tabIndex==1\" class=\"auto-flex-size flex-layout vertical\">\n          <h4 class=\"fixed-flex-size\">Simple Scenarios</h4>\n          <div class=\"fixed-flex-size\">\n            <button (click)=\"useSample1()\">Use Sample 1 Data</button>\n            <button (click)=\"useSample2()\">Use Sample 2 Data</button>\n          </div>\n          <div class=\"auto-flex-size relative\">\n            <sme-data-table [items]=\"dataSource\" [(selection)]=\"selectedData1\" class=\"stretch-absolute\" [defaultSortColumn]=\"customSortColumn\"\n              [defaultSortMode]=\"1\">\n              <sme-data-table-column field=\"field1\" header=\"String Field 1\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"field2\" header=\"Number Field 2\" sortable=\"true\">\n                <ng-template let-data>\n                  <span class=\"status-icon sme-icon icon-win-cluster\"></span>\n                  <strong>{{data.field2}}</strong>\n                </ng-template>\n              </sme-data-table-column>\n              <sme-data-table-column field=\"field3\" header=\"String Field 3\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"field4\" header=\"number Field 4\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column #customSortColumn field=\"field5\" header=\"String Field 5 (Custom Sort: put all items with '2' at one side\"\n                sortable=\"custom\" [compareFunction]=\"customSortCompare\"></sme-data-table-column>\n              <sme-data-table-column field=\"description\" header=\"Long Text Column\" sortable=\"true\"></sme-data-table-column>\n            </sme-data-table>\n          </div>\n          <div class=\"fixed-flex-size\">\n            Selected Item: {{selectedData1 && selectedData1.field1}}\n          </div>\n        </section>\n        <section *ngIf=\"tabIndex==2\" class=\"auto-flex-size flex-layout vertical\">\n          <h4 class=\"fixed-flex-size\">Multiple Selection</h4>\n          <div class=\"auto-flex-size relative\">\n            <sme-data-table [items]=\"dataSource\" [(selection)]=\"selectedData2\" selectionMode=\"multiple\" class=\"stretch-absolute\">\n              <sme-data-table-column field=\"field1\" header=\"String Field 1\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"field2\" header=\"Number Field 2\" sortable=\"true\">\n                <ng-template let-index=\"index\" let-data>\n                  <span [ngClass]=\"{'icon-win-cluster':index%2==0}\" class=\"status-icon sme-icon\"></span>\n                  <strong>{{data.field2}}</strong>\n                </ng-template>\n              </sme-data-table-column>\n              <sme-data-table-column field=\"field3\" header=\"String Field 3\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"field4\" header=\"Number Field 4\" sortable=\"true\">\n                <ng-template let-data>\n                  <sme-capacity-bar-chart class=\"table-chart\" [height]=\"10\" [totalCapacity]=\"100\" [capacityUsed]=\"data.field4\"></sme-capacity-bar-chart>\n                </ng-template>\n              </sme-data-table-column>\n              <sme-data-table-column field=\"field5\" header=\"String Field 5\" sortable=\"custom\" [compareFunction]=\"customSortCompare\"></sme-data-table-column>\n              <sme-data-table-column field=\"description\" header=\"Long Text Column\" sortable=\"true\"></sme-data-table-column>\n            </sme-data-table>\n          </div>\n          <div class=\"fixed-flex-size\">\n            Selected Items: <span *ngFor=\"let item of selectedData2\">{{item.field1}} </span>\n          </div>\n        </section>\n        <section *ngIf=\"tabIndex==3\" class=\"auto-flex-size flex-layout vertical\">\n          <h4 class=\"fixed-flex-size\">Lazy Loading</h4>\n          <div class=\"auto-flex-size relative\">\n            <sme-data-table [lazyLoad]=\"true\" [virtualCount]=\"virtualCount\" (lazyLoadingData)=\"onLazyLoad($event)\" [(selection)]=\"selectedData3\"\n              class=\"stretch-absolute\">\n              <sme-data-table-column field=\"field1\" header=\"String Field 1\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"field2\" header=\"Number Field 2\" sortable=\"true\">\n                <ng-template let-index=\"index\" let-data>\n                  <span [ngClass]=\"{'icon-win-cluster':index%2==0}\" class=\"status-icon sme-icon\"></span>\n                  <strong>{{data.field2}}</strong>\n                </ng-template>\n              </sme-data-table-column>\n              <sme-data-table-column field=\"field3\" header=\"String Field 3\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"field4\" header=\"Number Field 4\" sortable=\"true\">\n                <ng-template let-data>\n                  <sme-capacity-bar-chart class=\"table-chart\" [height]=\"10\" [totalCapacity]=\"100\" [capacityUsed]=\"data.field4\"></sme-capacity-bar-chart>\n                </ng-template>\n              </sme-data-table-column>\n              <sme-data-table-column field=\"field5\" header=\"String Field 5\" sortable=\"custom\" [compareFunction]=\"customSortCompare\"></sme-data-table-column>\n              <sme-data-table-column field=\"description\" header=\"Long Text Column\" sortable=\"true\"></sme-data-table-column>\n            </sme-data-table>\n          </div>\n        </section>\n        <section *ngIf=\"tabIndex==4\" class=\"auto-flex-size flex-layout vertical\">\n          <h4 class=\"fixed-flex-size\">Data Streaming</h4>\n          <div class=\"fixed-flex-size\">\n            <button (click)=\"startDataStreaming()\">Start Data Streaming</button> <button (click)=\"stopDataStreaming()\">Stop Data Streaming</button>      Count: {{sampleData4 && sampleData4.length}}\n          </div>\n          <div class=\"auto-flex-size relative\">\n            <sme-data-table #dataTableForDataStreaming [items]=\"sampleData4\" [(selection)]=\"selectedData4\" class=\"stretch-absolute\" [defaultSortColumn]=\"defaultSortColumn\"\n              [defaultSortMode]=\"1\" (doCustomSort)=\"doCustomSort($event)\">\n              <sme-data-table-column field=\"field1\" header=\"String Field 1\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"field2\" header=\"Number Field 2\" sortable=\"true\">\n                <ng-template let-index=\"index\" let-data>\n                  <span [ngClass]=\"{'icon-win-cluster':index%2==0}\" class=\"status-icon sme-icon\"></span>\n                  <strong>{{data.field2}}</strong>\n                </ng-template>\n              </sme-data-table-column>\n              <sme-data-table-column field=\"field3\" header=\"String Field 3\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"field4\" header=\"Number Field 4\" sortable=\"true\">\n                <ng-template let-data>\n                  <sme-capacity-bar-chart class=\"table-chart\" [height]=\"10\" [totalCapacity]=\"100\" [capacityUsed]=\"data.field4\"></sme-capacity-bar-chart>\n                </ng-template>\n              </sme-data-table-column>\n              <sme-data-table-column #defaultSortColumn field=\"field5\" header=\"String Field 5\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"description\" header=\"Long Text Column\" sortable=\"true\"></sme-data-table-column>\n            </sme-data-table>\n          </div>\n        </section>\n        <section *ngIf=\"tabIndex==5\" class=\"auto-flex-size flex-layout vertical\">\n          <h4 class=\"fixed-flex-size\">Grouping</h4>\n          <div class=\"fixed-flex-size\">\n            <span>Group Column</span>\n            <select [(ngModel)]=\"groupColumnField\" (change)=\"onGroupColumnChanged()\">\n              <option value=\"\">(None)</option>\n              <option *ngFor=\"let column of groupDataTable.columns\" value=\"{{column.field}}\">{{column.header}}</option>\n            </select>\n            <span>Sort</span>\n            <select [(ngModel)]=\"groupSortMode\" (change)=\"onGroupSortModeChanged()\">\n              <option value=\"0\">None</option>\n              <option value=\"1\">Ascend</option>\n              <option value=\"2\">Descend</option>\n            </select>\n            <button (click)=\"groupDataTable.expandAllGroup()\">Expand all groups</button>\n            <button (click)=\"groupDataTable.collaseAllGroup()\">Collapse all groups</button>\n          </div>\n          <div class=\"auto-flex-size relative\">\n            <sme-data-table #groupDataTable [items]=\"sampleData5\" selectionMode=\"multiple\" [groupColumn]=\"groupColumn\" useGroupToggle=\"true\"\n              [defaultGroupToggleExpanded]=\"true\" [(selection)]=\"selectedData5\" class=\"stretch-absolute\" [defaultSortColumn]=\"customSortColumn\"\n              [defaultSortMode]=\"1\">\n              <ng-template let-data #group>\n                <b>{{data || '(empty)'}}</b> <span>{{getGroupSummary(data)}}</span>\n              </ng-template>\n              <sme-data-table-column field=\"ContactName\" header=\"Contract Name\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"CompanyName\" header=\"Company Name\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"ContactTitle\" header=\"Contact Title\" sortable=\"true\">\n                <ng-template let-data>\n                  <span class=\"status-icon sme-icon icon-win-cluster\"></span>\n                  <b>{{data.ContactTitle}}</b>\n                </ng-template>\n              </sme-data-table-column>\n              <sme-data-table-column field=\"Address\" header=\"Address\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column #groupColumn field=\"City\" header=\"City\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"PostalCode\" header=\"PostalCode\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"Country\" header=\"Country\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"Phone\" header=\"Phone\" sortable=\"true\"></sme-data-table-column>\n              <sme-data-table-column field=\"Fax\" header=\"Fax\" sortable=\"true\"></sme-data-table-column>\n            </sme-data-table>\n          </div>\n          <div class=\"fixed-flex-size\">\n            Selected Items: <span *ngFor=\"let item of selectedData5\">{{item.ContactName}} </span>\n          </div>\n        </section>\n      </div>\n    "
            },] },
];
/** @nocollapse */
DataTableExampleComponent.ctorParameters = function () { return []; };
DataTableExampleComponent.propDecorators = {
    'dataTableForDataStreaming': [{ type: ViewChild, args: ['dataTableForDataStreaming',] },],
    'groupDataTable': [{ type: ViewChild, args: ['groupDataTable',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kYXRhLXRhYmxlL2RhdGEtdGFibGUtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSXJELE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxZQUFBLENBQWE7QUFHdEM7SUEwQkk7UUFBQSxpQkFxREM7UUEzRU8sK0JBQTBCLEdBQUcsQ0FBQyxDQUFDO1FBS2hDLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFPYixnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUV4QixnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUN4QixxQkFBZ0IsR0FBRyxNQUFNLENBQUM7UUFDMUIsa0JBQWEsR0FBRyxHQUFHLENBQUM7UUFPdkIsVUFBVSxDQUNOO1lBQ0ksSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1QsTUFBTSxFQUFFLFVBQVUsR0FBRyxDQUFDO29CQUN0QixNQUFNLEVBQUUsQ0FBQztvQkFDVCxNQUFNLEVBQUUsVUFBVSxHQUFHLENBQUM7b0JBQ3RCLE1BQU0sRUFBRSxDQUFDO29CQUNULE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQztvQkFDdEIsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzt3QkFDcEIsd0VBQXdFOzBCQUN0RSxtQkFBbUI7aUJBQzVCLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUUzQixPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFF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Q0FBQztBQUFELENBN2NBLEFBNmNDOztBQXZNTSxvQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxxQ0FBcUM7Z0JBQy9DLE1BQU0sRUFBRSxDQUFDLCtYQVlSLENBQUM7Z0JBQ0YsUUFBUSxFQUFFLG1nWEE2S1Q7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsd0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7QUFDSyx3Q0FBYyxHQUEyQztJQUNoRSwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQywyQkFBMkIsRUFBRyxFQUFFLEVBQUU7SUFDMUYsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUcsRUFBRSxFQUFFO0NBQ25FLENBQUMiLCJmaWxlIjoiZGF0YS10YWJsZS1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=