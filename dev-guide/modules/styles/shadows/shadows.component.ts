import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-shadows',
    templateUrl: './shadows.component.html'
})
@NavigationTitle({
    getTitle: () => 'Shadows'
})
export class ShadowsComponent { }
