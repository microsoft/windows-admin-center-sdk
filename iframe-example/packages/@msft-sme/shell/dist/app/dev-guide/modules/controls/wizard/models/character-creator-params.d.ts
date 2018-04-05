import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WizardModel } from '../../../../../../angular';
import { Job } from './job';
import { Spell } from './spell';
export interface CharacterCreatorParams extends WizardModel {
    job: BehaviorSubject<Job>;
    name: string;
    spell: Spell;
}
