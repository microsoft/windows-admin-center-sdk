import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { ButtonStylesComponent } from './button-styles.component';

const ButtonStylesRoutes: Routes = [
    {
        path: '',
        component: ButtonStylesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ButtonStylesComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(ButtonStylesRoutes)
    ],
    exports: [ButtonStylesComponent]
})
export class ButtonStylesModule { }
