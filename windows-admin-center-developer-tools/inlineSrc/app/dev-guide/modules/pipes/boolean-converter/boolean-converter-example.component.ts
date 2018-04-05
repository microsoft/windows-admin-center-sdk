import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-boolean-converter-example',
    template: `
      <div class="p-xxs tool-container">
          <div>
              <label>boolean-converter input</label>
              <input type="checkbox" [checked]="checked" (change)="checked = !checked" />
          </div>
          <div>
              <span>Default Output:</span>
              <span style="font-weight: bold">{{ checked | smeBooleanConverter }}</span>
          </div>
          <div>
              <span>Mapped Pipe Output:</span>
              <span style="font-weight: bold">{{ checked | smeBooleanConverter : checkedMap }}</span>
          </div>
      </div>
    `
})
export class BooleanConverterExampleComponent {
    public checked = true;
    public checkedMap: Map<boolean, string> = new Map<boolean, string>(
        [[true, 'The box is checked'], [false, 'The box is unchecked']]
    );
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeBooleanConverter';
    }
}