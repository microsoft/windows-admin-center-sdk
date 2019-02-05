import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import {
    ConfirmationDialogOptions
} from '@msft-sme/angular';
import {
    CommonSettingsComponentBase
} from '@msft-sme/angular';
import {
    CommonSettingsNavigationItem
} from '@msft-sme/angular';
import {
    SettingsFormService
} from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-controls-common-settings-single-form-example',
    templateUrl: './single-form-example.component.html'
})
export class SingleFormExampleComponent extends CommonSettingsComponentBase {

    public settingItems: CommonSettingsNavigationItem[] = [];

    public backRoute: { commands: any[], extras?: NavigationExtras };

    public saveButtonLabel = 'Save';

    public discardButtonLabel = 'Discard';

    public closeButtonLabel = 'Close';

    public saving = false;

    constructor(private formService: SettingsFormService, private router: Router) {
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
            });

        this.backRoute = { commands: ['../'] };
    }

    public onSaveClick() {
        this.saving = true;
        // Do stuff
        setTimeout(
            () => {
                this.saving = false;
                if (this.commonSettingsComponent.first) {
                    this.commonSettingsComponent.first.acceptAllChildFormsValue();
                    const formValueCallBack = (setting: CommonSettingsNavigationItem): string => {
                        if ((<any>setting).form) {
                            return JSON.stringify((<any>setting).form.value);
                        }

                        return '<user did not navigate to the setting>';
                    };

                    alert(`All the values:\n ${this.commonSettingsComponent.first.settings.map((setting) => {
                        return setting.label + ' - ' + formValueCallBack(setting);
                    }).join('\n')}`);

                    // NOTE: You can access a single setting page value with this expression:
                    // this.combinedForm.value[this.settingItems[1].label]
                    // where settingItems[1] is the second setting item defined in the constructor of this class

                } else {
                    // We should never get here cause we always have a common settings component underneat
                }
            },
            300);
    }

    public onDiscardClick() {
        if (this.commonSettingsComponent.first) {
            return this.commonSettingsComponent.first.discardAllChildForms();
        }
    }

    public onCloseClick() {
        this.router.navigateByUrl(this.formService.getBackRoute('/controls/settings'));
    }

    public confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions {
        return {
            cancelButtonText: 'Discard changes',
            confirmButtonText: 'Continue editing',
            message:
                `Do you want to to continue editing or discard your changes?: \r\n unsaved changes: ${JSON.stringify(dirtyForm.value)}`,
            title: 'You have unsaved changes'
        };
    }
}
