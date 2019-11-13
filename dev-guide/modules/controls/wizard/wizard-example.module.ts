import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageAlertBarModule, SmeFormsModule, TooltipModule, WizardModule } from '@msft-sme/angular';

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
import { WizardExampleComponent } from './wizard-example.component';


const WizardExampleRoutes: Routes = [
    {
        path: '',
        component: WizardExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        WizardExampleComponent,
        SimpleTextInputComponent,
        SimpleDropdownComponent,
        SimpleDropdownWithValidationComponent,
        SimpleTextUsingModelComponent,
        SimpleStaticTextComponent,
        SimpleCheckboxComponent,
        SimpleSkipLogicComponent,
        FinishComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        TooltipModule,
        WizardModule,
        PageAlertBarModule,
        RouterModule.forChild(WizardExampleRoutes)
    ],
    entryComponents: [
        SimpleTextInputComponent,
        SimpleDropdownComponent,
        SimpleDropdownWithValidationComponent,
        SimpleTextUsingModelComponent,
        SimpleStaticTextComponent,
        SimpleCheckboxComponent,
        SimpleSkipLogicComponent,
        FinishComponent
    ]
})
export class WizardExampleModule { }
