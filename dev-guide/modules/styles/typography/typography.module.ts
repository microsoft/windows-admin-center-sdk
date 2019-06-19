import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { TypographyComponent } from './typography.component';

const TypographyRoutes: Routes = [
    {
        path: '',
        component: TypographyComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [TypographyComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(TypographyRoutes)
    ],
    exports: [TypographyComponent]
})
export class TypographyStylesModule { }
