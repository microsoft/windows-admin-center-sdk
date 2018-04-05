import { Component, ContentChild, ContentChildren, EventEmitter, Inject, Input, NgZone, Optional, Output, ViewChild } from '@angular/core';
import { DataTableColumnComponent } from './data-table.column.component';
import { DataTableRenderedItemType, DataTableSortMode } from './data-table.contract';
/**
 * Data table component
 */
var DataTableComponent = (function () {
    function DataTableComponent(ngZone, layout) {
        var _this = this;
        this.ngZone = ngZone;
        this.layout = layout;
        this.strings = MsftSme.resourcesStrings();
        this.maxActualScrollDataElementHeight = 500000;
        this.filterDebounceTimeout = 300;
        this.scrollCheckIntervalDuration = 300;
        this.bufferRowRate = 0.5;
        this.eventUnregistraterHandlers = [];
        this.internalRenderedItems = [];
        this.isLoading = true;
        this.internalSelection = [];
        this.currentStartIndexOfItemInViewPort = -1;
        this.groupToggleStatus = {};
        this.internalGroupSortMode = DataTableSortMode.None;
        /**
         * It emits the event when selection changing is happening.
         */
        this.selectionChange = new EventEmitter();
        this.onRowDblclick = new EventEmitter();
        this.filteredItems = [];
        /**
         * It indicates rendered items are changed.
         */
        this.renderedItemsChange = new EventEmitter();
        /**
         * It indicates that a data lazy loading needs to happen and require the consumer to provide data for the lazy loading part.
         */
        this.lazyLoadingData = new EventEmitter();
        /**
         * It exposes the enum type then in template we can directly refer to the enum value name instead of enum value number.
         */
        this.sortModeEnum = DataTableSortMode;
        /**
         * It exposes the enum type then in template we can directly refer to the enum value name instead of enum value number.
         */
        this.renderedItemTypeEnum = DataTableRenderedItemType;
        /**
         * It emits the event when filtering is happening.
         */
        this.onFilter = new EventEmitter();
        this.doCustomSort = new EventEmitter();
        /**
         * It emits the event when a row is selected.
         */
        this.onRowSelect = new EventEmitter();
        /**
         * It emits the event when a row is unselected and no row is selected.
         */
        this.onRowUnselect = new EventEmitter();
        /**
         * It indicates the default status of the group toggle.
         */
        this.defaultGroupToggleExpanded = true;
        if (this.layout) {
            this.layout.layoutChanged.subscribe(function () {
                _this.onLayoutChanged();
            });
        }
    }
    Object.defineProperty(DataTableComponent.prototype, "renderedItems", {
        /**
         * It indicates the item rendered on the UI (including the items in and outside of view port).
         */
        get: function () {
            return this.internalRenderedItems;
        },
        set: function (value) {
            this.internalRenderedItems = value || [];
            this.renderedItemsChange.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "globalFilter", {
        /**
         * It gets and sets the global filter value html element.
         */
        get: function () {
            return this.internalGlobalFilter;
        },
        set: function (globalFilter) {
            var _this = this;
            var eventHandler = (function () {
                clearTimeout(_this.filterDebounceTimer);
                _this.filterDebounceTimer = setTimeout(function () {
                    _this.filterKeyword = globalFilter['value'];
                    _this.clearSelection();
                    _this.renderItems(false, true);
                    _this.onFilter.emit();
                }, _this.filterDebounceTimeout);
            }).bind(this);
            this.internalGlobalFilter = globalFilter;
            globalFilter.addEventListener('keyup', eventHandler);
            globalFilter.addEventListener('paste', eventHandler);
            this.eventUnregistraterHandlers.push(function () {
                globalFilter.removeEventListener('keyup', eventHandler);
                globalFilter.removeEventListener('paste', eventHandler);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "items", {
        /**
         * It gets and sets the data source of the data table.
         */
        get: function () {
            return this.internalItems;
        },
        set: function (value) {
            var _this = this;
            this.internalItems = value;
            setTimeout(function () {
                _this.isLoading = !value;
                _this.renderItems(false, true);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "selection", {
        /**
         * It gets and sets the selection of the data source.
         */
        get: function () {
            if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
                return this.internalSelection;
            }
            if (this.internalSelection.length > 0) {
                return this.internalSelection[0];
            }
            return null;
        },
        set: function (selection) {
            if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
                this.internalSelection = selection || [];
            }
            else {
                this.internalSelection = selection ? [selection] : [];
            }
            this.selectionChange.emit(selection);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "selectionMode", {
        get: function () {
            return this.internalSelectionMode;
        },
        set: function (value) {
            this.internalSelectionMode = value;
            // The following code is a temp code to solve the problem that:
            // when the data table is multiple selection mode and an initial array value is assigned to the selection property,
            // at that moment the selectionMode property is not set to multiple selection mode value, yet.
            // So we treat the initial array value as a member of the selection array instead of the selection array.
            // So we use the following code to fix this problem.
            // TODO: long term wise, we need to use seperated selection properties to maintain the selections of selection
            // selection and multiple selection.
            // This change will happen in the coming release.
            if (value === DataTableComponent.selectionModeMultipleOption) {
                if (Array.isArray(this.internalSelection) && this.internalSelection.length === 1 && Array.isArray(this.internalSelection[0])) {
                    this.internalSelection = this.internalSelection[0];
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "groupColumn", {
        /**
         * It gets or sets the group column.
         */
        get: function () {
            return this.internalGroupColumn;
        },
        set: function (value) {
            this.internalGroupColumn = value;
            this.renderItems(false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableComponent.prototype, "groupSortMode", {
        /**
         * It gets or sets the group sort mode.
         */
        get: function () {
            return this.internalGroupSortMode;
        },
        set: function (value) {
            this.internalGroupSortMode = value;
            this.renderItems(false, true);
        },
        enumerable: true,
        configurable: true
    });
    DataTableComponent.prototype.refreshData = function () {
        this.renderItems(true);
    };
    DataTableComponent.prototype.resetScroll = function () {
        // Set the scrollTop(distance from the element's top to its topmost visible content)
        // of Scroll container to 0.
        this.scrollContainerElement.nativeElement.scrollTop = 0;
        // No need to reset 'this.currentStartIndexOfItemInViewPort' to 0, as it will automatically get 
        // adjusted to 0 in 'calculateItemInViewPort()'.
    };
    DataTableComponent.prototype.ngOnInit = function () {
        if (this.defaultSortColumn && this.defaultSortMode) {
            this.sortColumn = this.defaultSortColumn;
            this.sortColumn.sortMode = this.defaultSortMode;
        }
    };
    /**
     * It implements the AfterViewInit interface.
     */
    DataTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.calculateScrollbarWidth();
        var scrollHandler = (function () {
            _this.isScrolledDown = _this.scrollContainerElement.nativeElement.scrollTop > 0;
            _this.isScrolling = true;
            if (_this.lazyLoad) {
                // If the lazy loading is enabled, reduce the freqency of handling scrolling 
                // especially doing the data lazy loading
                _this.isScrollingEventHandlerSetup = false;
                clearInterval(_this.scrollCheckInterval);
            }
            if (!_this.isScrollingEventHandlerSetup) {
                _this.isScrollingEventHandlerSetup = true;
                _this.ngZone.runOutsideAngular(function () {
                    _this.scrollCheckInterval = setInterval(function () {
                        if (_this.isScrolling) {
                            _this.ngZone.run(function () {
                                _this.calculateItemInViewPort();
                            });
                        }
                    }, _this.scrollCheckIntervalDuration);
                });
            }
        });
        this.scrollContainerElement.nativeElement.addEventListener('scroll', scrollHandler);
        this.eventUnregistraterHandlers.push(function () {
            _this.scrollContainerElement.nativeElement.removeEventListener('scroll', scrollHandler);
        });
        this.initializeUI();
    };
    /**
     * It implements the OnDestroy interface.
     */
    DataTableComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.scrollCheckInterval);
        this.eventUnregistraterHandlers.forEach(function (item) {
            item();
        });
    };
    /**
     * It implements the AfterViewChecked interface.
     */
    DataTableComponent.prototype.ngAfterViewChecked = function () {
        this.alignContent();
        this.alignScrollBar();
    };
    /**
     * It handles the selection of the given data table item.
     */
    DataTableComponent.prototype.selectItem = function (event, item) {
        if (item.type !== DataTableRenderedItemType.GroupHeader) {
            if (event.target['type'] === 'checkbox') {
                return;
            }
            if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
                this.selection = [item.data];
            }
            else {
                this.selection = item.data;
            }
            this.onRowSelect.emit({ data: item.data });
        }
    };
    /**
     * It returns the placeholder message when the actual data is not rendering.
     */
    DataTableComponent.prototype.getPlaceholderMessage = function () {
        return this.isLoading ? (this.loadingMessage || this.strings.MsftSmeShell.Angular.DataTable.Loading)
            : (this.noRecordMessage || this.strings.MsftSmeShell.Angular.DataTable.NoRecordsFound);
    };
    /**
     * It handles the behavior that when a group toggle is clicked.
     */
    DataTableComponent.prototype.clickGroupToggle = function (item) {
        this.groupToggleStatus[item.data] = !this.groupToggleStatus[item.data];
        this.renderItems(false, true);
    };
    /**
     * It expands all the groups.
     */
    DataTableComponent.prototype.expandAllGroup = function () {
        for (var group in this.groupToggleStatus) {
            if (this.groupToggleStatus.hasOwnProperty(group)) {
                this.groupToggleStatus[group] = true;
            }
        }
        this.renderItems(false, true);
    };
    /**
     * It collapses all the groups.
     */
    DataTableComponent.prototype.collaseAllGroup = function () {
        for (var group in this.groupToggleStatus) {
            if (this.groupToggleStatus.hasOwnProperty(group)) {
                this.groupToggleStatus[group] = false;
            }
        }
        this.renderItems(false, true);
    };
    /**
     * It returns the boolean to indicate whether the given column is the first data column.
     * The returned value can be used to add some custom css for the first data column when grouping is enabled.
     */
    DataTableComponent.prototype.isFirstDataColumn = function (column) {
        var _this = this;
        var firstDataColumn = null;
        this.columns.forEach(function (currentColumn) {
            if (currentColumn !== _this.groupColumn && !firstDataColumn) {
                firstDataColumn = currentColumn;
            }
        });
        return column === firstDataColumn;
    };
    /**
     * It handles the column clicking.
     */
    DataTableComponent.prototype.clickColumn = function (column) {
        var _this = this;
        this.columns.forEach(function (item) {
            if (column.sortable && column.sortable !== 'false') {
                if (item === column) {
                    if (item.sortMode === DataTableSortMode.None) {
                        item.sortMode = DataTableSortMode.Ascend;
                    }
                    else if (item.sortMode === DataTableSortMode.Ascend) {
                        item.sortMode = DataTableSortMode.Descend;
                    }
                    else {
                        item.sortMode = DataTableSortMode.Ascend;
                    }
                    _this.previousSortColumn = _this.sortColumn;
                    _this.sortColumn = item;
                    _this.sortItems();
                    _this.calculateItemInViewPort(false, true);
                }
                else {
                    item.sortMode = DataTableSortMode.None;
                }
            }
        });
    };
    /**
     * It handles the row double clicking.
     */
    DataTableComponent.prototype.doubleClickRow = function (item) {
        this.onRowDblclick.emit({ data: item.data });
    };
    /**
     * It scrolls the selected item into the view and
     * position the selected item in middle of the list UI.
     */
    DataTableComponent.prototype.scrollSelectedItemIntoView = function () {
        var scrollContainerElement = this.scrollContainerElement.nativeElement;
        var scrollDataElement = this.scrollDataElement.nativeElement;
        var selectedItemElement = scrollDataElement.querySelector('tr.selected');
        if (selectedItemElement) {
            var selectedItemTop = selectedItemElement.getBoundingClientRect().top - scrollDataElement.getBoundingClientRect().top;
            if (selectedItemTop < 0 || selectedItemTop > scrollContainerElement.offsetHeight) {
                scrollContainerElement.scrollTop = selectedItemTop + scrollDataElement.offsetTop - scrollContainerElement.offsetHeight / 2;
            }
        }
    };
    /**
     * It handles the clicking behavior of checkbox.
     * Multiple selection behavior is happening here.
     */
    DataTableComponent.prototype.onItemCheckBoxClicked = function (item) {
        var _this = this;
        if (item.type !== DataTableRenderedItemType.GroupHeader) {
            var index = this.internalSelection.indexOf(item.data);
            if (index === -1) {
                this.internalSelection.push(item.data);
                this.onRowSelect.emit({ data: item.data });
            }
            else {
                this.internalSelection.splice(index, 1);
                this.onRowUnselect.emit({ data: item.data });
            }
        }
        else {
            var selected = this.isItemSelected(item);
            var groupItems = this.filteredItems.filter(function (currentItem) { return currentItem[_this.groupColumn.field].toString() === item.data; });
            for (var i = 0; i < groupItems.length; i++) {
                var index = this.internalSelection.indexOf(groupItems[i]);
                if (selected) {
                    if (index !== -1) {
                        this.internalSelection.splice(index, 1);
                        this.onRowUnselect.emit({ data: groupItems[i] });
                    }
                }
                else {
                    if (index === -1) {
                        this.internalSelection.push(groupItems[i]);
                        this.onRowSelect.emit({ data: groupItems[i] });
                    }
                }
            }
        }
        // Need to recreate the "internalSelection" array otherwise the change detector won't detect the change 
        // since the array's own reference is not changed.
        this.internalSelection = this.internalSelection.slice(0, this.internalSelection.length);
        this.selectionChange.emit(this.internalSelection);
    };
    /**
     * It handles the "check all" checkbox behavior.
     */
    DataTableComponent.prototype.onAllItemCheckBoxClicked = function () {
        if (this.internalSelection.length !== this.filteredItems.length) {
            this.selection = this.filteredItems.map(function (item) { return item; });
        }
        else {
            this.selection = [];
        }
    };
    /**
     * It indicates whether the given item is selected.
     */
    DataTableComponent.prototype.isItemSelected = function (item) {
        var _this = this;
        var selected = false;
        if (item.type !== DataTableRenderedItemType.GroupHeader) {
            selected = item.data && this.internalSelection.indexOf(item.data) !== -1;
        }
        else {
            selected = true;
            var groupItems = this.filteredItems.filter(function (currentItem) {
                return (currentItem[_this.groupColumn.field] && currentItem[_this.groupColumn.field].toString() === item.data)
                    || (currentItem[_this.groupColumn.field] === undefined && item.data === undefined);
            });
            if (groupItems.length === 0) {
                selected = false;
            }
            else {
                for (var i = 0; i < groupItems.length; i++) {
                    if (this.internalSelection.indexOf(groupItems[i]) === -1) {
                        selected = false;
                        break;
                    }
                }
            }
        }
        return selected;
    };
    DataTableComponent.prototype.isGroupExpanded = function (group) {
        return this.groupToggleStatus[group];
    };
    Object.defineProperty(DataTableComponent.prototype, "virtualCount", {
        /**
         * It gets and sets the virtual count.
         * It only works when "lazyLoad" is true.
         */
        get: function () {
            return this.items && this.items.length || undefined;
        },
        set: function (value) {
            if (value) {
                this.items = Array(value);
                for (var i = 0; i < value; i++) {
                    this.items[i] = null;
                }
                this.isLoading = false;
                this.renderItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTableComponent.prototype.initializeUI = function () {
        var _this = this;
        var offsetHeight = this.tempRowElement.nativeElement.offsetHeight;
        if (!offsetHeight) {
            setTimeout(function () {
                _this.initializeUI();
            });
        }
        else {
            this.rowHeight = offsetHeight;
            this.tempRowElement.nativeElement.style.display = 'none';
            setTimeout(function () {
                _this.calculateItemInViewPort();
            });
        }
    };
    DataTableComponent.prototype.sortItems = function () {
        var _this = this;
        if (this.renderedItems && this.sortColumn) {
            var compareFunction_1 = this.sortColumn.sortable === 'custom' ?
                this.sortColumn.compareFunction.bind(this) : this.defaultSortCompareFunction.bind(this);
            var sortDirection_1 = this.sortColumn.sortMode === DataTableSortMode.Ascend ? 1 : -1;
            if (!this.groupColumn) {
                var shouldFallBackToDefaultSort_1 = false;
                if (this.lazyLoad) {
                    var alreadyLoadedAllData = true;
                    for (var i = 0; i < this.renderedItems.length; i++) {
                        if (!this.renderedItems[i].data) {
                            alreadyLoadedAllData = false;
                            break;
                        }
                    }
                    if (this.sortColumn === this.previousSortColumn) {
                        this.renderedItems = this.renderedItems.reverse();
                        return;
                    }
                    else {
                        if (!alreadyLoadedAllData) {
                            for (var i = 0; i < this.renderedItems.length; i++) {
                                this.renderedItems[i] = { data: undefined, type: DataTableRenderedItemType.Normal };
                            }
                        }
                        else {
                            shouldFallBackToDefaultSort_1 = true;
                        }
                    }
                }
                this.doCustomSort.emit({
                    direction: sortDirection_1, field: this.sortColumn.field, fallBackToDefaultSort: function () {
                        shouldFallBackToDefaultSort_1 = true;
                    }
                });
                if (shouldFallBackToDefaultSort_1 || this.doCustomSort.observers.length === 0) {
                    this.renderedItems = this.renderedItems.sort(function (a, b) {
                        return sortDirection_1 * compareFunction_1(a.data, b.data, _this.sortColumn.field);
                    });
                }
            }
            else {
                // The following code handles the sorting when grouping is enabled.
                // It sorts the group items in each of the group.
                var sortedRenderedItems_1 = [];
                var groupedRenderedItems = void 0;
                for (var i = 0; i < this.renderedItems.length; i++) {
                    if (this.renderedItems[i].type === DataTableRenderedItemType.GroupHeader) {
                        if (groupedRenderedItems) {
                            groupedRenderedItems = groupedRenderedItems.sort(function (a, b) {
                                return sortDirection_1 * compareFunction_1(a.data, b.data, _this.sortColumn.field);
                            });
                            groupedRenderedItems.forEach(function (item) {
                                sortedRenderedItems_1.push(item);
                            });
                        }
                        sortedRenderedItems_1.push(this.renderedItems[i]);
                        groupedRenderedItems = [];
                    }
                    else {
                        groupedRenderedItems.push(this.renderedItems[i]);
                    }
                }
                if (groupedRenderedItems) {
                    groupedRenderedItems = groupedRenderedItems.sort(function (a, b) {
                        return sortDirection_1 * compareFunction_1(a.data, b.data, _this.sortColumn.field);
                    });
                    groupedRenderedItems.forEach(function (item) {
                        sortedRenderedItems_1.push(item);
                    });
                }
                this.renderedItems = sortedRenderedItems_1;
            }
        }
    };
    DataTableComponent.prototype.defaultSortCompareFunction = function (a, b, field) {
        var result = 0;
        if (!a && !b) {
            result = 0;
        }
        else if (!a && b) {
            result = 1;
        }
        else if (a && !b) {
            result = -1;
        }
        else {
            var aValue = a[field];
            var bValue = b[field];
            var dataType = typeof aValue;
            if (dataType === 'number') {
                aValue = aValue === 0 ? aValue : (aValue || Number.MIN_VALUE);
                bValue = bValue === 0 ? bValue : (bValue || Number.MIN_VALUE);
            }
            else {
                aValue = aValue && aValue.toString && aValue.toString().toLocaleLowerCase() || '';
                bValue = bValue && aValue.toString && bValue.toString().toLocaleLowerCase() || '';
            }
            if (aValue > bValue) {
                result = 1;
            }
            else if (aValue < bValue) {
                result = -1;
            }
        }
        return result;
    };
    DataTableComponent.prototype.hasVerticalOverflow = function () {
        return this.scrollBodyElement.nativeElement.clientHeight > this.scrollContainerElement.nativeElement.clientHeight;
    };
    DataTableComponent.prototype.alignScrollBar = function () {
        var hasVerticalOverflow = this.hasVerticalOverflow();
        if (!this.calculatedScrollbarWidth) {
            this.calculateScrollbarWidth();
        }
        if (hasVerticalOverflow !== this.currentHasVerticalOverflow) {
            if (hasVerticalOverflow) {
                this.headerTableElement.nativeElement.style.width = 'calc(100% - ' + this.calculatedScrollbarWidth + 'px)';
                this.scrollDataElement.nativeElement.style.right = this.calculatedScrollbarWidth + 'px';
            }
            else {
                this.headerTableElement.nativeElement.style.width = '100%';
                this.scrollDataElement.nativeElement.style.right = '0px';
            }
        }
        this.currentHasVerticalOverflow = hasVerticalOverflow;
    };
    DataTableComponent.prototype.calculateScrollbarWidth = function () {
        var scrollDiv = document.createElement('div');
        this.scrollContainerElement.nativeElement.appendChild(scrollDiv);
        scrollDiv.className = 'scrollbar-measure';
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.scrollContainerElement.nativeElement.removeChild(scrollDiv);
        this.calculatedScrollbarWidth = scrollbarWidth;
    };
    ;
    DataTableComponent.prototype.calculateItemInViewPort = function (preventScrolling, forceUpdate) {
        var _this = this;
        if (this.renderedItems) {
            // Scroll container is the div to render the view port of the data table and to provide the scroll bar.
            var scrollContainerElement = this.scrollContainerElement.nativeElement;
            // Scroll body is the div to represent the actual data container.
            // Its height is the height needed by all the data table items.
            // When the list is long, this div can be very high and triggers the scroll container to show the scroll bar.
            var scrollBodyElement = this.scrollBodyElement.nativeElement;
            // Scroll data element is the div to show the displayed list items in and below the view port.
            // When the scrolling is happening, we always adjust the top of this div to make sure it remains in the view port.
            var scrollDataElement = this.scrollDataElement.nativeElement;
            // "scroll above data" element is the div show the list items above the view port.
            // We need to render this "above" data seperately 
            // then it's easy for us to find the "top" of the displayed list item in the view port.
            // Note: the "scroll below data" is rendered in Scroll data element because we don't need to calculate the "top" for it
            // since anyway it just follow the displayed list items in the view port.
            var scrollAboveDataElement = this.scrollAboveDataElement.nativeElement;
            // Calculates how many items can be rendered in the view port.
            var length_1 = Math.min(this.renderedItems.length, scrollContainerElement.offsetHeight / this.rowHeight);
            var startIndex = 0;
            if (this.hasLongList && preventScrolling) {
                this.dataScrollTop = (scrollContainerElement.scrollHeight - scrollContainerElement.offsetHeight)
                    * this.currentStartIndexOfItemInViewPort / (this.renderedItems.length - length_1);
                startIndex = this.currentStartIndexOfItemInViewPort;
                scrollContainerElement.scrollTop = this.dataScrollTop;
            }
            else {
                // Calculates the which item is the starting item in the view port.
                // The idea here is to calculate the percentage of how far the scrollbar moved.
                // The distance the scrollbar can move is the total height of the scrollbar minus the height of the viewport.
                if (Math.floor(this.dataScrollTop) !== scrollContainerElement.scrollTop) {
                    this.dataScrollTop = scrollContainerElement.scrollTop;
                }
                var accurateStartIndex = (this.renderedItems.length - length_1) * this.dataScrollTop
                    / (scrollContainerElement.scrollHeight - scrollContainerElement.offsetHeight);
                startIndex = Math.floor(accurateStartIndex);
                this.currentStartIndexOfItemInViewPort = startIndex;
            }
            // If the list is short and no need to have scroll bar, just simply set the start index to 0.
            if (scrollContainerElement.scrollHeight <= scrollContainerElement.offsetHeight) {
                startIndex = 0;
            }
            var renderedItemStart = startIndex - length_1 * this.bufferRowRate;
            var renderedItemEnd = Math.ceil(startIndex + length_1 + length_1 * this.bufferRowRate);
            var shouldLazyLoad = false;
            if (this.lazyLoad) {
                // The following logic calculates which part of data should be loaded with the lazy loading event.                
                var lazyLoadStart = Math.max(0, Math.floor(renderedItemStart));
                var actualLazyLoadStart_1 = lazyLoadStart;
                var lazyLoadLength = Math.min(this.renderedItems.length, renderedItemEnd) - lazyLoadStart;
                var actualLazyLoadLength = lazyLoadLength;
                for (var i = lazyLoadStart; i < lazyLoadStart + lazyLoadLength; i++) {
                    if (!shouldLazyLoad && !this.renderedItems[i].data) {
                        shouldLazyLoad = true;
                        actualLazyLoadStart_1 = i;
                    }
                    if (shouldLazyLoad && this.renderedItems[i].data) {
                        break;
                    }
                    actualLazyLoadLength = i + 1 - actualLazyLoadStart_1;
                }
                if (actualLazyLoadLength === 0) {
                    shouldLazyLoad = false;
                }
                if (shouldLazyLoad) {
                    var sortOrder = 0;
                    if (this.sortColumn) {
                        switch (this.sortColumn.sortMode) {
                            case DataTableSortMode.Ascend:
                                sortOrder = 1;
                                break;
                            case DataTableSortMode.Descend:
                                sortOrder = -1;
                                break;
                            default:
                                sortOrder = 0;
                                break;
                        }
                    }
                    var lazyLoadEvent = {
                        start: actualLazyLoadStart_1,
                        length: actualLazyLoadLength,
                        finishLoadingData: function (items) {
                            if (items && items.length) {
                                for (var i = 0; i < items.length; i++) {
                                    _this.renderedItems[actualLazyLoadStart_1 + i] = {
                                        data: items[i], type: DataTableRenderedItemType.Normal
                                    };
                                }
                                _this.calculateItemInViewPort();
                            }
                        },
                        sortOrder: sortOrder,
                        sortField: this.sortColumn ? this.sortColumn.field : this.columns.first.field
                    };
                    this.lazyLoadingData.emit(lazyLoadEvent);
                    if (actualLazyLoadLength >= length_1 * this.bufferRowRate) {
                        this.isBusy = true;
                    }
                }
            }
            if (!shouldLazyLoad) {
                // When the displaying list item in the view port is moving due to scroll bar is moving,
                // we need to update the top of the scroll data element.
                // The first item of the scroll data element won't always aligh to the top of the view port.
                // So here we need to figure out the offset of the first item.
                var offset = scrollContainerElement.scrollTop % this.rowHeight;
                // Note: when the display item list is even longer than the scroll container height * row height,
                // it means when we move 1 pixel of the scroll bar, the data table will move by at least one item.
                // In this case, we won't need to handle offset since we don't have a chance to show "half data table item" 
                // at the top border of the scroll container by moving the scroll bar very little.
                if (this.renderedItems.length > scrollContainerElement.offsetHeight * this.rowHeight) {
                    offset = 0;
                }
                this.displayItemsTop = scrollContainerElement.scrollTop - offset;
                // When the scroll bar is moved to very bottom, we just simply align the displayed data table items's bottom
                // to the bottom of the container to make sure the last data table item can be displayed completely.
                // Otherwise, when the list is super long (refer to how we calculate the top offset of the super long list), 
                // the last item may not be rendered completely.
                if (this.renderedItems.length > scrollContainerElement.offsetHeight * this.rowHeight
                    && scrollContainerElement.scrollTop >=
                        scrollContainerElement.scrollHeight - scrollContainerElement.offsetHeight - this.rowHeight / 2) {
                    this.displayItemsTop = scrollContainerElement.scrollHeight - Math.ceil(length_1) * this.rowHeight;
                }
                scrollDataElement.style.top = this.displayItemsTop + 'px';
                if (forceUpdate) {
                    this.scrollAboveDataElementHeight = 0;
                }
                this.handleScrollAboveDataElement();
                if ((!this.currentRenderedItemInViewPort || !this.renderedItems[startIndex]
                    || (this.renderedItems[startIndex].data !== this.currentRenderedItemInViewPort.data))
                    || forceUpdate) {
                    // Prepare the display data above the view port and display data in and below the view port.
                    // Note: when we push new item into the arrays, we create a new object to wrap the display item.
                    // Because we want to force the ngFor to re-render all the items instead of only re-render the updated ones.            
                    // Otherwise, ngFor will try to adjust DOM order of those items which messes up the scroll bar position.
                    this.renderedItemsAboveViewPort = [];
                    this.renderedItemsInAndBelowViewPort = [];
                    if (scrollContainerElement.scrollHeight > scrollContainerElement.offsetHeight) {
                        for (var i = renderedItemStart; i < startIndex; i++) {
                            var index = Math.round(i);
                            if (index < startIndex) {
                                if (index >= 0 && index < this.renderedItems.length) {
                                    this.renderedItemsAboveViewPort.push({
                                        type: this.renderedItems[index].type,
                                        data: this.renderedItems[index].data
                                    });
                                }
                                else {
                                    this.renderedItemsAboveViewPort.push({ data: null, type: null });
                                }
                            }
                        }
                    }
                    for (var i = startIndex; i < renderedItemEnd; i++) {
                        var index = Math.round(i);
                        if (index >= 0 && index < this.renderedItems.length) {
                            this.renderedItemsInAndBelowViewPort.push({
                                type: this.renderedItems[index].type,
                                data: this.renderedItems[index].data
                            });
                        }
                        else {
                            this.renderedItemsInAndBelowViewPort.push({ data: null, type: null });
                        }
                    }
                }
                this.currentRenderedItemInViewPort = this.renderedItems[startIndex];
                this.isScrolling = false;
                this.isBusy = false;
            }
        }
    };
    DataTableComponent.prototype.filter = function () {
        var _this = this;
        if (this.items) {
            if (!this.filterKeyword) {
                this.filteredItems = this.items.map(function (item) { return item; });
            }
            else if (this.items) {
                this.filteredItems = this.items.filter(function (item) {
                    var found = false;
                    _this.columns.forEach(function (column) {
                        if (!found) {
                            var value = item[column.field];
                            if (value) {
                                if (!_this.caseSensitiveFilter) {
                                    value = value.toLocaleLowerCase();
                                    _this.filterKeyword = _this.filterKeyword.toLocaleLowerCase();
                                }
                                if (value.toString().indexOf(_this.filterKeyword) !== -1) {
                                    found = true;
                                }
                            }
                        }
                    });
                    return found;
                });
            }
        }
    };
    DataTableComponent.prototype.handleGroup = function () {
        var _this = this;
        if (this.groupColumn) {
            var groupKeys_1 = {};
            var groups_1 = [];
            if (this.groupSortMode !== DataTableSortMode.None) {
                var compareFunction_2 = this.groupColumn.sortable === 'custom' ?
                    this.groupColumn.compareFunction.bind(this) : this.defaultSortCompareFunction.bind(this);
                var sortDirection_2 = this.groupSortMode === DataTableSortMode.Ascend ? 1 : -1;
                this.filteredItems = this.filteredItems.sort(function (a, b) {
                    return sortDirection_2 * compareFunction_2(a, b, _this.groupColumn.field);
                });
            }
            this.filteredItems.forEach(function (item) {
                var groupData = item[_this.groupColumn.field];
                if (!groupKeys_1[groupData]) {
                    var groupItems = [];
                    groups_1.push({ group: groupData, items: groupItems });
                    groupKeys_1[groupData] = groupItems;
                }
                if (_this.groupToggleStatus[groupData] === undefined) {
                    _this.groupToggleStatus[groupData] = _this.defaultGroupToggleExpanded;
                }
                groupKeys_1[groupData].push(item);
            });
            this.renderedItems = [];
            for (var i = 0; i < groups_1.length; i++) {
                this.renderedItems.push({ data: groups_1[i].group, type: DataTableRenderedItemType.GroupHeader });
                if (this.groupToggleStatus[groups_1[i].group]) {
                    groups_1[i].items.forEach(function (item) {
                        _this.renderedItems.push({ data: item, type: DataTableRenderedItemType.GroupItem });
                    });
                }
            }
        }
        else {
            this.renderedItems = this.filteredItems.map(function (item) { return { data: item, type: DataTableRenderedItemType.Normal }; });
        }
    };
    DataTableComponent.prototype.renderItems = function (preventScrolling, forceUpdate) {
        this.filter();
        this.handleGroup();
        // Calculates how high the scroll data div should be.
        if (this.renderedItems) {
            var height = this.renderedItems.length * this.rowHeight;
            // If the height is too much, we need to limited the height otherwise Edge will crash.
            // It's ok if the scroll data div height doesn't equal to the actual total data table height 
            // because anyway we use the ratio of scroll data div height to actual total list item height 
            // to calculate the scrolling position of the actual data.
            this.hasLongList = false;
            if (height > this.maxActualScrollDataElementHeight) {
                // We need to find a height near the maxActualScrollDataElementHeight which can be divided exactly by the row height.
                // Otherwise when we calcuate the scrolling position of the actual data, 
                // the floating part of the height will impact the accuracy of the calculation result.
                this.hasLongList = true;
                height = Math.floor(this.maxActualScrollDataElementHeight / this.rowHeight) * this.rowHeight;
            }
            this.scrollBodyElement.nativeElement.style.height = height + 'px';
        }
        this.sortItems();
        this.calculateItemInViewPort(preventScrolling, forceUpdate);
    };
    DataTableComponent.prototype.handleScrollAboveDataElement = function () {
        var scrollAboveDataElement = this.scrollAboveDataElement.nativeElement;
        // Only display the scroll above data element when it's height is available.
        // Its height may not be ready when the data table is rendered first time and the scroll top is 0.
        if (!this.scrollAboveDataElementHeight && scrollAboveDataElement.offsetHeight) {
            this.scrollAboveDataElementHeight = scrollAboveDataElement.offsetHeight;
        }
        if (this.scrollAboveDataElementHeight) {
            scrollAboveDataElement.style.top = this.displayItemsTop - this.scrollAboveDataElementHeight + 'px';
            scrollAboveDataElement.style.visibility = 'visible';
        }
        else {
            scrollAboveDataElement.style.visibility = 'hidden';
        }
    };
    DataTableComponent.prototype.onLayoutChanged = function () {
        var _this = this;
        var scrollAboveDataElement = this.scrollAboveDataElement.nativeElement;
        this.calculateItemInViewPort(false, true);
        // When layout is changed, the "display above view port" item list data source is updated        
        // but the html is not updated yet. So the UI of the "display above view port" is not good.
        // So hide the UI for now and adjust it in setTimeout.
        scrollAboveDataElement.style.visibility = 'hidden';
        setTimeout(function () {
            _this.scrollAboveDataElementHeight = 0;
            _this.handleScrollAboveDataElement();
        });
    };
    DataTableComponent.prototype.alignContent = function () {
        this.contentElement.nativeElement.style.marginTop = this.headerTableElement.nativeElement.offsetHeight + 'px';
    };
    DataTableComponent.prototype.clearSelection = function () {
        if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
            this.selection = [];
        }
        else {
            this.selection = null;
        }
    };
    return DataTableComponent;
}());
export { DataTableComponent };
DataTableComponent.selectionModeMultipleOption = 'multiple';
DataTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-data-table',
                styles: ["\n      :host {\n          width: 100%;\n          display: flex;\n          flex-wrap: nowrap;\n          flex-direction: column;\n          align-content: stretch;\n          align-items: stretch;\n          justify-content: flex-start;\n          position: relative;\n          overflow: hidden;\n      }\n\n      table {\n          width: 100%;\n          table-layout: fixed;\n      }\n\n      th {\n          cursor: pointer;\n          font-weight: normal;\n          color: #686868;\n          font-size: 11px;\n          padding: 0 8px;    \n          height: 27px;\n          -webkit-touch-callout: none; /* iOS Safari */\n          -webkit-user-select: none; /* Safari */\n           -khtml-user-select: none; /* Konqueror HTML */\n             -moz-user-select: none; /* Firefox */\n              -ms-user-select: none; /* Internet Explorer/Edge */\n                  user-select: none; /* Non-prefixed version, currently\n                                        supported by Chrome and Opera */\n      }\n\n      th:hover,\n      .header.has-multiple-selection table thead tr th.first:hover {\n          background: #f8f8f8;    \n      }\n\n      th .sme-icon:before {\n          font-size: 11px;\n      }\n\n      .header table thead tr th.first:hover {\n          background: none;\n          cursor: default;\n      }\n\n      .header table thead tr th.first .datatable-checkbox {\n          display: none;    \n      }\n\n      .header.has-multiple-selection table thead tr th.first .datatable-checkbox {\n          display: block;\n      }\n\n      .header table thead tr th.first,\n      .item td.first,\n      .item.no-data .prefix {\n          width: 26px;\n      }\n\n      .header table thead tr th.first,\n      .item td.first .cell-data {\n          padding: 0;\n      }\n\n      .item td.first .datatable-checkbox {\n          display: none;\n      }\n\n      .content.has-multiple-selection .item.selected td.first .datatable-checkbox,\n      .content.has-multiple-selection .item td.first:hover .datatable-checkbox {\n          display: block;\n      }\n\n      .item.no-data .prefix {\n          float: left;\n      }\n\n      .item.group-header .cell-data:first-of-type .sme-icon:before {    \n          font-size: 10px;\n          line-height: 10px;\n          margin-top: -3px;\n          margin-right: 3px;\n      }\n\n      .item.group-item .first-data-column .cell-data {    \n          padding-left: 26px;\n      }\n\n      .header table thead tr th {\n          padding: 0 8px;\n      }\n\n      .header {\n          flex: 0 0 auto;\n          border-bottom: solid 1px #ddd;\n          background: white;\n          position: absolute;\n          margin-top: -1px;\n          z-index: 1;    \n      }\n\n      .header.is-scrolled {\n          box-shadow: 0px -1px 7px #999;\n      }\n\n      .content {\n          flex: 1 1 auto;\n          position: relative;\n          margin-top: 27px;\n      }\n\n      .content .scroll-data {\n          position: absolute;\n          left: 0;\n          width: 100%;\n          overflow: hidden;\n          border-collapse: collapse;\n      }\n\n      .content .scroll-container {\n          overflow-x: hidden;\n          overflow-y: auto;    \n      }\n\n      .content .scroll-body {\n          position: relative;\n          overflow: hidden;\n      }\n\n      .cell-data {\n          height: 30px;\n          line-height: 30px;\n          border-bottom: solid 1px #eee;  \n          overflow: hidden;    \n      }\n\n      .item.data {\n          cursor: pointer;\n      }\n\n      .item.data:hover {\n          background: #f2fbfe;\n      }\n\n      .item.data.selected {\n          background: #E6F7FE;\n      }\n\n      .item .cell-data {\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          padding: 0 8px;\n      }\n\n      :host >>> .scrollbar-measure {\n          width: 100px;\n          height: 100px;\n          overflow: scroll;\n          position: absolute;\n          top: -9999px;\n      }\n\n      .datatable-checkbox {\n          width: 100%;\n          position: relative;\n          height: 30px;\n      }\n      .datatable-checkbox label {\n          width: 12px;\n          height: 12px;\n          cursor: pointer;\n          position: absolute;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n          background: white;\n          border: solid 1px #686868;    \n      }\n\n      .datatable-checkbox input[type=checkbox]:hover + label {\n          background: rgb(242,251,254);    \n      }\n\n      .datatable-checkbox input[type=checkbox] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          z-index: 1;\n          margin: 0;\n          opacity: 0;\n          cursor: pointer;\n      }\n      .datatable-checkbox input[type=checkbox]:checked + label {\n          background: none;\n          border: solid 1px transparent;\n      }\n      .datatable-checkbox input[type=checkbox]:checked + label:after {\n          content: '\\E8FB';\n          font-family: Server-MDL2;\n          position: absolute;\n          top: 0;\n          line-height: 12px;\n      }\n      .loading-indicator {\n          display: none;\n          position: absolute;\n          left: 50%;\n          top: 50%;\n          transform: translate(-50%,-50%);\n      }\n      .is-busy .loading-indicator {\n          display: block;\n      }\n    "],
                template: "\n      <div class=\"header\" #header [ngClass]=\"{'is-scrolled':isScrolledDown, 'has-multiple-selection':selectionMode==='multiple'}\">\n          <table #headerTable>\n              <thead>\n                  <tr>\n                      <th class=\"first\">\n                          <div class=\"datatable-checkbox\">\n                              <input type=\"checkbox\" [checked]=\"selection && selection.length===filteredItems.length\" (change)=\"onAllItemCheckBoxClicked()\"\n                              />\n                              <label></label>\n                          </div>\n                      </th>\n                      <th *ngFor=\"let column of columns\" (click)=\"clickColumn(column)\" [hidden]=\"column==groupColumn\">\n                          <span class=\"columnName\">{{column.header}}</span>\n                          <span class=\"sortIcon sme-icon\" [ngClass]=\"{'icon-win-up':column.sortMode==sortModeEnum.Ascend,'icon-win-down':column.sortMode==sortModeEnum.Descend}\"></span>\n                      </th>\n                  </tr>\n              </thead>\n          </table>\n      </div>\n      <div class=\"content\" #content [ngClass]=\"{'is-busy':isBusy, 'has-multiple-selection':selectionMode==='multiple'}\">\n          <div class=\"loading-indicator\">\n              <sme-loading-wheel></sme-loading-wheel>\n          </div>\n          <div class=\"scroll-container stretch-absolute\" #scrollContainer>\n              <div class=\"item no-data\" *ngIf=\"renderedItems.length===0 && !lazyLoad\">\n                  <div class=\"prefix cell-data\">&nbsp;</div>\n                  <div class=\"cell-data\">{{getPlaceholderMessage()}}</div>\n              </div>\n              <div class=\"scroll-body\" #scrollBody>\n                  <table class=\"scroll-data\" #scrollAboveData>\n                      <tbody>\n                          <tr *ngFor=\"let renderedItem of renderedItemsAboveViewPort; let rowIndex = index\" class=\"item data\" \n                              [ngClass]=\"{'selected': isItemSelected(renderedItem), 'group-item': renderedItem.type==renderedItemTypeEnum.GroupItem, 'group-header': renderedItem.type==renderedItemTypeEnum.GroupHeader}\">\n                              <td class=\"first\">\n                                  <div class=\"cell-data\">\n                                      <div class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                              </td>\n                              <td *ngFor=\"let column of columns; let colIndex=index\" [attr.colspan]=\"(renderedItem.type==renderedItemTypeEnum.GroupHeader && colIndex==0)?(columns.length-1):1\" [hidden]=\"(renderedItem.type==renderedItemTypeEnum.GroupHeader && colIndex>0) || column==groupColumn\"\n                                  [ngClass]=\"{'first-data-column': isFirstDataColumn(column)}\">\n                                  <div *ngIf=\"renderedItem.type==renderedItemTypeEnum.GroupHeader && colIndex==0\" class=\"cell-data\" (click)=\"clickGroupToggle(renderedItem)\">\n                                      <span *ngIf=\"useGroupToggle\" class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':isGroupExpanded(renderedItem.data), 'sme-icon-chevronRight':!isGroupExpanded(renderedItem.data)}\"></span>\n                                      <span *ngIf=\"!this.groupHeaderTemplate\">\n                                          {{renderedItem.data}}\n                                      </span>\n                                      <span *ngIf=\"this.groupHeaderTemplate\">\n                                          <sme-data-table-template-loader [template]=\"this.groupHeaderTemplate\" [data]=\"renderedItem.data\"></sme-data-table-template-loader>\n                                      </span>\n                                  </div>\n                                  <div *ngIf=\"!column.bodyTemplate && renderedItem.type!=renderedItemTypeEnum.GroupHeader\" class=\"cell-data\">\n                                      {{renderedItem.data?renderedItem.data[column.field]:'.'}}\n                                  </div>\n                                  <div *ngIf=\"renderedItem.type!=renderedItemTypeEnum.GroupHeader && renderedItem.data && column.bodyTemplate\" class=\"cell-data\">\n                                      <sme-data-table-template-loader [template]=\"column.bodyTemplate\" [data]=\"renderedItem.data\" [rowIndex]=\"rowIndex\"></sme-data-table-template-loader>\n                                  </div>\n                              </td>\n                          </tr>\n                      </tbody>\n                  </table>\n                  <table class=\"scroll-data\" #scrollData>\n                      <tbody>\n                          <tr *ngFor=\"let renderedItem of renderedItemsInAndBelowViewPort; let rowIndex = index\" (click)=\"selectItem($event, renderedItem)\" class=\"item data\"\n                              [ngClass]=\"{'selected': isItemSelected(renderedItem), 'group-item': renderedItem.type==renderedItemTypeEnum.GroupItem, 'group-header': renderedItem.type==renderedItemTypeEnum.GroupHeader}\" (dblclick)=\"doubleClickRow(renderedItem)\">\n                              <td class=\"first\" [ngClass]=\"{'checked': isItemSelected(renderedItem)}\">\n                                  <div class=\"cell-data\">\n                                      <div class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" (change)=\"onItemCheckBoxClicked(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                              </td>\n                              <td *ngFor=\"let column of columns; let colIndex=index\" [attr.colspan]=\"(renderedItem.type==renderedItemTypeEnum.GroupHeader && colIndex==0)?(columns.length-1):1\" [hidden]=\"(renderedItem.type==renderedItemTypeEnum.GroupHeader && colIndex>0) || (renderedItem.type!=renderedItemTypeEnum.GroupHeader && column==groupColumn)\"\n                                  [ngClass]=\"{'first-data-column': isFirstDataColumn(column)}\">\n                                  <div *ngIf=\"renderedItem.type==renderedItemTypeEnum.GroupHeader && colIndex==0\" class=\"cell-data\" (click)=\"clickGroupToggle(renderedItem)\">\n                                      <span *ngIf=\"useGroupToggle\" class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':isGroupExpanded(renderedItem.data), 'sme-icon-chevronRight':!isGroupExpanded(renderedItem.data)}\"></span>\n                                      <span *ngIf=\"!this.groupHeaderTemplate\">\n                                          {{renderedItem.data}}\n                                      </span>\n                                      <span *ngIf=\"this.groupHeaderTemplate\">\n                                          <sme-data-table-template-loader [template]=\"this.groupHeaderTemplate\" [data]=\"renderedItem.data\"></sme-data-table-template-loader>\n                                      </span>\n                                  </div>\n                                  <div *ngIf=\"!column.bodyTemplate && renderedItem.type!=renderedItemTypeEnum.GroupHeader\" class=\"cell-data\">\n                                      {{renderedItem.data?renderedItem.data[column.field]:'.'}}\n                                  </div>\n                                  <div *ngIf=\"renderedItem.type!=renderedItemTypeEnum.GroupHeader && renderedItem.data && column.bodyTemplate\" class=\"cell-data\">\n                                      <sme-data-table-template-loader [template]=\"column.bodyTemplate\" [data]=\"renderedItem.data\" [rowIndex]=\"rowIndex\"></sme-data-table-template-loader>\n                                  </div>\n                              </td>\n                          </tr>\n                          <tr class=\"item\" #tempRow>\n                              <td>\n                                  <div class=\"cell-data\">&nbsp;</div>\n                              </td>\n                          </tr>\n                      </tbody>\n                  </table>\n              </div>\n          </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
DataTableComponent.ctorParameters = function () { return [
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['layout',] },] },
]; };
DataTableComponent.propDecorators = {
    'headerTableElement': [{ type: ViewChild, args: ['headerTable',] },],
    'contentElement': [{ type: ViewChild, args: ['content',] },],
    'scrollContainerElement': [{ type: ViewChild, args: ['scrollContainer',] },],
    'tempRowElement': [{ type: ViewChild, args: ['tempRow',] },],
    'scrollBodyElement': [{ type: ViewChild, args: ['scrollBody',] },],
    'scrollAboveDataElement': [{ type: ViewChild, args: ['scrollAboveData',] },],
    'scrollDataElement': [{ type: ViewChild, args: ['scrollData',] },],
    'groupHeaderTemplate': [{ type: ContentChild, args: ['group',] },],
    'selectionChange': [{ type: Output },],
    'onRowDblclick': [{ type: Output },],
    'columns': [{ type: ContentChildren, args: [DataTableColumnComponent,] },],
    'renderedItemsChange': [{ type: Output },],
    'isBusy': [{ type: Input },],
    'loadingMessage': [{ type: Input },],
    'noRecordMessage': [{ type: Input },],
    'lazyLoadingData': [{ type: Output },],
    'lazyLoad': [{ type: Input },],
    'globalFilter': [{ type: Input },],
    'caseSensitiveFilter': [{ type: Input },],
    'items': [{ type: Input },],
    'selection': [{ type: Input },],
    'selectionMode': [{ type: Input },],
    'defaultSortColumn': [{ type: Input },],
    'defaultSortMode': [{ type: Input },],
    'onFilter': [{ type: Output },],
    'doCustomSort': [{ type: Output },],
    'onRowSelect': [{ type: Output },],
    'onRowUnselect': [{ type: Output },],
    'groupColumn': [{ type: Input },],
    'groupSortMode': [{ type: Input },],
    'useGroupToggle': [{ type: Input },],
    'defaultGroupToggleExpanded': [{ type: Input },],
    'virtualCount': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBR2YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUlOLFFBQVEsRUFDUixNQUFNLEVBR04sU0FBUyxFQUNaLE1BQU0sZUFBQSxDQUFnQjtBQUd2QixPQUFPLEVBQUUsd0JBQUEsRUFBeUIsTUFBTywrQkFBQSxDQUFnQztBQUN6RSxPQUFPLEVBRW9CLHlCQUFBLEVBQTJCLGlCQUFBLEVBQ3JELE1BQU0sdUJBQUEsQ0FBd0I7QUFHL0I7O0dBRUc7QUFFSDtJQTZUSSw0QkFBb0IsTUFBYyxFQUFZLE1BQWM7UUFBNUQsaUJBTUM7UUFObUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7UUExVHBELFlBQU8sR0FBWSxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQztRQUN2RCxxQ0FBZ0MsR0FBRyxNQUFNLENBQUM7UUFDMUMsMEJBQXFCLEdBQUcsR0FBRyxDQUFDO1FBQzVCLGdDQUEyQixHQUFHLEdBQUcsQ0FBQztRQUdsQyxrQkFBYSxHQUFHLEdBQUcsQ0FBQztRQUNwQiwrQkFBMEIsR0FBbUIsRUFBRSxDQUFDO1FBY2hELDBCQUFxQixHQUE0QixFQUFFLENBQUM7UUFDcEQsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixzQkFBaUIsR0FBZSxFQUFFLENBQUM7UUFFbkMsc0NBQWlDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFHdkMsc0JBQWlCLEdBQWlDLEVBQUUsQ0FBQztRQUVyRCwwQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUEyQnZEOztXQUVHO1FBRUksb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBWSxDQUFDO1FBRy9DLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7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LEVBQUUsQ0FBQyx3QkFBd0IsRUFBRyxFQUFFLEVBQUU7SUFDM0UscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUMxQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM1QixnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3BDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDckMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUN0QyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM5QixjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNsQyxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3pDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzNCLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQy9CLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ25DLG1CQUFtQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDdkMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNyQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUMvQixjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNuQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNsQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNwQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNqQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNuQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3BDLDRCQUE0QixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDaEQsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDakMsQ0FBQyIsImZpbGUiOiJkYXRhLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=