import { Component } from '@angular/core';
import { StatusIconType } from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-layered-icon',
    templateUrl: './layered-icons-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Layered Icon Component'
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
}
