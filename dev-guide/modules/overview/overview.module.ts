import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { OverviewComponent } from './overview.component';

const overviewRoutes: Routes = [
    {
        path: '',
        component: OverviewComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [OverviewComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(overviewRoutes)
    ],
    exports: [OverviewComponent]
})
export class OverviewModule { }
