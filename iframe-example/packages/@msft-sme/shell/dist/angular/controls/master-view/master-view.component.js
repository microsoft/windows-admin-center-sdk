import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, NgZone, Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { SplitViewComponent } from '../split-view';
var MasterViewComponent = /** @class */ (function () {
    function MasterViewComponent(ngZone, splitView, element, renderer) {
        // After the discussion, the plan is still have master view to coordinate with split view as well as tree table and data table.
        // It's a little tricky to let master view to talk to its parent which is the split view.
        // But we do need a component to implement the common behavior on the UI to avoid duplicate code in each tool.
        // At this moment, master view is the most proper component.
        // Long term wise, we will figure out a better component sitting in the top level of the UI to coordinate with other components
        // and implement common behaviors.
        this.ngZone = ngZone;
        this.splitView = splitView;
        this.element = element;
        this.renderer = renderer;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.Angular.MasterView;
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
        // setup host classes
        renderer.addClass(element.nativeElement, 'sme-layout-absolute');
        renderer.addClass(element.nativeElement, 'sme-position-inset-none');
        renderer.addClass(element.nativeElement, 'sme-arrange-stack-v');
        renderer.addClass(element.nativeElement, 'sme-arrange-overflow-hide');
    }
    Object.defineProperty(MasterViewComponent.prototype, "smeDataTable", {
        get: function () {
            return this.internalSmeDataTable;
        },
        set: function (value) {
            this.internalSmeDataTable = value;
            if (this.internalSmeDataTable) {
                this.internalSmeDataTable.tableAriaLabelledBy = 'master-view-header';
            }
        },
        enumerable: true,
        configurable: true
    });
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
            _this.searchable = !!_this.searchElement || !!_this.containerElement.nativeElement.querySelector('input[type="search"]');
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
        if (this.smeDataTable) {
            this.handleDetailPaneExpanding(this.smeDataTable);
        }
        else if (this.smeTreeTable) {
            this.handleDetailPaneExpanding(this.smeTreeTable);
        }
    };
    MasterViewComponent.prototype.getItemCountText = function () {
        return this.total === 1 ? this.strings.oneItem : this.strings.items.format(this.total);
    };
    MasterViewComponent.prototype.getSelectedCountText = function () {
        return this.strings.selected.format(this.selectedItemCount);
    };
    MasterViewComponent.prototype.handleDetailPaneExpanding = function (dataViewControl) {
        var _this = this;
        if (this.splitView) {
            var newDataSelection = null;
            newDataSelection = dataViewControl.renderedItems[dataViewControl.getActiveRenderedItemIndex()];
            var hasItemSelected = !!newDataSelection;
            if (hasItemSelected && newDataSelection !== this.currentDataSelection) {
                if (!this.currentDataSelection || this.currentDataSelection.length === 0) {
                    setTimeout(function () {
                        if (!_this.splitView.isExpanded) {
                            _this.splitView.togglePane();
                        }
                    });
                }
            }
            this.currentDataSelection = newDataSelection;
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
    MasterViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-master-view',
                    template: "\n      <h3 class=\"sme-position-flex-none sme-padding-squish-v-lg\" *ngIf=\"header\" id='master-view-header'>{{header}}</h3>\n      <div class=\"sme-position-flex-none sme-padding-horizontal-sm sme-arrange-stack-h sme-arrange-stack-reversed\" #container>\n        <!-- Actions -->\n        <ng-content select='sme-action-bar,.action-bar'></ng-content>\n\n        <div class=\"sme-position-flex-none sme-arrange-stack-h sme-padding-horizontal-sm\">\n          <!-- Counts -->\n          <div class=\"sme-position-flex-none sme-arrange-ws-nowrap sme-scheme-secondary-text\" [class.sme-margin-right-xs]=\"selectedItemCount === 0 || !showSelection\">\n            <i class=\"sme-layout-action-bar-item\">{{getItemCountText()}}</i>\n            <button type=\"button\" role=\"button\" class=\"sme-button-trigger sme-layout-action-bar-item-height sme-scheme-secondary-text sme-button-auto-width\"\n              *ngIf=\"selectedItemCount > 0 && showSelection\" (click)=\"clearSelection.next()\">\n                  <i>{{getSelectedCountText()}}</i>\n                  <i class=\"sme-icon sme-icon-clear sme-margin-left-xs\"></i>\n              </button>\n          </div>\n          <!-- Common Actions -->\n          <div class=\"sme-focus-zone\">\n            <button *ngIf=\"showRefresh\" (click)=\"refresh.next()\" type=\"button\" role=\"button\" title=\"strings.refresh.title\" [attr.aria-label]=\"strings.refresh.title\"\n              class=\"sme-layout-action-bar-item-height sme-button-trigger sme-button-auto-width\">\n              <span class=\"sme-icon sme-icon-refresh\"></span>\n          </button>\n            <button *ngIf=\"showFilter\" (click)=\"filter.next()\" type=\"button\" role=\"button\" title=\"strings.filter.title\" [attr.aria-label]=\"strings.filter.title\"\n              class=\"sme-layout-action-bar-item-height sme-button-trigger sme-button-auto-width\" [class.sme-toggled]=\"filterActive\">\n              <span class=\"sme-icon sme-icon-filter\"></span>\n          </button>\n          </div>\n          <!-- Grouping -->\n          <div class=\"sme-focus-zone\">\n            <div *ngIf=\"showCustomFilter\" class=\"sme-margin-right-sm\">\n              <ng-content select='.sme-master-view-custom-filter'></ng-content>\n            </div>\n          </div>\n          <!-- Search Box -->\n          <div class=\"sme-focus-zone\">\n            <div *ngIf=\"searchable\" class=\"sme-position-flex-none searchbox sme-layout-action-bar-item sme-margin-right-xl\">\n              <ng-content select='input[type=search]'></ng-content>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div #dataView class=\"sme-layout-relative sme-position-flex-auto sme-arrange-stack-h sme-arrange-overflow-hide\" [class.sme-shadow-scrolled-content]='!isDataListScrolledTotop'>\n        <ng-content></ng-content>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MasterViewComponent.ctorParameters = function () { return [
        { type: NgZone, },
        { type: SplitViewComponent, decorators: [{ type: Optional },] },
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    MasterViewComponent.propDecorators = {
        'searchElement': [{ type: ContentChild, args: ['search',] },],
        'containerElement': [{ type: ViewChild, args: ['container',] },],
        'dataView': [{ type: ViewChild, args: ['dataView',] },],
        'dataTable': [{ type: ContentChild, args: ['dataTable',] },],
        'smeDataTable': [{ type: ContentChild, args: ['smeDataTable',] },],
        'treeTable': [{ type: ContentChild, args: ['treeTable',] },],
        'smeTreeTable': [{ type: ContentChild, args: ['smeTreeTable',] },],
        'header': [{ type: Input },],
        'total': [{ type: Input },],
        'showSelection': [{ type: Input },],
        'showRefresh': [{ type: Input },],
        'showFilter': [{ type: Input },],
        'filterActive': [{ type: Input },],
        'selection': [{ type: Input },],
        'requireDataItemUniqueId': [{ type: Input },],
        'showCustomFilter': [{ type: Input },],
        'refresh': [{ type: Output },],
        'filter': [{ type: Output },],
        'clearSelection': [{ type: Output },],
        'updateLayout': [{ type: HostListener, args: ['window:resize',] },],
    };
    return MasterViewComponent;
}());
export { MasterViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbWFzdGVyLXZpZXcvbWFzdGVyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUVaLFVBQVUsRUFDVixZQUFZLEVBRVosWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNaLE1BQU0sZUFBQSxDQUFnQjtBQUl2QixPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxlQUFBLENBQWdCO0FBR25EO0lBOEVJLDZCQUNZLE1BQWMsRUFDYixTQUE2QixFQUM5QixPQUFtQixFQUNuQixRQUFtQjtRQUUzQiwrSEFBK0g7UUFDL0gseUZBQXlGO1FBQ3pGLDhHQUE4RztRQUM5Ryw0REFBNEQ7UUFDNUQsK0hBQStIO1FBQy9ILGtDQUFrQztRQVYxQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2IsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBN0V4QixZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUErQjdFLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRVYsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFckIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFbkIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQW1CdEIsWUFBTyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBR3ZELFdBQU0sR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUd0RCxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTlELGVBQVUsR0FBRyxJQUFJLENBQUM7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QUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFHLEVBQUUsRUFBRTtRQUN4RCxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFHLEVBQUUsRUFBRTtRQUM3RCxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFHLEVBQUUsRUFBRTtRQUNuRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFHLEVBQUUsRUFBRTtRQUM3RCxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFHLEVBQUUsRUFBRTtRQUNuRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM1QixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMzQixlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNuQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNqQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNoQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNsQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMvQix5QkFBeUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzdDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDdEMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDOUIsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDN0IsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFHLEVBQUUsRUFBRTtLQUNuRSxDQUFDO0lBQ0YsMEJBQUM7Q0FyVkQsQUFxVkMsSUFBQTtTQXJWWSxtQkFBbUIiLCJmaWxlIjoibWFzdGVyLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==