import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooleanConverterPipeModule, TooltipModule, YesNoConverterPipeModule } from '@msft-sme/angular';
import { YesNoConverterExampleComponent } from './yesno-converter-example.component';

const routes: Routes = [
    {
        path: '',
        component: YesNoConverterExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [YesNoConverterExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        YesNoConverterPipeModule,
        RouterModule.forChild(routes)
    ],
    exports: [YesNoConverterExampleComponent]
})
export class YesNoConverterExampleModule { }
