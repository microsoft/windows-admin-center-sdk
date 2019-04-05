import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SmeFormsModule } from '@msft-sme/angular';
import { PivotModule } from '@msft-sme/angular';
import { TooltipModule } from '@msft-sme/angular';
import {
    BooleanConverterPipeModule,
    ByteUnitConverterPipeModule,
    EnumConverterPipeModule,
    FormatPipeModule,
    HighlightPipeModule,
    YesNoConverterPipeModule
} from '@msft-sme/angular';
import { BooleanConverterExampleComponent } from './boolean-converter/boolean-converter-example.component';
import { ByteUnitConverterExampleComponent } from './byte-unit-converter/byte-unit-converter-example.component';
import { DevPipesComponent } from './dev-pipes.component';
import { routing } from './dev-pipes.routing';
import { EnumConverterExampleComponent } from './enum-converter/enum-converter-example.component';
import { FormatExampleComponent } from './format/format-example.component';
import { HighlightExampleComponent } from './highlight/highlight-example.component';
import { YesNoConverterExampleComponent } from './yesno-converter/yesno-converter-example.component';

@NgModule({
    declarations: [
        DevPipesComponent,
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
        BooleanConverterPipeModule,
        ByteUnitConverterPipeModule,
        EnumConverterPipeModule,
        HighlightPipeModule,
        FormatPipeModule,
        YesNoConverterPipeModule,
        SmeFormsModule,
        PivotModule,
        TooltipModule
    ],
    providers: []
})
export class DevPipesModule { }
