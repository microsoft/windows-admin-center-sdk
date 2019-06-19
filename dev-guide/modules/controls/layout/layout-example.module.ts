import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule, TooltipModule } from '@msft-sme/angular';
import { LayoutExampleComponent } from './layout-example.component';

const LayoutExampleRoutes: Routes = [
    {
        path: '',
        component: LayoutExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [LayoutExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        LayoutModule,
        RouterModule.forChild(LayoutExampleRoutes)
    ],
    exports: [LayoutExampleComponent]
})
export class LayoutExampleModule { }
