import { AfterViewInit, DoCheck, ElementRef, EventEmitter, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { DataTable, TreeTable } from 'primeng/primeng';
import { DataTableComponent, TreeTableComponent } from '../data-table/data-table.component';
import { SplitViewComponent } from '../split-view';
export declare class MasterViewComponent implements AfterViewInit, DoCheck, OnDestroy {
    private ngZone;
    private splitView;
    private element;
    private renderer;
    private timer;
    private currentDataSelection;
    private internalSmeDataTable;
    strings: {
        oneItem: string;
        items: string;
        selected: string;
        refresh: {
            title: string;
        };
        filter: {
            title: string;
        };
    };
    searchElement: ElementRef;
    containerElement: ElementRef;
    dataView: ElementRef;
    dataTable: DataTable;
    smeDataTable: DataTableComponent;
    treeTable: TreeTable;
    smeTreeTable: TreeTableComponent;
    header: string;
    total: number;
    showSelection: boolean;
    showRefresh: boolean;
    showFilter: boolean;
    filterActive: boolean;
    selection: any;
    requireDataItemUniqueId: (item: any) => string;
    showCustomFilter?: boolean;
    refresh: EventEmitter<void>;
    filter: EventEmitter<void>;
    clearSelection: EventEmitter<void>;
    searchable: boolean;
    selectedItemCount: number;
    dataViewHeight: number;
    isDataListScrolledTotop: boolean;
    constructor(ngZone: NgZone, splitView: SplitViewComponent, element: ElementRef, renderer: Renderer2);
    /**
     * The method to run after the component view initialized
     */
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    updateLayout(): void;
    ngDoCheck(): void;
    getItemCountText(): string;
    getSelectedCountText(): string;
    private handleDetailPaneExpanding(dataViewControl);
    private ensureDataItemIsInViewport(dataItemSelector, dataViewScrollableContainerSelector);
}
