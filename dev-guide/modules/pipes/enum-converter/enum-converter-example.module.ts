import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EnumConverterPipeModule, PivotModule, SmeFormsModule, TooltipModule } from '@msft-sme/angular';
import { EnumConverterExampleComponent } from './enum-converter-example.component';

const routes: Routes = [
    {
        path: '',
        component: EnumConverterExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [EnumConverterExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        EnumConverterPipeModule,
        PivotModule,
        FormsModule,
        SmeFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [EnumConverterExampleComponent]
})
export class EnumConverterExampleModule { }
