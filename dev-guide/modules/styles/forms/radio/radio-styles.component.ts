import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-forms-radio',
    templateUrl: './radio-styles.component.html'
})
@NavigationTitle({
    getTitle: () => 'Radio Styles'
})
export class RadioStylesComponent { }
