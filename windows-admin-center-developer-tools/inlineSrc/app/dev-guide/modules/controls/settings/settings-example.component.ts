import { SettingsFormService } from '@msft-sme/shell/angular';

import { Component } from '@angular/core';

@Component({
    selector: 'sme-ng2-controls-settings-example',
    template: `
      <div class="tool-container sme-arrange-stack-v">
          <div class="sme-pivot sme-position-flex-none sme-padding-bottom-sm sme-padding-horizontal-md">
              <div role="tablist">
                  <a role="tab" routerLink="commonSettingsIsolatedPagesForm" routerLinkActive="sme-active">One Form per setting</a>
                  <a role="tab" routerLink="commonSettingsCombinedPagesForm" routerLinkActive="sme-active">One Form for all settings</a>
                  <a role="tab" routerLink="singleSettingForm" routerLinkActive="sme-active">Setting with one page</a>
                  <a role="tab" routerLink="CustomSettings" routerLinkActive="sme-active">Custom Settings</a>
              </div>
          </div>
          <div class="sme-layout-relative sme-position-flex-auto m-t-xxxs">
              <div class="tool-container">
                  <router-outlet></router-outlet>
              </div>
          </div>
      </div>
    `
})
export class SettingsExampleComponent {
    constructor(private settingsFormService: SettingsFormService) {
    }
}
