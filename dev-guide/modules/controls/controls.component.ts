import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls',
    templateUrl: './controls.component.html'
})
export class ControlsComponent {

    public links = [
        { href: 'actions', text: 'action-bar' },
        { href: 'badge', text: 'badge' },
        { href: 'banner', text: 'banner' },
        { href: 'breadcrumb', text: 'breadcrumb' },
        { href: 'clamp', text: 'clamp' },
        { href: 'data-table', text: 'data-table' },
        { href: 'details', text: 'details' },
        { href: 'dialog', text: 'dialog' },
        { href: 'dropdown', text: 'dropdown' },
        { href: 'forms', text: 'forms' },
        { href: 'doughnut-chart', text: 'doughnut-chart' },
        { href: 'guided-panel', text: 'guided-panel' },
        { href: 'markdown', text: 'markdown' },
        { href: 'horizontal-bar-chart', text: 'horizontal-bar-chart' },
        { href: 'icons', text: 'layered icons' },
        { href: 'layout', text: 'layout' },
        { href: 'loading-wheel', text: 'loading-wheel' },
        { href: 'line-chart', text: 'line-chart' },
        { href: 'master-view', text: 'master-view' },
        { href: 'page-alert-bar', text: 'page-alert-bar' },
        { href: 'pivot', text: 'pivot' },
        { href: 'property-grid', text: 'property-grid' },
        { href: 'resizer', text: 'resizer' },
        { href: 'schema-form', text: 'schema-form' },
        { href: 'schema-form-tabbed-style', text: 'schema-form-tabbed-style' },
        { href: 'settings', text: 'settings' },
        { href: 'split-view', text: 'split view' },
        { href: 'tooltip', text: 'tooltip' },
        { href: 'tree-table', text: 'tree-table' },
        { href: 'wizard', text: 'wizard' }
    ];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'controls';
    }
}
