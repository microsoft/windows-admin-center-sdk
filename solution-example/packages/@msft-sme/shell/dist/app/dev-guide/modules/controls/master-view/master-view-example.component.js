import { Component } from '@angular/core';
var MasterViewExampleComponent = (function () {
    function MasterViewExampleComponent() {
        this.groupByOptions = [
            { displayName: 'Optoin 1', field: 'field 1' },
            { displayName: 'Option 2', field: 'field 2' },
            { displayName: 'Option 3', field: 'field 3' },
            { displayName: 'Some other thing', field: 'field 4' }
        ];
        this.groupField = '';
        this.active = false;
        this.items = [];
        this.selection = null;
        for (var i = 0; i < 500; i++) {
            this.items.push({ name: i, displayName: 'Item ' + i });
        }
    }
    MasterViewExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-master-view';
    };
    MasterViewExampleComponent.prototype.alert = function (arg) {
        alert(arg);
    };
    MasterViewExampleComponent.prototype.onDropdownChange = function (field) {
        this.alert(field);
    };
    return MasterViewExampleComponent;
}());
export { MasterViewExampleComponent };
MasterViewExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-master-view-example',
                template: "\n      <sme-split-view class=\"stretch-absolute\" #sv>\n        <sme-split-view-pane>\n          <sme-details title=\"My Details Title\" [(isExpanded)]=\"sv.isExpanded\">\n            <div>this is the content</div>\n            <div>this is the content</div>\n            <div>this is the content</div>\n            <div>this is the content</div>\n            <div>this is the content</div>\n            <div>this is the content</div>\n            <div>this is the content</div>\n            <div>this is the content</div>\n            <div>this is the content</div>\n            <div>this is the content</div>\n          </sme-details>\n        </sme-split-view-pane>\n\n        <sme-split-view-content>\n          <sme-master-view #masterView header=\"Header\" [extraFilter]=\"true\" [total]=\"smeDataTable.renderedItems.length\" [selection]=\"selection\" [filterActive]=\"active\" (clearSelection)=\"selection = null\"\n            (refresh)=\"alert('refreshed')\" (filter)=\"active = !active; alert('filter active: ' + active)\" (clearSelection)=\"selection=null\">\n            <sme-action-bar #actionBar>\n              <sme-action-button #action [text]=\"'Toggle Search'\" (execute)=\"masterView.searchable = !masterView.searchable\"></sme-action-button>\n              <sme-action-button #action [text]=\"'Toggle Header'\" (execute)=\"masterView.header = masterView.header ? '' : 'Header' \"></sme-action-button>\n            </sme-action-bar>\n\n            <div class=\"extra-filter\">\n              <div class=\"extra-filter-label\" for=\"groupBy\"> Group by:</div>\n              <div class=\"combobox\">\n                  <select class=\"form-control\" id=\"groupBy\" required [(ngModel)]=\"groupField\" name=\"groupBy\" #groupBy=\"ngModel\" (ngModelChange)=\"onDropdownChange($event)\">\n                      <option *ngFor=\"let option of groupByOptions\" [value]=\"option.field\">{{option.displayName}}</option>\n                  </select>\n              </div>\n            </div>\n\n\n            <input #search type=\"search\" pInputText autofocus>\n\n            <sme-data-table #smeDataTable [items]=\"items\" [(selection)]=\"selection\" [globalFilter]=\"search\">\n              <sme-data-table-column field=\"name\" header=\"Name\">\n              </sme-data-table-column>\n              <sme-data-table-column field=\"displayName\" header=\"Display Name\">\n              </sme-data-table-column>\n            </sme-data-table>\n          </sme-master-view>\n        </sme-split-view-content>\n      </sme-split-view>\n    "
            },] },
];
/** @nocollapse */
MasterViewExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9tYXN0ZXItdmlldy9tYXN0ZXItdmlldy1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQW9CSTtRQWxCTyxtQkFBYyxHQUFHO1lBQ3BCLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQzdDLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQzdDLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQzdDLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7U0FDeEQsQ0FBQztRQUVLLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBT3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0wsQ0FBQztJQVJhLDBDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0lBUU0sMENBQUssR0FBWixVQUFhLEdBQVc7UUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVNLHFEQUFnQixHQUF2QixVQUF3QixLQUFhO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQXdETCxpQ0FBQztBQUFELENBeEZBLEFBd0ZDOztBQXZETSxxQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRSwwL0VBOENUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHlDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6Im1hc3Rlci12aWV3LWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==