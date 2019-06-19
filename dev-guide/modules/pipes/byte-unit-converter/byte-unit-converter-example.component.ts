import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-pipes-byte-unit-converter-example',
    templateUrl: './byte-unit-converter-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'smeByteUnitConverter'
})
export class ByteUnitConverterExampleComponent {
    public value = 1234567890;
}
