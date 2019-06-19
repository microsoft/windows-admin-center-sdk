import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-accessibility-overview',
    templateUrl: './accessibility-overview.component.html'
})
@NavigationTitle({
    getTitle: () => 'Accessibility Overview'
})
export class AccessibilityOverviewComponent { }
