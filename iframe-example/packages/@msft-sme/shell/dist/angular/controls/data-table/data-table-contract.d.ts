export declare type DataTableDataItem = any;
export interface TreeNodeDataItem {
    label?: string;
    data: any;
    children?: TreeNodeDataItem[];
    expanded?: boolean;
    parent?: TreeNodeDataItem;
    type?: string;
    isLeaf?: boolean;
    selected?: boolean;
}
export interface DataTableRenderedItem {
    data: DataTableDataItem;
    type: DataTableRenderedItemType;
    groupExpanded?: boolean;
    depth?: number;
    hasChildren?: boolean;
    node?: TreeNodeDataItem;
    index: number;
}
export declare enum DataTableRenderedItemType {
    Normal = 0,
    GroupHeader = 1,
    GroupItem = 2,
    TreeNode = 3,
}
export interface DataTableLazyLoadEvent {
    start: number;
    length: number;
    finishLoadingData: (data: DataTableDataItem[]) => void;
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
