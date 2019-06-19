import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-details',
    templateUrl: './details-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Details Component'
})
export class DetailsExampleComponent { }
