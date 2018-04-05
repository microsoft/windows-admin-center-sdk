import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, DialogService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-dev-guide',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-arrange-stack-v">
          <h1 class="sme-position-flex-none sme-padding-squish-v-md">Development Guide</h1>
          <div class="sme-pivot sme-position-flex-none sme-padding-bottom-sm sme-padding-horizontal-md">
              <div role="tablist">
                  <a role="tab" routerLink="/dev/landing" routerLinkActive="sme-active">Landing</a>
                  <a role="tab" routerLink="/dev/controls" routerLinkActive="sme-active">Controls</a>
                  <a role="tab" routerLink="/dev/pipes" routerLinkActive="sme-active">Pipes</a>
                  <a role="tab" routerLink="/dev/styles" routerLinkActive="sme-active">Styles</a>
              </div>
          </div>
          <div class="sme-layout-relative sme-position-flex-auto">
              <router-outlet></router-outlet>
          </div>
      </div>
    `
})
export class DevGuideComponent {
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Dev Guide';
    }
}