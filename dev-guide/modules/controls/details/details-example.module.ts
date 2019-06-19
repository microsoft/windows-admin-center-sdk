import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsModule, TooltipModule } from '@msft-sme/angular';
import { DetailsExampleComponent } from './details-example.component';

const DetailsExampleRoutes: Routes = [
    {
        path: '',
        component: DetailsExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [DetailsExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        DetailsModule,
        RouterModule.forChild(DetailsExampleRoutes)
    ],
    exports: [DetailsExampleComponent]
})
export class DetailsExampleModule { }
