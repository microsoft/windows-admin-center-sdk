import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { ConfirmationDialogOptions, SingleSettingComponentBase } from '../../../../../../angular';
export declare class SingleSettingComponent extends SingleSettingComponentBase implements OnInit {
    private formBuilder;
    saveButtonLabel: string;
    discardButtonLabel: string;
    nameLabel: string;
    sampleForm: FormGroup;
    backRoute: {
        commands: any[];
        extras?: NavigationExtras;
    };
    formErrors: any;
    validationMessages: any;
    saving: boolean;
    private modelData;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    onSaveClick(): void;
    onDiscardClick(): void;
    confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions;
    private onValueChanged(data?);
}
