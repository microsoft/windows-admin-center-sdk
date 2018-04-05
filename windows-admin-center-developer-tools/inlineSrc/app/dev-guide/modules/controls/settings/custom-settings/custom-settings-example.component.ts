import { Component } from '@angular/core';

@Component({
    selector: 'sme-ng2-controls-custom-settings-example',
    template: `
      <div class="tool-container border-all">
        <sme-settings>
          <sme-settings-navigation>
            <h3>Custom Setting</h3>
            <a>custom setting 1</a>
            <a>custom setting 2</a>
          </sme-settings-navigation>
          <sme-settings-header>
            <h1>header</h1>
          </sme-settings-header>
          <sme-settings-content>
            <router-outlet></router-outlet>
          </sme-settings-content>
          <sme-settings-footer>
            <h1>footer</h1>
          </sme-settings-footer>
        </sme-settings>
      </div>
    `
})
export class CustomSettingsExampleComponent { }
