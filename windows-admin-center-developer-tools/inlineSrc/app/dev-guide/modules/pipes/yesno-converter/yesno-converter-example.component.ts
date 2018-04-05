import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-yesno-converter-example',
    template: `
      <div class="p-xxs tool-container">
          <div>
              <label>yesno-converter input</label>
              <input type="checkbox" [checked]="checked" (change)="checked = !checked" />
          </div>
          <div>
              <span>IsChecked Output:</span>
              <span style="font-weight: bold">{{ checked | smeBooleanToYesNoConverter }}</span>
          </div>
      </div>
    `
})
export class YesNoConverterExampleComponent {
    public checked = true;

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeBooleanToYesNoConverter';
    }
}