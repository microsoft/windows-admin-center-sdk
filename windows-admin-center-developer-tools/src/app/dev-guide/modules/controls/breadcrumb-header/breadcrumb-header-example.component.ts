// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
    AppContextService,
    BreadcrumbHeaderComponent,
    BreadcrumbItem,
    BreadcrumbSeparator
} from '@microsoft/windows-admin-center-sdk/angular';

@Component({
    selector: 'sme-ng2-controls-breadcrumb-header-example',
    templateUrl: './breadcrumb-header-example.component.html'
})
export class BreadcrumbHeaderExampleComponent implements OnInit {
    public itemsList: BreadcrumbItem[] = [];
    public separator1: BreadcrumbSeparator;
    public separator2: BreadcrumbSeparator;
    public separator3: BreadcrumbSeparator;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-breadcrumb-header';
    }

    private getStartingData(): BreadcrumbItem[] {

        return [
                {
                    label: 'item 1',
                    clickable: true,
                    bold: true,
                    command: event => alert('item 1')
                },
                {
                    label: 'item 2',
                    clickable: true,
                    command: event => alert('item 2')
                },
                {
                    label: 'item 3',
                    clickable: false,
                    bold: true
                }
            ];
    }

    public ngOnInit() {
        this.separator1 = BreadcrumbSeparator.BackSlash;
        this.separator2 = BreadcrumbSeparator.ChevronRight;
        this.separator3 = BreadcrumbSeparator.Slash;
        this.itemsList = this.getStartingData();
    }
}
