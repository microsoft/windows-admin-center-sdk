// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import * as ng2 from '@microsoft/windows-admin-center-sdk/angular';

import { BooleanConverterExampleComponent } from './boolean-converter/boolean-converter-example.component';
import { ByteUnitConverterExampleComponent } from './byte-unit-converter/byte-unit-converter-example.component';
import { EnumConverterExampleComponent } from './enum-converter/enum-converter-example.component';
import { FormatExampleComponent } from './format/format-example.component';
import { HighlightExampleComponent } from './highlight/highlight-example.component';
import { PipesComponent } from './pipes.component';
import { routing } from './pipes.routing';
import { YesNoConverterExampleComponent } from './yesno-converter/yesno-converter-example.component';

@NgModule({
    declarations: [
        PipesComponent,
        BooleanConverterExampleComponent,
        ByteUnitConverterExampleComponent,
        EnumConverterExampleComponent,
        HighlightExampleComponent,
        FormatExampleComponent,
        YesNoConverterExampleComponent
    ],
    imports: [
        routing,
        CommonModule,
        FormsModule,
        ng2.PipesModule,
        ng2.YesNoConverterPipeModule
    ],
    providers: []
})
export class PipesModule { }
