import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-pipes-boolean-converter-example',
    templateUrl: './boolean-converter-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'smeBooleanConverter'
})
export class BooleanConverterExampleComponent {
    public checked = true;
    public checkedMap: Map<boolean, string> = new Map<boolean, string>(
        [[true, 'The box is checked'], [false, 'The box is unchecked']]
    );
}
