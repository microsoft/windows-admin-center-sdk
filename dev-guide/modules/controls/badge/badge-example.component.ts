import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-badge',
    templateUrl: './badge-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Badge Component'
})
export class BadgeExampleComponent {
    public checkbox = false;
}
