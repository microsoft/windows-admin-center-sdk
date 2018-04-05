import { ActivatedRouteSnapshot } from '@angular/router';
import { TreeNode } from 'primeng/primeng';
import { AppContextService } from '../../../../../angular';
export declare class PrimeNGComponent {
    data: any[];
    nodes: TreeNode[];
    simpleNodes: TreeNode[];
    tableSelection: any;
    treeSelection: any;
    simpleSelection: any;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor();
    generateData(count?: number, parent?: TreeNode): TreeNode[];
    makeId(): string;
}
