import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BasePropertiesForm, FormGroupValidationMessages, SettingsFormService } from '../../../../../../angular';
import { IsolatedSetting4FormData, IsolatedSettings4ServiceData } from './model/isolated-setting4-model';
export declare class CommonSettingsIsolatedExamplePanel4Component extends BasePropertiesForm<IsolatedSettings4ServiceData, IsolatedSetting4FormData> {
    formBuilder: FormBuilder;
    private settingsFormService;
    private router;
    /**
     * Note: It's important that the names of controls are identical with the control names that you place in the form.
     * If these don't line up properly, the form won't be able to access the correct errors.
     */
    private formErrorsField;
    /**
     * Note: It's important that the names of controls are identical with the control names that you place in the form.
     * If these don't line up properly, the form won't be able to access the correct errors.
     */
    private validationMessagesField;
    constructor(formBuilder: FormBuilder, settingsFormService: SettingsFormService, router: Router);
    readonly formErrors: any;
    readonly validationMessages: FormGroupValidationMessages;
    fetchData(): Observable<IsolatedSettings4ServiceData>;
    createForm(): FormGroup;
    createFormDataFromDataModel(): IsolatedSetting4FormData;
    onFetchError(error: any): void;
    onSaveError(error: any): void;
    onSaveSuccess(): void;
    onCloseClick(): void;
    saveForm(newDataModel: IsolatedSettings4ServiceData): Observable<IsolatedSettings4ServiceData>;
}
