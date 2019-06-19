import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule, DropdownModule, TooltipModule } from '@msft-sme/angular';
import { DropdownExampleComponent } from './dropdown-example.component';

const DropdownExampleRoutes: Routes = [
    {
        path: '',
        component: DropdownExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [DropdownExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        DropdownModule,
        DataTableModule,
        RouterModule.forChild(DropdownExampleRoutes)
    ],
    exports: [DropdownExampleComponent]
})
export class DropdownExampleModule { }
