import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-typography',
    templateUrl: './typography.component.html'
})
@NavigationTitle({
    getTitle: () => 'Typography'
})
export class TypographyComponent { }
