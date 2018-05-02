// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component } from '@angular/core';
import { TreeNodeDataItem } from '@microsoft/windows-admin-center-sdk/angular';
import { TestData } from './testData';

@Component({
    selector: 'sme-ng2-controls-tree-table-example',
    styleUrls: ['./tree-table-example.component.css'],
    templateUrl: './tree-table-example.component.html'
})
export class TreeTableExampleComponent {
    public tabIndex = 1;
    public sampleData1: TreeNodeDataItem[];
    public selectedData2: TreeNodeDataItem[];

    constructor() {
        this.sampleData1 = [TestData];
    }

    public clickTab(tabIndex: number) {
        this.tabIndex = tabIndex;
    }

    public clearSelection() {
        this.selectedData2 = [];
    }
}
