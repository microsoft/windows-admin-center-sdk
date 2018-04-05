var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ChangeDetectorRef, Component, ContentChild, ContentChildren, EventEmitter, Inject, Input, NgZone, Optional, Output, ViewChild } from '@angular/core';
import { CoreEnvironment } from '../../../core';
import { DataTableColumnComponent } from './data-table-column.component';
import { DataTableRenderedItemType, DataTableSortMode } from './data-table-contract';
/**
 * Data table component
 */
var DataTableComponent = /** @class */ (function () {
    function DataTableComponent(changeDetector, ngZone, layout) {
        var _this = this;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        this.layout = layout;
        this.strings = MsftSme.resourcesStrings();
        this.maxActualScrollDataElementHeight = 500000;
        this.filterDebounceTimeout = 300;
        this.keyboardNavigationDebounceTimeout = 100;
        this.scrollCheckIntervalDuration = 300;
        this.navigationKeyboardDebouncing = false;
        this.bufferRowRate = 0.5;
        this.eventUnregistraterHandlers = [];
        this.internalRenderedItems = [];
        this.isLoading = true;
        this.internalSelection = [];
        this.currentStartIndexOfItemInViewPort = -1;
        this.internalGroupSortMode = DataTableSortMode.None;
        this.activeRenderedItemIndex = -1;
        this.renderedItemStartIndexOffset = 0;
        this.currentColumnIndexWithFocusedElement = -1;
        this.contentAreaHasFocus = false;
        this.cancelLastFocusableShadowElementFocusOnce = false;
        /**
         * It emits the event when selection changing is happening.
         */
        this.selectionChange = new EventEmitter();
        this.onRowDblclick = new EventEmitter();
        this.onGroupToggleClicked = new EventEmitter();
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
         * It triggers when a tree node is expanded.
         */
        this.onNodeExpand = new EventEmitter();
        /**
         * It triggers when a tree node is selected.
         */
        this.onNodeSelect = new EventEmitter();
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
         * It indicates whether to show the header.
         */
        this.showHeader = true;
        /**
         * It indicates should the data table has the grid.
         */
        this.showGrid = true;
        /**
         * It indicates whether to show the "all item" checkbox.
         */
        this.showAllItemCheckbox = true;
        /**
         * It indicates whether to check the item and uncheck other items when the current item is checked.
         */
        this.selectAndCheck = true;
        /**
         * It indicates whether to link the selections of parent nodes and child nodes.
         * It only apply to tree table scenario.
         */
        this.linkParentChildrenSelections = true;
        /**
         * It indicates whether to select the item when navigating with the keyboard (e.g. arrow keys, home, end, page up, page down)
         */
        this.selectItemWhenNavigatingWithKeyboard = true;
        /**
         * It indicates whether to show the left margin in each row.
         */
        this.showLeftMargin = true;
        /**
         * It indicates whether the data table is scrollable.
         */
        this.scrollable = true;
        /**
         * It indicates whether the data table items are selectable
         */
        this.selectable = true;
        /**
         * It indicates the default status of the group toggle.
         */
        this.defaultGroupToggleExpanded = true;
        this.groupToggleStatus = {};
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
            var eventHandler = (function (event) {
                clearTimeout(_this.filterDebounceTimer);
                _this.filterDebounceTimer = setTimeout(function () {
                    _this.filterKeyword = globalFilter['value'];
                    if (_this.filterKeyword !== _this.oldFilterKeyword) {
                        _this.clearSelection();
                        _this.onFilter.emit(_this.filterKeyword);
                        _this.renderItems(false, true);
                    }
                    _this.oldFilterKeyword = _this.filterKeyword;
                }, _this.filterDebounceTimeout);
            }).bind(this);
            this.internalGlobalFilter = globalFilter;
            if (globalFilter) {
                globalFilter.addEventListener('keyup', eventHandler);
                globalFilter.addEventListener('paste', eventHandler);
                this.eventUnregistraterHandlers.push(function () {
                    globalFilter.removeEventListener('keyup', eventHandler);
                    globalFilter.removeEventListener('paste', eventHandler);
                });
            }
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
            this.internalItems = value;
            this.isLoading = !value;
            this.renderItems(false, true);
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
            var _this = this;
            if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
                this.internalSelection = selection || [];
                if (this.showAsTree) {
                    this.filteredItems.forEach(function (item) {
                        _this.handleTreeNodeSelection(item, false, true, !_this.linkParentChildrenSelections, selection.map(function (selectionItem) { return selectionItem.data; }));
                    });
                }
            }
            else {
                this.internalSelection = selection ? [selection] : [];
            }
            this.updateActiveRenderedItemIndexBySelection();
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
        this.updateActiveRenderedItemIndexBySelection();
        this.unregisterOnElementFocusingEventHandler = CoreEnvironment.registerElementFocusingEvent(this.onElementFocusing.bind(this));
    };
    DataTableComponent.prototype.onContentTablePressed = function (event) {
        var _this = this;
        CoreEnvironment.changeAccessibilityMode(true);
        var targetElement = event.target;
        var currentRow = MsftSme.getSpecificAncestor(targetElement, function (element) { return element.tagName === 'TR'; });
        var shouldPreventDefaultKeyboardAction = false;
        var currentRenderedItem = this.renderedItems[this.getActiveRenderedItemIndex()];
        // Only the scrolling related navigation keyboard operations need debouncing.
        switch (event.keyCode) {
            case MsftSme.KeyCode.Home:
                shouldPreventDefaultKeyboardAction = true;
                if (!this.navigationKeyboardDebouncing) {
                    this.moveToHeadOfRenderedItems();
                }
                break;
            case MsftSme.KeyCode.PageUp:
                shouldPreventDefaultKeyboardAction = true;
                if (!this.navigationKeyboardDebouncing) {
                    this.moveToPreviousPageOfRenderedItems();
                }
                break;
            case MsftSme.KeyCode.UpArrow:
                shouldPreventDefaultKeyboardAction = true;
                if (!this.navigationKeyboardDebouncing) {
                    this.moveToPreviousRenderedItem();
                }
                break;
            case MsftSme.KeyCode.DownArrow:
                shouldPreventDefaultKeyboardAction = true;
                if (!this.navigationKeyboardDebouncing) {
                    this.moveToNextRenderedItem();
                }
                break;
            case MsftSme.KeyCode.PageDown:
                shouldPreventDefaultKeyboardAction = true;
                if (!this.navigationKeyboardDebouncing) {
                    this.moveToNextPageOfRenderedItems();
                }
                break;
            case MsftSme.KeyCode.End:
                shouldPreventDefaultKeyboardAction = true;
                if (!this.navigationKeyboardDebouncing) {
                    this.moveToEndOfRenderedItems();
                }
                break;
            case MsftSme.KeyCode.LeftArrow:
                shouldPreventDefaultKeyboardAction = true;
                if (currentRenderedItem.type === DataTableRenderedItemType.GroupHeader) {
                    this.clickGroupToggle(currentRenderedItem, false);
                }
                else if (currentRenderedItem.type === DataTableRenderedItemType.TreeNode && !currentRenderedItem.node.isLeaf) {
                    this.clickTreeToggle(currentRenderedItem, false);
                }
                else {
                    var previousElement = MsftSme.getPreviousFocusableElement(targetElement);
                    var rowForPreviousElement = MsftSme.getSpecificAncestor(previousElement, function (element) { return element.tagName === 'TR'; });
                    var cellForPreviousElement = MsftSme.getSpecificAncestor(previousElement, function (element) { return element.tagName === 'TD'; });
                    if (cellForPreviousElement) {
                        this.currentColumnIndexWithFocusedElement = -1;
                        for (var i = 0; cellForPreviousElement && i < cellForPreviousElement.parentElement.children.length; i++) {
                            if (cellForPreviousElement.parentElement.children[i] === cellForPreviousElement) {
                                if (i === 0 && previousElement.tagName === 'INPUT'
                                    && previousElement.parentElement.classList.contains('datatable-checkbox')) {
                                    // If the previousElement is the checkbox is in the first column, then skip it, directly go to the row.
                                    previousElement = rowForPreviousElement;
                                }
                                else {
                                    this.currentColumnIndexWithFocusedElement = i;
                                }
                                break;
                            }
                        }
                    }
                    if (previousElement === currentRow || rowForPreviousElement !== currentRow) {
                        this.currentColumnIndexWithFocusedElement = -1;
                    }
                    if (rowForPreviousElement === currentRow) {
                        previousElement.focus();
                    }
                }
                break;
            case MsftSme.KeyCode.RightArrow:
                shouldPreventDefaultKeyboardAction = true;
                if (currentRenderedItem.type === DataTableRenderedItemType.GroupHeader) {
                    this.clickGroupToggle(currentRenderedItem, true);
                }
                else if (currentRenderedItem.type === DataTableRenderedItemType.TreeNode && !currentRenderedItem.node.isLeaf) {
                    this.clickTreeToggle(currentRenderedItem, true);
                }
                else {
                    var nextElement = MsftSme.getNextFocusableElement(targetElement);
                    var rowForNextElement = MsftSme.getSpecificAncestor(nextElement, function (element) { return element.tagName === 'TR'; });
                    var cellForNextElement = MsftSme.getSpecificAncestor(nextElement, function (element) { return element.tagName === 'TD'; });
                    if (cellForNextElement) {
                        this.currentColumnIndexWithFocusedElement = -1;
                        for (var i = 0; cellForNextElement && i < cellForNextElement.parentElement.children.length; i++) {
                            if (cellForNextElement.parentElement.children[i] === cellForNextElement) {
                                if (i === 0 && nextElement.tagName === 'INPUT'
                                    && nextElement.parentElement.classList.contains('datatable-checkbox')) {
                                    // If the nextElement is the checkbox in first column, move on the next candidate.
                                    nextElement = MsftSme.getNextFocusableElement(nextElement);
                                    rowForNextElement = MsftSme.getSpecificAncestor(nextElement, function (element) { return element.tagName === 'TR'; });
                                    cellForNextElement = MsftSme.getSpecificAncestor(nextElement, function (element) { return element.tagName === 'TD'; });
                                }
                                else {
                                    this.currentColumnIndexWithFocusedElement = i;
                                    break;
                                }
                            }
                        }
                    }
                    if (this.currentColumnIndexWithFocusedElement !== -1
                        && currentRow === rowForNextElement) {
                        nextElement.focus();
                    }
                }
                break;
            case MsftSme.KeyCode.Space:
                if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
                    this.onItemCheckBoxClicked(currentRenderedItem);
                    shouldPreventDefaultKeyboardAction = true;
                }
                break;
        }
        if (shouldPreventDefaultKeyboardAction) {
            event.stopPropagation();
            event.preventDefault();
            this.navigationKeyboardDebouncing = true;
            this.changeDetector.detectChanges();
            setTimeout(function () {
                _this.navigationKeyboardDebouncing = false;
            }, this.keyboardNavigationDebounceTimeout);
        }
    };
    DataTableComponent.prototype.onContentItemFocused = function (event) {
        var _this = this;
        this.contentAreaHasFocus = true;
        setTimeout(function () {
            _this.scrollBodyElement.nativeElement.scrollTop = 0;
        });
    };
    DataTableComponent.prototype.onContentItemBlurred = function (event) {
        var _this = this;
        this.contentAreaHasFocus = false;
        setTimeout(function () {
            _this.scrollBodyElement.nativeElement.scrollTop = 0;
        });
    };
    DataTableComponent.prototype.onLastFocusableShadowElementFocused = function (event) {
        var _this = this;
        setTimeout(function () {
            if (!_this.cancelLastFocusableShadowElementFocusOnce) {
                _this.tryToFocusSelectedRow();
            }
            _this.cancelLastFocusableShadowElementFocusOnce = false;
        });
    };
    DataTableComponent.prototype.generateNGClassForRenderedItem = function (renderedItem) {
        return {
            selected: renderedItem.index === this.getActiveRenderedItemIndex(),
            'group-item': renderedItem.type === DataTableRenderedItemType.GroupItem,
            'group-header': renderedItem.type === DataTableRenderedItemType.GroupHeader,
            checked: this.isItemSelected(renderedItem)
        };
    };
    DataTableComponent.prototype.shouldAllItemCheckBoxChecked = function () {
        var result = false;
        if (!this.showAsTree) {
            result = this.selection && this.selection.length === this.filteredItems.length;
        }
        else {
            result = true;
            for (var i = 0; i < this.filteredItems.length; i++) {
                var treeNodeDataItem = this.filteredItems[i];
                if (!treeNodeDataItem || !treeNodeDataItem.selected) {
                    result = false;
                    break;
                }
            }
        }
        return result;
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
            if (!_this.isScrolledDown) {
                _this.renderedItemStartIndexOffset = 0;
            }
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
        this.unregisterOnElementFocusingEventHandler();
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
        var _this = this;
        this.activeRenderedItemIndex = item.index;
        if (this.selectable) {
            if (item.type !== DataTableRenderedItemType.GroupHeader) {
                if (event && event.target['type'] === 'checkbox') {
                    return;
                }
                if (this.showAsTree) {
                    if (this.selectionMode !== DataTableComponent.selectionModeMultipleOption) {
                        this.selection = item.node;
                    }
                    else {
                        if (this.selectAndCheck) {
                            this.items.forEach(function (currentItem) {
                                _this.handleTreeNodeSelection(currentItem, false, true);
                            });
                            this.handleTreeNodeSelection(item.node, true, false, !this.linkParentChildrenSelections);
                            this.selectionChange.emit(this.internalSelection);
                        }
                    }
                    this.onNodeSelect.emit({ node: item.node });
                }
                else {
                    if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
                        if (this.selectAndCheck) {
                            this.selection = [item.data];
                        }
                    }
                    else {
                        this.selection = item.data;
                    }
                    this.onRowSelect.emit({ data: item.data });
                }
            }
            if (event && !MsftSme.isFocusable(event.target)) {
                this.tryToFocusSelectedRow();
            }
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
    DataTableComponent.prototype.clickGroupToggle = function (item, toggleStatusOverriddenValue) {
        this.activeRenderedItemIndex = item.index;
        this.groupToggleStatus[item.data] = toggleStatusOverriddenValue !== undefined ?
            toggleStatusOverriddenValue : !this.groupToggleStatus[item.data];
        this.onGroupToggleClicked.emit(item.data);
        this.renderItems(false, true);
    };
    /**
     * It handles the behavior that when a tree node toggle is clicked.
     */
    DataTableComponent.prototype.clickTreeToggle = function (item, toggleStatusOverriddenValue) {
        this.activeRenderedItemIndex = item.index;
        item.node.expanded = toggleStatusOverriddenValue !== undefined ? toggleStatusOverriddenValue : !item.node.expanded;
        if (item.node.expanded) {
            this.onNodeExpand.emit({ node: item.node });
        }
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
    DataTableComponent.prototype.doubleClickRow = function (event, item) {
        if (this.showAsTree) {
            this.clickTreeToggle(item);
        }
        this.selectItem(event, item);
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
            if (item.type === DataTableRenderedItemType.TreeNode) {
                this.handleTreeNodeSelection(item.node, !item.node.selected, false, !this.linkParentChildrenSelections);
                if (item.node.selected) {
                    this.onNodeSelect.emit({ node: item.node });
                }
            }
            else {
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
        }
        else {
            var selected = this.isItemSelected(item);
            var groupItems = this.filteredItems.filter(function (currentItem) {
                return _this.resolveObjectPath(currentItem, _this.groupColumn.field).toString() === item.data;
            });
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
        var _this = this;
        if (!this.showAsTree) {
            if (this.internalSelection.length !== this.filteredItems.length) {
                this.selection = this.filteredItems.slice();
                this.filteredItems.forEach(function (item) {
                    _this.onRowSelect.emit({ data: item });
                });
            }
            else {
                this.selection.forEach(function (item) {
                    _this.onRowUnselect.emit({ data: item });
                });
                this.selection = [];
            }
        }
        else {
            var shouldSelect_1 = !this.shouldAllItemCheckBoxChecked();
            this.internalSelection = [];
            this.filteredItems.forEach(function (item) {
                _this.handleTreeNodeSelection(item, shouldSelect_1);
            });
            this.selectionChange.emit(this.internalSelection);
        }
    };
    /**
     * It indicates whether the given item is selected.
     */
    DataTableComponent.prototype.isItemSelected = function (item) {
        var _this = this;
        var selected = false;
        if (!this.showAsTree) {
            if (item.type !== DataTableRenderedItemType.GroupHeader) {
                selected = item.data && this.internalSelection.indexOf(item.data) !== -1;
            }
            else if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
                selected = true;
                var groupItems = this.filteredItems.filter(function (currentItem) {
                    var value = _this.resolveObjectPath(currentItem, _this.groupColumn.field);
                    return (value !== undefined && value !== null && value.toString() === item.data)
                        || (value === undefined && item.data === undefined);
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
        }
        else {
            if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
                selected = item.node && item.node.selected;
            }
            else {
                selected = item.data && this.internalSelection.map(function (currentItem) { return currentItem.data; }).indexOf(item.data) !== -1;
            }
        }
        return selected;
    };
    /**
     * It indicates whether a group with the given name is expanded.
     */
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
    /**
     * It resolves the object properties based on the given path with multiple levels of properties.
     * An example of path is "location.zipCode".
     */
    DataTableComponent.prototype.resolveObjectPath = function (obj, path) {
        if (path) {
            var pathSegments = path.split('.');
            if (pathSegments.length === 1) {
                return obj[path];
            }
            var currentObj = obj;
            for (var i = 0; i < pathSegments.length; i++) {
                currentObj = currentObj[pathSegments[i]];
                if (currentObj === undefined || currentObj === null) {
                    break;
                }
            }
            return currentObj;
        }
        return null;
    };
    /**
     * It returns the active rendered item index.
     */
    DataTableComponent.prototype.getActiveRenderedItemIndex = function () {
        return this.activeRenderedItemIndex;
    };
    /**
     * Moves to head of the whole rendered item list.
     */
    DataTableComponent.prototype.moveToHeadOfRenderedItems = function () {
        this.activateRenderedItemByIndex(0);
    };
    /**
     * Moves to previous page of the rendered item list.
     */
    DataTableComponent.prototype.moveToPreviousPageOfRenderedItems = function () {
        var index = this.getActiveRenderedItemIndex();
        var newIndex = 0;
        if (index >= 0) {
            newIndex = index - Math.round(this.renderedItemLengthInViewPort);
        }
        this.activateRenderedItemByIndex(newIndex);
    };
    /**
     * Moves to previous item in the rendered item list.
     */
    DataTableComponent.prototype.moveToPreviousRenderedItem = function () {
        var index = this.getActiveRenderedItemIndex();
        var newIndex = 0;
        if (index >= 0) {
            newIndex = index - 1;
        }
        this.activateRenderedItemByIndex(newIndex);
    };
    /**
     * Moves to next item in the rendered item list.
     */
    DataTableComponent.prototype.moveToNextRenderedItem = function () {
        var index = this.getActiveRenderedItemIndex();
        var newIndex = 0;
        if (index >= 0) {
            newIndex = index + 1;
        }
        this.activateRenderedItemByIndex(newIndex);
    };
    /**
     * Moves to next page of the rendered item list.
     */
    DataTableComponent.prototype.moveToNextPageOfRenderedItems = function () {
        var index = this.getActiveRenderedItemIndex() || 0;
        var newIndex = 0;
        newIndex = index + Math.round(this.renderedItemLengthInViewPort);
        this.activateRenderedItemByIndex(newIndex);
    };
    /**
     * Moves to end of the whole rendered list.
     */
    DataTableComponent.prototype.moveToEndOfRenderedItems = function () {
        this.activateRenderedItemByIndex(this.renderedItems.length - 1);
    };
    /**
     * Activate the rendered item by condition.
     * Activate doesn't mean select. It just indicates which item is active to received more operations especially keyboard operations.
     */
    DataTableComponent.prototype.activateRenderedItemByCondition = function (condition) {
        for (var i = 0; i < this.renderedItems.length; i++) {
            if (condition(this.renderedItems[i].data)) {
                this.activateRenderedItemByIndex(this.renderedItems[i].index);
                break;
            }
        }
    };
    /**
     * Activate the rendered item by index.
     * Activate doesn't mean select. It just indicates which item is active to received more operations especially keyboard operations.
     */
    DataTableComponent.prototype.activateRenderedItemByIndex = function (index) {
        if (index < 0) {
            index = 0;
        }
        if (index > this.renderedItems.length - 1) {
            index = this.renderedItems.length - 1;
        }
        this.activeRenderedItemIndex = index;
        if (this.selectionMode !== DataTableComponent.selectionModeMultipleOption && this.selectItemWhenNavigatingWithKeyboard) {
            this.selectItem(null, this.renderedItems[index]);
        }
        var scrollContainerElement = this.scrollContainerElement.nativeElement;
        var totalScrollableSpace = scrollContainerElement.scrollHeight - scrollContainerElement.offsetHeight;
        var totalScrollableItemLength = this.renderedItems.length - this.renderedItemLengthInViewPort;
        var currentRenderedItemStartIndex = totalScrollableItemLength * scrollContainerElement.scrollTop / totalScrollableSpace
            + this.renderedItemStartIndexOffset;
        var newRenderItemStartIndex = -1;
        if (index >= Math.floor(currentRenderedItemStartIndex + this.renderedItemLengthInViewPort - 1)) {
            newRenderItemStartIndex = index - this.renderedItemLengthInViewPort + 1;
        }
        if (index <= currentRenderedItemStartIndex) {
            newRenderItemStartIndex = index;
        }
        // If newRenderItemStartIndex >= 0, it means when the rendered item is activated, it triggers scrolling in the list.
        if (newRenderItemStartIndex >= 0) {
            // Figure out what's the new scrolltop based on new renderedItemStartIndex.
            var scrollTop = Math.floor(totalScrollableSpace * (newRenderItemStartIndex / totalScrollableItemLength));
            if (this.hasLongList) {
                // If it's a long list, which means one pixel of scrollbar movement causes more than one screen of the list scrolling,
                // Figure out the truncated rendered item start index.
                var truncatedStartIndex = Math.floor(scrollTop / totalScrollableSpace * totalScrollableItemLength);
                // Since the actual position of the activated rendered item list can be more than one screen below,
                // we need to figure out the offset between the newRenderItemStartIndex and truncatedStartIndex.
                // Then later when we render the data table items in the view port, we will use the offset to adjust
                // the item list to make sure the actual activated rendered item can show up in the view port.
                this.renderedItemStartIndexOffset = newRenderItemStartIndex - truncatedStartIndex;
                if (newRenderItemStartIndex + this.renderedItemStartIndexOffset + this.renderedItemLengthInViewPort
                    > this.renderedItems.length - 1) {
                    this.renderedItemStartIndexOffset = 0;
                }
            }
            else {
                this.renderedItemStartIndexOffset = 0;
            }
            // Set the scrolltop and re-calcuate the view port.
            this.scrollContainerElement.nativeElement.scrollTop = scrollTop;
            this.calculateItemInViewPort(false, true);
        }
        else {
            this.tryToFocusSelectedRow();
        }
    };
    DataTableComponent.prototype.getAriaExpandedAttributeValue = function (renderedItem) {
        var result;
        if (renderedItem.type === DataTableRenderedItemType.GroupHeader) {
            var isGroupExpanded = this.isGroupExpanded(renderedItem.data);
            if (isGroupExpanded !== undefined) {
                result = isGroupExpanded.toString();
            }
        }
        else if (renderedItem.type === DataTableRenderedItemType.TreeNode && !renderedItem.node.isLeaf) {
            result = (!!(renderedItem.node && renderedItem.node.expanded)).toString();
        }
        return result;
    };
    DataTableComponent.prototype.getAriaSortAttributeValue = function (column) {
        var result = 'none';
        switch (column.sortMode) {
            case DataTableSortMode.Ascend:
                result = 'ascending';
                break;
            case DataTableSortMode.Descend:
                result = 'descending';
                break;
        }
        return result;
    };
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
                _this.renderItems(false, true);
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
                if (!this.showAsTree) {
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
                                    this.renderedItems[i] = { index: i, data: undefined, type: DataTableRenderedItemType.Normal };
                                }
                            }
                            else {
                                shouldFallBackToDefaultSort_1 = true;
                            }
                        }
                    }
                }
                this.doCustomSort.emit({
                    direction: sortDirection_1, field: this.sortColumn.field, fallBackToDefaultSort: function () {
                        shouldFallBackToDefaultSort_1 = true;
                    }
                });
                if (shouldFallBackToDefaultSort_1 || this.doCustomSort.observers.length === 0) {
                    if (!this.showAsTree) {
                        this.renderedItems = this.renderedItems.sort(function (a, b) {
                            return sortDirection_1 * compareFunction_1(a.data, b.data, _this.sortColumn.field);
                        });
                    }
                    else {
                        // The following code in "else" block handles the sort in the tree nodes.
                        // It sorts the tree nodes only in its own tree level.
                        // If there are any nodes have sub nodes and other nodes don't have sub nodes,
                        // always put the nodes with sub nodes in front of the nodes without sub nodes.
                        var stack_1 = [this.shadowTree];
                        this.renderedItems = [];
                        while (stack_1.length > 0) {
                            var currentNode = stack_1[stack_1.length - 1];
                            if (currentNode.data) {
                                this.renderedItems.push(currentNode.data);
                            }
                            stack_1.splice(stack_1.length - 1, 1);
                            var children = currentNode.children;
                            children = children.sort(function (a, b) {
                                // Note that the compare result about 1 or -1 is reversed.
                                // For example if a is greater than b, 1 will be returned instead of -1.
                                // It's because those nodes are went though in the stack with is FIFO,
                                // so the order is reversed.
                                if (_this.sortColumn === _this.columns.first) {
                                    if (a.data.hasChildren && !b.data.hasChildren) {
                                        return 1;
                                    }
                                    else if (!a.data.hasChildren && b.data.hasChildren) {
                                        return -1;
                                    }
                                }
                                else {
                                    var aValue = _this.resolveObjectPath(a.data.data, _this.sortColumn.field);
                                    var bValue = _this.resolveObjectPath(b.data.data, _this.sortColumn.field);
                                    if (aValue === undefined && bValue !== undefined) {
                                        return 1;
                                    }
                                    else if (aValue !== undefined && bValue === undefined) {
                                        return -1;
                                    }
                                }
                                return -sortDirection_1 * compareFunction_1(a.data.data, b.data.data, _this.sortColumn.field);
                            });
                            children.forEach(function (item) {
                                stack_1.push(item);
                            });
                        }
                    }
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
            this.updateActiveRenderedItemIndexBySelection();
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
            var aValue = this.resolveObjectPath(a, field);
            var bValue = this.resolveObjectPath(b, field);
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
        if (hasVerticalOverflow !== this.currentHasVerticalOverflow && this.headerTableElement) {
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
            this.renderedItemLengthInViewPort = this.scrollable
                ? Math.min(this.renderedItems.length, scrollContainerElement.offsetHeight / this.rowHeight)
                : this.renderedItems.length;
            var startIndex = 0;
            var isAtLastScreen = false;
            if (this.hasLongList && preventScrolling) {
                this.dataScrollTop = (scrollContainerElement.scrollHeight - scrollContainerElement.offsetHeight)
                    * this.currentStartIndexOfItemInViewPort / (this.renderedItems.length - this.renderedItemLengthInViewPort);
                startIndex = this.currentStartIndexOfItemInViewPort;
                this.renderedItemStartIndexOffset = 0;
                scrollContainerElement.scrollTop = this.dataScrollTop;
            }
            else {
                // Calculates the which item is the starting item in the view port.
                // The idea here is to calculate the percentage of how far the scrollbar moved.
                // The distance the scrollbar can move is the total height of the scrollbar minus the height of the viewport.
                if (Math.floor(this.dataScrollTop) !== scrollContainerElement.scrollTop) {
                    this.dataScrollTop = scrollContainerElement.scrollTop;
                }
                var accurateStartIndex = (this.renderedItems.length - this.renderedItemLengthInViewPort) * this.dataScrollTop
                    / (scrollContainerElement.scrollHeight - scrollContainerElement.offsetHeight);
                startIndex = Math.floor(accurateStartIndex + this.renderedItemStartIndexOffset);
                if (startIndex + this.renderedItemLengthInViewPort > this.renderedItems.length) {
                    startIndex = this.renderedItems.length - this.renderedItemLengthInViewPort;
                    isAtLastScreen = true;
                }
                this.currentStartIndexOfItemInViewPort = startIndex;
            }
            // If the list is short and no need to have scroll bar, just simply set the start index to 0.
            if (scrollContainerElement.scrollHeight <= scrollContainerElement.offsetHeight) {
                startIndex = 0;
            }
            var renderedItemStart = startIndex - this.renderedItemLengthInViewPort * this.bufferRowRate;
            var renderedItemEnd = Math.ceil(startIndex + this.renderedItemLengthInViewPort
                + this.renderedItemLengthInViewPort * this.bufferRowRate);
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
                                        index: actualLazyLoadStart_1 + i, data: items[i], type: DataTableRenderedItemType.Normal
                                    };
                                }
                                _this.calculateItemInViewPort();
                            }
                        },
                        sortOrder: sortOrder,
                        sortField: this.sortColumn ? this.sortColumn.field : this.columns.first.field
                    };
                    this.lazyLoadingData.emit(lazyLoadEvent);
                    if (actualLazyLoadLength >= this.renderedItemLengthInViewPort * this.bufferRowRate) {
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
                var selectedItemIndex = this.getActiveRenderedItemIndex();
                if (selectedItemIndex > startIndex + this.renderedItemLengthInViewPort - 1
                    && selectedItemIndex < startIndex + this.renderedItemLengthInViewPort) {
                    this.displayItemsTop = scrollContainerElement.scrollTop
                        - (selectedItemIndex - startIndex - this.renderedItemLengthInViewPort + 1) * this.rowHeight;
                }
                // When the scroll bar is moved to very bottom, we just simply align the displayed data table items's bottom
                // to the bottom of the container to make sure the last data table item can be displayed completely.
                // Otherwise, when the list is super long (refer to how we calculate the top offset of the super long list),
                // the last item may not be rendered completely.
                if (this.renderedItems.length > scrollContainerElement.offsetHeight * this.rowHeight
                    && scrollContainerElement.scrollTop >=
                        scrollContainerElement.scrollHeight - scrollContainerElement.offsetHeight - this.rowHeight / 2
                    && isAtLastScreen) {
                    this.displayItemsTop = scrollContainerElement.scrollHeight
                        - Math.ceil(this.renderedItemLengthInViewPort) * this.rowHeight;
                }
                scrollDataElement.style.top = this.displayItemsTop + 'px';
                if (forceUpdate) {
                    this.scrollAboveDataElementHeight = 0;
                }
                this.handleScrollAboveDataElement();
                if ((!this.currentRenderedItemInViewPort || !this.renderedItems[startIndex]
                    || (this.renderedItems[startIndex].data !== this.currentRenderedItemInViewPort.data))
                    || forceUpdate || this.showAsTree) {
                    // Prepare the display data above the view port and display data in and below the view port.
                    // Note: when we push new item into the arrays, we create a new object to wrap the display item.
                    // Because we want to force the ngFor to re-render all the items instead of only re-render the updated ones.
                    // Otherwise, ngFor will try to adjust DOM order of those items which messes up the scroll bar position.
                    this.renderedItemsAboveViewPort = [];
                    this.renderedItemsInAndBelowViewPort = [];
                    this.shouldScroll = scrollContainerElement.scrollHeight > scrollContainerElement.offsetHeight;
                    if (this.shouldScroll) {
                        for (var i = renderedItemStart; i < startIndex; i++) {
                            var index = Math.round(i);
                            if (index < startIndex) {
                                if (index >= 0 && index < this.renderedItems.length) {
                                    this.renderedItemsAboveViewPort.push({
                                        type: this.renderedItems[index].type,
                                        data: this.showAsTree ? this.renderedItems[index].node.data : this.renderedItems[index].data,
                                        depth: this.renderedItems[index].depth,
                                        hasChildren: this.renderedItems[index].hasChildren,
                                        node: this.renderedItems[index].node,
                                        index: index
                                    });
                                }
                                else {
                                    this.renderedItemsAboveViewPort.push({ data: null, type: null, index: null });
                                }
                            }
                        }
                    }
                    for (var i = startIndex; i < renderedItemEnd; i++) {
                        var index = Math.round(i);
                        if (index >= 0 && index < this.renderedItems.length) {
                            this.renderedItemsInAndBelowViewPort.push({
                                type: this.renderedItems[index].type,
                                data: this.showAsTree ? this.renderedItems[index].node.data : this.renderedItems[index].data,
                                depth: this.renderedItems[index].depth,
                                hasChildren: this.renderedItems[index].hasChildren,
                                node: this.renderedItems[index].node,
                                index: index
                            });
                        }
                        else if (this.scrollable && this.renderedItems.length > this.renderedItemLengthInViewPort) {
                            this.renderedItemsInAndBelowViewPort.push({ data: null, type: null, index: null });
                        }
                    }
                }
                this.currentRenderedItemInViewPort = this.renderedItems[startIndex];
                this.isScrolling = false;
                this.isBusy = false;
            }
            for (var i = 0; i < this.renderedItems.length; i++) {
                if (this.renderedItems[i]) {
                    this.renderedItems[i].index = i;
                }
            }
            if (this.contentAreaHasFocus) {
                this.tryToFocusSelectedRow();
            }
        }
    };
    DataTableComponent.prototype.filter = function () {
        var _this = this;
        if (this.items) {
            if (this.globalFilter) {
                this.filterKeyword = this.globalFilter['value'];
            }
            if (!this.filterKeyword) {
                this.filteredItems = this.items.map(function (item) { return item; });
            }
            else if (this.items) {
                this.filteredItems = this.items.filter(function (item) {
                    var found = false;
                    _this.columns.forEach(function (column) {
                        if (!found && column.searchable) {
                            var value = _this.resolveObjectPath(item, column.field);
                            if (value) {
                                if (!_this.caseSensitiveFilter) {
                                    value = value.toString().toLocaleLowerCase();
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
    DataTableComponent.prototype.handleTreeNode = function (node, depth, parentShadowTreeNode) {
        var _this = this;
        if (node.isLeaf === undefined) {
            node.isLeaf = !node.children;
        }
        var renderedItem = {
            data: node.data,
            type: DataTableRenderedItemType.TreeNode,
            depth: depth,
            hasChildren: !node.isLeaf,
            node: node,
            index: this.renderedItems.length
        };
        this.renderedItems.push(renderedItem);
        var currentShadowTreeNode = {
            data: renderedItem,
            children: []
        };
        // We need to maintain a shadow tree to handle the "same level only" sorting.
        parentShadowTreeNode.children.push(currentShadowTreeNode);
        if (renderedItem.node.expanded && node.children) {
            node.children.forEach(function (child) {
                child.parent = node;
                _this.handleTreeNode(child, depth + 1, currentShadowTreeNode);
            });
        }
    };
    DataTableComponent.prototype.handleComplexContent = function () {
        var _this = this;
        if (this.groupColumn && this.groupColumn.field) {
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
                var groupData = _this.resolveObjectPath(item, _this.groupColumn.field);
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
                this.renderedItems.push({
                    data: groups_1[i].group,
                    type: DataTableRenderedItemType.GroupHeader,
                    index: this.renderedItems.length
                });
                if (this.groupToggleStatus[groups_1[i].group]) {
                    groups_1[i].items.forEach(function (item) {
                        _this.renderedItems.push({
                            data: item,
                            type: DataTableRenderedItemType.GroupItem,
                            index: _this.renderedItems.length
                        });
                    });
                }
            }
        }
        else if (this.showAsTree) {
            this.renderedItems = [];
            this.shadowTree = { data: null, children: [] };
            if (this.items) {
                this.items.forEach(function (node) {
                    _this.handleTreeNode(node, 0, _this.shadowTree);
                });
            }
        }
        else {
            var index_1 = 0;
            this.renderedItems = this.filteredItems.map(function (item) {
                return {
                    index: index_1++,
                    data: item,
                    type: DataTableRenderedItemType.Normal
                };
            });
        }
    };
    DataTableComponent.prototype.renderItems = function (preventScrolling, forceUpdate) {
        this.filter();
        this.handleComplexContent();
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
    DataTableComponent.prototype.handleTreeNodeSelection = function (node, selected, skipEvent, skipLinkSelection, itemsToSelect) {
        var _this = this;
        if (itemsToSelect) {
            selected = itemsToSelect.indexOf(node.data) !== -1;
        }
        if (this.selectionMode !== DataTableComponent.selectionModeMultipleOption || (skipLinkSelection || !node.children)) {
            var index = this.internalSelection.indexOf(node);
            if (selected) {
                if (index === -1) {
                    this.internalSelection.push(node);
                    if (!skipEvent) {
                        this.onRowSelect.emit({ data: node.data });
                    }
                }
            }
            else {
                if (index !== -1) {
                    this.internalSelection.splice(this.internalSelection.indexOf(node), 1);
                    if (!skipEvent) {
                        this.onRowUnselect.emit({ data: node.data });
                    }
                }
            }
        }
        node.selected = selected;
        if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
            if (!skipLinkSelection) {
                var currentNode = node.parent;
                while (currentNode) {
                    var shouldSelect = true;
                    for (var i = 0; i < currentNode.children.length; i++) {
                        if (!currentNode.children[i].selected) {
                            shouldSelect = false;
                            break;
                        }
                    }
                    currentNode.selected = shouldSelect;
                    currentNode = currentNode.parent;
                }
            }
            if ((!skipLinkSelection || itemsToSelect) && node.children) {
                node.children.forEach(function (childNode) {
                    if (!childNode.parent) {
                        childNode.parent = node;
                    }
                    _this.handleTreeNodeSelection(childNode, selected, skipEvent, skipLinkSelection, itemsToSelect);
                });
            }
        }
    };
    DataTableComponent.prototype.alignContent = function () {
        if (this.headerTableElement) {
            this.contentElement.nativeElement.style.marginTop = this.headerTableElement.nativeElement.offsetHeight + 'px';
        }
    };
    DataTableComponent.prototype.clearSelection = function () {
        if (this.selectionMode === DataTableComponent.selectionModeMultipleOption) {
            this.selection = [];
        }
        else {
            this.selection = null;
        }
    };
    DataTableComponent.prototype.tryToFocusSelectedRow = function () {
        var _this = this;
        setTimeout(function () {
            var row = _this.scrollDataElement.nativeElement.querySelector('tr.item.data.selected');
            var isRowInViewPort = false;
            if (row) {
                var rowTop = 0;
                var containerTop = 0;
                var rowClientRect = row.getClientRects()[0];
                if (rowClientRect) {
                    rowTop = rowClientRect.top;
                }
                var containerClientRect = _this.scrollContainerElement.nativeElement.getClientRects()[0];
                if (containerClientRect) {
                    containerTop = containerClientRect.top;
                }
                isRowInViewPort = rowTop >= containerTop;
            }
            if (!row || !isRowInViewPort) {
                // If the selected row is not in viewport, just focus the first visible row in the viewport.
                // Then data table will still be able to receive keyboard event.
                var backupRows = _this.scrollDataElement.nativeElement.querySelectorAll('tr.item.data');
                row = _this.scrollContainerElement.nativeElement.scrollTop % _this.rowHeight === 0 ? backupRows[0] : backupRows[1];
            }
            if (row) {
                if (_this.currentColumnIndexWithFocusedElement >= 0) {
                    var cell = row.children[_this.currentColumnIndexWithFocusedElement];
                    var focusableElement = MsftSme.getFirstFocusableDescendent(cell);
                    if (focusableElement) {
                        focusableElement.focus();
                    }
                    else {
                        row.focus();
                    }
                }
                else {
                    row.focus();
                }
                _this.scrollBodyElement.nativeElement.scrollTop = 0;
            }
        });
    };
    DataTableComponent.prototype.onElementFocusing = function (event) {
        if (event.targetZone === this.contentElement.nativeElement) {
            if (!this.contentAreaHasFocus) {
                event.preventDefaultFocusBehavior();
                event.preventDefaultEvent();
                this.activateRenderedItemByIndex(this.activeRenderedItemIndex);
                this.changeDetector.detectChanges();
            }
            this.tryToFocusSelectedRow();
        }
        else if (event.targetElement.classList.contains('last-focusable-shadow-element')
            && event.targetElement === this.lastFocusableShadowElement.nativeElement) {
            event.preventDefaultFocusBehavior();
            if (event.sourceZone === this.contentElement.nativeElement) {
                var nextFocusableElement = MsftSme.getNextZoneElement(event.targetElement);
                if (!nextFocusableElement) {
                    event.targetElement.focus();
                    this.cancelLastFocusableShadowElementFocusOnce = true;
                }
                else {
                    event.preventDefaultEvent();
                    var actualTargetZone = MsftSme.getAncestorZone(nextFocusableElement);
                    CoreEnvironment.processElementFocusing(event.nativeEvent, nextFocusableElement, event.targetZone, actualTargetZone);
                }
            }
            else {
                event.preventDefaultEvent();
                this.activateRenderedItemByIndex(this.activeRenderedItemIndex);
                this.changeDetector.detectChanges();
                this.tryToFocusSelectedRow();
            }
        }
    };
    DataTableComponent.prototype.updateActiveRenderedItemIndexBySelection = function () {
        if (this.selectionMode !== DataTableComponent.selectionModeMultipleOption) {
            this.activeRenderedItemIndex = -1;
            for (var i = 0; i < this.renderedItems.length; i++) {
                if (this.showAsTree) {
                    if (this.renderedItems[i].node === this.selection) {
                        this.activeRenderedItemIndex = i;
                        break;
                    }
                }
                else {
                    if (this.renderedItems[i].data === this.selection) {
                        this.activeRenderedItemIndex = i;
                        break;
                    }
                }
            }
        }
    };
    DataTableComponent.selectionModeMultipleOption = 'multiple';
    DataTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-data-table',
                    styles: ["\n      :host {\n          width: 100%;\n          display: flex;\n          flex-wrap: nowrap;\n          flex-direction: column;\n          align-content: stretch;\n          align-items: stretch;\n          justify-content: flex-start;\n          overflow: hidden;\n      }\n\n\n      /* Dont override absolute positioning. This will become unecesary after removing css file. */\n\n      :host:not(.sme-layout-absolute) {\n          position: relative;\n      }\n\n      th {\n          height: 27px;\n      }\n\n      .header.selectable th {\n          cursor: pointer;\n      }\n\n      .header.selectable th:hover,\n      .header.selectable.has-multiple-selection table thead tr th.first .datatable-checkbox:hover {\n          background: #f8f8f8;\n      }\n\n      th .sme-icon:before {\n          font-size: 11px;\n      }\n\n      .header table thead tr th.first:hover {\n          background: none;\n          cursor: default;\n      }\n\n      .header table thead tr th.first .datatable-checkbox {\n          display: none;\n      }\n\n      .header.has-multiple-selection.show-all-item-checkbox table thead tr th.first .datatable-checkbox {\n          display: block;\n      }\n\n      .header table thead tr th.first,\n      .content .item td.first,\n      .content .item.no-data .prefix {\n          width: 26px;\n      }\n\n      .header.has-multiple-selection table thead tr th.first,\n      .content.has-multiple-selection .item td.first,\n      .content.has-multiple-selection .item.no-data .prefix {\n          width: 26px;\n          padding-left: 0;\n      }\n\n      .header.has-multiple-selection.show-all-item-checkbox table thead tr th.first,\n      .content.has-multiple-selection.show-all-item-checkbox .item td.first,\n      .content.has-multiple-selection.show-all-item-checkbox .item.no-data .prefix {\n          width: 47px;    \n      }\n\n      .header.has-multiple-selection.show-all-item-checkbox table thead tr th.first {\n          padding-left: 29px;\n      }\n\n      .header table thead tr th.first,\n      .content .item td.first {\n          display: none;\n      }\n\n      .header.selectable.show-left-margin table thead tr th.first,\n      .content.selectable.show-left-margin .item td.first {\n          display: table-cell;\n      }\n\n\n      /* .header table thead tr th.first,\n      .item td.first .sme-table-cell {\n          padding: 0;\n      } */\n\n      .item td.first .datatable-checkbox, .item td.first .datatable-checkbox input {\n          display: none;\n      }\n\n      .tree .item td.first-data-column .datatable-checkbox {\n          visibility: hidden;\n      }\n\n      .tree .item.checked td.first-data-column .datatable-checkbox,\n      .tree .item td.first-data-column:hover .datatable-checkbox {\n          visibility: visible;\n      }\n\n      .content.has-multiple-selection .item.checked td.first .datatable-checkbox,\n      .content.has-multiple-selection .item.checked td.first .datatable-checkbox input,\n      .content.has-multiple-selection .item td.first:hover .datatable-checkbox,\n      .content.has-multiple-selection .item td.first:hover .datatable-checkbox input {\n          display: block;\n      }\n\n      .item.no-data .prefix {\n          float: left;\n      }\n\n      .item.no-data .sme-table-cell {\n          padding: 0 8px;\n      }\n\n      .item.group-header .sme-table-cell:first-of-type .sme-icon:before {\n          font-size: 10px;\n          line-height: 10px;\n          margin-top: -3px;\n          margin-right: 3px;\n      }\n\n      .item.group-item .first-data-column .sme-table-cell {\n          padding-left: 26px;\n      }\n\n      .header table.sme-table-virtualized th:first-of-type {\n          padding-left: 8px;\n          padding-right: 8px;\n      }\n\n      .header.has-multiple-selection table.sme-table-virtualized th:first-of-type,\n      .content.has-multiple-selection table.sme-table-virtualized td:first-of-type .sme-table-cell {\n          padding-left: 29px;\n          padding-right: 0px;\n      }\n\n      /* .header table thead tr th {\n          padding: 0 8px;\n      } */\n\n      .header {\n          flex: 0 0 auto;\n          /* border-bottom: solid 1px #ddd; */\n          /* background: white; */\n          position: absolute;\n          margin-top: -1px;\n          z-index: 1;\n      }\n\n      .header.is-scrolled {\n          box-shadow: 0px -1px 7px #999;\n      }\n\n      div.content {\n          flex: 1 1 auto;\n          position: relative;\n          margin-top: 27px;\n          margin-left: 0;\n      }\n\n      .content.no-header {\n          margin-top: 0;\n      }\n\n      .content .scroll-container.sme-layout-absolute.sme-position-inset-none .scroll-data {\n          position: absolute;\n          left: 0;\n          width: 100%;\n          overflow: hidden;\n          border-collapse: collapse;\n      }\n\n      .content .scroll-container {\n          overflow-x: hidden;\n          overflow-y: hidden;\n      }\n\n      .content .scroll-container.should-scroll{\n          overflow-y: auto;\n      }\n\n      .content .scroll-body {\n          position: relative;\n          overflow: hidden;\n          width: 100%;\n      }\n\n      .sme-table-cell {\n          height: 30px;\n          line-height: 30px;\n          font-size: 12px;\n          overflow: hidden;\n      }\n\n      table.sme-table-virtualized td .sme-table-cell,\n      table.sme-table-virtualized td .sme-table-expander-cell {\n          border-bottom: none;\n      }\n\n      .show-grid table.sme-table-virtualized td .sme-table-cell,\n      .show-grid table.sme-table-virtualized td .sme-table-expander-cell {\n          border-bottom: solid 1px #eee;\n      } \n\n      .content.selectable .item.data {\n          cursor: pointer;\n      }\n\n      .content.selectable .item.data:hover {\n          background: #f2fbfe;\n      }\n\n      .item.data.selected, .content.selectable .item.data.selected:hover {\n          background: #E6F7FE;\n      }\n\n      .item .sme-table-cell {\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          /* padding: 0 8px; */\n      }\n\n      :host>>>.scrollbar-measure {\n          width: 100px;\n          height: 100px;\n          overflow: scroll;\n          position: absolute;\n          top: -9999px;\n      }\n\n      .datatable-checkbox {\n          width: 100%;\n          position: relative;\n          height: 30px;\n      }\n\n      .tree .datatable-checkbox-container{\n          width: 24px;\n          display:block;\n          float: left;    \n          padding-left:4px;\n          padding-right:4px;\n      }\n\n      .tree .datatable-checkbox input {\n          visibility: hidden;    \n      }\n\n      .tree .datatable-checkbox:hover input{\n          visibility: visible;\n      }\n\n      .datatable-checkbox label {\n          width: 12px;\n          height: 12px;\n          cursor: pointer;\n          position: absolute;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n          background: white;\n          border: solid 1px #686868;\n      }\n\n      .datatable-checkbox input[type=checkbox]:hover+label {\n          background: rgb(242, 251, 254);\n      }\n\n      .datatable-checkbox input[type=checkbox] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          z-index: 1;\n          margin: 0;\n          opacity: 0;\n          cursor: pointer;\n      }\n\n      .datatable-checkbox input[type=checkbox]:checked+label {\n          background: none;\n          border: solid 1px transparent;\n      }\n\n      .datatable-checkbox input[type=checkbox]:focus+label {\n          outline: rgba(0, 0, 0, .8) dashed 1px;    \n      }\n\n      .datatable-checkbox input[type=checkbox]:checked+label:after {\n          content: '\\E8FB';\n          font-family: Server-MDL2;\n          position: absolute;\n          top: 0;\n          line-height: 12px;\n      }\n\n      .loading-indicator {\n          position: absolute;\n          left: 50%;\n          top: 50%;\n          transform: translate(-50%, -50%);\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell {\n          float: left;\n          height: 30px;    \n      }\n\n      .tree .scroll-data .first-data-column .sme-table-cell {\n          padding-left: 0;\n      }\n\n      :host>>>.tree .scroll-data .sme-table-cell .sme-icon:before {\n          margin-top: -4px;\n      }\n\n      :host>>>.tree .scroll-data .sme-table-cell .placeholder {\n          display: inline-block;\n          width: 16px;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell .sme-icon {\n          visibility: hidden;    \n      }\n\n      .tree.has-multiple-selection .scroll-data .first-data-column .sme-table-expander-cell .sme-icon {\n          margin-left: 2px;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell.has-children .sme-icon {\n          visibility: visible;\n          float:left;\n          width: 24px;\n          text-align: center;\n      }\n\n      .tree.has-multiple-selection .scroll-data .first-data-column .sme-table-expander-cell.has-children .sme-icon {\n          width: 10px;\n          margin-left: 5px;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell .placeholder {\n          display: block;\n          width: 24px;\n      }\n\n      .tree.has-multiple-selection .scroll-data .first-data-column .sme-table-expander-cell .placeholder{\n          width: 10px;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell.has-children .placeholder {\n          display: none;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell .sme-icon:before {\n          display: inline-block;\n          font-size: 10px;\n          line-height: 30px;\n          margin-right: 3px;\n          margin-top: 0;\n      }\n    "],
                    template: "\n      <div *ngIf=\"showHeader\" class=\"header sme-focus-zone\" #header [ngClass]=\"{'is-scrolled':isScrolledDown, 'has-multiple-selection':selectionMode==='multiple', 'selectable': selectable, 'show-left-margin':showLeftMargin, 'show-all-item-checkbox': selectionMode==='multiple' && showAllItemCheckbox}\">\n          <table #headerTable class=\"sme-table-virtualized\" [attr.aria-labelledby]=\"tableAriaLabelledBy\" [attr.aria-rowcount]=\"renderedItems.length\"\n              [attr.aria-colcount]=\"columns.length\" [attr.role]=\"showAsTree?(showHeader?'treegrid':'tree'):undefined\">\n              <thead>\n                  <tr tabindex=\"0\">\n                      <th class=\"first\">\n                          <div class=\"datatable-checkbox\" *ngIf=\"selectionMode==='multiple'\">\n                              <input type=\"checkbox\" [checked]=\"shouldAllItemCheckBoxChecked()\" (change)=\"onAllItemCheckBoxClicked()\" />\n                              <label></label>\n                          </div>\n                      </th>\n                      <th tabindex=\"0\" *ngFor=\"let column of columns\" (click)=\"clickColumn(column)\" [hidden]=\"column===groupColumn\" [ngStyle]=\"{'width':column.width}\"\n                          class=\"{{column.styleClass}}\" [attr.aria-sort]=\"getAriaSortAttributeValue(column)\">\n                          <span class=\"columnName\">{{column.header}}</span>\n                          <span class=\"sortIcon sme-icon\" [ngClass]=\"{'sme-icon-up':column.sortMode===sortModeEnum.Ascend,'sme-icon-down':column.sortMode===sortModeEnum.Descend}\"></span>\n                      </th>\n                  </tr>\n              </thead>\n          </table>\n      </div>\n      <div class=\"content sme-focus-zone\" #content [ngClass]=\"{'is-busy':isBusy, 'has-multiple-selection':selectionMode==='multiple', 'selectable': selectable, 'no-header':!showHeader, 'show-left-margin':showLeftMargin, 'tree':showAsTree, 'show-grid':showGrid, 'show-all-item-checkbox': selectionMode==='multiple' && showAllItemCheckbox}\">\n          <div class=\"loading-indicator\" *ngIf=\"isBusy\">\n              <sme-loading-wheel></sme-loading-wheel>\n          </div>\n          <div class=\"scroll-container\" [ngClass]=\"{'sme-layout-absolute sme-position-inset-none': scrollable, 'should-scroll': shouldScroll}\"\n              #scrollContainer>\n              <div class=\"item no-data\" *ngIf=\"renderedItems.length===0 && !lazyLoad\">\n                  <div class=\"prefix sme-table-cell\">&nbsp;</div>\n                  <div class=\"sme-table-cell\">{{getPlaceholderMessage()}}</div>\n              </div>\n              <div class=\"scroll-body\" #scrollBody>\n                  <table class=\"scroll-data sme-table-virtualized\" #scrollAboveData>\n                      <tbody>\n                          <tr *ngFor=\"let renderedItem of renderedItemsAboveViewPort; let rowIndex = index\" class=\"item data\" [ngClass]=\"{selected: renderedItem.index === getActiveRenderedItemIndex(),'group-item': renderedItem.type === renderedItemTypeEnum.GroupItem,'group-header': renderedItem.type === renderedItemTypeEnum.GroupHeader,checked: isItemSelected(renderedItem)}\">\n                              <td class=\"first\">\n                                  <div class=\"sme-table-cell\">\n                                      <div *ngIf=\"!showAsTree\" class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                              </td>\n                              <td *ngFor=\"let column of columns; let colIndex=index\" [attr.colspan]=\"(renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex===0)?(columns.length-1):1\"\n                                  [hidden]=\"(renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex>0) || column===groupColumn\"\n                                  [ngClass]=\"{'first-data-column': isFirstDataColumn(column)}\" [ngStyle]=\"{'width':column.width}\" class=\"{{column.styleClass}}\">\n                                  <div *ngIf=\"renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex===0\" class=\"sme-table-cell\" (click)=\"clickGroupToggle(renderedItem)\">\n                                      <span *ngIf=\"useGroupToggle\" class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':isGroupExpanded(renderedItem.data), 'sme-icon-chevronRight':!isGroupExpanded(renderedItem.data)}\"></span>\n                                      <span *ngIf=\"!this.groupHeaderTemplate\">\n                                          {{renderedItem.data}}\n                                      </span>\n                                      <span *ngIf=\"this.groupHeaderTemplate\">\n                                          <sme-data-table-template-loader [template]=\"this.groupHeaderTemplate\" [data]=\"renderedItem.data\"></sme-data-table-template-loader>\n                                      </span>\n                                  </div>\n                                  <div *ngIf=\"renderedItem.type===renderedItemTypeEnum.TreeNode && colIndex===0\" class=\"sme-table-expander-cell\" [ngStyle]=\"{'padding-left':(renderedItem.depth*16+4)+'px'}\"\n                                      [ngClass]=\"{'has-children': renderedItem.hasChildren || !renderedItem.node.isLeaf}\">\n                                      <span class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':renderedItem.node.expanded, 'sme-icon-chevronRight':!renderedItem.node.expanded}\"\n                                          (click)=\"clickTreeToggle(renderedItem)\"></span>\n                                      <span class=\"placeholder\"></span>\n                                  </div>\n                                  <div *ngIf=\"showAsTree && selectionMode==='multiple' && renderedItem.type==renderedItemTypeEnum.TreeNode && colIndex==0\"\n                                      class=\"sme-table-cell datatable-checkbox-container\">\n                                      <div class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" (change)=\"onItemCheckBoxClicked(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                                  <div *ngIf=\"!column.bodyTemplate && renderedItem.type!=renderedItemTypeEnum.GroupHeader\" class=\"sme-table-cell\">\n                                      {{renderedItem.data?resolveObjectPath(renderedItem.data,column.field):'.'}}\n                                  </div>\n                                  <div *ngIf=\"renderedItem.type!=renderedItemTypeEnum.GroupHeader && renderedItem.data && column.bodyTemplate\" class=\"sme-table-cell\">\n                                      <sme-data-table-template-loader [template]=\"column.bodyTemplate\" [data]=\"renderedItem.data\" [rowIndex]=\"rowIndex\"></sme-data-table-template-loader>\n                                  </div>\n                              </td>\n                          </tr>\n                      </tbody>\n                  </table>\n                  <table class=\"scroll-data sme-table-virtualized\" #scrollData [attr.aria-rowcount]=\"renderedItems.length\" [attr.role]=\"showAsTree?(showHeader?'treegrid':'tree'):undefined\">\n                      <tbody>\n                          <tr (keydown)=\"onContentTablePressed($event)\" *ngFor=\"let renderedItem of renderedItemsInAndBelowViewPort; let rowIndex = index\"\n                              (click)=\"selectItem($event, renderedItem)\" class=\"item data\" [ngClass]=\"{selected: renderedItem.index === getActiveRenderedItemIndex(),'group-item': renderedItem.type === renderedItemTypeEnum.GroupItem,'group-header': renderedItem.type === renderedItemTypeEnum.GroupHeader,checked: isItemSelected(renderedItem)}\"\n                              [attr.tabindex]=\"renderedItem.index >=0 ? 0 : undefined\" (dblclick)=\"doubleClickRow($event,renderedItem)\"\n                              (focus)=\"onContentItemFocused($event)\" (focusin)=\"onContentItemFocused($event)\" (focusout)=\"onContentItemBlurred($event)\"\n                              [attr.data-rendered-item-index]=\"renderedItem.index\" [attr.aria-rowindex]=\"renderedItem.index\" [attr.aria-selected]=\"isItemSelected(renderedItem) ?'true': undefined\"\n                              role=\"row\" [attr.aria-expanded]=\"getAriaExpandedAttributeValue(renderedItem)\">\n                              <td class=\"first\">\n                                  <div class=\"sme-table-cell\">\n                                      <div *ngIf=\"!showAsTree\" class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" (change)=\"onItemCheckBoxClicked(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                              </td>\n                              <td *ngFor=\"let column of columns; let colIndex=index\" [attr.colspan]=\"(renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex===0)?(columns.length-1):1\"\n                                  [hidden]=\"(renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex>0) || (renderedItem.type!=renderedItemTypeEnum.GroupHeader && column===groupColumn)\"\n                                  [ngClass]=\"{'first-data-column': isFirstDataColumn(column)}\" [ngStyle]=\"{'width':column.width}\" class=\"{{column.styleClass}}\">\n                                  <div *ngIf=\"renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex===0\" class=\"sme-table-cell\" (click)=\"clickGroupToggle(renderedItem)\">\n                                      <span *ngIf=\"useGroupToggle\" class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':isGroupExpanded(renderedItem.data), 'sme-icon-chevronRight':!isGroupExpanded(renderedItem.data)}\"></span>\n                                      <span *ngIf=\"!this.groupHeaderTemplate\">\n                                          {{renderedItem.data}}\n                                      </span>\n                                      <span *ngIf=\"this.groupHeaderTemplate\">\n                                          <sme-data-table-template-loader [template]=\"this.groupHeaderTemplate\" [data]=\"renderedItem.data\"></sme-data-table-template-loader>\n                                      </span>\n                                  </div>\n                                  <div *ngIf=\"renderedItem.type===renderedItemTypeEnum.TreeNode && colIndex===0\" class=\"sme-table-expander-cell\" [ngStyle]=\"{'padding-left':(renderedItem.depth*16+4)+'px'}\"\n                                      [ngClass]=\"{'has-children': renderedItem.hasChildren || !renderedItem.node.isLeaf}\">\n                                      <span class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':renderedItem.node.expanded, 'sme-icon-chevronRight':!renderedItem.node.expanded}\"\n                                          (click)=\"clickTreeToggle(renderedItem)\"></span>\n                                      <span class=\"placeholder\"></span>\n                                  </div>\n                                  <div *ngIf=\"showAsTree && selectionMode==='multiple' && renderedItem.type==renderedItemTypeEnum.TreeNode && colIndex==0\"\n                                      class=\"sme-table-cell datatable-checkbox-container\">\n                                      <div class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" (change)=\"onItemCheckBoxClicked(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                                  <div *ngIf=\"!column.bodyTemplate && renderedItem.type!=renderedItemTypeEnum.GroupHeader\" class=\"sme-table-cell\">{{renderedItem.data?resolveObjectPath(renderedItem.data,column.field):'.'}}</div>\n                                  <div *ngIf=\"renderedItem.type!=renderedItemTypeEnum.GroupHeader && renderedItem.data && column.bodyTemplate\" class=\"sme-table-cell\">\n                                      <sme-data-table-template-loader [template]=\"column.bodyTemplate\" [data]=\"renderedItem.data\" [rowIndex]=\"rowIndex\"></sme-data-table-template-loader>\n                                  </div>\n                              </td>\n                          </tr>\n                          <tr class=\"item\" #tempRow>\n                              <td>\n                                  <div class=\"sme-table-cell\">&nbsp;</div>\n                              </td>\n                          </tr>\n                      </tbody>\n                  </table>\n              </div>\n              <div #lastFocusableShadowElement class=\"sme-focus-zone last-focusable-shadow-element\" (focus)=\"onLastFocusableShadowElementFocused($event)\" tabindex=\"0\"></div>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DataTableComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
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
        'lastFocusableShadowElement': [{ type: ViewChild, args: ['lastFocusableShadowElement',] },],
        'groupHeaderTemplate': [{ type: ContentChild, args: ['group',] },],
        'selectionChange': [{ type: Output },],
        'onRowDblclick': [{ type: Output },],
        'onGroupToggleClicked': [{ type: Output },],
        'columns': [{ type: ContentChildren, args: [DataTableColumnComponent,] },],
        'renderedItemsChange': [{ type: Output },],
        'isBusy': [{ type: Input },],
        'loadingMessage': [{ type: Input },],
        'noRecordMessage': [{ type: Input },],
        'lazyLoadingData': [{ type: Output },],
        'onNodeExpand': [{ type: Output },],
        'onNodeSelect': [{ type: Output },],
        'lazyLoad': [{ type: Input },],
        'globalFilter': [{ type: Input },],
        'caseSensitiveFilter': [{ type: Input },],
        'showAsTree': [{ type: Input },],
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
        'showHeader': [{ type: Input },],
        'tableAriaLabelledBy': [{ type: Input },],
        'showGrid': [{ type: Input },],
        'showAllItemCheckbox': [{ type: Input },],
        'selectAndCheck': [{ type: Input },],
        'linkParentChildrenSelections': [{ type: Input },],
        'selectItemWhenNavigatingWithKeyboard': [{ type: Input },],
        'showLeftMargin': [{ type: Input },],
        'scrollable': [{ type: Input },],
        'selectable': [{ type: Input },],
        'defaultGroupToggleExpanded': [{ type: Input },],
        'virtualCount': [{ type: Input },],
    };
    return DataTableComponent;
}());
export { DataTableComponent };
var TreeTableComponent = /** @class */ (function (_super) {
    __extends(TreeTableComponent, _super);
    function TreeTableComponent(changeDetector, ngZone, layout) {
        var _this = _super.call(this, changeDetector, ngZone, layout) || this;
        _this.showAsTree = true;
        return _this;
    }
    TreeTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-tree-table',
                    styles: ["\n      :host {\n          width: 100%;\n          display: flex;\n          flex-wrap: nowrap;\n          flex-direction: column;\n          align-content: stretch;\n          align-items: stretch;\n          justify-content: flex-start;\n          overflow: hidden;\n      }\n\n\n      /* Dont override absolute positioning. This will become unecesary after removing css file. */\n\n      :host:not(.sme-layout-absolute) {\n          position: relative;\n      }\n\n      th {\n          height: 27px;\n      }\n\n      .header.selectable th {\n          cursor: pointer;\n      }\n\n      .header.selectable th:hover,\n      .header.selectable.has-multiple-selection table thead tr th.first .datatable-checkbox:hover {\n          background: #f8f8f8;\n      }\n\n      th .sme-icon:before {\n          font-size: 11px;\n      }\n\n      .header table thead tr th.first:hover {\n          background: none;\n          cursor: default;\n      }\n\n      .header table thead tr th.first .datatable-checkbox {\n          display: none;\n      }\n\n      .header.has-multiple-selection.show-all-item-checkbox table thead tr th.first .datatable-checkbox {\n          display: block;\n      }\n\n      .header table thead tr th.first,\n      .content .item td.first,\n      .content .item.no-data .prefix {\n          width: 26px;\n      }\n\n      .header.has-multiple-selection table thead tr th.first,\n      .content.has-multiple-selection .item td.first,\n      .content.has-multiple-selection .item.no-data .prefix {\n          width: 26px;\n          padding-left: 0;\n      }\n\n      .header.has-multiple-selection.show-all-item-checkbox table thead tr th.first,\n      .content.has-multiple-selection.show-all-item-checkbox .item td.first,\n      .content.has-multiple-selection.show-all-item-checkbox .item.no-data .prefix {\n          width: 47px;    \n      }\n\n      .header.has-multiple-selection.show-all-item-checkbox table thead tr th.first {\n          padding-left: 29px;\n      }\n\n      .header table thead tr th.first,\n      .content .item td.first {\n          display: none;\n      }\n\n      .header.selectable.show-left-margin table thead tr th.first,\n      .content.selectable.show-left-margin .item td.first {\n          display: table-cell;\n      }\n\n\n      /* .header table thead tr th.first,\n      .item td.first .sme-table-cell {\n          padding: 0;\n      } */\n\n      .item td.first .datatable-checkbox, .item td.first .datatable-checkbox input {\n          display: none;\n      }\n\n      .tree .item td.first-data-column .datatable-checkbox {\n          visibility: hidden;\n      }\n\n      .tree .item.checked td.first-data-column .datatable-checkbox,\n      .tree .item td.first-data-column:hover .datatable-checkbox {\n          visibility: visible;\n      }\n\n      .content.has-multiple-selection .item.checked td.first .datatable-checkbox,\n      .content.has-multiple-selection .item.checked td.first .datatable-checkbox input,\n      .content.has-multiple-selection .item td.first:hover .datatable-checkbox,\n      .content.has-multiple-selection .item td.first:hover .datatable-checkbox input {\n          display: block;\n      }\n\n      .item.no-data .prefix {\n          float: left;\n      }\n\n      .item.no-data .sme-table-cell {\n          padding: 0 8px;\n      }\n\n      .item.group-header .sme-table-cell:first-of-type .sme-icon:before {\n          font-size: 10px;\n          line-height: 10px;\n          margin-top: -3px;\n          margin-right: 3px;\n      }\n\n      .item.group-item .first-data-column .sme-table-cell {\n          padding-left: 26px;\n      }\n\n      .header table.sme-table-virtualized th:first-of-type {\n          padding-left: 8px;\n          padding-right: 8px;\n      }\n\n      .header.has-multiple-selection table.sme-table-virtualized th:first-of-type,\n      .content.has-multiple-selection table.sme-table-virtualized td:first-of-type .sme-table-cell {\n          padding-left: 29px;\n          padding-right: 0px;\n      }\n\n      /* .header table thead tr th {\n          padding: 0 8px;\n      } */\n\n      .header {\n          flex: 0 0 auto;\n          /* border-bottom: solid 1px #ddd; */\n          /* background: white; */\n          position: absolute;\n          margin-top: -1px;\n          z-index: 1;\n      }\n\n      .header.is-scrolled {\n          box-shadow: 0px -1px 7px #999;\n      }\n\n      div.content {\n          flex: 1 1 auto;\n          position: relative;\n          margin-top: 27px;\n          margin-left: 0;\n      }\n\n      .content.no-header {\n          margin-top: 0;\n      }\n\n      .content .scroll-container.sme-layout-absolute.sme-position-inset-none .scroll-data {\n          position: absolute;\n          left: 0;\n          width: 100%;\n          overflow: hidden;\n          border-collapse: collapse;\n      }\n\n      .content .scroll-container {\n          overflow-x: hidden;\n          overflow-y: hidden;\n      }\n\n      .content .scroll-container.should-scroll{\n          overflow-y: auto;\n      }\n\n      .content .scroll-body {\n          position: relative;\n          overflow: hidden;\n          width: 100%;\n      }\n\n      .sme-table-cell {\n          height: 30px;\n          line-height: 30px;\n          font-size: 12px;\n          overflow: hidden;\n      }\n\n      table.sme-table-virtualized td .sme-table-cell,\n      table.sme-table-virtualized td .sme-table-expander-cell {\n          border-bottom: none;\n      }\n\n      .show-grid table.sme-table-virtualized td .sme-table-cell,\n      .show-grid table.sme-table-virtualized td .sme-table-expander-cell {\n          border-bottom: solid 1px #eee;\n      } \n\n      .content.selectable .item.data {\n          cursor: pointer;\n      }\n\n      .content.selectable .item.data:hover {\n          background: #f2fbfe;\n      }\n\n      .item.data.selected, .content.selectable .item.data.selected:hover {\n          background: #E6F7FE;\n      }\n\n      .item .sme-table-cell {\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          /* padding: 0 8px; */\n      }\n\n      :host>>>.scrollbar-measure {\n          width: 100px;\n          height: 100px;\n          overflow: scroll;\n          position: absolute;\n          top: -9999px;\n      }\n\n      .datatable-checkbox {\n          width: 100%;\n          position: relative;\n          height: 30px;\n      }\n\n      .tree .datatable-checkbox-container{\n          width: 24px;\n          display:block;\n          float: left;    \n          padding-left:4px;\n          padding-right:4px;\n      }\n\n      .tree .datatable-checkbox input {\n          visibility: hidden;    \n      }\n\n      .tree .datatable-checkbox:hover input{\n          visibility: visible;\n      }\n\n      .datatable-checkbox label {\n          width: 12px;\n          height: 12px;\n          cursor: pointer;\n          position: absolute;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n          background: white;\n          border: solid 1px #686868;\n      }\n\n      .datatable-checkbox input[type=checkbox]:hover+label {\n          background: rgb(242, 251, 254);\n      }\n\n      .datatable-checkbox input[type=checkbox] {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          z-index: 1;\n          margin: 0;\n          opacity: 0;\n          cursor: pointer;\n      }\n\n      .datatable-checkbox input[type=checkbox]:checked+label {\n          background: none;\n          border: solid 1px transparent;\n      }\n\n      .datatable-checkbox input[type=checkbox]:focus+label {\n          outline: rgba(0, 0, 0, .8) dashed 1px;    \n      }\n\n      .datatable-checkbox input[type=checkbox]:checked+label:after {\n          content: '\\E8FB';\n          font-family: Server-MDL2;\n          position: absolute;\n          top: 0;\n          line-height: 12px;\n      }\n\n      .loading-indicator {\n          position: absolute;\n          left: 50%;\n          top: 50%;\n          transform: translate(-50%, -50%);\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell {\n          float: left;\n          height: 30px;    \n      }\n\n      .tree .scroll-data .first-data-column .sme-table-cell {\n          padding-left: 0;\n      }\n\n      :host>>>.tree .scroll-data .sme-table-cell .sme-icon:before {\n          margin-top: -4px;\n      }\n\n      :host>>>.tree .scroll-data .sme-table-cell .placeholder {\n          display: inline-block;\n          width: 16px;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell .sme-icon {\n          visibility: hidden;    \n      }\n\n      .tree.has-multiple-selection .scroll-data .first-data-column .sme-table-expander-cell .sme-icon {\n          margin-left: 2px;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell.has-children .sme-icon {\n          visibility: visible;\n          float:left;\n          width: 24px;\n          text-align: center;\n      }\n\n      .tree.has-multiple-selection .scroll-data .first-data-column .sme-table-expander-cell.has-children .sme-icon {\n          width: 10px;\n          margin-left: 5px;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell .placeholder {\n          display: block;\n          width: 24px;\n      }\n\n      .tree.has-multiple-selection .scroll-data .first-data-column .sme-table-expander-cell .placeholder{\n          width: 10px;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell.has-children .placeholder {\n          display: none;\n      }\n\n      .tree .scroll-data .first-data-column .sme-table-expander-cell .sme-icon:before {\n          display: inline-block;\n          font-size: 10px;\n          line-height: 30px;\n          margin-right: 3px;\n          margin-top: 0;\n      }\n    "],
                    template: "\n      <div *ngIf=\"showHeader\" class=\"header sme-focus-zone\" #header [ngClass]=\"{'is-scrolled':isScrolledDown, 'has-multiple-selection':selectionMode==='multiple', 'selectable': selectable, 'show-left-margin':showLeftMargin, 'show-all-item-checkbox': selectionMode==='multiple' && showAllItemCheckbox}\">\n          <table #headerTable class=\"sme-table-virtualized\" [attr.aria-labelledby]=\"tableAriaLabelledBy\" [attr.aria-rowcount]=\"renderedItems.length\"\n              [attr.aria-colcount]=\"columns.length\" [attr.role]=\"showAsTree?(showHeader?'treegrid':'tree'):undefined\">\n              <thead>\n                  <tr tabindex=\"0\">\n                      <th class=\"first\">\n                          <div class=\"datatable-checkbox\" *ngIf=\"selectionMode==='multiple'\">\n                              <input type=\"checkbox\" [checked]=\"shouldAllItemCheckBoxChecked()\" (change)=\"onAllItemCheckBoxClicked()\" />\n                              <label></label>\n                          </div>\n                      </th>\n                      <th tabindex=\"0\" *ngFor=\"let column of columns\" (click)=\"clickColumn(column)\" [hidden]=\"column===groupColumn\" [ngStyle]=\"{'width':column.width}\"\n                          class=\"{{column.styleClass}}\" [attr.aria-sort]=\"getAriaSortAttributeValue(column)\">\n                          <span class=\"columnName\">{{column.header}}</span>\n                          <span class=\"sortIcon sme-icon\" [ngClass]=\"{'sme-icon-up':column.sortMode===sortModeEnum.Ascend,'sme-icon-down':column.sortMode===sortModeEnum.Descend}\"></span>\n                      </th>\n                  </tr>\n              </thead>\n          </table>\n      </div>\n      <div class=\"content sme-focus-zone\" #content [ngClass]=\"{'is-busy':isBusy, 'has-multiple-selection':selectionMode==='multiple', 'selectable': selectable, 'no-header':!showHeader, 'show-left-margin':showLeftMargin, 'tree':showAsTree, 'show-grid':showGrid, 'show-all-item-checkbox': selectionMode==='multiple' && showAllItemCheckbox}\">\n          <div class=\"loading-indicator\" *ngIf=\"isBusy\">\n              <sme-loading-wheel></sme-loading-wheel>\n          </div>\n          <div class=\"scroll-container\" [ngClass]=\"{'sme-layout-absolute sme-position-inset-none': scrollable, 'should-scroll': shouldScroll}\"\n              #scrollContainer>\n              <div class=\"item no-data\" *ngIf=\"renderedItems.length===0 && !lazyLoad\">\n                  <div class=\"prefix sme-table-cell\">&nbsp;</div>\n                  <div class=\"sme-table-cell\">{{getPlaceholderMessage()}}</div>\n              </div>\n              <div class=\"scroll-body\" #scrollBody>\n                  <table class=\"scroll-data sme-table-virtualized\" #scrollAboveData>\n                      <tbody>\n                          <tr *ngFor=\"let renderedItem of renderedItemsAboveViewPort; let rowIndex = index\" class=\"item data\" [ngClass]=\"{selected: renderedItem.index === getActiveRenderedItemIndex(),'group-item': renderedItem.type === renderedItemTypeEnum.GroupItem,'group-header': renderedItem.type === renderedItemTypeEnum.GroupHeader,checked: isItemSelected(renderedItem)}\">\n                              <td class=\"first\">\n                                  <div class=\"sme-table-cell\">\n                                      <div *ngIf=\"!showAsTree\" class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                              </td>\n                              <td *ngFor=\"let column of columns; let colIndex=index\" [attr.colspan]=\"(renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex===0)?(columns.length-1):1\"\n                                  [hidden]=\"(renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex>0) || column===groupColumn\"\n                                  [ngClass]=\"{'first-data-column': isFirstDataColumn(column)}\" [ngStyle]=\"{'width':column.width}\" class=\"{{column.styleClass}}\">\n                                  <div *ngIf=\"renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex===0\" class=\"sme-table-cell\" (click)=\"clickGroupToggle(renderedItem)\">\n                                      <span *ngIf=\"useGroupToggle\" class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':isGroupExpanded(renderedItem.data), 'sme-icon-chevronRight':!isGroupExpanded(renderedItem.data)}\"></span>\n                                      <span *ngIf=\"!this.groupHeaderTemplate\">\n                                          {{renderedItem.data}}\n                                      </span>\n                                      <span *ngIf=\"this.groupHeaderTemplate\">\n                                          <sme-data-table-template-loader [template]=\"this.groupHeaderTemplate\" [data]=\"renderedItem.data\"></sme-data-table-template-loader>\n                                      </span>\n                                  </div>\n                                  <div *ngIf=\"renderedItem.type===renderedItemTypeEnum.TreeNode && colIndex===0\" class=\"sme-table-expander-cell\" [ngStyle]=\"{'padding-left':(renderedItem.depth*16+4)+'px'}\"\n                                      [ngClass]=\"{'has-children': renderedItem.hasChildren || !renderedItem.node.isLeaf}\">\n                                      <span class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':renderedItem.node.expanded, 'sme-icon-chevronRight':!renderedItem.node.expanded}\"\n                                          (click)=\"clickTreeToggle(renderedItem)\"></span>\n                                      <span class=\"placeholder\"></span>\n                                  </div>\n                                  <div *ngIf=\"showAsTree && selectionMode==='multiple' && renderedItem.type==renderedItemTypeEnum.TreeNode && colIndex==0\"\n                                      class=\"sme-table-cell datatable-checkbox-container\">\n                                      <div class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" (change)=\"onItemCheckBoxClicked(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                                  <div *ngIf=\"!column.bodyTemplate && renderedItem.type!=renderedItemTypeEnum.GroupHeader\" class=\"sme-table-cell\">\n                                      {{renderedItem.data?resolveObjectPath(renderedItem.data,column.field):'.'}}\n                                  </div>\n                                  <div *ngIf=\"renderedItem.type!=renderedItemTypeEnum.GroupHeader && renderedItem.data && column.bodyTemplate\" class=\"sme-table-cell\">\n                                      <sme-data-table-template-loader [template]=\"column.bodyTemplate\" [data]=\"renderedItem.data\" [rowIndex]=\"rowIndex\"></sme-data-table-template-loader>\n                                  </div>\n                              </td>\n                          </tr>\n                      </tbody>\n                  </table>\n                  <table class=\"scroll-data sme-table-virtualized\" #scrollData [attr.aria-rowcount]=\"renderedItems.length\" [attr.role]=\"showAsTree?(showHeader?'treegrid':'tree'):undefined\">\n                      <tbody>\n                          <tr (keydown)=\"onContentTablePressed($event)\" *ngFor=\"let renderedItem of renderedItemsInAndBelowViewPort; let rowIndex = index\"\n                              (click)=\"selectItem($event, renderedItem)\" class=\"item data\" [ngClass]=\"{selected: renderedItem.index === getActiveRenderedItemIndex(),'group-item': renderedItem.type === renderedItemTypeEnum.GroupItem,'group-header': renderedItem.type === renderedItemTypeEnum.GroupHeader,checked: isItemSelected(renderedItem)}\"\n                              [attr.tabindex]=\"renderedItem.index >=0 ? 0 : undefined\" (dblclick)=\"doubleClickRow($event,renderedItem)\"\n                              (focus)=\"onContentItemFocused($event)\" (focusin)=\"onContentItemFocused($event)\" (focusout)=\"onContentItemBlurred($event)\"\n                              [attr.data-rendered-item-index]=\"renderedItem.index\" [attr.aria-rowindex]=\"renderedItem.index\" [attr.aria-selected]=\"isItemSelected(renderedItem) ?'true': undefined\"\n                              role=\"row\" [attr.aria-expanded]=\"getAriaExpandedAttributeValue(renderedItem)\">\n                              <td class=\"first\">\n                                  <div class=\"sme-table-cell\">\n                                      <div *ngIf=\"!showAsTree\" class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" (change)=\"onItemCheckBoxClicked(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                              </td>\n                              <td *ngFor=\"let column of columns; let colIndex=index\" [attr.colspan]=\"(renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex===0)?(columns.length-1):1\"\n                                  [hidden]=\"(renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex>0) || (renderedItem.type!=renderedItemTypeEnum.GroupHeader && column===groupColumn)\"\n                                  [ngClass]=\"{'first-data-column': isFirstDataColumn(column)}\" [ngStyle]=\"{'width':column.width}\" class=\"{{column.styleClass}}\">\n                                  <div *ngIf=\"renderedItem.type===renderedItemTypeEnum.GroupHeader && colIndex===0\" class=\"sme-table-cell\" (click)=\"clickGroupToggle(renderedItem)\">\n                                      <span *ngIf=\"useGroupToggle\" class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':isGroupExpanded(renderedItem.data), 'sme-icon-chevronRight':!isGroupExpanded(renderedItem.data)}\"></span>\n                                      <span *ngIf=\"!this.groupHeaderTemplate\">\n                                          {{renderedItem.data}}\n                                      </span>\n                                      <span *ngIf=\"this.groupHeaderTemplate\">\n                                          <sme-data-table-template-loader [template]=\"this.groupHeaderTemplate\" [data]=\"renderedItem.data\"></sme-data-table-template-loader>\n                                      </span>\n                                  </div>\n                                  <div *ngIf=\"renderedItem.type===renderedItemTypeEnum.TreeNode && colIndex===0\" class=\"sme-table-expander-cell\" [ngStyle]=\"{'padding-left':(renderedItem.depth*16+4)+'px'}\"\n                                      [ngClass]=\"{'has-children': renderedItem.hasChildren || !renderedItem.node.isLeaf}\">\n                                      <span class=\"sme-icon\" [ngClass]=\"{'sme-icon-chevronDown':renderedItem.node.expanded, 'sme-icon-chevronRight':!renderedItem.node.expanded}\"\n                                          (click)=\"clickTreeToggle(renderedItem)\"></span>\n                                      <span class=\"placeholder\"></span>\n                                  </div>\n                                  <div *ngIf=\"showAsTree && selectionMode==='multiple' && renderedItem.type==renderedItemTypeEnum.TreeNode && colIndex==0\"\n                                      class=\"sme-table-cell datatable-checkbox-container\">\n                                      <div class=\"datatable-checkbox\">\n                                          <input type=\"checkbox\" [checked]=\"isItemSelected(renderedItem)\" (change)=\"onItemCheckBoxClicked(renderedItem)\" />\n                                          <label></label>\n                                      </div>\n                                  </div>\n                                  <div *ngIf=\"!column.bodyTemplate && renderedItem.type!=renderedItemTypeEnum.GroupHeader\" class=\"sme-table-cell\">{{renderedItem.data?resolveObjectPath(renderedItem.data,column.field):'.'}}</div>\n                                  <div *ngIf=\"renderedItem.type!=renderedItemTypeEnum.GroupHeader && renderedItem.data && column.bodyTemplate\" class=\"sme-table-cell\">\n                                      <sme-data-table-template-loader [template]=\"column.bodyTemplate\" [data]=\"renderedItem.data\" [rowIndex]=\"rowIndex\"></sme-data-table-template-loader>\n                                  </div>\n                              </td>\n                          </tr>\n                          <tr class=\"item\" #tempRow>\n                              <td>\n                                  <div class=\"sme-table-cell\">&nbsp;</div>\n                              </td>\n                          </tr>\n                      </tbody>\n                  </table>\n              </div>\n              <div #lastFocusableShadowElement class=\"sme-focus-zone last-focusable-shadow-element\" (focus)=\"onLastFocusableShadowElementFocused($event)\" tabindex=\"0\"></div>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    TreeTableComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: NgZone, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['layout',] },] },
    ]; };
    return TreeTableComponent;
}(DataTableComponent));
export { TreeTableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUdILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFHZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBSU4sUUFBUSxFQUNSLE1BQU0sRUFHTixTQUFTLEVBQ1osTUFBTSxlQUFBLENBQWdCO0FBQ3ZCLE9BQU8sRUFBRSxlQUFBLEVBQXNDLE1BQU8sZUFBQSxDQUFnQjtBQUd0RSxPQUFPLEVBQUUsd0JBQUEsRUFBeUIsTUFBTywrQkFBQSxDQUFnQztBQUN6RSxPQUFPLEVBS0gseUJBQXlCLEVBQ3pCLGlCQUFpQixFQUVwQixNQUFNLHVCQUFBLENBQXdCO0FBRy9COztHQUVHO0FBRUg7SUFtYkksNEJBQW9CLGNBQWlDLEVBQVUsTUFBYyxFQUFZLE1BQWM7UUFBdkcsaUJBTUM7UUFObUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7UUFoYi9GLFlBQU8sR0FBWSxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQztRQUN2RCxxQ0FBZ0MsR0FBRyxNQUFNLENBQUM7UUFDMUMsMEJBQXFCLEdBQUcsR0FBRyxDQUFDO1FBQzVCLHNDQUFpQyxHQUFHLEdBQUcsQ0FBQztRQUN4QyxnQ0FBMkIsR0FBRyxHQUFHLENBQUM7UUFFbEMsaUNBQTRCLEdBQUcsS0FBSyxDQUFDO1FBRXJDLGtCQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLCtCQUEwQixHQUFtQixFQUFFLENBQUM7UUFlaEQsMEJBQXFCLEdBQTRCLEVBQUUsQ0FBQztRQUNwRCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLHNCQUFpQixHQUF3QixFQUFFLENBQUM7UUFFNUMsc0NBQWlDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFJdkMsMEJBQXFCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBRy9DLDRCQUF1QixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTdCLGlDQUE0QixHQUFHLENBQUMsQ0FBQztRQUNqQyx5Q0FBb0MsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxQyx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsOENBQXlDLEdBQUcsS0FBSyxDQUFDO1FBNkIxRDs7V0FFRztRQUVJLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFHeEQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBK0IsQ0FBQztRQUdoRSx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBb0MsQ0FBQztRQW9CNUUsa0JBQWEsR0FBd0IsRUFBRSxDQUFDO1FBRS9DOztXQUVHO1FBRUksd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQW9CdEQ7O1dBRUc7UUFFSSxvQkFBZSxHQUF5QyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQUUxRzs7V0FFRztRQUVJLGlCQUFZLEdBQTZDLElBQUksWUFBWSxFQUE4QixDQUFDO1FBRS9HOztXQUVHO1FBRUksaUJBQVksR0FBNkMsSUFBSSxZQUFZLEVBQThCLENBQUM7UUE2Ri9HOztXQUVHO1FBQ0ksaUJBQVksR0FBUSxpQkFBaUIsQ0FBQztRQUU3Qzs7V0FFRztRQUNJLHlCQUFvQixHQUFRLHlCQUF5QixDQUFDO1FBcUU3RDs7V0FFRztRQUVJLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBR3RDLGlCQUFZLEdBQTJDLElBQUksWUFBWSxFQUE0QixDQUFDO1FBRTNHOztXQUVHO1FBRUksZ0JBQVcsR0FBOEMsSUFBSSxZQUFZLEVBQStCLENBQUM7UUFFaEg7O1dBRUc7UUFFSSxrQkFBYSxHQUE4QyxJQUFJLFlBQVksRUFBK0IsQ0FBQztRQWlDbEg7O1dBRUc7UUFDSSxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBUXpCOztXQUVHO1FBRUksYUFBUSxHQUFHLElBQUksQ0FBQztRQUd2Qjs7V0FFRztRQUNJLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUdsQzs7V0FFRztRQUNJLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRzdCOzs7V0FHRztRQUNJLGlDQUE0QixHQUFHLElBQUksQ0FBQztRQUczQzs7V0FFRztRQUNJLHlDQUFvQyxHQUFHLElBQUksQ0FBQztRQUduRDs7V0FFRztRQUNJLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRzdCOztXQUVHO1FBQ0ksZUFBVSxHQUFHLElBQUksQ0FBQztRQUd6Qjs7V0FFRztRQUNJLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHekI7O1dBRUc7UUFDSSwrQkFBMEIsR0FBRyxJQUFJLENBQUM7UUFFbEMsc0JBQWlCLEdBQWlDLEVBQUUsQ0FBQztRQUd4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUEzVkQsc0JBQVcsNkNBQWE7UUFIeEI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDdEMsQ0FBQzthQUVELFVBQXlCLEtBQThCO1lBQ25ELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDOzs7T0FMQTtJQWlGRCxzQkFBVyw0Q0FBWTtRQUp2Qjs7V0FFRzthQUVIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNyQyxDQUFDO2FBRUQsVUFBd0IsWUFBaUI7WUFBekMsaUJBMkJDO1lBMUJHLElBQUksWUFBWSxHQUFHLENBQUMsVUFBQSxLQUFLO2dCQUNyQixZQUFZLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3ZDLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQ2pDO29CQUNJLEtBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUUzQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsYUFBYSxLQUFLLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN2QyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztvQkFDRCxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQztnQkFDL0MsQ0FBQyxFQUNELEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVkLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxZQUFZLENBQUM7WUFDekMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDZixZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNyRCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUVyRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDO29CQUNqQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUN4RCxZQUFZLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM1RCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDOzs7T0E3QkE7SUErQ0Qsc0JBQVcscUNBQUs7UUFKaEI7O1dBRUc7YUFFSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFpQixLQUEwQjtZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUUzQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBRXhCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQVJBO0lBd0JELHNCQUFXLHlDQUFTO1FBSnBCOztXQUVHO2FBRUg7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztnQkFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7YUFFRCxVQUFxQixTQUFrRDtZQUF2RSxpQkFxQkM7WUFwQkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxrQkFBa0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLElBQUksRUFBRSxDQUFDO2dCQUV6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO3dCQUMzQixLQUFJLENBQUMsdUJBQXVCLENBQ3hCLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLENBQUMsS0FBSSxDQUFDLDRCQUE0QixFQUNsQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsYUFBYSxJQUFJLE9BQUEsYUFBYSxDQUFDLElBQUksRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQzVELENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFELENBQUM7WUFFRCxJQUFJLENBQUMsd0NBQXdDLEVBQUUsQ0FBQztZQUVoRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDOzs7T0F2QkE7SUEwQkQsc0JBQVcsNkNBQWE7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7YUFDRCxVQUF5QixLQUFhO1lBQ2xDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7WUFFbkMsK0RBQStEO1lBQy9ELG1IQUFtSDtZQUNuSCw4RkFBOEY7WUFDOUYseUdBQXlHO1lBQ3pHLG9EQUFvRDtZQUNwRCw4R0FBOEc7WUFDOUcsb0NBQW9DO1lBQ3BDLGlEQUFpRDtZQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssa0JBQWtCLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7OztPQWpCQTtJQWtERCxzQkFBVywyQ0FBVztRQUh0Qjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNwQyxDQUFDO2FBQ0QsVUFBdUIsS0FBK0I7WUFDbEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7T0FKQTtJQVVELHNCQUFXLDZDQUFhO1FBSHhCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7YUFDRCxVQUF5QixLQUF3QjtZQUM3QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUpBO0lBeUZNLHdDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sd0NBQVcsR0FBbEI7UUFDSSxvRkFBb0Y7UUFDcEYsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUV4RCwrRkFBK0Y7UUFDL0YsZ0RBQWdEO0lBQ3BELENBQUM7SUFFTSxxQ0FBUSxHQUFmO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDcEQsQ0FBQztRQUVELElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDO1FBRWhELElBQUksQ0FBQyx1Q0FBdUMsR0FBRyxlQUFlLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25JLENBQUM7SUFFTSxrREFBcUIsR0FBNUIsVUFBNkIsS0FBSztRQUFsQyxpQkE0SUM7UUEzSUcsZUFBZSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDakMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFFakcsSUFBSSxrQ0FBa0MsR0FBRyxLQUFLLENBQUM7UUFFL0MsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUM7UUFFaEYsNkVBQTZFO1FBQzdFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUNyQixrQ0FBa0MsR0FBRyxJQUFJLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQ3ZCLGtDQUFrQyxHQUFHLElBQUksQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsQ0FBQztnQkFDN0MsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFDVixLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDeEIsa0NBQWtDLEdBQUcsSUFBSSxDQUFDO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2dCQUN0QyxDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTO2dCQUMxQixrQ0FBa0MsR0FBRyxJQUFJLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQ2xDLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7Z0JBQ3pCLGtDQUFrQyxHQUFHLElBQUksQ0FBQztnQkFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztnQkFDekMsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFDVixLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRztnQkFDcEIsa0NBQWtDLEdBQUcsSUFBSSxDQUFDO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dCQUNwQyxDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTO2dCQUMxQixrQ0FBa0MsR0FBRyxJQUFJLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNyRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxRQUFRLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDN0csSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3pFLElBQUkscUJBQXFCLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUNuRCxlQUFlLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsT0FBTyxLQUFLLElBQUksRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO29CQUMxRCxJQUFJLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FDcEQsZUFBZSxFQUFFLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQXhCLENBQXdCLENBQUMsQ0FBQztvQkFDMUQsRUFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixJQUFJLENBQUMsb0NBQW9DLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxzQkFBc0IsSUFBSSxDQUFDLEdBQUcsc0JBQXNCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDdEcsRUFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0NBQzlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksZUFBZSxDQUFDLE9BQU8sS0FBSyxPQUFPO3VDQUMzQyxlQUFlLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQzVFLHVHQUF1RztvQ0FDdkcsZUFBZSxHQUFHLHFCQUFxQixDQUFDO2dDQUM1QyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLElBQUksQ0FBQyxvQ0FBb0MsR0FBRyxDQUFDLENBQUM7Z0NBQ2xELENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLENBQUM7d0JBQ0wsQ0FBQztvQkFDTCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxVQUFVLElBQUkscUJBQXFCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDekUsSUFBSSxDQUFDLG9DQUFvQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQztnQkFDTCxDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVO2dCQUMzQixrQ0FBa0MsR0FBRyxJQUFJLENBQUM7Z0JBRTFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNyRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxRQUFRLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDN0csSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2pFLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUF4QixDQUF3QixDQUFDLENBQUM7b0JBQ3RHLElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUF4QixDQUF3QixDQUFDLENBQUM7b0JBRXZHLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLG9DQUFvQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsa0JBQWtCLElBQUksQ0FBQyxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQzlGLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dDQUN0RSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssT0FBTzt1Q0FDdkMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN4RSxrRkFBa0Y7b0NBQ2xGLFdBQVcsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7b0NBQzNELGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FDM0MsV0FBVyxFQUNYLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQXhCLENBQXdCLENBQUMsQ0FBQztvQ0FDekMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUM1QyxXQUFXLEVBQ1gsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsT0FBTyxLQUFLLElBQUksRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO2dDQUM3QyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLElBQUksQ0FBQyxvQ0FBb0MsR0FBRyxDQUFDLENBQUM7b0NBQzlDLEtBQUssQ0FBQztnQ0FDVixDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQztvQkFDTCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsS0FBSyxDQUFDLENBQUM7MkJBQzdDLFVBQVUsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7d0JBQ3RDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQztnQkFDTCxDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ2hELGtDQUFrQyxHQUFHLElBQUksQ0FBQztnQkFDOUMsQ0FBQztnQkFDRCxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQztZQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3BDLFVBQVUsQ0FDTjtnQkFDSSxLQUFJLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxDQUFDO1lBQzlDLENBQUMsRUFDRCxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0wsQ0FBQztJQUVNLGlEQUFvQixHQUEzQixVQUE0QixLQUFLO1FBQWpDLGlCQUtDO1FBSkcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0saURBQW9CLEdBQTNCLFVBQTRCLEtBQUs7UUFBakMsaUJBS0M7UUFKRyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxnRUFBbUMsR0FBMUMsVUFBMkMsS0FBSztRQUFoRCxpQkFPQztRQU5HLFVBQVUsQ0FBQztZQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsS0FBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDakMsQ0FBQztZQUNELEtBQUksQ0FBQyx5Q0FBeUMsR0FBRyxLQUFLLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sMkRBQThCLEdBQXJDLFVBQXNDLFlBQW1DO1FBQ3JFLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxZQUFZLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNsRSxZQUFZLEVBQUUsWUFBWSxDQUFDLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxTQUFTO1lBQ3ZFLGNBQWMsRUFBRSxZQUFZLENBQUMsSUFBSSxLQUFLLHlCQUF5QixDQUFDLFdBQVc7WUFDM0UsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1NBQzdDLENBQUM7SUFDTixDQUFDO0lBRU0seURBQTRCLEdBQW5DO1FBQ0ksSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDbkYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxHQUFHLElBQUksQ0FBQztZQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakQsSUFBSSxnQkFBZ0IsR0FBcUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQ2YsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNENBQWUsR0FBdEI7UUFBQSxpQkF1Q0M7UUF0Q0csSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFFL0IsSUFBSSxhQUFhLEdBQUcsQ0FBQztZQUNqQixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUM5RSxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUV4QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixLQUFJLENBQUMsNEJBQTRCLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsNEVBQTRFO2dCQUM1RSx5Q0FBeUM7Z0JBQ3pDLEtBQUksQ0FBQyw0QkFBNEIsR0FBRyxLQUFLLENBQUM7Z0JBQzFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM1QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxLQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO2dCQUN6QyxLQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO29CQUMxQixLQUFJLENBQUMsbUJBQW1CLEdBQUcsV0FBVyxDQUNsQzt3QkFDSSxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs0QkFDbkIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0NBQ1osS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7NEJBQ25DLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUM7b0JBQ0wsQ0FBQyxFQUNELEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUM7WUFDakMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDM0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0NBQVcsR0FBbEI7UUFDSSxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDeEMsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUNJLCtDQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUNBQVUsR0FBakIsVUFBa0IsS0FBWSxFQUFFLElBQTJCO1FBQTNELGlCQXNDQztRQXJDRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUUxQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLE1BQU0sQ0FBQztnQkFDWCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQzt3QkFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMvQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzRCQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFdBQVc7Z0NBQzFCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUMzRCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7NEJBQ3pGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3dCQUN0RCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxrQkFBa0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7d0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzRCQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqQyxDQUFDO29CQUNMLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMvQixDQUFDO29CQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO1lBQ0wsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQWMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxrREFBcUIsR0FBNUI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ2hHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQ7O09BRUc7SUFDSSw2Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBMkIsRUFBRSwyQkFBcUM7UUFDdEYsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRywyQkFBMkIsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUMzRSwyQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNJLDRDQUFlLEdBQXRCLFVBQXVCLElBQTJCLEVBQUUsMkJBQXFDO1FBQ3JGLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLDJCQUEyQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQ0FBYyxHQUFyQjtRQUNJLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDekMsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSw0Q0FBZSxHQUF0QjtRQUNJLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDMUMsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksOENBQWlCLEdBQXhCLFVBQXlCLE1BQWdDO1FBQXpELGlCQVNDO1FBUkcsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsYUFBYTtZQUM5QixFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssS0FBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELGVBQWUsR0FBRyxhQUFhLENBQUM7WUFDcEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sS0FBSyxlQUFlLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0NBQVcsR0FBbEIsVUFBbUIsTUFBZ0M7UUFBbkQsaUJBcUJDO1FBcEJHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNyQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7b0JBQzdDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7b0JBQzlDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7b0JBQzdDLENBQUM7b0JBRUQsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7b0JBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUN2QixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2pCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7Z0JBQzNDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQ0FBYyxHQUFyQixVQUFzQixLQUFZLEVBQUUsSUFBMkI7UUFDM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHVEQUEwQixHQUFqQztRQUNJLElBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQztRQUN2RSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDN0QsSUFBSSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekUsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksZUFBZSxHQUFHLG1CQUFtQixDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxHQUFHLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ3RILEVBQUUsQ0FBQyxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksZUFBZSxHQUFHLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQy9FLHNCQUFzQixDQUFDLFNBQVMsR0FBRyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxHQUFHLHNCQUFzQixDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDL0gsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0RBQXFCLEdBQTVCLFVBQTZCLElBQTJCO1FBQXhELGlCQTBDQztRQXpDRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUN4RyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNmLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pELENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFdBQVc7Z0JBQ2xELE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJO1lBQXBGLENBQW9GLENBQUMsQ0FBQztZQUMxRixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDWCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNmLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNyRCxDQUFDO2dCQUNMLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDZixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVELHVHQUF1RztRQUN2RyxrREFBa0Q7UUFDbEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxREFBd0IsR0FBL0I7UUFBQSxpQkFxQkM7UUFwQkcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7b0JBQzNCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtvQkFDdkIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDNUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksY0FBWSxHQUFHLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQzNCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsY0FBWSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkNBQWMsR0FBckIsVUFBc0IsSUFBMkI7UUFBakQsaUJBaUNDO1FBaENHLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUsseUJBQXlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0UsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztnQkFDL0UsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDaEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQSxXQUFXO29CQUNsRCxJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3hFLE1BQU0sQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQzsyQkFDekUsQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUM7Z0JBQzVELENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDckIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZELFFBQVEsR0FBRyxLQUFLLENBQUM7NEJBQ2pCLEtBQUssQ0FBQzt3QkFDVixDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztnQkFDeEUsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDL0MsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxXQUFXLENBQUMsSUFBSSxFQUFoQixDQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsSCxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNENBQWUsR0FBdEIsVUFBdUIsS0FBYTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFPRCxzQkFBVyw0Q0FBWTtRQUx2Qjs7O1dBR0c7YUFFSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQztRQUN4RCxDQUFDO2FBQ0QsVUFBd0IsS0FBYTtZQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDekIsQ0FBQztnQkFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDOzs7T0FYQTtJQWFEOzs7T0FHRztJQUNJLDhDQUFpQixHQUF4QixVQUF5QixHQUFRLEVBQUUsSUFBWTtRQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxZQUFZLEdBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUVELElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0MsVUFBVSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbEQsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSSx1REFBMEIsR0FBakM7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLHNEQUF5QixHQUFoQztRQUNJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSw4REFBaUMsR0FBeEM7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUU5QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixRQUFRLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDckUsQ0FBQztRQUNELElBQUksQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1REFBMEIsR0FBakM7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUU5QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixRQUFRLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNJLG1EQUFzQixHQUE3QjtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBRTlDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLFFBQVEsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMERBQTZCLEdBQXBDO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBRW5ELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixRQUFRLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNJLHFEQUF3QixHQUEvQjtRQUNJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNERBQStCLEdBQXRDLFVBQXVDLFNBQStDO1FBQ2xGLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5RCxLQUFLLENBQUM7WUFDVixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSx3REFBMkIsR0FBbEMsVUFBbUMsS0FBYTtRQUM1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLDJCQUEyQixJQUFJLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLENBQUM7WUFDckgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCxJQUFJLHNCQUFzQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7UUFDdkUsSUFBSSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQyxZQUFZLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDO1FBQ3JHLElBQUkseUJBQXlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDO1FBRTlGLElBQUksNkJBQTZCLEdBQUcseUJBQXlCLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxHQUFHLG9CQUFvQjtjQUNqSCxJQUFJLENBQUMsNEJBQTRCLENBQUM7UUFFeEMsSUFBSSx1QkFBdUIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdGLHVCQUF1QixHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksNkJBQTZCLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztRQUNwQyxDQUFDO1FBRUQsb0hBQW9IO1FBQ3BILEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsMkVBQTJFO1lBQzNFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7WUFFekcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLHNIQUFzSDtnQkFDdEgsc0RBQXNEO2dCQUN0RCxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLG9CQUFvQixHQUFHLHlCQUF5QixDQUFDLENBQUM7Z0JBRW5HLG1HQUFtRztnQkFDbkcsZ0dBQWdHO2dCQUNoRyxvR0FBb0c7Z0JBQ3BHLDhGQUE4RjtnQkFDOUYsSUFBSSxDQUFDLDRCQUE0QixHQUFHLHVCQUF1QixHQUFHLG1CQUFtQixDQUFDO2dCQUNsRixFQUFFLENBQUMsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QjtzQkFDN0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsNEJBQTRCLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFFRCxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQ2hFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDakMsQ0FBQztJQUNMLENBQUM7SUFFTSwwREFBNkIsR0FBcEMsVUFBcUMsWUFBbUM7UUFDcEUsSUFBSSxNQUFjLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlELEVBQUUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUsseUJBQXlCLENBQUMsUUFBUSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9GLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlFLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxzREFBeUIsR0FBaEMsVUFBaUMsTUFBZ0M7UUFDN0QsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUssaUJBQWlCLENBQUMsTUFBTTtnQkFDekIsTUFBTSxHQUFHLFdBQVcsQ0FBQztnQkFDckIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxpQkFBaUIsQ0FBQyxPQUFPO2dCQUMxQixNQUFNLEdBQUcsWUFBWSxDQUFDO2dCQUN0QixLQUFLLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU8seUNBQVksR0FBcEI7UUFBQSxpQkFhQztRQVpHLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUNsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDaEIsVUFBVSxDQUFDO2dCQUNQLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3pELFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRU8sc0NBQVMsR0FBakI7UUFBQSxpQkF5SEM7UUF4SEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLGlCQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RixJQUFJLGVBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSw2QkFBMkIsR0FBRyxLQUFLLENBQUM7Z0JBRXhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQzt3QkFDaEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO2dDQUM3QixLQUFLLENBQUM7NEJBQ1YsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs0QkFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNsRCxNQUFNLENBQUM7d0JBQ1gsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztnQ0FDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29DQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQ0FDbEcsQ0FBQzs0QkFDTCxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLDZCQUEyQixHQUFHLElBQUksQ0FBQzs0QkFDdkMsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDbkIsU0FBUyxFQUFFLGVBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUscUJBQXFCLEVBQUU7d0JBQzNFLDZCQUEyQixHQUFHLElBQUksQ0FBQztvQkFDdkMsQ0FBQztpQkFDSixDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLENBQUMsNkJBQTJCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDOUMsTUFBTSxDQUFDLGVBQWEsR0FBRyxpQkFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNsRixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLHlFQUF5RTt3QkFDekUsc0RBQXNEO3dCQUN0RCw4RUFBOEU7d0JBQzlFLCtFQUErRTt3QkFDL0UsSUFBSSxPQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO3dCQUN4QixPQUFPLE9BQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7NEJBQ3RCLElBQUksV0FBVyxHQUFHLE9BQUssQ0FBQyxPQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMxQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUM5QyxDQUFDOzRCQUNELE9BQUssQ0FBQyxNQUFNLENBQUMsT0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ2xDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7NEJBQ3BDLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQzFCLDBEQUEwRDtnQ0FDMUQsd0VBQXdFO2dDQUN4RSxzRUFBc0U7Z0NBQ3RFLDRCQUE0QjtnQ0FDNUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsS0FBSyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0NBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dDQUM1QyxNQUFNLENBQUMsQ0FBQyxDQUFDO29DQUNiLENBQUM7b0NBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dDQUNuRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ2QsQ0FBQztnQ0FDTCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLElBQUksTUFBTSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUN4RSxJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FFeEUsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzt3Q0FDL0MsTUFBTSxDQUFDLENBQUMsQ0FBQztvQ0FDYixDQUFDO29DQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dDQUN0RCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ2QsQ0FBQztnQ0FDTCxDQUFDO2dDQUNELE1BQU0sQ0FBQyxDQUFDLGVBQWEsR0FBRyxpQkFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzdGLENBQUMsQ0FBQyxDQUFDOzRCQUNILFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dDQUNqQixPQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNyQixDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixtRUFBbUU7Z0JBQ25FLGlEQUFpRDtnQkFDakQsSUFBSSxxQkFBbUIsR0FBNEIsRUFBRSxDQUFDO2dCQUN0RCxJQUFJLG9CQUFvQixTQUF5QixDQUFDO2dCQUNsRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZFLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQzs0QkFDdkIsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQ2xELE1BQU0sQ0FBQyxlQUFhLEdBQUcsaUJBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDbEYsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQ0FDN0IscUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNuQyxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3dCQUNELHFCQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hELG9CQUFvQixHQUFHLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO29CQUN2QixvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDbEQsTUFBTSxDQUFDLGVBQWEsR0FBRyxpQkFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsRixDQUFDLENBQUMsQ0FBQztvQkFDSCxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO3dCQUM3QixxQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxxQkFBbUIsQ0FBQztZQUM3QyxDQUFDO1lBRUQsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUM7UUFDcEQsQ0FBQztJQUNMLENBQUM7SUFFTyx1REFBMEIsR0FBbEMsVUFBbUMsQ0FBb0IsRUFBRSxDQUFvQixFQUFFLEtBQWE7UUFDeEYsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWYsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFOUMsSUFBSSxRQUFRLEdBQUcsT0FBTyxNQUFNLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUQsTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNsRixNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3RGLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLGdEQUFtQixHQUEzQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztJQUN0SCxDQUFDO0lBRU8sMkNBQWMsR0FBdEI7UUFDSSxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsbUJBQW1CLEtBQUssSUFBSSxDQUFDLDBCQUEwQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDckYsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7Z0JBQzNHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO1lBQzVGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2dCQUMzRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzdELENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLDBCQUEwQixHQUFHLG1CQUFtQixDQUFDO0lBQzFELENBQUM7SUFFTyxvREFBdUIsR0FBL0I7UUFDSSxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLFNBQVMsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7UUFDMUMsSUFBSSxjQUFjLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ25FLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxjQUFjLENBQUM7SUFDbkQsQ0FBQztJQUFBLENBQUM7SUFFTSxvREFBdUIsR0FBL0IsVUFBZ0MsZ0JBQTBCLEVBQUUsV0FBcUI7UUFBakYsaUJBb09DO1FBbk9HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLHVHQUF1RztZQUN2RyxJQUFJLHNCQUFzQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7WUFFdkUsaUVBQWlFO1lBQ2pFLCtEQUErRDtZQUMvRCw2R0FBNkc7WUFDN0csSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO1lBRTdELDhGQUE4RjtZQUM5RixrSEFBa0g7WUFDbEgsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO1lBRTdELGtGQUFrRjtZQUNsRixpREFBaUQ7WUFDakQsdUZBQXVGO1lBQ3ZGLHVIQUF1SDtZQUN2SCx5RUFBeUU7WUFDekUsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDO1lBRXZFLDhEQUE4RDtZQUM5RCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLFVBQVU7Z0JBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLHNCQUFzQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUMzRixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFFaEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxZQUFZLENBQUM7c0JBQzFGLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUMvRyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlDQUFpQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUMxRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osbUVBQW1FO2dCQUNuRSwrRUFBK0U7Z0JBQy9FLDZHQUE2RztnQkFFN0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxTQUFTLENBQUM7Z0JBQzFELENBQUM7Z0JBRUQsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhO3NCQUN2RyxDQUFDLHNCQUFzQixDQUFDLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbEYsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ2hGLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUM3RSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDO29CQUMzRSxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixDQUFDO2dCQUNELElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxVQUFVLENBQUM7WUFDeEQsQ0FBQztZQUVELDZGQUE2RjtZQUM3RixFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLElBQUksc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDN0UsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDO1lBRUQsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDNUYsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLDRCQUE0QjtrQkFDeEUsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU5RCxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLGtHQUFrRztnQkFDbEcsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELElBQUkscUJBQW1CLEdBQUcsYUFBYSxDQUFDO2dCQUN4QyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxHQUFHLGFBQWEsQ0FBQztnQkFDMUYsSUFBSSxvQkFBb0IsR0FBRyxjQUFjLENBQUM7Z0JBRTFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEdBQUcsYUFBYSxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDakQsY0FBYyxHQUFHLElBQUksQ0FBQzt3QkFDdEIscUJBQW1CLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQztvQkFDVixDQUFDO29CQUNELG9CQUFvQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcscUJBQW1CLENBQUM7Z0JBQ3ZELENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsb0JBQW9CLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDM0IsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7b0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLEtBQUssaUJBQWlCLENBQUMsTUFBTTtnQ0FDekIsU0FBUyxHQUFHLENBQUMsQ0FBQztnQ0FDZCxLQUFLLENBQUM7NEJBQ1YsS0FBSyxpQkFBaUIsQ0FBQyxPQUFPO2dDQUMxQixTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0NBQ2YsS0FBSyxDQUFDOzRCQUNWO2dDQUNJLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0NBQ2QsS0FBSyxDQUFDO3dCQUNkLENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxJQUFJLGFBQWEsR0FBRzt3QkFDaEIsS0FBSyxFQUFFLHFCQUFtQjt3QkFDMUIsTUFBTSxFQUFFLG9CQUFvQjt3QkFDNUIsaUJBQWlCLEVBQUUsVUFBQSxLQUFLOzRCQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0NBQ3hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29DQUNwQyxLQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFtQixHQUFHLENBQUMsQ0FBQyxHQUFHO3dDQUMxQyxLQUFLLEVBQUUscUJBQW1CLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixDQUFDLE1BQU07cUNBQ3pGLENBQUM7Z0NBQ04sQ0FBQztnQ0FDRCxLQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzs0QkFDbkMsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELFNBQVMsRUFBRSxTQUFTO3dCQUNwQixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUs7cUJBQ2hGLENBQUM7b0JBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBRXpDLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDakYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLHdGQUF3RjtnQkFDeEYsd0RBQXdEO2dCQUN4RCw0RkFBNEY7Z0JBQzVGLDhEQUE4RDtnQkFDOUQsSUFBSSxNQUFNLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBRS9ELGlHQUFpRztnQkFDakcsa0dBQWtHO2dCQUNsRywyR0FBMkc7Z0JBQzNHLGtGQUFrRjtnQkFDbEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNuRixNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUM7Z0JBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUVqRSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2dCQUMxRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixHQUFHLENBQUM7dUJBQ25FLGlCQUFpQixHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxJQUFJLENBQUMsZUFBZSxHQUFHLHNCQUFzQixDQUFDLFNBQVM7MEJBQ2pELENBQUMsaUJBQWlCLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNwRyxDQUFDO2dCQUVELDRHQUE0RztnQkFDNUcsb0dBQW9HO2dCQUNwRyw0R0FBNEc7Z0JBQzVHLGdEQUFnRDtnQkFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTO3VCQUM3RSxzQkFBc0IsQ0FBQyxTQUFTO3dCQUNuQyxzQkFBc0IsQ0FBQyxZQUFZLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQzt1QkFDM0YsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQyxZQUFZOzBCQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3hFLENBQUM7Z0JBRUQsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDMUQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDZCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUNELElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO2dCQUVwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDZCQUE2QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7dUJBQ3BFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO3VCQUNsRixXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLDRGQUE0RjtvQkFDNUYsZ0dBQWdHO29CQUNoRyw0R0FBNEc7b0JBQzVHLHdHQUF3RztvQkFDeEcsSUFBSSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxDQUFDLCtCQUErQixHQUFHLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxZQUFZLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDO29CQUM5RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUNsRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztnQ0FDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29DQUNsRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDO3dDQUNqQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJO3dDQUNwQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUk7d0NBQzVGLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUs7d0NBQ3RDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVc7d0NBQ2xELElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUk7d0NBQ3BDLEtBQUssRUFBRSxLQUFLO3FDQUNmLENBQUMsQ0FBQztnQ0FDUCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0NBQ2xGLENBQUM7NEJBQ0wsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsR0FBRyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDaEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNsRCxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDO2dDQUN0QyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJO2dDQUNwQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUk7Z0NBQzVGLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUs7Z0NBQ3RDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVc7Z0NBQ2xELElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUk7Z0NBQ3BDLEtBQUssRUFBRSxLQUFLOzZCQUNmLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7NEJBQzFGLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3ZGLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUNELElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQztZQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztZQUNMLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTyxtQ0FBTSxHQUFkO1FBQUEsaUJBNEJDO1FBM0JHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQztZQUN0RCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSTtvQkFDdkMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNsQixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07d0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUM5QixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDdkQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDUixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7b0NBQzVCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQ0FDN0MsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0NBQ2hFLENBQUM7Z0NBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN0RCxLQUFLLEdBQUcsSUFBSSxDQUFDO2dDQUNqQixDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLDJDQUFjLEdBQXRCLFVBQXVCLElBQXNCLEVBQUUsS0FBYSxFQUFFLG9CQUF5QjtRQUF2RixpQkE2QkM7UUE1QkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7UUFFRCxJQUFJLFlBQVksR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxRQUFRO1lBQ3hDLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDekIsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNO1NBQ25DLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV0QyxJQUFJLHFCQUFxQixHQUFHO1lBQ3hCLElBQUksRUFBRSxZQUFZO1lBQ2xCLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLDZFQUE2RTtRQUM3RSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFMUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO2dCQUN2QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTyxpREFBb0IsR0FBNUI7UUFBQSxpQkE4REM7UUE3REcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxXQUFTLEdBQStDLEVBQUUsQ0FBQztZQUMvRCxJQUFJLFFBQU0sR0FBbUUsRUFBRSxDQUFDO1lBRWhGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxpQkFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDO29CQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdGLElBQUksZUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEtBQUssaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQzlDLE1BQU0sQ0FBQyxlQUFhLEdBQUcsaUJBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pFLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUVELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDM0IsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsUUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQ3JELFdBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQ3RDLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFJLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3hFLENBQUM7Z0JBQ0QsV0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztvQkFDcEIsSUFBSSxFQUFFLFFBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO29CQUNyQixJQUFJLEVBQUUseUJBQXlCLENBQUMsV0FBVztvQkFDM0MsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtpQkFDbkMsQ0FBQyxDQUFDO2dCQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxRQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ3hCLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzRCQUNwQixJQUFJLEVBQUUsSUFBSTs0QkFDVixJQUFJLEVBQUUseUJBQXlCLENBQUMsU0FBUzs0QkFDekMsS0FBSyxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTt5QkFDbkMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUNuQixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLE9BQUssR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtnQkFDNUMsTUFBTSxDQUFDO29CQUNILEtBQUssRUFBRSxPQUFLLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLHlCQUF5QixDQUFDLE1BQU07aUJBQ3pDLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRU8sd0NBQVcsR0FBbkIsVUFBb0IsZ0JBQTBCLEVBQUUsV0FBcUI7UUFDakUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFNUIscURBQXFEO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFeEQsc0ZBQXNGO1lBQ3RGLDRGQUE0RjtZQUM1Riw2RkFBNkY7WUFDN0YsMERBQTBEO1lBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxxSEFBcUg7Z0JBQ3JILHdFQUF3RTtnQkFDeEUsc0ZBQXNGO2dCQUN0RixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2pHLENBQUM7WUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0RSxDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8seURBQTRCLEdBQXBDO1FBQ0ksSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDO1FBRXZFLDRFQUE0RTtRQUM1RSxrR0FBa0c7UUFDbEcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLElBQUksc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsNEJBQTRCLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDO1FBQzVFLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1lBQ25HLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3hELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3ZELENBQUM7SUFDTCxDQUFDO0lBRU8sNENBQWUsR0FBdkI7UUFBQSxpQkFZQztRQVhHLElBQUksc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQztRQUN2RSxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFDLHlGQUF5RjtRQUN6RiwyRkFBMkY7UUFDM0Ysc0RBQXNEO1FBQ3RELHNCQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ25ELFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyw0QkFBNEIsR0FBRyxDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sb0RBQXVCLEdBQS9CLFVBQWdDLElBQXNCLEVBQUUsUUFBaUIsRUFBRSxTQUFtQixFQUFFLGlCQUEyQixFQUN2SCxhQUFrQztRQUR0QyxpQkFtREM7UUFqREcsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNoQixRQUFRLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssa0JBQWtCLENBQUMsMkJBQTJCLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakgsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMvQyxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDYixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDakQsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztZQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsT0FBTyxXQUFXLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUNwQyxZQUFZLEdBQUcsS0FBSyxDQUFDOzRCQUNyQixLQUFLLENBQUM7d0JBQ1YsQ0FBQztvQkFDTCxDQUFDO29CQUNELFdBQVcsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO29CQUNwQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFDckMsQ0FBQztZQUNMLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztvQkFDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQzVCLENBQUM7b0JBQ0QsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNuRyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLHlDQUFZLEdBQXBCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUNsSCxDQUFDO0lBQ0wsQ0FBQztJQUVPLDJDQUFjLEdBQXRCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxrQkFBa0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQztJQUNMLENBQUM7SUFFTyxrREFBcUIsR0FBN0I7UUFBQSxpQkF1Q0M7UUF0Q0csVUFBVSxDQUFDO1lBQ1AsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUV0RixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDO2dCQUMvQixDQUFDO2dCQUNELElBQUksbUJBQW1CLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEYsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO29CQUN0QixZQUFZLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDO2dCQUMzQyxDQUFDO2dCQUNELGVBQWUsR0FBRyxNQUFNLElBQUksWUFBWSxDQUFDO1lBQzdDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLDRGQUE0RjtnQkFDNUYsZ0VBQWdFO2dCQUNoRSxJQUFJLFVBQVUsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN2RixHQUFHLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JILENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxvQ0FBb0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO29CQUNuRSxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakUsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDN0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2hCLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyw4Q0FBaUIsR0FBekIsVUFBMEIsS0FBMkI7UUFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDcEMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsK0JBQStCLENBQUM7ZUFDM0UsS0FBSyxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsMEJBQTBCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUMzRSxLQUFLLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDekQsSUFBSSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzRSxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztvQkFDeEIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLHlDQUF5QyxHQUFHLElBQUksQ0FBQztnQkFDMUQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBQ3JFLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDeEgsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNwQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNqQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTyxxRUFBd0MsR0FBaEQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7d0JBQ2pDLEtBQUssQ0FBQztvQkFDVixDQUFDO2dCQUNMLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7d0JBQ2pDLEtBQUssQ0FBQztvQkFDVixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUE3OERjLDhDQUEyQixHQUFHLFVBQVUsQ0FBQztJQTg4RHJELDZCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsTUFBTSxFQUFFLENBQUMsdXlUQTZXUixDQUFDO29CQUNGLFFBQVEsRUFBRSw4cGFBd0lUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFHLEVBQUUsRUFBRyxFQUFDO0tBQzFGLEVBSjZGLENBSTdGLENBQUM7SUFDSyxpQ0FBYyxHQUEyQztRQUNoRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUcsRUFBRSxFQUFFO1FBQ3JFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRyxFQUFFLEVBQUU7UUFDN0Qsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUcsRUFBRSxFQUFFO1FBQzdFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRyxFQUFFLEVBQUU7UUFDN0QsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFHLEVBQUUsRUFBRTtRQUNuRSx3QkFBd0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRyxFQUFFLEVBQUU7UUFDN0UsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFHLEVBQUUsRUFBRTtRQUNuRSw0QkFBNEIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRyxFQUFFLEVBQUU7UUFDNUYscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUUsRUFBRTtRQUNuRSxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RDLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3BDLHNCQUFzQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDM0MsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLHdCQUF3QixFQUFHLEVBQUUsRUFBRTtRQUMzRSxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzVCLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDcEMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNyQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RDLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzlCLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2xDLHFCQUFxQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDekMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDM0IsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDL0IsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbkMsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN2QyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3JDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQy9CLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ2xDLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3BDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2pDLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ25DLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDcEMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN6QyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM5QixxQkFBcUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3pDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDcEMsOEJBQThCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNsRCxzQ0FBc0MsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzFELGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDcEMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsNEJBQTRCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNoRCxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtLQUNqQyxDQUFDO0lBQ0YseUJBQUM7Q0FuZ0ZELEFBbWdGQyxJQUFBO1NBbmdGWSxrQkFBa0I7QUFzZ0YvQjtJQUF3QyxzQ0FBa0I7SUFDdEQsNEJBQVksY0FBaUMsRUFBRSxNQUFjLEVBQUksTUFBYztRQUEvRSxZQUNJLGtCQUFNLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBRXhDO1FBREcsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7O0lBQzNCLENBQUM7SUFDRSw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLE1BQU0sRUFBRSxDQUFDLHV5VEE2V1IsQ0FBQztvQkFDRixRQUFRLEVBQUUsOHBhQXdJVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsaUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztRQUNoQixFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRyxFQUFFLEVBQUcsRUFBQztLQUMxRixFQUo2RixDQUk3RixDQUFDO0lBQ0YseUJBQUM7Q0F2Z0JELEFBdWdCQyxDQXZnQnVDLGtCQUFrQixHQXVnQnpEO1NBdmdCWSxrQkFBa0IiLCJmaWxlIjoiZGF0YS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9