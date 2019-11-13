import { Component, Injector } from '@angular/core';
import { WizardStepComponent } from '@msft-sme/angular';
import { Strings } from '../../../../../../generated/strings';
import { Data } from '../../models/data';

@Component({
    selector: 'sme-app-simple-static-text',
    templateUrl: './simple-static-text.component.html',
})
export class SimpleStaticTextComponent extends WizardStepComponent<Data, Strings> {
    protected get logSourceName() {
        return 'SimpleStaticTextComponent';
    }
    constructor(injector: Injector) { super(injector); }
}
