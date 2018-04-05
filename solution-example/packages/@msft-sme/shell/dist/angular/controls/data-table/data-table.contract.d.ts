export declare type DataItem = any;
export interface DataTableRenderedItem {
    data: DataItem;
    type: DataTableRenderedItemType;
    groupExpanded?: boolean;
}
export declare enum DataTableRenderedItemType {
    Normal = 0,
    GroupHeader = 1,
    GroupItem = 2,
}
export interface DataTableLazyLoadEvent {
    start: number;
    length: number;
    finishLoadingData: (data: DataItem[]) => void;
    sortOrder: number;
    sortField: string;
}
export interface DataTableCustomSortEvent {
    direction: number;
    field: string;
    fallBackToDefaultSort: () => void;
}
export declare enum DataTableSortMode {
    None = 0,
    Ascend = 1,
    Descend = 2,
}
