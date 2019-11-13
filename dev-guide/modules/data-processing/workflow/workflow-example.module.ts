import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ActionsModule, ClampModule, PropertyGridModule, SmeFormsModule } from '@msft-sme/angular';
import { WorkflowExampleComponent } from './workflow-example.component';

const WorkflowExampleRoutes: Routes = [
    {
        path: '',
        component: WorkflowExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [WorkflowExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SmeFormsModule,
        ActionsModule,
        PropertyGridModule,
        ClampModule,
        RouterModule.forChild(WorkflowExampleRoutes)
    ],
    exports: [WorkflowExampleComponent]
})
export class WorkflowExampleModule { }
