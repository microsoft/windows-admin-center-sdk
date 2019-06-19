import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
    DataTableModule, DetailsModule, MasterViewModule, PivotModule,
    ResizerModule, SmeFormsModule, SplitViewModule, TooltipModule
} from '@msft-sme/angular';
import { ResizerExampleComponent } from './resizer-example.component';

const ResizerExampleRoutes: Routes = [
    {
        path: '',
        component: ResizerExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ResizerExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        ResizerModule,
        PivotModule,
        DetailsModule,
        SplitViewModule,
        MasterViewModule,
        SmeFormsModule,
        DataTableModule,
        RouterModule.forChild(ResizerExampleRoutes)
    ],
    exports: [ResizerExampleComponent]
})
export class ResizerExampleModule { }
