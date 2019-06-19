import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-forms-checkbox',
    templateUrl: './checkbox-styles.component.html'
})
@NavigationTitle({
    getTitle: () => 'Checkbox Styles'
})
export class CheckboxStylesComponent { }
