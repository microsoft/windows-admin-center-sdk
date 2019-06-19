import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-layout',
    templateUrl: './layout.component.html'
})
@NavigationTitle({
    getTitle: () => 'Layout'
})
export class LayoutComponent {

    public spaceTypes = [
        'inset',
        'top',
        'left',
        'bottom',
        'right',
        'vertical',
        'horizontal',
        'squish-v',
        'squish-h',
        'spread-v',
        'spread-h'
    ];
}
