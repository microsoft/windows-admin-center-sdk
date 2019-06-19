import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormatPipeModule, TooltipModule } from '@msft-sme/angular';
import { FormatExampleComponent } from './format-example.component';

const routes: Routes = [
    {
        path: '',
        component: FormatExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [FormatExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        FormatPipeModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [FormatExampleComponent]
})
export class FormatExampleModule { }
