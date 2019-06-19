import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-forms-button',
    templateUrl: './button-styles.component.html'
})
@NavigationTitle({
    getTitle: () => 'Button Styles'
})
export class ButtonStylesComponent { }
