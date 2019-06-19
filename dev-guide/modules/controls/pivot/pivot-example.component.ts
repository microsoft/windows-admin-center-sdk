import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-pivot',
    templateUrl: './pivot-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Pivot Component'
})
export class PivotExampleComponent {}
