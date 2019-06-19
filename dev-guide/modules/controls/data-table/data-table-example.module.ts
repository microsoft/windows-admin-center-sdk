import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
    DataTableModule,
    HorizontalBarChartModule,
    PivotModule,
    QueryEditorModule,
    SmeFormsModule,
    TooltipModule
} from '@msft-sme/angular';
import { DataTableExampleComponent } from './data-table-example.component';

const DataTableExampleRoutes: Routes = [
    {
        path: '',
        component: DataTableExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [DataTableExampleComponent],
    imports: [
        QueryEditorModule,
        CommonModule,
        TooltipModule,
        DataTableModule,
        PivotModule,
        HorizontalBarChartModule,
        FormsModule,
        SmeFormsModule,
        RouterModule.forChild(DataTableExampleRoutes)
    ],
    exports: [DataTableExampleComponent]
})
export class DataTableExampleModule { }
