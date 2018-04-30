// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WizardModel } from '@msft-sme/shell/angular';
import { Job } from './job';
import { Spell } from './spell';

export interface CharacterCreatorParams extends WizardModel {
    job: BehaviorSubject<Job>;
    name: string;
    spell: Spell;
}
