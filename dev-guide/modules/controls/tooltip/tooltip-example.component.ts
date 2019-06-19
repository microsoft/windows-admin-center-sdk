import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-tooltip',
    templateUrl: './tooltip-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Tooltip Component'
})
export class TooltipExampleComponent { }
