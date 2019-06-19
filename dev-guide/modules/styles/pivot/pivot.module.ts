import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { PivotComponent } from './pivot.component';

const PivotRoutes: Routes = [
    {
        path: '',
        component: PivotComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [PivotComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(PivotRoutes)
    ],
    exports: [PivotComponent]
})
export class PivotStylesModule { }
