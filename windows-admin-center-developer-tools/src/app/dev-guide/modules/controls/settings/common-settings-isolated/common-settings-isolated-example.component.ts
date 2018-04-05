import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, RouterStateSnapshot } from '@angular/router';

import {
    CommonSettingsComponentBase,
    CommonSettingsNavigationItem,
    ConfirmationDialogOptions
} from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-common-settings-isolated-example',
    templateUrl: './common-settings-isolated-example.component.html'
})
export class CommonSettingsIsolatedExampleComponent extends CommonSettingsComponentBase {

    public settingItems: CommonSettingsNavigationItem[] = [];

    constructor() {
        super();
        this.settingItems.push(
            {
                label: 'Common Settings 1',
                routeParams: {
                    commands: ['settings1']
                },
                smeIconClassName: 'sme-icon-permissions'
            },
            {
                label: 'Common Settings 2 with a very long name to see how the tooltip works',
                routeParams: {
                    commands: ['settings2']
                },
                smeIconClassName: 'sme-icon-gateway'
            },
            {
                label: 'Common Settings 3',
                routeParams: {
                    commands: ['settings3']
                },
                smeIconClassName: 'sme-icon-firewall'
            },
            {
                label: 'Settings Base Form',
                routeParams: {
                    commands: ['settings4']
                },
                smeIconClassName: 'sme-icon-settings'
            });
    }

    public confirmContinueEditingDialogOptions(
        dirtyForm: FormGroup,
        allForms: FormGroup[]): ConfirmationDialogOptions {
            return {
                cancelButtonText: 'Discard changes',
                confirmButtonText: 'Continue editing',
                message:
                    `Do you want to to continue editing or discard your changes?: \r\n unsaved changes: ${JSON.stringify(dirtyForm.value)}`,
                title: 'You have unsaved changes'
            };
        }
}
