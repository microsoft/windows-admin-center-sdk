// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls',
    templateUrl: './controls.component.html'
})
export class ControlsComponent {

    public links = [
        { href: 'actions', text: 'action-bar' },
        { href: 'alert-bar', text: 'alert-bar' },
        { href: 'breadcrumb-header', text: 'breadcrumb-header' },
        { href: 'data-table', text: 'data-table' },
        { href: 'details', text: 'details' },
        { href: 'dialog', text: 'dialog' },
        { href: 'dropdown', text: 'dropdown' },
        { href: 'forms', text: 'forms' },
        { href: 'doughnut-chart', text: 'doughnut-chart' },
        { href: 'guided-panel', text: 'guided-panel' },
        { href: 'horizontal-bar-chart', text: 'horizontal-bar-chart' },
        { href: 'icons', text: 'layered icons' },
        { href: 'loading-wheel', text: 'loading-wheel' },
        { href: 'line-chart', text: 'line-chart' },
        { href: 'master-view', text: 'master-view' },
        { href: 'ordered-list-picker', text: 'ordered-list-picker' },
        { href: 'page-alert-bar', text: 'page-alert-bar' },
        { href: 'resizer', text: 'resizer' },
        { href: 'settings', text: 'settings' },
        { href: 'split-view', text: 'split view' },
        { href: 'tree-table', text: 'tree-table' },
        { href: 'wizard', text: 'wizard' }
    ];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'controls';
    }
}