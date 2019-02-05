import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-guided-panel-example',
    templateUrl: './guided-panel-example.component.html'
})
export class GuidedPanelExampleComponent {

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-guided-panel';
    }
}
