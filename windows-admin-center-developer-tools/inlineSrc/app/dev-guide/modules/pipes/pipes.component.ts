import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-pipes',
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
export class PipesComponent {

    public links = [
        { href: 'boolean-converter', text: 'boolean-converter' },
        { href: 'byte-unit-converter', text: 'byte-unit-converter' },
        { href: 'enum-converter', text: 'enum-converter' },
        { href: 'format', text: 'format' },
        { href: 'highlight', text: 'highlight' },
        { href: 'yesno-converter', text: 'yesno-converter' }
    ];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Pipes';
    }
}