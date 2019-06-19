import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingWheelModule, TooltipModule } from '@msft-sme/angular';
import { LoadingWheelExampleComponent } from './loading-wheel-example.component';

const LoadingWheelExampleRoutes: Routes = [
    {
        path: '',
        component: LoadingWheelExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [LoadingWheelExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        LoadingWheelModule,
        RouterModule.forChild(LoadingWheelExampleRoutes)
    ],
    exports: [LoadingWheelExampleComponent]
})
export class LoadingWheelExampleModule { }
