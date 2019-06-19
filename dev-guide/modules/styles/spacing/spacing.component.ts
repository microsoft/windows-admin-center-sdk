import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-spacing',
    templateUrl: './spacing.component.html'
})
@NavigationTitle({
    getTitle: () => 'Spacing'
})
export class SpacingComponent {

    public spaceScale = [
        'none',
        'xxxs',
        'xxs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'xxl',
        'xxxl'
    ];

    public borderScale = [
        'none',
        'sm',
        'md',
        'lg'
    ];

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
