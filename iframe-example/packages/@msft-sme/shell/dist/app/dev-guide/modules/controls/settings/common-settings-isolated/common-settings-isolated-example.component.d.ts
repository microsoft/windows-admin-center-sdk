import { FormGroup } from '@angular/forms';
import { CommonSettingsComponentBase, CommonSettingsNavigationItem, ConfirmationDialogOptions } from '../../../../../../angular';
export declare class CommonSettingsIsolatedExampleComponent extends CommonSettingsComponentBase {
    settingItems: CommonSettingsNavigationItem[];
    constructor();
    confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions;
}
