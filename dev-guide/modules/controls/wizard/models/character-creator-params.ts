import { WizardModel } from '@msft-sme/angular';
import { BehaviorSubject } from 'rxjs';
import { Job } from './job';
import { Spell } from './spell';

export interface CharacterCreatorParams extends WizardModel {
    job: BehaviorSubject<Job>;
    name: string;
    spell: Spell;
}
