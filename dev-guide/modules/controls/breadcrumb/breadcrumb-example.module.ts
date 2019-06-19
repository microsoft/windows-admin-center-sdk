import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbModule, TooltipModule } from '@msft-sme/angular';
import { BreadcrumbExampleComponent } from './breadcrumb-example.component';

const BreadcrumbExampleRoutes: Routes = [
    {
        path: '',
        component: BreadcrumbExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [BreadcrumbExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        BreadcrumbModule,
        RouterModule.forChild(BreadcrumbExampleRoutes)
    ],
    exports: [BreadcrumbExampleComponent]
})
export class BreadcrumbExampleModule { }
