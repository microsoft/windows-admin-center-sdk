import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-styles',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-arrange-stack-h">
          <nav role="navigation" class="sme-position-flex-none sme-padding-right-sm">
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
export class StylesComponent {
    public links = [
        { href: 'accessibility', text: 'Accessibility' },
        { href: 'behaviors', text: 'Behaviors' },
        { href: 'colors', text: 'Colors' },
        { href: 'forms', text: 'Forms' },
        { href: 'icons', text: 'Icons' },
        { href: 'layers', text: 'Layers' },
        { href: 'layout', text: 'Layout' },
        { href: 'links', text: 'Links' },
        { href: 'pivot', text: 'Pivots' },
        { href: 'progress', text: 'Progress' },
        { href: 'schemes', text: 'Schemes' },
        { href: 'shadows', text: 'Shadows' },
        { href: 'spacing', text: 'Spacing' },
        { href: 'themes', text: 'Themes' },
        { href: 'typography', text: 'Typography' }
    ];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Styles';
    }

}
