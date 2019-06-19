import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
    ActionsModule, DataTableModule, DetailsModule, MasterViewModule,
    SmeFormsModule, SplitViewModule, TooltipModule
} from '@msft-sme/angular';
import { LoremIpsumModule } from '../../lorem-ipsum/lorem-ipsum.module';
import { MasterViewExampleComponent } from './master-view-example.component';

const MasterViewExampleRoutes: Routes = [
    {
        path: '',
        component: MasterViewExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [MasterViewExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        SmeFormsModule,
        TooltipModule,
        ActionsModule,
        SplitViewModule,
        DetailsModule,
        MasterViewModule,
        LoremIpsumModule,
        DataTableModule,
        RouterModule.forChild(MasterViewExampleRoutes)
    ],
    exports: [MasterViewExampleComponent]
})
export class MasterViewExampleModule { }
