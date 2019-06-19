import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { LayoutComponent } from './layout.component';

const LayoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(LayoutRoutes)
    ],
    exports: [LayoutComponent]
})
export class LayoutStylesModule { }
