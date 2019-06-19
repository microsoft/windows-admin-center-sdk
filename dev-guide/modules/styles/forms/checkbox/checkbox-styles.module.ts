import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { CheckboxStylesComponent } from './checkbox-styles.component';

const CheckboxStylesRoutes: Routes = [
    {
        path: '',
        component: CheckboxStylesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [CheckboxStylesComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(CheckboxStylesRoutes)
    ],
    exports: [CheckboxStylesComponent]
})
export class CheckboxStylesModule { }
