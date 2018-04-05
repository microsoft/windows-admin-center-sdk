import { Component } from '@angular/core';
var MasterViewExampleComponent = /** @class */ (function () {
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
    MasterViewExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-master-view-example',
                    template: "\n      <sme-split-view class=\"sme-layout-absolute sme-position-inset-none\" #sv>\n          <sme-split-view-pane>\n              <sme-details title=\"My Details Title\" [(isExpanded)]=\"sv.isExpanded\">\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n                  <div>this is the content</div>\n              </sme-details>\n          </sme-split-view-pane>\n\n          <sme-split-view-content>\n              <sme-master-view #masterView header=\"Master View Example\" [showCustomFilter]=\"true\" [total]=\"smeDataTable.renderedItems.length\" [selection]=\"selection\" [filterActive]=\"active\" (clearSelection)=\"selection = null\" (refresh)=\"alert('refreshed')\" (filter)=\"active = !active; alert('filter active: ' + active)\"\n                  (clearSelection)=\"selection=null\">\n                  <sme-action-bar #actionBar>\n                      <sme-action-button #action [text]=\"'Toggle Search'\" (execute)=\"masterView.searchable = !masterView.searchable\"></sme-action-button>\n                      <sme-action-button #action [text]=\"'Toggle Header'\" (execute)=\"masterView.header = masterView.header ? '' : 'Header' \"></sme-action-button>\n                  </sme-action-bar>\n\n                  <div class=\"sme-master-view-custom-filter sme-arrange-stack-h sme-layout-action-bar-item\">\n                      <span class=\"sme-scheme-secondary-text sme-arrange-ws-nowrap\" for=\"groupBy\"> Group by:</span>\n                      <div class=\"sme-select\">\n                          <select id=\"groupBy\" required [(ngModel)]=\"groupField\" name=\"groupBy\" #groupBy=\"ngModel\" (ngModelChange)=\"onDropdownChange($event)\">\n                            <option *ngFor=\"let option of groupByOptions\" [value]=\"option.field\">{{option.displayName}}</option>\n                          </select>\n                      </div>\n                  </div>\n                  <!-- \n             \n      :host >>> .extra-filter-container .combobox {\n          width: unset;\n      }\n\n      :host >>> .extra-filter-container select {\n          color: #2D3239;\n          border-color: #B3B3B3;\n          font-size: 14px;\n      }\n\n      :host >>> .extra-filter-container .extra-filter-label {\n          color: #686868;\n          height: 36px;\n          line-height: 36px;\n          font-size: 14px;\n          margin-right: 6px;\n          margin-left: 12px;\n          max-width: 150px;\n      } */\n                   -->\n\n\n                  <input #search type=\"search\" pInputText autofocus>\n\n                  <sme-data-table #smeDataTable [items]=\"items\" [(selection)]=\"selection\" [globalFilter]=\"search\">\n                      <sme-data-table-column field=\"name\" header=\"Name\" sortable=\"true\">\n                      </sme-data-table-column>\n                      <sme-data-table-column field=\"displayName\" header=\"Display Name\" sortable=\"true\" [searchable]=\"false\">\n                      </sme-data-table-column>\n                  </sme-data-table>\n              </sme-master-view>\n          </sme-split-view-content>\n      </sme-split-view>\n    "
                },] },
    ];
    /** @nocollapse */
    MasterViewExampleComponent.ctorParameters = function () { return []; };
    return MasterViewExampleComponent;
}());
export { MasterViewExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9tYXN0ZXItdmlldy9tYXN0ZXItdmlldy1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQW9CSTtRQWxCTyxtQkFBYyxHQUFHO1lBQ3BCLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQzdDLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQzdDLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQzdDLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7U0FDeEQsQ0FBQztRQUVLLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBT3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0wsQ0FBQztJQVJhLDBDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0lBUU0sMENBQUssR0FBWixVQUFhLEdBQVc7UUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVNLHFEQUFnQixHQUF2QixVQUF3QixLQUFhO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNFLHFDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsUUFBUSxFQUFFLCs4R0FvRVQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHlDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsaUNBQUM7Q0E5R0QsQUE4R0MsSUFBQTtTQTlHWSwwQkFBMEIiLCJmaWxlIjoibWFzdGVyLXZpZXctZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9