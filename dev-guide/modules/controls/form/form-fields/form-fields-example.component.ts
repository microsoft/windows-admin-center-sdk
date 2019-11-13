import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-control-input-form-fields-example',
    templateUrl: './form-fields-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'API'
})
export class FormFieldsExampleComponent { }
