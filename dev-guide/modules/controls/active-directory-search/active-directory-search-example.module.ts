import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ActiveDirectoryModule, SmeFormsModule, TooltipModule } from '@msft-sme/angular';
import { ActiveDirectorySearchExampleComponent } from './active-directory-search-example.component';

const ActiveDirectorySearchExampleRoutes: Routes = [
    {
        path: '',
        component: ActiveDirectorySearchExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ActiveDirectorySearchExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        FormsModule,
        SmeFormsModule,
        ActiveDirectoryModule.forRoot(), // must be placed after FormsModule and SmeFormsModule
        RouterModule.forChild(ActiveDirectorySearchExampleRoutes)
    ],
    exports: [ActiveDirectorySearchExampleComponent]
})
export class ActiveDirectorySearchExampleModule { }
