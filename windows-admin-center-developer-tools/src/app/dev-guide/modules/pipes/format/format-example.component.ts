// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';

@Component({
    selector: 'sme-ng2-controls-format-example',
    templateUrl: './format-example.component.html'
})
export class FormatExampleComponent {
    public formatSimple = 'Format {0} {1}';
    public formatLinks = 'Format with {0} {1}';
    public simple1 = 'string';
    public simple2 = 'works';
    public link1 = 'link';
    public link1href = 'http://www.bing.com';
    public link2 = 'works';

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeFormat';
    }
}