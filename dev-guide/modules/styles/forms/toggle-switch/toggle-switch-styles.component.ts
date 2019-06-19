import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-forms-toggle-switch',
    templateUrl: './toggle-switch-styles.component.html'
})
@NavigationTitle({
    getTitle: () => 'Toggle Switch Styles'
})
export class ToggleSwitchStylesComponent { }
