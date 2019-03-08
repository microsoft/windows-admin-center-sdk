import { Component } from '@angular/core';
import { SettingsFormService } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-settings-example',
    templateUrl: './settings-example.component.html'
})
export class SettingsExampleComponent {
    constructor(private settingsFormService: SettingsFormService) {
    }
}
