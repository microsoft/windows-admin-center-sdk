import { Component, ContentChild, EventEmitter, HostListener, Input, NgZone, Optional, Output, ViewChild } from '@angular/core';
import { SplitViewComponent } from '../split-view';
var MasterViewComponent = (function () {
    function MasterViewComponent(ngZone, splitView) {
        this.ngZone = ngZone;
        this.splitView = splitView;
        this.header = '';
        this.total = 0;
        this.showSelection = true;
        this.showRefresh = true;
        this.showFilter = true;
        this.filterActive = false;
        this.refresh = new EventEmitter();
        this.filter = new EventEmitter();
        this.clearSelection = new EventEmitter();
        this.searchable = true;
        this.selectedItemCount = 0;
        this.dataViewHeight = 0;
        this.isDataListScrolledTotop = true;
        // After the discussion, the plan is still have master view to coordinate with split view as well as tree table and data table.
        // It's a little tricky to let master view to talk to its parent which is the split view.
        // But we do need a component to implement the common behavior on the UI to avoid duplicate code in each tool.
        // At this moment, master view is the most proper component.
        // Long term wise, we will figure out a better component sitting in the top level of the UI to coordinate with other components
        // and implement common behaviors.
    }
    Object.defineProperty(MasterViewComponent.prototype, "selection", {
        set: function (selection) {
            var count = 0;
            if (Array.isArray(selection)) {
                count = selection.length;
            }
            else if (!!selection) {
                count = 1;
            }
            this.selectedItemCount = count;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The method to run after the component view initialized
     */
    MasterViewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            // The "ngAfterViewInit" is still in current check cycle so we should not update the following UI information immediately.
            // So we use setTimeout to defer the following operations to next check cycle.
            _this.searchable = !!_this.searchElement;
            _this.updateLayout();
        });
        if (this.splitView) {
            this.splitView.paneToggled.subscribe(function () {
                if (_this.dataView && _this.dataViewHeight !== _this.dataView.nativeElement.clientHeight) {
                    _this.updateLayout();
                }
            });
        }
        if (this.dataTable) {
            this.dataTable.onFilter.subscribe(function () {
                if (_this.dataTable.selection) {
                    var shouldClearSelection = true;
                    if (!_this.requireDataItemUniqueId) {
                        if (_this.dataTable.dataToRender.indexOf(_this.dataTable.selection) !== -1) {
                            shouldClearSelection = false;
                        }
                    }
                    else {
                        var selectedItemId = _this.requireDataItemUniqueId(_this.dataTable.selection);
                        for (var i = 0; i < _this.dataTable.dataToRender.length; i++) {
                            var item = _this.dataTable.dataToRender[i];
                            var itemId = _this.requireDataItemUniqueId(item);
                            if (itemId === selectedItemId) {
                                shouldClearSelection = false;
                                break;
                            }
                        }
                    }
                    if (shouldClearSelection) {
                        _this.clearSelection.emit();
                    }
                }
            });
        }
        if (this.smeDataTable) {
            this.smeDataTable.onFilter.subscribe(function () {
                if (_this.smeDataTable.selection) {
                    var shouldClearSelection = true;
                    if (!_this.requireDataItemUniqueId) {
                        if (_this.smeDataTable.renderedItems.indexOf(_this.smeDataTable.selection) !== -1) {
                            shouldClearSelection = false;
                        }
                    }
                    else {
                        var selectedItemId = _this.requireDataItemUniqueId(_this.smeDataTable.selection);
                        for (var i = 0; i < _this.smeDataTable.renderedItems.length; i++) {
                            var item = _this.smeDataTable.renderedItems[i];
                            var itemId = _this.requireDataItemUniqueId(item);
                            if (itemId === selectedItemId) {
                                shouldClearSelection = false;
                                break;
                            }
                        }
                    }
                    if (shouldClearSelection) {
                        _this.clearSelection.emit();
                    }
                }
            });
        }
    };
    MasterViewComponent.prototype.ngOnDestroy = function () {
        if (this.splitView) {
            this.splitView.paneToggled.unsubscribe();
        }
        if (this.dataTable) {
            this.dataTable.onFilter.unsubscribe();
        }
    };
    MasterViewComponent.prototype.updateLayout = function () {
        this.dataViewHeight = this.dataView.nativeElement.clientHeight;
        if (this.dataTable) {
            var dataViewScrollHeightAdjustment = 0;
            var primeNgDataTableHeader = this.dataView.nativeElement.querySelector('p-dataTable .ui-datatable-scrollable-header');
            if (primeNgDataTableHeader) {
                dataViewScrollHeightAdjustment = -1 * primeNgDataTableHeader.clientHeight;
            }
            var primeNgPaginator = this.dataView.nativeElement.querySelector('p-paginator');
            if (primeNgPaginator) {
                dataViewScrollHeightAdjustment += -1 * primeNgPaginator.clientHeight;
            }
            var scrollHeight = this.dataViewHeight + dataViewScrollHeightAdjustment;
            this.dataTable.scrollHeight = scrollHeight + 'px';
            this.ensureDataItemIsInViewport('p-datatable tr.ui-state-highlight', 'p-datatable .ui-datatable-scrollable-body');
        }
        else if (this.treeTable) {
            this.ensureDataItemIsInViewport('p-treetable .ui-state-highlight', 'p-treetable');
        }
        else if (this.smeDataTable) {
            this.smeDataTable.scrollSelectedItemIntoView();
        }
    };
    MasterViewComponent.prototype.ngDoCheck = function () {
        if (this.dataTable) {
            this.handleDetailPaneExpanding(this.dataTable);
        }
        else if (this.treeTable) {
            this.handleDetailPaneExpanding(this.treeTable);
        }
        else if (this.smeDataTable) {
            this.handleDetailPaneExpanding(this.smeDataTable);
        }
    };
    MasterViewComponent.prototype.handleDetailPaneExpanding = function (dataViewControl) {
        var _this = this;
        if (this.splitView) {
            var hasItemSelected = !!dataViewControl.selection;
            // If it's a multi-select control, do extra check on the selection array.
            if (hasItemSelected && dataViewControl.selection.length !== undefined && dataViewControl.selection.length === 0) {
                hasItemSelected = false;
            }
            if (hasItemSelected && dataViewControl.selection !== this.currentDataSelection) {
                if (!this.currentDataSelection || this.currentDataSelection.length === 0) {
                    setTimeout(function () {
                        if (!_this.splitView.isExpanded) {
                            _this.splitView.togglePane();
                        }
                    });
                }
            }
            this.currentDataSelection = dataViewControl.selection;
        }
    };
    MasterViewComponent.prototype.ensureDataItemIsInViewport = function (dataItemSelector, dataViewScrollableContainerSelector) {
        var _this = this;
        setTimeout(function () {
            var selectedItem = _this.dataView.nativeElement.querySelector(dataItemSelector);
            if (selectedItem) {
                var scrollableBody = _this.dataView.nativeElement.querySelector(dataViewScrollableContainerSelector);
                // This offsetTop is only counting from the top of the data view control and not considering the actual scroll top.
                var offsetTop = selectedItem.getBoundingClientRect().top - scrollableBody.getBoundingClientRect().top;
                // If the selected item is not in the view port, scroll it into view.
                if (!(offsetTop >= 0
                    && offsetTop <= scrollableBody.clientHeight - selectedItem.clientHeight)) {
                    selectedItem.scrollIntoView();
                }
            }
        });
    };
    return MasterViewComponent;
}());
export { MasterViewComponent };
MasterViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-master-view',
                template: "\n\n      <h4 class=\"fixed-flex-size tool-header\" *ngIf=\"header\">{{header}}</h4>\n      <div class=\"fixed-flex-size flex-layout tool-bar\">\n          <div class=\"auto-flex-size action-bar-container\">\n              <ng-content select='sme-action-bar,.action-bar'></ng-content>\n          </div>\n\n          <div class=\"fixed-flex-size count-label-container\">\n              <span class=\"count-label\">{{total}} items</span>\n              <a class=\"count-label\" *ngIf=\"selectedItemCount > 0 && showSelection\" (click)=\"clearSelection.next()\">\n                  <span>{{selectedItemCount}} selected</span>\n                  <span class=\"sme-icon icon-win-clear align-middle\"></span>\n              </a>\n          </div>\n          <button *ngIf=\"showRefresh\" (click)=\"refresh.next()\">\n              <span class=\"sme-icon icon-win-refresh\"></span>\n          </button>\n          <button *ngIf=\"showFilter\" [class.active]=\"filterActive\" (click)=\"filter.next()\">\n              <span class=\"sme-icon icon-win-filter\"></span>\n          </button>\n          <div *ngIf=\"extraFilter\" class=\"extra-filter-container\">\n              <ng-content select='div.extra-filter'></ng-content>\n            </div>\n          <div *ngIf=\"searchable\" class=\"searchbox searchbox-action-bar\">\n              <ng-content select='input[type=search]'></ng-content>\n          </div>\n\n      </div>\n      <div #dataView class=\"auto-flex-size flex-layout relative no-scroll\" [class.show-header-shadow]='!isDataListScrolledTotop'>\n          <ng-content></ng-content>\n      </div>\n    ",
                styles: ["\n      :host {\n          position: absolute;\n          top: 0;\n          left: 0;\n          bottom: 0;\n          right: 0;\n          display: flex;\n          flex: 1 1 auto;\n          flex-wrap: nowrap;\n          flex-direction: column;\n          align-content: stretch;\n          align-items: stretch;\n          justify-content: flex-start;\n          overflow: hidden;\n      }\n\n      .tool-header {\n          margin-left: 34px;\n          margin-bottom: 6px;\n      }\n\n      .tool-bar {\n          margin: 0 0 6px;\n      }\n\n      .tool-bar .action-bar-container {\n          min-width: 140px;\n      }\n\n      .count-label-container {\n          text-align: right;\n          height: 36px;\n          vertical-align: middle;\n          line-height: 36px;\n          font-size: 14px;\n          color: #333;\n      }\n\n      .count-label {\n          margin-right: 24px;\n          color: #686868;\n          font-style: italic;\n      }\n\n      a.count-label {\n          text-decoration: none;\n          color: #686868;\n      }\n\n      a.count-label:hover {\n          text-decoration: underline;\n          color: #686868;\n      }\n\n      .count-label .sme-icon:before {\n          margin-left:8px;\n          font-size: 15px;\n      }\n\n      button {\n          background: transparent;\n          border: none;\n          margin: 0 8px;\n          padding: 8px;\n          height: 36px;\n      }\n\n      button.active {\n          color: #0078D7;\n      }\n\n      button:focus {\n          outline: none\n      }\n\n      :host >>> .ui-treetable thead th.ui-state-default:first-of-type,\n      :host >>> .ui-treetable-row-selectable td:first-of-type,\n      :host >>> p-dataTable tr th:first-of-type,\n      :host >>> p-dataTable tr td:first-of-type\n      {\n          padding-left: 34px !important;\n      }\n\n      :host >>> .ui-treetable thead th.ui-state-default:last-of-type,\n      :host >>> .ui-treetable-row-selectable td:last-of-type,\n      :host >>> p-dataTable tr th:last-of-type,\n      :host >>> p-dataTable tr td:last-of-type\n      {\n          padding-right: 34px !important;\n      }\n\n      :host >>> p-dataTable .ui-datatable-scrollable-header\n      {\n          /*Using z-index to bring header above body of table*/\n          z-index: 1;\n          border-bottom: solid 1px #ddd;\n      }\n\n      :host >>> .show-header-shadow p-dataTable .ui-datatable-scrollable-header {\n          box-shadow: 0px 1px 0px rgba(12,13,14,0.1), 0px 3px 3px rgba(12,13,14,0.1);\n      }\n\n      :host >>> p-treeTable {\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          overflow: auto;\n      }\n\n      .extra-filter-container {\n          margin-right: 12px;\n      }\n\n      :host >>> .extra-filter-container .extra-filter {\n          display: flex;\n      }\n\n      :host >>> .extra-filter-container .combobox {\n          width: unset;\n      }\n\n      :host >>> .extra-filter-container select {\n          color: #2D3239;\n          border-color: #B3B3B3;\n          font-size: 14px;\n      }\n\n      :host >>> .extra-filter-container .extra-filter-label {\n          color: #686868;\n          height: 36px;\n          line-height: 36px;\n          font-size: 14px;\n          margin-right: 6px;\n          margin-left: 12px;\n          max-width: 150px;\n      }\n    "]
            },] },
];
/** @nocollapse */
MasterViewComponent.ctorParameters = function () { return [
    { type: NgZone, },
    { type: SplitViewComponent, decorators: [{ type: Optional },] },
]; };
MasterViewComponent.propDecorators = {
    'searchElement': [{ type: ContentChild, args: ['search',] },],
    'dataView': [{ type: ViewChild, args: ['dataView',] },],
    'dataTable': [{ type: ContentChild, args: ['dataTable',] },],
    'smeDataTable': [{ type: ContentChild, args: ['smeDataTable',] },],
    'treeTable': [{ type: ContentChild, args: ['treeTable',] },],
    'header': [{ type: Input },],
    'total': [{ type: Input },],
    'showSelection': [{ type: Input },],
    'showRefresh': [{ type: Input },],
    'showFilter': [{ type: Input },],
    'filterActive': [{ type: Input },],
    'selection': [{ type: Input },],
    'requireDataItemUniqueId': [{ type: Input },],
    'extraFilter': [{ type: Input },],
    'refresh': [{ type: Output },],
    'filter': [{ type: Output },],
    'clearSelection': [{ type: Output },],
    'updateLayout': [{ type: HostListener, args: ['window:resize',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbWFzdGVyLXZpZXcvbWFzdGVyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUdaLFlBQVksRUFFWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQUEsQ0FBZ0I7QUFHdkIsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sZUFBQSxDQUFnQjtBQUduRDtJQTZESSw2QkFBb0IsTUFBYyxFQUFXLFNBQTZCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQTFDbEUsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaLFVBQUssR0FBRyxDQUFDLENBQUM7UUFFVixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUVyQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBbUJ0QixZQUFPLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFHdkQsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBR3RELG1CQUFjLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFFOUQsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsNEJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBR2xDLCtIQUErSDtRQUMvSCx5RkFBeUY7UUFDekYsOEdBQThHO1FBQzlHLDREQUE0RDtRQUM1RCwrSEFBK0g7UUFDL0gsa0NBQWtDO0lBQ3RDLENBQUM7SUFyQ0Esc0JBQVcsMENBQVM7YUFBcEIsVUFBcUIsU0FBYztZQUNoQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxFQUFF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