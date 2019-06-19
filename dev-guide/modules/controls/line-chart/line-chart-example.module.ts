import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineChartModule, TooltipModule } from '@msft-sme/angular';
import { LineChartExampleComponent } from './line-chart-example.component';

const LineChartExampleRoutes: Routes = [
    {
        path: '',
        component: LineChartExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [LineChartExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        LineChartModule,
        RouterModule.forChild(LineChartExampleRoutes)
    ],
    exports: [LineChartExampleComponent]
})
export class LineChartExampleModule { }
