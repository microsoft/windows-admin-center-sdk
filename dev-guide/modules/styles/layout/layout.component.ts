import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-layout',
    templateUrl: './layout.component.html'
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

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Layout';
    }
}
