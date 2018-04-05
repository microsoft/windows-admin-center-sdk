import { AfterViewChecked, AfterViewInit, EventEmitter, NgZone, OnDestroy, OnInit, QueryList } from '@angular/core';
import { Layout } from '../common/interfaces';
import { DataTableColumnComponent } from './data-table.column.component';
import { DataItem, DataTableCustomSortEvent, DataTableLazyLoadEvent, DataTableRenderedItem, DataTableSortMode } from './data-table.contract';
/**
 * Data table component
 */
export declare class DataTableComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    private ngZone;
    private layout;
    private static selectionModeMultipleOption;
    private strings;
    private maxActualScrollDataElementHeight;
    private filterDebounceTimeout;
    private scrollCheckIntervalDuration;
    private scrollCheckInterval;
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
    private groupToggleStatus;
    private internalGroupColumn;
    private internalGroupSortMode;
    private internalSelectionMode;
    private headerTableElement;
    private contentElement;
    private scrollContainerElement;
    private tempRowElement;
    private scrollBodyElement;
    private scrollAboveDataElement;
    private scrollDataElement;
    private groupHeaderTemplate;
    /**
     * It emits the event when selection changing is happening.
     */
    selectionChange: EventEmitter<any>;
    onRowDblclick: EventEmitter<{
        data: any;
    }>;
    /**
     * It indicates the columns rendered on the UI.
     */
    columns: QueryList<DataTableColumnComponent>;
    /**
     * It indicates the item rendered on the UI (including the items in and outside of view port).
     */
    renderedItems: DataTableRenderedItem[];
    filteredItems: DataItem[];
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
     * It gets and sets the global filter value html element.
     */
    globalFilter: any;
    /**
     * It gets and sets the Case Sensitive flag for filtering.
     */
    caseSensitiveFilter: boolean;
    /**
     * It gets and sets the data source of the data table.
     */
    items: DataItem[];
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
    selection: DataItem | DataItem[];
    selectionMode: string;
    defaultSortColumn: DataTableColumnComponent;
    defaultSortMode: DataTableSortMode;
    /**
     * It emits the event when filtering is happening.
     */
    onFilter: EventEmitter<void>;
    doCustomSort: EventEmitter<DataTableCustomSortEvent>;
    /**
     * It emits the event when a row is selected.
     */
    onRowSelect: EventEmitter<{
        data: DataItem;
    }>;
    /**
     * It emits the event when a row is unselected and no row is selected.
     */
    onRowUnselect: EventEmitter<{
        data: DataItem;
    }>;
    groupColumn: DataTableColumnComponent;
    groupSortMode: DataTableSortMode;
    useGroupToggle: boolean;
    defaultGroupToggleExpanded: boolean;
    constructor(ngZone: NgZone, layout: Layout);
    refreshData(): void;
    resetScroll(): void;
    ngOnInit(): void;
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
    clickGroupToggle(item: DataTableRenderedItem): void;
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
    doubleClickRow(item: DataTableRenderedItem): void;
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
    isGroupExpanded(group: string): boolean;
    /**
     * It gets and sets the virtual count.
     * It only works when "lazyLoad" is true.
     */
    virtualCount: number;
    private initializeUI();
    private sortItems();
    private defaultSortCompareFunction(a, b, field);
    private hasVerticalOverflow();
    private alignScrollBar();
    private calculateScrollbarWidth();
    private calculateItemInViewPort(preventScrolling?, forceUpdate?);
    private filter();
    private handleGroup();
    private renderItems(preventScrolling?, forceUpdate?);
    private handleScrollAboveDataElement();
    private onLayoutChanged();
    private alignContent();
    private clearSelection();
}
