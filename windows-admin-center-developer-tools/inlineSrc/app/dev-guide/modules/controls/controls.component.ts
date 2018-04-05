import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-arrange-stack-h">
          <nav role="tablist" class="sme-position-flex-none sme-padding-right-sm">
              <a *ngFor="let link of links" routerLinkActive="sme-active" [routerLink]="link.href" class="sme-scheme-nav-item sme-padding-squish-v-sm sme-arrange-stack-h sme-arrange-ws-nowrap">
                  {{link.text}}
              </a>
          </nav>
          <div class="sme-layout-relative sme-position-flex-auto sme-arrange-overflow-auto-y sme-focus-zone">
              <router-outlet></router-outlet>
          </div>
      </div>
    `
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