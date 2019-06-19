import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { TooltipExampleComponent } from './tooltip-example.component';

const TooltipExampleRoutes: Routes = [
    {
        path: '',
        component: TooltipExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [TooltipExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(TooltipExampleRoutes)
    ],
    exports: [TooltipExampleComponent]
})
export class TooltipExampleModule { }
