import { Component, ViewChild } from '@angular/core';
import { TreeNodeDataItem } from '@msft-sme/angular';
import { TreeTableComponent } from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';
import { TestData } from './testData';

@Component({
    selector: 'sme-dev-guide-controls-tree-table',
    styleUrls: ['./tree-table-example.component.css'],
    templateUrl: './tree-table-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Tree Table Component'
})
export class TreeTableExampleComponent {
    @ViewChild('simpleTreeTable')
    private simpleTreeTable: TreeTableComponent;

    @ViewChild('complexTreeTable')
    private complexTreeTable: TreeTableComponent;

    @ViewChild('multipleSelectionTreeTable')
    private multipleSelectionTreeTable: TreeTableComponent;

    @ViewChild('lazyLoadingNodeTreeTable')
    private lazyLoadingNodeTreeTable: TreeTableComponent;

    public get focusIndex() {
        if (this.multipleSelectionTreeTable) {
            return this.multipleSelectionTreeTable.getActiveFocusedItemIndex();
        } else {
            return 'Loading';
        }
    }

    public get renderedIndex() {
        if (this.multipleSelectionTreeTable) {
            return this.multipleSelectionTreeTable.getActiveRenderedItemIndex();
        } else {
            return 'Loading';
        }
    }

    public sampleData1: TreeNodeDataItem[];

    private internal: TreeNodeDataItem;
    public get selectedData1(): TreeNodeDataItem {
        return this.internal;
    }
    public set selectedData1(value: TreeNodeDataItem) {
        this.internal = value;
    }

    public selectedData2: TreeNodeDataItem[];
    public treePath = 'src/resources/icons/actions/filter.svg';

    public lazyLoadingSampleData: TreeNodeDataItem[];

    constructor() {
        this.sampleData1 = [JSON.parse(JSON.stringify(TestData))];

        this.lazyLoadingSampleData = [JSON.parse(JSON.stringify(TestData))];
        this.lazyLoadingSampleData[0].children = null;
        this.lazyLoadingSampleData[0].canExpand = true;
    }

    public refreshSampleData1(): void {
        this.sampleData1 = null;
        setTimeout(
            () => {
                this.sampleData1 = [JSON.parse(JSON.stringify(TestData))];
            },
            2000);
    }

    public getSampleDataItemIdentity(data: any): string {
        return data.id;
    }

    public clearSelection() {
        this.selectedData2 = [];
    }

    public scrollSelectedDataIntoView(): void {
        this.simpleTreeTable.scrollSelectedItemIntoView(true);
    }

    public goToPath(): void {
        this.complexTreeTable.navigateByPath(
            this.treePath.split('/'),
            node => node.data.label,
            found => {
                console.log('done:' + found);
            });
    }

    public onLazyLoadingNodeExpanded(node: TreeNodeDataItem): void {
        const pathSegments = [];
        let currentNode = node;
        while (currentNode) {
            pathSegments.splice(0, 0, currentNode.data.label);
            currentNode = currentNode.parent;
        }
        this.loadTestDataByPath(node, pathSegments);
    }

    private loadTestDataByPath(node: TreeNodeDataItem, pathSegments: string[], loadDirectChildData = true): void {
        if (!node.children) {
            if (node.data.label.indexOf('.') !== -1) {
                node.isLeaf = true;
            } else {
                node.isBusy = true;

                setTimeout(
                    () => {
                        node.isBusy = false;
                        if (!node.children) {
                            let currentChildren = [JSON.parse(JSON.stringify(TestData))];
                            for (let i = 0; i < pathSegments.length; i++) {
                                currentChildren = currentChildren.filter(item => item.data.label === pathSegments[i])[0].children;
                            }
                            node.children = currentChildren;

                            if (node.children) {
                                node.children.forEach(item => {
                                    item.children = null;
                                });
                            }
                        }

                        if (node.children) {
                            if (loadDirectChildData && !node.isLeaf) {
                                node.children.forEach(item => {
                                    const childPathSegments = pathSegments.slice();
                                    childPathSegments.push(item.data.label);
                                    this.loadTestDataByPath(item, childPathSegments, false);
                                });
                            }
                        }

                        this.lazyLoadingNodeTreeTable.refreshData();
                    },
                    1000);
            }
        } else {
            if (loadDirectChildData && !node.isLeaf) {
                node.children.forEach(item => {
                    const childPathSegments = pathSegments.slice();
                    childPathSegments.push(item.data.label);
                    this.loadTestDataByPath(item, childPathSegments, false);
                });
            }
        }
    }
}
