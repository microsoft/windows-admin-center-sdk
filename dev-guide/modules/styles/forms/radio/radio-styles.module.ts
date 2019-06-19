import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { RadioStylesComponent } from './radio-styles.component';

const RadioStylesRoutes: Routes = [
    {
        path: '',
        component: RadioStylesComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [RadioStylesComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(RadioStylesRoutes)
    ],
    exports: [RadioStylesComponent]
})
export class RadioStylesModule { }
