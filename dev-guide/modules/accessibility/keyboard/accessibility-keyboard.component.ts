import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-accessibility-keyboard',
    templateUrl: './accessibility-keyboard.component.html'
})
@NavigationTitle({
    getTitle: () => 'Keyboard Accessibility'
})
export class AccessibilityKeyboardComponent { }
