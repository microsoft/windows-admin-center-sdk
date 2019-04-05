import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmeFormsModule } from '@msft-sme/angular';
import { PivotModule } from '@msft-sme/angular';
import { BreadcrumbModule } from '@msft-sme/angular';
import { FormControlsComponent } from './form-controls.component';
import { routing } from './form-controls.routing';
import { FormFieldsExampleComponent } from './form-fields/form-fields-example.component';
import { SearchExampleComponent } from './search/search-example.component';
import { SodaFactoryReactiveExampleComponent } from './soda-factory-reactive/soda-factory-reactive-example.component';
import { SodaFactoryExampleComponent } from './soda-factory/soda-factory-example.component';
import { ValidationAlertExampleComponent } from './validation-alert/validation-alert-example.component';

@NgModule({
    declarations: [
        FormControlsComponent,
        FormFieldsExampleComponent,
        SodaFactoryExampleComponent,
        SodaFactoryReactiveExampleComponent,
        ValidationAlertExampleComponent,
        SearchExampleComponent
    ],
    imports: [
        routing,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        PivotModule,
        BreadcrumbModule
    ]
})
export class FormControlsModule { }
