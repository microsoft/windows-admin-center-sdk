import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooleanConverterPipeModule, TooltipModule } from '@msft-sme/angular';
import { BooleanConverterExampleComponent } from './boolean-converter-example.component';

const routes: Routes = [
    {
        path: '',
        component: BooleanConverterExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [BooleanConverterExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        BooleanConverterPipeModule,
        RouterModule.forChild(routes)
    ],
    exports: [BooleanConverterExampleComponent]
})
export class BooleanConverterExampleModule { }
