import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-schemes',
    templateUrl: './schemes.component.html'
})
@NavigationTitle({
    getTitle: () => 'Schemes'
})
export class SchemesComponent {

    public selectedItem = 1;
}
