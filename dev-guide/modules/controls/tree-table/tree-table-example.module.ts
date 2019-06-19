import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule, PivotModule, TooltipModule } from '@msft-sme/angular';
import { TreeTableExampleComponent } from './tree-table-example.component';

const TreeTableExampleRoutes: Routes = [
    {
        path: '',
        component: TreeTableExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [TreeTableExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        PivotModule,
        DataTableModule,
        RouterModule.forChild(TreeTableExampleRoutes)
    ],
    exports: [TreeTableExampleComponent]
})
export class TreeTableExampleModule { }
