import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-accessibility',
    templateUrl: './accessibility.component.html'
})
@NavigationTitle({
    getTitle: () => 'Accessibility'
})
export class AccessibilityComponent { }
