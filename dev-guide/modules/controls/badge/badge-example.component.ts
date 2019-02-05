import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-badge-example',
    templateUrl: './badge-example.component.html'
})
export class BadgeExampleComponent {
    public checkbox = false;
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-badge';
    }
}
