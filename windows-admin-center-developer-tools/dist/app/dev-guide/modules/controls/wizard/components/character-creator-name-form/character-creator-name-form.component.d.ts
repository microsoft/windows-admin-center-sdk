import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WizardStepComponent } from '@msft-sme/shell/angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';
export declare class CharacterCreatorNameFormComponent extends WizardStepComponent<CharacterCreatorParams> implements OnDestroy, OnInit {
    private formBuilder;
    form: FormGroup;
    nameLabel: string;
    private subscriptions;
    constructor(formBuilder: FormBuilder);
    ngOnDestroy(): void;
    ngOnInit(): void;
    private validate();
}
