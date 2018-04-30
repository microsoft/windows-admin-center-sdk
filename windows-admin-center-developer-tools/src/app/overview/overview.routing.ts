// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
    {
        path: '',
        component: OverviewComponent
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class Routing { }