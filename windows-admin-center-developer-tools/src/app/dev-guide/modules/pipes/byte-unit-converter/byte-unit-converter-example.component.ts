import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-byte-unit-converter-example',
    templateUrl: './byte-unit-converter-example.component.html'
})
export class ByteUnitConverterExampleComponent {

    public value = 1234567890;
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeBooleanConverter';
    }
}