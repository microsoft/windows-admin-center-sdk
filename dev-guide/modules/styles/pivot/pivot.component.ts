import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-pivot',
    templateUrl: './pivot.component.html'
})
@NavigationTitle({
    getTitle: () => 'Pivot'
})
export class PivotComponent { }
