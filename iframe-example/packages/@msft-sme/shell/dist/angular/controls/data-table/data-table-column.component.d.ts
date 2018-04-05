import { TemplateRef } from '@angular/core';
import { DataTableSortMode } from './data-table-contract';
export declare class DataTableColumnComponent {
    field: string;
    header: string;
    sortable: string;
    width: string;
    compareFunction: (valueA: any, valueB: any, field: string) => number;
    selectionMode: string;
    styleClass: string;
    searchable: boolean;
    sortMode: DataTableSortMode;
    bodyTemplate: TemplateRef<any>;
}
