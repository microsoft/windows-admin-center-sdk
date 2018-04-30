// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as ng2 from '@msft-sme/shell/angular';

import { routing } from './form-styles.routing';

import { FormStylesComponent } from './form-styles.component';

import { ButtonStylesComponent } from './button/button-styles.component';
import { CheckboxStylesComponent } from './checkbox/checkbox-styles.component';
import { RadioStylesComponent } from './radio/radio-styles.component';
import { SearchStylesComponent } from './search/search-styles.component';
import { SelectStylesComponent } from './select/select-styles.component';
import { SliderStylesComponent } from './slider/slider-styles.component';
import { TextStylesComponent } from './text/text-styles.component';
import { ToggleSwitchStylesComponent } from './toggle-switch/toggle-switch-styles.component';

@NgModule({
    declarations: [
        FormStylesComponent,
        ButtonStylesComponent,
        CheckboxStylesComponent,
        RadioStylesComponent,
        SearchStylesComponent,
        SelectStylesComponent,
        SliderStylesComponent,
        TextStylesComponent,
        ToggleSwitchStylesComponent
    ],
    imports: [
        routing,
        CommonModule
    ],
    providers: []
})
export class FormStylesModule { }
