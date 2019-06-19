import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoughnutChartModule, TooltipModule } from '@msft-sme/angular';
import { DoughnutChartExampleComponent } from './doughnut-chart-example.component';

const DoughnutChartExampleRoutes: Routes = [
    {
        path: '',
        component: DoughnutChartExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [DoughnutChartExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        DoughnutChartModule,
        RouterModule.forChild(DoughnutChartExampleRoutes)
    ],
    exports: [DoughnutChartExampleComponent]
})
export class DoughnutChartExampleModule { }
