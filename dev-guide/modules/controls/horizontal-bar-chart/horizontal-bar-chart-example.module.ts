import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorizontalBarChartModule, LegendModule, TooltipModule } from '@msft-sme/angular';
import { HorizontalBarChartExampleComponent } from './horizontal-bar-chart-example.component';

const HorizontalBarChartExampleRoutes: Routes = [
    {
        path: '',
        component: HorizontalBarChartExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [HorizontalBarChartExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        HorizontalBarChartModule,
        LegendModule,
        RouterModule.forChild(HorizontalBarChartExampleRoutes)
    ],
    exports: [HorizontalBarChartExampleComponent]
})
export class HorizontalBarChartExampleModule { }
