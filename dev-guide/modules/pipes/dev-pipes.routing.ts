import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooleanConverterExampleComponent } from './boolean-converter/boolean-converter-example.component';
import { ByteUnitConverterExampleComponent } from './byte-unit-converter/byte-unit-converter-example.component';
import { DevPipesComponent } from './dev-pipes.component';
import { EnumConverterExampleComponent } from './enum-converter/enum-converter-example.component';
import { FormatExampleComponent } from './format/format-example.component';
import { HighlightExampleComponent } from './highlight/highlight-example.component';
import { YesNoConverterExampleComponent } from './yesno-converter/yesno-converter-example.component';

export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {
            path: '',
            component: DevPipesComponent,
            children: [
                { path: '', redirectTo: 'boolean-converter', pathMatch: 'full' },
                { path: 'boolean-converter', component: BooleanConverterExampleComponent },
                { path: 'yesno-converter', component: YesNoConverterExampleComponent },
                { path: 'byte-unit-converter', component: ByteUnitConverterExampleComponent },
                { path: 'enum-converter', component: EnumConverterExampleComponent },
                { path: 'highlight', component: HighlightExampleComponent },
                { path: 'format', component: FormatExampleComponent }
            ]
        }
    ]);
