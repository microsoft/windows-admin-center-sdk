import { TreeNodeDataItem } from '../../../../../angular/controls/data-table/data-table-contract';
export declare class TreeTableExampleComponent {
    tabIndex: number;
    sampleData1: TreeNodeDataItem[];
    selectedData2: TreeNodeDataItem[];
    constructor();
    clickTab(tabIndex: number): void;
    clearSelection(): void;
}
