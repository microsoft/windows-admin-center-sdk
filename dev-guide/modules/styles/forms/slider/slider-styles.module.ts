import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { SliderStylesComponent } from './slider-styles.component';

const SliderStylesRoutes: Routes = [
    {
        path: '',
        component: SliderStylesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [SliderStylesComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(SliderStylesRoutes)
    ],
    exports: [SliderStylesComponent]
})
export class SliderStylesModule { }
