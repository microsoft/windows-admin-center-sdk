import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SmeFormsModule, TooltipModule, WizardModule } from '@msft-sme/angular';
import { CharacterCreatorJobFormComponent } from './components/character-creator-job-form/character-creator-job-form.component';
import { CharacterCreatorNameFormComponent } from './components/character-creator-name-form/character-creator-name-form.component';
import { CharacterCreatorSpellFormComponent } from './components/character-creator-spell-form/character-creator-spell-form.component';
import { CharacterCreatorSummaryComponent } from './components/character-creator-summary/character-creator-summary.component';
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
        CharacterCreatorJobFormComponent,
        CharacterCreatorNameFormComponent,
        CharacterCreatorSpellFormComponent,
        CharacterCreatorSummaryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        TooltipModule,
        WizardModule,
        RouterModule.forChild(WizardExampleRoutes)
    ],
    entryComponents: [
        CharacterCreatorNameFormComponent,
        CharacterCreatorJobFormComponent,
        CharacterCreatorSpellFormComponent,
        CharacterCreatorSummaryComponent
    ]
})
export class WizardExampleModule { }
