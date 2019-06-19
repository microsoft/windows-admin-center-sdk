import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-header',
    templateUrl: './header-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Header Component'
})
export class HeaderExampleComponent {}
