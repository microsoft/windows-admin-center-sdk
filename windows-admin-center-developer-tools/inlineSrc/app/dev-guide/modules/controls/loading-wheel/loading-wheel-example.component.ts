import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-loading-wheel-example',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-arrange-wrapstack-h">
          <div class="sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm" style="height:200px; width:200px; background: blue;">
              <sme-loading-wheel size="small"></sme-loading-wheel>
              <div>hidden</div>
          </div>
          <div class="sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm" style="height:200px; width:200px; background: blue;">
              <sme-loading-wheel size="medium"></sme-loading-wheel>
              <div>hidden</div>
          </div>
          <div class="sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm" style="height:200px; width:200px; background: blue;">
              <sme-loading-wheel></sme-loading-wheel>
              <div>hidden</div>
          </div>
          <div class="sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm" style="height:200px; width:200px; background: blue;">
              <sme-loading-wheel size="small" message="small"></sme-loading-wheel>
              <div>hidden</div>
          </div>
          <div class="sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm" style="height:200px; width:200px; background: blue;">
              <sme-loading-wheel size="medium" message="medium"></sme-loading-wheel>
              <div>hidden</div>
          </div>
          <div class="sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm" style="height:200px; width:200px; background: blue;">
              <sme-loading-wheel message="large (default)"></sme-loading-wheel>
              <div>hidden</div>
          </div>
          <div class="sme-layout-relative sme-position-flex-none sme-margin-inset-xxs sme-border-inset-sm" style="height:400px; width:400px; background: blue;">
              <sme-loading-wheel message="{{status}}" buttonLabel="Toggle" (buttonClick)="onClick()"></sme-loading-wheel>
              <div>hidden</div>
          </div>
      </div>
    `
})
export class LoadingWheelExampleComponent {
    public clicked = false;
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-loading-wheel';
    }

    public get status(): string {
        return this.clicked ? '(clicked)' : 'Taking longer';
    }

    public onClick(): void {
        this.clicked = !this.clicked;
    }
}