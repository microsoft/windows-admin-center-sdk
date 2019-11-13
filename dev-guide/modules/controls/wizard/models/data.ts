import { WizardModel } from '@msft-sme/angular';
import { BehaviorSubject } from 'rxjs';

import { DropdownOne } from './dropdown-one';
import { DropdownTwo } from './dropdown-two';

export interface Data extends WizardModel {
    name: string;
    dropdownOneOption: DropdownOne;
    dropdownTwoOption: DropdownTwo;
    checkbox: boolean;
}

