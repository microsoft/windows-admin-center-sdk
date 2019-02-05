import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-spacing',
    templateUrl: './spacing.component.html'
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

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Spacing';
    }
}
