import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-forms',
    templateUrl: './forms.component.html'
})
@NavigationTitle({
    getTitle: () => 'Form Styles'
})
export class FormsComponent { }
