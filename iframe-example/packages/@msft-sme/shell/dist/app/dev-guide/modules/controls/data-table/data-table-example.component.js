import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../../../../angular/controls/data-table/data-table.component';
import { TestData } from './testData';
var DataTableExampleComponent = /** @class */ (function () {
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
            for (var i = 0; i < 6000; i++) {
                newData.push({
                    field1: 'Field 1 ' + i,
                    field2: i,
                    field3: 'Field 3 ' + i,
                    field4: i,
                    field5: 'Field 5 ' + i,
                    description: i % 3 === 0 ?
                        'Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                        : 'short description',
                    objectField: {
                        text: 'Object Field ' + i,
                        number: i
                    }
                });
            }
            _this.sampleData1 = newData;
            newData = [];
            for (var i = 0; i < 600000; i++) {
                newData.push({
                    field1: 'Field 1 ' + i + '  for Sample 2',
                    field2: i * 2,
                    field3: 'Field 3 ' + i + ' for Sample 2',
                    field4: i,
                    field5: 'Field 5 ' + i + ' for Sample 2',
                    description: i % 3 === 0 ?
                        'Sample 2 Looooooooooooooooooooooooooooooooooooooooooooooooooooooong description'
                        : 'Sample 2 short description',
                    objectField: {
                        text: 'Object Field ' + i,
                        number: i
                    }
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
        var step = 1000;
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
    DataTableExampleComponent.prototype.up = function () {
        this.currentDataTable.moveToPreviousRenderedItem();
    };
    DataTableExampleComponent.prototype.down = function () {
        this.currentDataTable.moveToNextRenderedItem();
    };
    DataTableExampleComponent.prototype.home = function () {
        this.currentDataTable.moveToHeadOfRenderedItems();
    };
    DataTableExampleComponent.prototype.end = function () {
        this.currentDataTable.moveToEndOfRenderedItems();
    };
    DataTableExampleComponent.prototype.pageUp = function () {
        this.currentDataTable.moveToPreviousPageOfRenderedItems();
    };
    DataTableExampleComponent.prototype.pageDown = function () {
        this.currentDataTable.moveToNextPageOfRenderedItems();
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
    DataTableExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-data-table-example',
                    styles: ["\n      /* The following style is only for the example page to hardcode a height for the data table. */\n      /* In the actual UI code we don't do this to the data table. */\n      :host >>> .data-table-container{\n          position: relative;\n          height:300px\n      }\n\n      :host >>> .table-chart{\n          padding: 10px 0;\n          display: block;\n      }\n    "],
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v\">\n          <section class=\"sme-position-flex-none\">\n              <h2>Data Table Component</h2>\n          </section>\n\n          <section class=\"sme-position-flex-none\">\n              <br/>\n              <ul class=\"nav nav-tabs\" role=\"tablist\" role=\"presentation\">\n                  <li [class.active]=\"tabIndex===1\">\n                      <a (click)=\"clickTab(1)\">Simple Scenario</a>\n                  </li>\n                  <li [class.active]=\"tabIndex===2\">\n                      <a (click)=\"clickTab(2)\">Multiple Selection</a>\n                  </li>\n                  <li [class.active]=\"tabIndex===3\">\n                      <a (click)=\"clickTab(3)\">Lazy Loading</a>\n                  </li>\n                  <li [class.active]=\"tabIndex===4\">\n                      <a (click)=\"clickTab(4)\">Data Streaming</a>\n                  </li>\n                  <li [class.active]=\"tabIndex===5\">\n                      <a (click)=\"clickTab(5)\">Grouping</a>\n                  </li>\n              </ul>        \n          </section>\n          <section *ngIf=\"tabIndex==1\" class=\"sme-position-flex-auto sme-arrange-stack-v\">\n              <h4 class=\"sme-position-flex-none\">Simple Scenarios</h4>\n              <div class=\"sme-position-flex-none\">\n                  <button (click)=\"useSample1()\">Use Sample 1 Data</button>\n                  <button (click)=\"useSample2()\">Use Sample 2 Data</button>\n              </div>\n              <div class=\"sme-layout-relative sme-position-flex-auto\">\n                  <sme-data-table #simpleDataTable [items]=\"dataSource\" [(selection)]=\"selectedData1\" class=\"sme-layout-absolute sme-position-inset-none\"\n                      [defaultSortColumn]=\"customSortColumn\" [defaultSortMode]=\"1\">\n                      <sme-data-table-column field=\"field1\" header=\"String Field 1\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"field2\" header=\"Number Field 2\" sortable=\"true\">\n                          <ng-template let-data>\n                              <span class=\"status-icon sme-icon sme-icon-cluster\"></span>\n                              <strong>{{data.field2}}</strong>\n                              <a href=\"http://www.google.com\" target=\"_blank\">Link</a>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"field3\" header=\"String Field 3\" sortable=\"true\" width=\"20%\">\n                          <ng-template let-data>\n                              <span class=\"status-icon sme-icon sme-icon-cluster\"></span>\n                              <strong>{{data.field3}}</strong>\n                              <button onclick=\"alert('Hello~~~')\">I'm a button. I need focus.</button>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column #customSortColumn field=\"field4\" header=\"number Field 4\" sortable=\"true\">\n                          <ng-template let-data>\n                              <span class=\"status-icon sme-icon sme-icon-cluster\"></span>\n                              <strong>{{data.field4}}</strong>\n                              <input style=\"width:60px\" />\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"field5\" header=\"String Field 5 (Custom Sort: put all items with '2' at one side\" sortable=\"custom\"\n                          [compareFunction]=\"customSortCompare\"></sme-data-table-column>\n                      <sme-data-table-column field=\"description\" header=\"Long Text Column\" sortable=\"true\" width=\"30%\"></sme-data-table-column>\n                      <sme-data-table-column field=\"objectField.text\" header=\"Object Field Text\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"objectField.number\" header=\"Object Field Number\" sortable=\"true\"></sme-data-table-column>\n                  </sme-data-table>\n              </div>\n              <div class=\"sme-position-flex-none sme-focus-zone\">\n                  <span>Selected Item: </span>\n                  <span class='selected-items-1'>{{selectedData1 && selectedData1.field1}}</span>\n                  <span>, Selected Index: {{simpleDataTable.getActiveRenderedItemIndex()}}</span>\n                  <button onclick=\"alert('Hello~~~')\">I'm a button. I need focus.</button>\n              </div>\n          </section>\n          <section *ngIf=\"tabIndex==2\" class=\"sme-position-flex-auto sme-arrange-stack-v\">\n              <h4 class=\"sme-position-flex-none\">Multiple Selection</h4>\n              <div class=\"sme-layout-relative sme-position-flex-auto\">\n                  <sme-data-table [items]=\"dataSource\" [(selection)]=\"selectedData2\" selectionMode=\"multiple\" class=\"sme-layout-absolute sme-position-inset-none\">\n                      <sme-data-table-column field=\"field1\" header=\"String Field 1\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"field2\" header=\"Number Field 2\" sortable=\"true\">\n                          <ng-template let-index=\"index\" let-data>\n                              <span [ngClass]=\"{'sme-icon-cluster':index%2==0}\" class=\"status-icon sme-icon\"></span>\n                              <strong>{{data.field2}}</strong>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"field3\" header=\"String Field 3\" sortable=\"true\">\n                           <ng-template let-data>\n                              <span class=\"status-icon sme-icon sme-icon-cluster\"></span>\n                              <strong>{{data.field3}}</strong>                        \n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"field4\" header=\"Number Field 4\" sortable=\"true\">\n                          <ng-template let-data>\n                              <sme-capacity-bar-chart class=\"table-chart\" [height]=\"10\" [totalCapacity]=\"100\" [capacityUsed]=\"data.field4\"></sme-capacity-bar-chart>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"field5\" header=\"String Field 5\" sortable=\"custom\" [compareFunction]=\"customSortCompare\"></sme-data-table-column>\n                      <sme-data-table-column field=\"description\" header=\"Long Text Column\" sortable=\"true\"></sme-data-table-column>\n                  </sme-data-table>\n              </div>\n              <div class=\"sme-position-flex-none\">\n                  <span>Selected Items: </span>\n                  <span class='selected-items-2' *ngIf=\"selectedData2 && selectedData2.length<10\">\n                      <span *ngFor=\"let item of selectedData2\">{{item.field1}} </span>\n                  </span>\n                  <span *ngIf=\"selectedData2 && selectedData2.length>=10\">\n                      {{selectedData2.length}} items\n                  </span>\n              </div>\n          </section>\n          <section *ngIf=\"tabIndex==3\" class=\"sme-position-flex-auto sme-arrange-stack-v\">\n              <h4 class=\"sme-position-flex-none\">Lazy Loading</h4>\n              <div class=\"sme-layout-relative sme-position-flex-auto\">\n                  <sme-data-table [lazyLoad]=\"true\" [virtualCount]=\"virtualCount\" (lazyLoadingData)=\"onLazyLoad($event)\" [(selection)]=\"selectedData3\"\n                      class=\"sme-layout-absolute sme-position-inset-none\">\n                      <sme-data-table-column field=\"field1\" header=\"String Field 1\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"field2\" header=\"Number Field 2\" sortable=\"true\">\n                          <ng-template let-index=\"index\" let-data>\n                              <span [ngClass]=\"{'sme-icon-cluster':index%2==0}\" class=\"status-icon sme-icon\"></span>\n                              <strong>{{data.field2}}</strong>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"field3\" header=\"String Field 3\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"field4\" header=\"Number Field 4\" sortable=\"true\">\n                          <ng-template let-data>\n                              <sme-capacity-bar-chart class=\"table-chart\" [height]=\"10\" [totalCapacity]=\"100\" [capacityUsed]=\"data.field4\"></sme-capacity-bar-chart>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"field5\" header=\"String Field 5\" sortable=\"custom\" [compareFunction]=\"customSortCompare\"></sme-data-table-column>\n                      <sme-data-table-column field=\"description\" header=\"Long Text Column\" sortable=\"true\"></sme-data-table-column>\n                  </sme-data-table>\n              </div>\n          </section>\n          <section *ngIf=\"tabIndex==4\" class=\"sme-position-flex-auto sme-arrange-stack-v\">\n              <h4 class=\"sme-position-flex-none\">Data Streaming</h4>\n              <div class=\"sme-position-flex-none\">\n                  <button (click)=\"startDataStreaming()\">Start Data Streaming</button> <button (click)=\"stopDataStreaming()\">Stop Data Streaming</button>\n                  <span>Count: {{sampleData4 && sampleData4.length}}</span>\n              </div>\n              <div class=\"sme-layout-relative sme-position-flex-auto\">\n                  <sme-data-table #dataTableForDataStreaming [items]=\"sampleData4\" [(selection)]=\"selectedData4\" class=\"sme-layout-absolute sme-position-inset-none\"\n                      [defaultSortColumn]=\"defaultSortColumn\" [defaultSortMode]=\"1\" (doCustomSort)=\"doCustomSort($event)\">\n                      <sme-data-table-column field=\"field1\" header=\"String Field 1\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"field2\" header=\"Number Field 2\" sortable=\"true\">\n                          <ng-template let-index=\"index\" let-data>\n                              <span [ngClass]=\"{'sme-icon-cluster':index%2==0}\" class=\"status-icon sme-icon\"></span>\n                              <strong>{{data.field2}}</strong>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"field3\" header=\"String Field 3\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"field4\" header=\"Number Field 4\" sortable=\"true\">\n                          <ng-template let-data>\n                              <sme-capacity-bar-chart class=\"table-chart\" [height]=\"10\" [totalCapacity]=\"100\" [capacityUsed]=\"data.field4\"></sme-capacity-bar-chart>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column #defaultSortColumn field=\"field5\" header=\"String Field 5\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"description\" header=\"Long Text Column\" sortable=\"true\"></sme-data-table-column>\n                  </sme-data-table>\n              </div>\n          </section>\n          <section *ngIf=\"tabIndex==5\" class=\"sme-position-flex-auto sme-arrange-stack-v\">\n              <h4 class=\"sme-position-flex-none\">Grouping</h4>\n              <div class=\"sme-position-flex-none\">\n                  <span>Group Column</span>\n                  <select [(ngModel)]=\"groupColumnField\" (change)=\"onGroupColumnChanged()\">\n              <option value=\"\">(None)</option>\n              <option *ngFor=\"let column of groupDataTable.columns\" value=\"{{column.field}}\">{{column.header}}</option>\n            </select>\n                  <span>Sort</span>\n                  <select [(ngModel)]=\"groupSortMode\" (change)=\"onGroupSortModeChanged()\">\n              <option value=\"0\">None</option>\n              <option value=\"1\">Ascend</option>\n              <option value=\"2\">Descend</option>\n            </select>\n                  <button (click)=\"groupDataTable.expandAllGroup()\">Expand all groups</button>\n                  <button (click)=\"groupDataTable.collaseAllGroup()\">Collapse all groups</button>\n              </div>\n              <div class=\"sme-layout-relative sme-position-flex-auto\">\n                  <sme-data-table #groupDataTable [items]=\"sampleData5\" selectionMode=\"multiple\" [groupColumn]=\"groupColumn\" useGroupToggle=\"true\"\n                      [defaultGroupToggleExpanded]=\"true\" [(selection)]=\"selectedData5\" class=\"sme-layout-absolute sme-position-inset-none\"\n                      [defaultSortColumn]=\"customSortColumn\" [defaultSortMode]=\"1\">\n                      <ng-template let-data #group>\n                          <b>{{data || '(empty)'}}</b> <span>{{getGroupSummary(data)}}</span>\n                      </ng-template>\n                      <sme-data-table-column field=\"ContactName\" header=\"Contract Name\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"CompanyName\" header=\"Company Name\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"ContactTitle\" header=\"Contact Title\" sortable=\"true\">\n                          <ng-template let-data>\n                              <span class=\"status-icon sme-icon sme-icon-cluster\"></span>\n                              <b>{{data.ContactTitle}}</b>\n                          </ng-template>\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"Address\" header=\"Address\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column #groupColumn field=\"City\" header=\"City\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"PostalCode\" header=\"PostalCode\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"Country\" header=\"Country\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"Phone\" header=\"Phone\" sortable=\"true\"></sme-data-table-column>\n                      <sme-data-table-column field=\"Fax\" header=\"Fax\" sortable=\"true\"></sme-data-table-column>\n                  </sme-data-table>\n              </div>\n              <div class=\"sme-position-flex-none\">\n                  Selected Items: <span *ngFor=\"let item of selectedData5\">{{item.ContactName}} </span>\n              </div>\n          </section>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DataTableExampleComponent.ctorParameters = function () { return []; };
    DataTableExampleComponent.propDecorators = {
        'dataTableForDataStreaming': [{ type: ViewChild, args: ['dataTableForDataStreaming',] },],
        'groupDataTable': [{ type: ViewChild, args: ['groupDataTable',] },],
        'simpleDataTable': [{ type: ViewChild, args: ['simpleDataTable',] },],
        'currentDataTable': [{ type: ViewChild, args: [DataTableComponent,] },],
    };
    return DataTableExampleComponent;
}());
export { DataTableExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kYXRhLXRhYmxlL2RhdGEtdGFibGUtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBR3JELE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLGlFQUFBLENBQWtFO0FBQ3JHLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxZQUFBLENBQWE7QUFHdEM7SUFpQ0k7UUFBQSxpQkE2REM7UUF6Rk8sK0JBQTBCLEdBQUcsQ0FBQyxDQUFDO1FBV2hDLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFPYixnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUV4QixnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUN4QixxQkFBZ0IsR0FBRyxNQUFNLENBQUM7UUFDMUIsa0JBQWEsR0FBRyxHQUFHLENBQUM7UUFPdkIsVUFBVSxDQUNOO1lBQ0ksSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1QsTUFBTSxFQUFFLFVBQVUsR0FBRyxDQUFDO29CQUN0QixNQUFNLEVBQUUsQ0FBQztvQkFDVCxNQUFNLEVBQUUsVUFBVSxHQUFHLENBQUM7b0JBQ3RCLE1BQU0sRUFBRSxDQUFDO29CQUNULE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQztvQkFDdEIsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLHdFQUF3RTt3QkFDeEUsQ0FBQyxDQUFDLG1CQUFtQjtvQkFDekIsV0FBVyxFQUFFO3dCQUNULElBQUksRUFBRSxlQUFlLEdBQUcsQ0FBQzt3QkFDekIsTUFBTSxFQUFFLENB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LFFBQVEsRUFBRSxrK2RBME1UO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3Q0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNLLHdDQUFjLEdBQTJDO1FBQ2hFLDJCQUEyQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLDJCQUEyQixFQUFHLEVBQUUsRUFBRTtRQUMxRixnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRyxFQUFFLEVBQUU7UUFDcEUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUcsRUFBRSxFQUFFO1FBQ3RFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFHLEVBQUUsRUFBRTtLQUN2RSxDQUFDO0lBQ0YsZ0NBQUM7Q0FuaEJELEFBbWhCQyxJQUFBO1NBbmhCWSx5QkFBeUIiLCJmaWxlIjoiZGF0YS10YWJsZS1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=