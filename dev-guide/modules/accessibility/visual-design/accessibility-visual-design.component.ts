import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-accessibility-visual-design',
    templateUrl: './accessibility-visual-design.component.html'
})
@NavigationTitle({
    getTitle: () => 'Accessible visual design'
})
export class AccessibilityVisualDesignComponent { }
