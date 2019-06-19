import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PivotModule, TooltipModule } from '@msft-sme/angular';
import { FormsComponent } from './forms.component';

const AccessibilityRoutes: Routes = [
    {
        path: '',
        component: FormsComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadChildren: './button/button-styles.module#ButtonStylesModule'
            },
            {
                path: 'checkbox',
                loadChildren: './checkbox/checkbox-styles.module#CheckboxStylesModule'
            },
            {
                path: 'radio',
                loadChildren: './radio/radio-styles.module#RadioStylesModule'
            },
            {
                path: 'slider',
                loadChildren: './slider/slider-styles.module#SliderStylesModule'
            },
            {
                path: 'toggle-switch',
                loadChildren: './toggle-switch/toggle-switch-styles.module#ToggleSwitchStylesModule'
            },
            {
                path: '**',
                redirectTo: ''
            }

        ]
    }
];
@NgModule({
    declarations: [FormsComponent],
    imports: [
        CommonModule,
        TooltipModule,
        PivotModule,
        RouterModule.forChild(AccessibilityRoutes)
    ],
    exports: [FormsComponent]
})
export class FormStylesModule { }
