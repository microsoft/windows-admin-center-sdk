// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
    selector: 'sme-ng2-controls-resizer-example',
    styleUrls: ['./resizer-example.component.css'],
    templateUrl: './resizer-example.component.html'
})
export class ResizerExampleComponent implements OnInit {
    public tabIndex = 1;
    public testDataList = [];

    public ngOnInit(): void {
        for (let i = 0; i < 500; i++) {
            this.testDataList.push({ name: i, displayName: 'Item ' + i });
        }
    }

    public clickTab(tabIndex: number) {
        this.tabIndex = tabIndex;        
    }
}
