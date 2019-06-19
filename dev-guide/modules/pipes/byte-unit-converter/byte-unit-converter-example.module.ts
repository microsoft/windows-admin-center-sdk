import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ByteUnitConverterPipeModule, TooltipModule } from '@msft-sme/angular';
import { ByteUnitConverterExampleComponent } from './byte-unit-converter-example.component';

const routes: Routes = [
    {
        path: '',
        component: ByteUnitConverterExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ByteUnitConverterExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        ByteUnitConverterPipeModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [ByteUnitConverterExampleComponent]
})
export class ByteUnitConverterExampleModule { }
