import { TreeNodeDataItem } from '@msft-sme/shell/angular';
export declare class TreeTableExampleComponent {
    tabIndex: number;
    sampleData1: TreeNodeDataItem[];
    selectedData2: TreeNodeDataItem[];
    constructor();
    clickTab(tabIndex: number): void;
    clearSelection(): void;
}
