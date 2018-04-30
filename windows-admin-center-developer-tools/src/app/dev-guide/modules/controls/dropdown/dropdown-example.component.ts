// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-dropdown-example',
    templateUrl: './dropdown-example.component.html'
})
export class DropdownExampleComponent {

    public data = [
        {name: 'Item 1', value: 1},
        {name: 'Item 2', value: 2},
        {name: 'Item 3', value: 3},
        {name: 'Item 4', value: 4}
    ];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Dropdown Component';
    }
}
