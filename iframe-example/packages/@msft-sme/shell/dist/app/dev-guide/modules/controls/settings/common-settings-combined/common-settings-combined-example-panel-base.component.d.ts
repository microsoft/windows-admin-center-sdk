import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
export declare class CommonSettingsCombinedExamplePanelBaseComponent<TModelData> implements OnInit, OnDestroy {
    protected router: Router;
    protected activatedRoute: ActivatedRoute;
    protected formbuilder: FormBuilder;
    subscription: Subscription;
    saveButtonLabel: string;
    discardButtonLabel: string;
    nameLabel: string;
    sampleForm: FormGroup;
    formErrors: any;
    validationMessages: any;
    protected modelData: TModelData;
    settingName: string;
    constructor(router: Router, activatedRoute: ActivatedRoute, formbuilder: FormBuilder);
    init(formErrors: any, validationMessages: any, modelData: TModelData, settingName: string): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private onValueChanged(data?);
}
