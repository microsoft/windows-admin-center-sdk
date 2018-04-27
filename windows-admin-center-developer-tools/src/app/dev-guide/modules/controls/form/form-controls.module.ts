// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as ng2 from '@msft-sme/shell/angular';
import { routing } from './form-controls.routing';

import { FormControlsComponent } from './form-controls.component';

import { FormFieldsExampleComponent } from './form-fields/form-fields-example.component';
import { SodaFactoryExampleComponent } from './soda-factory/soda-factory-example.component';
import { ValidationAlertExampleComponent } from './validation-alert/validation-alert-example.component';

@NgModule({
    declarations: [
        FormControlsComponent,
        FormFieldsExampleComponent,
        SodaFactoryExampleComponent,
        ValidationAlertExampleComponent
    ],
    imports: [
        routing,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ng2.SmeFormsModule
    ]
})
export class FormControlsModule { }
