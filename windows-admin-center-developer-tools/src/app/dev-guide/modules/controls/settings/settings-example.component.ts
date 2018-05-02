// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { SettingsFormService } from '@microsoft/windows-admin-center-sdk/angular';

import { Component } from '@angular/core';

@Component({
    selector: 'sme-ng2-controls-settings-example',
    templateUrl: './settings-example.component.html'
})
export class SettingsExampleComponent {
    constructor(private settingsFormService: SettingsFormService) {
    }
}
