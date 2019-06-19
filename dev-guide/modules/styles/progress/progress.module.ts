import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { ProgressComponent } from './progress.component';

const ProgressRoutes: Routes = [
    {
        path: '',
        component: ProgressComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ProgressComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(ProgressRoutes)
    ],
    exports: [ProgressComponent]
})
export class ProgressStylesModule { }
