// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-typography',
    templateUrl: './typography.component.html'
})
export class TypographyComponent {
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Typography';
    }
}
