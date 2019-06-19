import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { ColorsComponent } from './colors.component';

const ColorsRoutes: Routes = [
    {
        path: '',
        component: ColorsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ColorsComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(ColorsRoutes)
    ],
    exports: [ColorsComponent]
})
export class ColorStylesModule { }
