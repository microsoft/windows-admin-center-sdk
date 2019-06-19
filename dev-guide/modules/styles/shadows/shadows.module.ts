import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { ShadowsComponent } from './shadows.component';

const ShadowsRoutes: Routes = [
    {
        path: '',
        component: ShadowsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ShadowsComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(ShadowsRoutes)
    ],
    exports: [ShadowsComponent]
})
export class ShadowStylesModule { }
