import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WizardStepComponent } from '../../../../../../../angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';
import { Spell } from '../../models/spell';
export declare class CharacterCreatorSpellFormComponent extends WizardStepComponent<CharacterCreatorParams> implements OnInit {
    private formBuilder;
    spellLabel: string;
    form: FormGroup;
    spells: Spell[];
    spellMap: {
        [index: number]: string;
    };
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
}
