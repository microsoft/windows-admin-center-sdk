import { Component } from '@angular/core';
import { SettingsFormService } from '@msft-sme/angular';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-controls-settings',
    templateUrl: './settings-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Settings Component'
})
export class SettingsExampleComponent {
    constructor(private settingsFormService: SettingsFormService) {
    }
}
