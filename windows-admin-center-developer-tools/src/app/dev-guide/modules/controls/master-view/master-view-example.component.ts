// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';

@Component({
    selector: 'sme-ng2-controls-master-view-example',
    templateUrl: './master-view-example.component.html'
})
export class MasterViewExampleComponent {

    public groupByOptions = [
        { displayName: 'Optoin 1', field: 'field 1' },
        { displayName: 'Option 2', field: 'field 2' },
        { displayName: 'Option 3', field: 'field 3' },
        { displayName: 'Some other thing', field: 'field 4' }
    ];

    public groupField = '';

    public active = false;
    public items = [];

    public selection = null;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-master-view';
    }

    constructor() {
        for (let i = 0; i < 500; i++) {
            this.items.push({ name: i, displayName: 'Item ' + i });
        }
    }
    
    public alert(arg: string) {
        alert(arg);
    }

    public onDropdownChange(field: string) {
        this.alert(field);
    }
}
