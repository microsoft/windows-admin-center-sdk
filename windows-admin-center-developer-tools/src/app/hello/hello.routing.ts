// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdleComponent } from '@microsoft/windows-admin-center-sdk/angular';
import { CimExampleComponent } from './cim-example/cim-example.component';
import { ControlExampleComponent } from './control-example/control-example.component';
import { DllExampleComponent } from './dll-example/dll-example.component';
import { HelloComponent } from './hello.component';
import { NotificationsExampleComponent } from './notifications-example/notifications-example.component';
import { PowershellExampleComponent } from './powershell-example/powershell-example.component';

const routes: Routes = [
    {
        path: '', 
        component: HelloComponent,
        children: [
            {
                path: '', 
                redirectTo: 'controls',
                pathMatch: 'full'
            },
            {
                path: 'controls', 
                component: ControlExampleComponent
            },
            {
                path: 'notifications', 
                component: NotificationsExampleComponent
            },
            {
                // do lazy loading when: large single compnents, lots of little, or rarely used
                path: 'style', 
                loadChildren: 'app/hello/style-guide/style-guide.module#StyleGuideModule' // add module and setup lazy load
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HelloRouting {}