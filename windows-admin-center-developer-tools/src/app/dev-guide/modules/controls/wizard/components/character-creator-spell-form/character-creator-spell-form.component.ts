import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WizardStepComponent } from '@msft-sme/shell/angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';
import { Spell } from '../../models/spell';

@Component({
    selector: 'sme-ng2-character-creator-name-form',
    styleUrls: [
        '../wizard-examples.component.css'
    ],
    templateUrl: './character-creator-spell-form.component.html'
})
export class CharacterCreatorSpellFormComponent extends WizardStepComponent<CharacterCreatorParams> implements OnInit {
    public spellLabel: string;

    public form: FormGroup;

    public spells: Spell[];

    public spellMap: { [index: number]: string };

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    public ngOnInit(): void {
        this.spellLabel = 'Magical Spells';

        this.spells = [
            Spell.Aero,
            Spell.Fire,
            Spell.Stone,
            Spell.Thunder,
            Spell.Water
        ];

        this.spellMap = {};
        this.spellMap[Spell.Aero] = 'Aero';
        this.spellMap[Spell.Fire] = 'Fire';
        this.spellMap[Spell.Water] = 'Water';
        this.spellMap[Spell.Stone] = 'Stone';
        this.spellMap[Spell.Thunder] = 'Thunder';

        this.form = this.formBuilder.group({
            spell: this.model.spell
        });
    }
}
