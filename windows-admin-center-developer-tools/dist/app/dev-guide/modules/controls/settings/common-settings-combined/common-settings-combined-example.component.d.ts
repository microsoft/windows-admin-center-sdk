import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { CommonSettingsButton, CommonSettingsComponentBase, CommonSettingsNavigationItem, ConfirmationDialogOptions, SettingsFormService } from '@msft-sme/shell/angular';
export declare class CommonSettingsCombinedExampleComponent extends CommonSettingsComponentBase implements OnInit, OnDestroy {
    private formBuilder;
    private formService;
    private router;
    settingItems: CommonSettingsNavigationItem[];
    primaryButton: CommonSettingsButton;
    secondaryButtons: CommonSettingsButton[];
    backRoute: {
        commands: any[];
        extras?: NavigationExtras;
    };
    saveButtonLabel: string;
    discardButtonLabel: string;
    closeButtonLabel: string;
    private subscriptions;
    saving: boolean;
    constructor(formBuilder: FormBuilder, formService: SettingsFormService, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onSaveClick(): void;
    onDiscardClick(): void;
    onCloseClick(): void;
    confirmContinueEditingDialogOptions(dirtyForm: FormGroup, allForms: FormGroup[]): ConfirmationDialogOptions;
}
