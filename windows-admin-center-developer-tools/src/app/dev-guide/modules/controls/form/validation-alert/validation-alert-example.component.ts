// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component } from '@angular/core';
import { ValidationAlertSeverity } from '@microsoft/windows-admin-center-sdk/angular';
@Component({
    selector: 'sme-ng2-control-validation-alert-example',
    templateUrl: './validation-alert-example.component.html'
})
export class ValidationAlertExampleComponent {
    public model: any;

    constructor() {
        this.model = {
            alerts: {
                success: { message: 'This is a success alert', valid: true },
                error: { message: 'This is a error alert', severity: ValidationAlertSeverity.Error, valid: false },
                warn: { message: 'This is a warning alert', severity: ValidationAlertSeverity.Warning, valid: true },
                info: { message: 'This is a info alert', severity: ValidationAlertSeverity.Informational, valid: true }
            }
        }
    }
}
