import { Component, Injector } from '@angular/core';
import { WizardStepComponent } from '@msft-sme/angular';
import { Strings } from '../../../../../../generated/strings';
import { Data } from '../../models/data';

@Component({
    selector: 'sme-app-simple-skip-logic',
    templateUrl: './simple-skip-logic.component.html'
})
export class SimpleSkipLogicComponent extends WizardStepComponent<Data, Strings> {
    protected get logSourceName() {
        return 'SimpleSkipLogicComponent';
    }

    public get skipped(): boolean {
        return !!this.model.checkbox;
    }

    constructor(injector: Injector) { super(injector); }
}
