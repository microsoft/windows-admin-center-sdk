import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, EventEmitter, NgZone, OnDestroy, OnInit, QueryList } from '@angular/core';
import { Layout } from '../common/interfaces';
import { DataTableColumnComponent } from './data-table-column.component';
import { DataTableCustomSortEvent, DataTableDataItem, DataTableLazyLoadEvent, DataTableRenderedItem, DataTableSortMode, TreeNodeDataItem } from './data-table-contract';
/**
 * Data table component
 */
export declare class DataTableComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    private changeDetector;
    private ngZone;
    private layout;
    private static selectionModeMultipleOption;
    private strings;
    private maxActualScrollDataElementHeight;
    private filterDebounceTimeout;
    private keyboardNavigationDebounceTimeout;
    private scrollCheckIntervalDuration;
    private scrollCheckInterval;
    private navigationKeyboardDebouncing;
    private rowHeight;
    private bufferRowRate;
    private eventUnregistraterHandlers;
    private sortColumn;
    private previousSortColumn;
    private internalItems;
    private calculatedScrollbarWidth;
    private itemViewPortList;
    private currentHasVerticalOverflow;
    private filterDebounceTimer;
    private oldFilterKeyword;
    private filterKeyword;
    private internalGlobalFilter;
    private scrollAboveDataElementHeight;
    private isScrolling;
    private isScrollingEventHandlerSetup;
    private displayItemsTop;
    private internalRenderedItems;
    private isLoading;
    private internalSelection;
    private hasLongList;
    private currentStartIndexOfItemInViewPort;
    private dataScrollTop;
    private currentRenderedItemInViewPort;
    private internalGroupColumn;
    private internalGroupSortMode;
    private internalSelectionMode;
    private shadowTree;
    private activeRenderedItemIndex;
    private renderedItemLengthInViewPort;
    private renderedItemStartIndexOffset;
    private currentColumnIndexWithFocusedElement;
    private unregisterOnElementFocusingEventHandler;
    private contentAreaHasFocus;
    private cancelLastFocusableShadowElementFocusOnce;
    private headerTableElement;
    private contentElement;
    private scrollContainerElement;
    private tempRowElement;
    private scrollBodyElement;
    private scrollAboveDataElement;
    private scrollDataElement;
    private lastFocusableShadowElement;
    private groupHeaderTemplate;
    /**
     * It emits the event when selection changing is happening.
     */
    selectionChange: EventEmitter<any>;
    onRowDblclick: EventEmitter<{
        data: any;
    }>;
    onGroupToggleClicked: EventEmitter<{
        groupData: any;
    }>;
    /**
     * It indicates the columns rendered on the UI.
     */
    columns: QueryList<DataTableColumnComponent>;
    /**
     * It indicates the item rendered on the UI (including the items in and outside of view port).
     */
    renderedItems: DataTableRenderedItem[];
    filteredItems: DataTableDataItem[];
    /**
     * It indicates rendered items are changed.
     */
    renderedItemsChange: EventEmitter<void>;
    /**
     * It indicates whether there are any background busy tasks.
     */
    isBusy: boolean;
    /**
     * It indicates the message showing when the data is loading.
     */
    loadingMessage: string;
    /**
     * It indicates the message showing when the data loading is finished but the data is empty or no data got rendered.
     */
    noRecordMessage: string;
    /**
     * It indicates that a data lazy loading needs to happen and require the consumer to provide data for the lazy loading part.
     */
    lazyLoadingData: EventEmitter<DataTableLazyLoadEvent>;
    /**
     * It triggers when a tree node is expanded.
     */
    onNodeExpand: EventEmitter<{
        node: TreeNodeDataItem;
    }>;
    /**
     * It triggers when a tree node is selected.
     */
    onNodeSelect: EventEmitter<{
        node: TreeNodeDataItem;
    }>;
    /**
     * It indicates the data is loaded in lazy loading way.
     */
    lazyLoad: boolean;
    /**
     * It indicates the items rendered above the view port.
     */
    renderedItemsAboveViewPort: DataTableRenderedItem[];
    /**
     * It indicates the items rendered in and below the view port.
     */
    renderedItemsInAndBelowViewPort: DataTableRenderedItem[];
    /**
     * It indicates whether the data table is scrolled down.
     */
    isScrolledDown: boolean;
    /**
     * It indicates whether the data table should handle scrolling for content.
     */
    shouldScroll: boolean;
    /**
     * It gets and sets the global filter value html element.
     */
    globalFilter: any;
    /**
     * It gets and sets the Case Sensitive flag for filtering.
     */
    caseSensitiveFilter: boolean;
    /**
     * It indicates whether the data table should be rendered as a tree data table.
     */
    showAsTree: boolean;
    /**
     * It gets and sets the data source of the data table.
     */
    items: DataTableDataItem[];
    /**
     * It exposes the enum type then in template we can directly refer to the enum value name instead of enum value number.
     */
    sortModeEnum: any;
    /**
     * It exposes the enum type then in template we can directly refer to the enum value name instead of enum value number.
     */
    renderedItemTypeEnum: any;
    /**
     * It gets and sets the selection of the data source.
     */
    selection: DataTableDataItem | DataTableDataItem[];
    selectionMode: string;
    defaultSortColumn: DataTableColumnComponent;
    defaultSortMode: DataTableSortMode;
    /**
     * It emits the event when filtering is happening.
     */
    onFilter: EventEmitter<string>;
    doCustomSort: EventEmitter<DataTableCustomSortEvent>;
    /**
     * It emits the event when a row is selected.
     */
    onRowSelect: EventEmitter<{
        data: DataTableDataItem;
    }>;
    /**
     * It emits the event when a row is unselected and no row is selected.
     */
    onRowUnselect: EventEmitter<{
        data: DataTableDataItem;
    }>;
    groupColumn: DataTableColumnComponent;
    groupSortMode: DataTableSortMode;
    useGroupToggle: boolean;
    showHeader: boolean;
    tableAriaLabelledBy: string;
    /**
     * It indicates should the data table has the grid.
     */
    showGrid: boolean;
    showAllItemCheckbox: boolean;
    selectAndCheck: boolean;
    linkParentChildrenSelections: boolean;
    selectItemWhenNavigatingWithKeyboard: boolean;
    showLeftMargin: boolean;
    scrollable: boolean;
    selectable: boolean;
    defaultGroupToggleExpanded: boolean;
    groupToggleStatus: {
        [group: string]: boolean;
    };
    constructor(changeDetector: ChangeDetectorRef, ngZone: NgZone, layout: Layout);
    refreshData(): void;
    resetScroll(): void;
    ngOnInit(): void;
    onContentTablePressed(event: any): void;
    onContentItemFocused(event: any): void;
    onContentItemBlurred(event: any): void;
    onLastFocusableShadowElementFocused(event: any): void;
    generateNGClassForRenderedItem(renderedItem: DataTableRenderedItem): any;
    shouldAllItemCheckBoxChecked(): boolean;
    /**
     * It implements the AfterViewInit interface.
     */
    ngAfterViewInit(): void;
    /**
     * It implements the OnDestroy interface.
     */
    ngOnDestroy(): void;
    /**
     * It implements the AfterViewChecked interface.
     */
    ngAfterViewChecked(): void;
    /**
     * It handles the selection of the given data table item.
     */
    selectItem(event: Event, item: DataTableRenderedItem): void;
    /**
     * It returns the placeholder message when the actual data is not rendering.
     */
    getPlaceholderMessage(): string;
    /**
     * It handles the behavior that when a group toggle is clicked.
     */
    clickGroupToggle(item: DataTableRenderedItem, toggleStatusOverriddenValue?: boolean): void;
    /**
     * It handles the behavior that when a tree node toggle is clicked.
     */
    clickTreeToggle(item: DataTableRenderedItem, toggleStatusOverriddenValue?: boolean): void;
    /**
     * It expands all the groups.
     */
    expandAllGroup(): void;
    /**
     * It collapses all the groups.
     */
    collaseAllGroup(): void;
    /**
     * It returns the boolean to indicate whether the given column is the first data column.
     * The returned value can be used to add some custom css for the first data column when grouping is enabled.
     */
    isFirstDataColumn(column: DataTableColumnComponent): boolean;
    /**
     * It handles the column clicking.
     */
    clickColumn(column: DataTableColumnComponent): void;
    /**
     * It handles the row double clicking.
     */
    doubleClickRow(event: Event, item: DataTableRenderedItem): void;
    /**
     * It scrolls the selected item into the view and
     * position the selected item in middle of the list UI.
     */
    scrollSelectedItemIntoView(): void;
    /**
     * It handles the clicking behavior of checkbox.
     * Multiple selection behavior is happening here.
     */
    onItemCheckBoxClicked(item: DataTableRenderedItem): void;
    /**
     * It handles the "check all" checkbox behavior.
     */
    onAllItemCheckBoxClicked(): void;
    /**
     * It indicates whether the given item is selected.
     */
    isItemSelected(item: DataTableRenderedItem): boolean;
    /**
     * It indicates whether a group with the given name is expanded.
     */
    isGroupExpanded(group: string): boolean;
    /**
     * It gets and sets the virtual count.
     * It only works when "lazyLoad" is true.
     */
    virtualCount: number;
    /**
     * It resolves the object properties based on the given path with multiple levels of properties.
     * An example of path is "location.zipCode".
     */
    resolveObjectPath(obj: any, path: string): any;
    /**
     * It returns the active rendered item index.
     */
    getActiveRenderedItemIndex(): number;
    /**
     * Moves to head of the whole rendered item list.
     */
    moveToHeadOfRenderedItems(): void;
    /**
     * Moves to previous page of the rendered item list.
     */
    moveToPreviousPageOfRenderedItems(): void;
    /**
     * Moves to previous item in the rendered item list.
     */
    moveToPreviousRenderedItem(): void;
    /**
     * Moves to next item in the rendered item list.
     */
    moveToNextRenderedItem(): void;
    /**
     * Moves to next page of the rendered item list.
     */
    moveToNextPageOfRenderedItems(): void;
    /**
     * Moves to end of the whole rendered list.
     */
    moveToEndOfRenderedItems(): void;
    /**
     * Activate the rendered item by condition.
     * Activate doesn't mean select. It just indicates which item is active to received more operations especially keyboard operations.
     */
    activateRenderedItemByCondition(condition: (item: DataTableDataItem) => boolean): void;
    /**
     * Activate the rendered item by index.
     * Activate doesn't mean select. It just indicates which item is active to received more operations especially keyboard operations.
     */
    activateRenderedItemByIndex(index: number): void;
    getAriaExpandedAttributeValue(renderedItem: DataTableRenderedItem): string;
    getAriaSortAttributeValue(column: DataTableColumnComponent): string;
    private initializeUI();
    private sortItems();
    private defaultSortCompareFunction(a, b, field);
    private hasVerticalOverflow();
    private alignScrollBar();
    private calculateScrollbarWidth();
    private calculateItemInViewPort(preventScrolling?, forceUpdate?);
    private filter();
    private handleTreeNode(node, depth, parentShadowTreeNode);
    private handleComplexContent();
    private renderItems(preventScrolling?, forceUpdate?);
    private handleScrollAboveDataElement();
    private onLayoutChanged();
    private handleTreeNodeSelection(node, selected, skipEvent?, skipLinkSelection?, itemsToSelect?);
    private alignContent();
    private clearSelection();
    private tryToFocusSelectedRow();
    private onElementFocusing(event);
    private updateActiveRenderedItemIndexBySelection();
}
export declare class TreeTableComponent extends DataTableComponent {
    constructor(changeDetector: ChangeDetectorRef, ngZone: NgZone, layout: Layout);
}
