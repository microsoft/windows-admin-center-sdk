import { AfterViewInit, DoCheck, ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { DataTable, TreeTable } from 'primeng/primeng';
import { DataTableComponent } from '../data-table/data-table.component';
import { SplitViewComponent } from '../split-view';
export declare class MasterViewComponent implements AfterViewInit, DoCheck, OnDestroy {
    private ngZone;
    private splitView;
    private timer;
    private currentDataSelection;
    searchElement: ElementRef;
    dataView: ElementRef;
    dataTable: DataTable;
    smeDataTable: DataTableComponent;
    treeTable: TreeTable;
    header: string;
    total: number;
    showSelection: boolean;
    showRefresh: boolean;
    showFilter: boolean;
    filterActive: boolean;
    selection: any;
    requireDataItemUniqueId: (item: any) => string;
    extraFilter?: boolean;
    refresh: EventEmitter<void>;
    filter: EventEmitter<void>;
    clearSelection: EventEmitter<void>;
    searchable: boolean;
    selectedItemCount: number;
    dataViewHeight: number;
    isDataListScrolledTotop: boolean;
    constructor(ngZone: NgZone, splitView: SplitViewComponent);
    /**
     * The method to run after the component view initialized
     */
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    updateLayout(): void;
    ngDoCheck(): void;
    private handleDetailPaneExpanding(dataViewControl);
    private ensureDataItemIsInViewport(dataItemSelector, dataViewScrollableContainerSelector);
}
