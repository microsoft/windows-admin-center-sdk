import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { ToggleSwitchStylesComponent } from './toggle-switch-styles.component';

const ToggleSwitchStylesRoutes: Routes = [
    {
        path: '',
        component: ToggleSwitchStylesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ToggleSwitchStylesComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(ToggleSwitchStylesRoutes)
    ],
    exports: [ToggleSwitchStylesComponent]
})
export class ToggleSwitchStylesModule { }
