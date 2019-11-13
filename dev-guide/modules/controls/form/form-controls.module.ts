import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PivotModule } from '@msft-sme/angular';
import { BreadcrumbModule } from '@msft-sme/angular';
import { TooltipModule } from '@msft-sme/angular';
import { SmeFormsModule } from '@msft-sme/angular';
import { CodeEditorExampleComponent } from './code-editor/code-editor-example.component';
import { DateTimeEditorsExampleComponent } from './datetime/datetime-editors-example.component';
import { FormControlsComponent } from './form-controls.component';
import { FormFieldsExampleComponent } from './form-fields/form-fields-example.component';
import { SearchExampleComponent } from './search/search-example.component';
import { SodaFactoryReactiveExampleComponent } from './soda-factory-reactive/soda-factory-reactive-example.component';
import { SodaFactoryExampleComponent } from './soda-factory/soda-factory-example.component';
import { ValidationAlertExampleComponent } from './validation-alert/validation-alert-example.component';

const FormControlsRoutes: Routes = [
    {
        path: '',
        component: FormControlsComponent,
        children: [
            { path: 'templateDriven', component: SodaFactoryExampleComponent },
            { path: 'reactive', component: SodaFactoryReactiveExampleComponent },
            { path: 'fieldsApi', component: FormFieldsExampleComponent },
            { path: 'search', component: SearchExampleComponent },
            { path: 'datetime', component: DateTimeEditorsExampleComponent },
            { path: 'codeEditor', component: CodeEditorExampleComponent },
            { path: 'validation', component: ValidationAlertExampleComponent },
            { path: '**', redirectTo: 'templateDriven' }
        ]
    }
];
@NgModule({
    declarations: [
        FormControlsComponent,
        FormFieldsExampleComponent,
        SodaFactoryExampleComponent,
        SodaFactoryReactiveExampleComponent,
        ValidationAlertExampleComponent,
        SearchExampleComponent,
        CodeEditorExampleComponent,
        DateTimeEditorsExampleComponent
    ],
    imports: [
        CommonModule,
        TooltipModule,
        PivotModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        RouterModule.forChild(FormControlsRoutes)
    ]
})
export class FormControlsModule { }
