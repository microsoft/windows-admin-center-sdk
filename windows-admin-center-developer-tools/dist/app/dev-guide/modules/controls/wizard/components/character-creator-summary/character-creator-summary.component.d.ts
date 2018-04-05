import { OnInit } from '@angular/core';
import { WizardStepComponent } from '@msft-sme/shell/angular';
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
