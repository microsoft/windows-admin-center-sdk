import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, SchemaFormModule, SmeFormsModule, TooltipModule } from '@msft-sme/angular';
import { TabbedSchemaFormExampleComponent } from './tabbed-schema-form-example.component';

const AccessibilityRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TabbedSchemaFormExampleComponent,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'form/:name',
        component: TabbedSchemaFormExampleComponent,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [TabbedSchemaFormExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        SchemaFormModule,
        RouterModule.forChild(AccessibilityRoutes)
    ],
    providers: [
        CanDeactivateGuard
    ],
})
export class TabbedSchemaFormExampleModule { }
