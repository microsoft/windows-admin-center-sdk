import { OnChanges, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataTableDataItem } from './data-table-contract';
export declare class DataTableTemplateLoaderComponent implements OnInit, OnChanges, OnDestroy {
    private viewContainer;
    private view;
    data: DataTableDataItem;
    rowIndex: number;
    template: TemplateRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
