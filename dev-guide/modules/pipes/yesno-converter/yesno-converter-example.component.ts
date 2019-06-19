import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-yesno-converter-example',
    templateUrl: './yesno-converter-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'smeBooleanToYesNoConverter'
})
export class YesNoConverterExampleComponent {
    public checked = true;
}
