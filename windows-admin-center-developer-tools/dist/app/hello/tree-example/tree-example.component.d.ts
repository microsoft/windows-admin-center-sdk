import { EventEmitter, OnInit } from '@angular/core';
import { TreeNodeDataItem } from '@msft-sme/shell/angular';
import { Strings } from '../../../generated/strings';
export declare class TreeExampleComponent implements OnInit {
    onSelectionChange: EventEmitter<string>;
    strings: Strings;
    loading: boolean;
    treeData: TreeNodeDataItem[];
    selectedData: TreeNodeDataItem;
    constructor();
    /**
     * Information on PrimeNG's TreeTable can be found here:
     * https://www.primefaces.org/primeng/#/treetable
     */
    ngOnInit(): void;
    getIconCssClasses(nodeName: any): void;
    /**
     * The method to run when a node is selected.
     */
    onNodeSelect(event: any): void;
    /**
     * The method to run when a node is expanded.
     */
    onNodeExpand(event: any): void;
}
