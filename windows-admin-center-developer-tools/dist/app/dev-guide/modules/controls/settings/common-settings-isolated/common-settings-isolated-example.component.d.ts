import { FormGroup } from '@angular/forms';
import { CommonSettingsComponentBase, CommonSettingsNavigationItem, ConfirmationDialogOptions } from '@msft-sme/shell/angular';
export declare class CommonSettingsIsolatedExampleComponent extends CommonSettingsComponentBase {
    settingItems: CommonSettingsNavigationItem[];
    constructor();
    confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions;
}
