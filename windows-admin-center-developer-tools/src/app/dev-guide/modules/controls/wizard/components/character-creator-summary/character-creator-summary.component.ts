// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnInit } from '@angular/core';

import { WizardStepComponent } from '@msft-sme/shell/angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';
import { Job } from '../../models/job';
import { Spell } from '../../models/spell';

@Component({
    selector: 'sme-ng2-character-creator-summary',
    styleUrls: [
        '../wizard-examples.component.css'
    ],
    templateUrl: './character-creator-summary.component.html'
})
export class CharacterCreatorSummaryComponent extends WizardStepComponent<CharacterCreatorParams> implements OnInit {
    public jobMap: { [index: number]: string };

    public spellMap: { [index: number]: string };

    constructor() {
        super();
    }

    public ngOnInit(): void {
        this.jobMap = {};
        this.spellMap = {};

        this.jobMap[Job.Paladin] = 'Paladin';
        this.jobMap[Job.Ranger] = 'Ranger';
        this.jobMap[Job.Rogue] = 'Rogue';
        this.jobMap[Job.Warrior] = 'Warrior';
        this.jobMap[Job.Wizard] = 'Wizard';

        this.spellMap[Spell.Aero] = 'Aero';
        this.spellMap[Spell.Fire] = 'Fire';
        this.spellMap[Spell.Stone] = 'Stone';
        this.spellMap[Spell.Thunder] = 'Thunder';
        this.spellMap[Spell.Water] = 'Water';
    }
}
