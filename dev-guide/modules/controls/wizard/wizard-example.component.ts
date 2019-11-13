import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppContextService, NavigationTitle, WizardBuilder, WizardStepValidation } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core/diagnostics/logging';
import { Subscription } from 'rxjs';

import { FinishComponent } from './components/finish/finish.component';
import { SimpleCheckboxComponent } from './components/simple-checkbox/simple-checkbox.component';
import {
    SimpleDropdownWithValidationComponent,
} from './components/simple-dropdown-with-validation/simple-dropdown-with-validation.component';
import { SimpleDropdownComponent } from './components/simple-dropdown/simple-dropdown.component';
import { SimpleSkipLogicComponent } from './components/simple-skip-logic/simple-skip-logic.component';
import { SimpleStaticTextComponent } from './components/simple-static-text/simple-static-text.component';
import { SimpleTextInputComponent } from './components/simple-text-input/simple-text-input.component';
import { SimpleTextUsingModelComponent } from './components/simple-text-using-model/simple-text-using-model.component';
import { Data } from './models/data';
import { DropdownOne } from './models/dropdown-one';
import { DropdownTwo } from './models/dropdown-two';

@Component({
    selector: 'sme-dev-guide-controls-wizard',
    templateUrl: './wizard-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Wizard Component'
})
export class WizardExampleComponent implements OnDestroy, OnInit {

    public model: Data;

    public wizardBuilder: WizardBuilder;

    private subscriptions: Subscription[];

    constructor(public appContextService: AppContextService) {
    }

    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            });
        }
    }

    public ngOnInit(): void {

        this.subscriptions = [];
        this.wizardBuilder = new WizardBuilder();
        this.wizardBuilder.heading = 'Wizard Example';
        this.wizardBuilder.isInPreviewState = true;

        this.wizardBuilder.addStepInStage('Simple Text Input', SimpleTextInputComponent, 'Stage 1');
        this.wizardBuilder.addStepInStage('Simple Static Text', SimpleStaticTextComponent, 'Stage 1');
        this.wizardBuilder.addStepInStage('Simple Checkbox Input', SimpleCheckboxComponent, 'Stage 2');
        this.wizardBuilder.addStepInStage('Simple Skip Logic', SimpleSkipLogicComponent, 'Stage 2');
        this.wizardBuilder.addStepInStage('Simple Dropdown with Validation', SimpleDropdownWithValidationComponent, 'Stage 2');
        this.wizardBuilder.addStepInStage('Simple Dropdown', SimpleDropdownComponent, 'Stage 2');
        this.wizardBuilder.addStepInStage('Simple Summary using Model', SimpleTextUsingModelComponent, 'Stage 3');

        this.wizardBuilder.addFinishView(FinishComponent);

        this.initializeModel();
    }

    /**
     * Should be used to control what happens when the user submits any step
     */
    public onStepSubmitted(): void { Logging.logInformational(`Wizard Example`, `Step Submitted`); }

    /**
     * Should be used to control what happens when the user try's to submit a step and it is invalid
     */
    public onStepInvalidated(result: WizardStepValidation): void {
        Logging.logInformational(`Wizard Example`, `Step Invalidated: ${result.isValid}`);
    }

    /**
     * Should be used to control what happen when the user exits the wizard
     * For example, a redirect.
     */
    public onExit(): void { Logging.logInformational(`Wizard Example`, `Wizard Exited`); }

    /**
     * Should be used to control what happen when the user finishes the wizard
     */
    public onFinish(): void { Logging.logInformational(`Wizard Example`, `Wizard Finished`); }

    private initializeModel(): void {
        this.model = {
            name: '',
            dropdownOneOption: DropdownOne.Option1,
            dropdownTwoOption: DropdownTwo.OptionA,
            checkbox: false
        };
    }
}
