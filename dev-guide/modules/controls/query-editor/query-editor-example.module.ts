import { CommonModule } from '@angular/common';
import { NgModule, Query } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
    ActionsModule,
    DataTableModule,
    DetailsModule,
    DialogModule,
    HorizontalBarChartModule,
    MasterViewModule,
    PivotModule,
    QueryEditorModule,
    SmeFormsModule,
    SplitViewModule,
    TooltipModule
} from '@msft-sme/angular';
import { LoremIpsumModule } from '../../lorem-ipsum/lorem-ipsum.module';
import { QueryEditorExampleComponent } from './query-editor-example.component';

const QueryEditorExampleRoutes: Routes = [
    {
        path: '',
        component: QueryEditorExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [QueryEditorExampleComponent],
    imports: [
        DialogModule,
        QueryEditorModule,
        CommonModule,
        TooltipModule,
        DataTableModule,
        PivotModule,
        HorizontalBarChartModule,
        FormsModule,
        SmeFormsModule,
        ActionsModule,
        SplitViewModule,
        DetailsModule,
        MasterViewModule,
        LoremIpsumModule,
        RouterModule.forChild(QueryEditorExampleRoutes)
    ],
    exports: [QueryEditorExampleComponent]
})
export class QueryEditorExampleModule { }
