import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-byte-unit-converter-example',
    template: `
      <div class="p-xxs tool-container">
          <div>
              <label>byte-unit-converter input (number)</label>
              <input type="text" [(ngModel)]="value" />
          </div>
          <div>
              <span>1024 Base Output:</span>
              <span style="font-weight: bold">{{ value | smeByteUnitConverter:1024 }}</span>
          </div>    
    
          <div class="m-t-xxs">
              <span>1000 Base Output:</span>
              <span style="font-weight: bold">{{ value | smeByteUnitConverter:1000 }}</span>
          </div>  
      </div>
    `
})
export class ByteUnitConverterExampleComponent {

    public value = 1234567890;
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeBooleanConverter';
    }
}