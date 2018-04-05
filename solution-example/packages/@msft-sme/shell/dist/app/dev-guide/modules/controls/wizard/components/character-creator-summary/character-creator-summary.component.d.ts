import { OnInit } from '@angular/core';
import { WizardStepComponent } from '../../../../../../../angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';
export declare class CharacterCreatorSummaryComponent extends WizardStepComponent<CharacterCreatorParams> implements OnInit {
    jobMap: {
        [index: number]: string;
    };
    spellMap: {
        [index: number]: string;
    };
    constructor();
    ngOnInit(): void;
}
