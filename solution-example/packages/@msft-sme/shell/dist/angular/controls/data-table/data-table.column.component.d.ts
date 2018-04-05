import { TemplateRef } from '@angular/core';
import { DataTableSortMode } from './data-table.contract';
export declare class DataTableColumnComponent {
    field: string;
    header: string;
    sortable: string;
    compareFunction: (valueA: any, valueB: any, field: string) => number;
    selectionMode: string;
    sortMode: DataTableSortMode;
    bodyTemplate: TemplateRef<any>;
}
