import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-overview',
    templateUrl: './overview.component.html'
})
@NavigationTitle({
    getTitle: () => 'Overview'
})
export class OverviewComponent {
    constructor() { }
}
