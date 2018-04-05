import { OnChanges, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataItem } from './data-table.contract';
export declare class DataTableTemplateLoaderComponent implements OnInit, OnChanges, OnDestroy {
    private viewContainer;
    private view;
    data: DataItem;
    rowIndex: number;
    template: TemplateRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
