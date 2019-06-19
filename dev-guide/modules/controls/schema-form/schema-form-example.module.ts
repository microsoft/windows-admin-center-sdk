import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PivotModule, SchemaFormModule, TooltipModule } from '@msft-sme/angular';
import { SchemaFormExampleComponent } from './schema-form-example.component';

const SchemaFormExampleRoutes: Routes = [
    {
        path: '',
        component: SchemaFormExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [SchemaFormExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SchemaFormModule,
        PivotModule,
        TooltipModule,
        RouterModule.forChild(SchemaFormExampleRoutes)
    ],
    exports: [SchemaFormExampleComponent]
})
export class SchemaFormExampleModule { }
