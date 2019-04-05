import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, StatusIconType } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-icons-example',
    templateUrl: './layered-icons-example.component.html'
})
export class LayeredIconsExampleComponent {

    public statuses = [
        StatusIconType.Critical,
        StatusIconType.Error,
        StatusIconType.Warning,
        StatusIconType.Progress,
        StatusIconType.Info,
        StatusIconType.Success,
        StatusIconType.Unknown
    ];

    public iconSizes = [
        '16px',
        '20px',
        '24px',
        '32px',
        '48px',
        '64px'
    ];

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-layered-icon';
    }
}
