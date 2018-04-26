// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, DialogService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-dev-guide',
    templateUrl: './dev-guide.component.html'
})
export class DevGuideComponent {
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Dev Guide';
    }
}