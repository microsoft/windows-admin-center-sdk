// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdleComponent } from '@microsoft/windows-admin-center-sdk/angular';

// These are the basic routes that are required in order to load an extension and make service calls.
const appRoutes: Routes = [
    // The idle component route is used for 'long running' processes that take any amount of time (async).
    // This is a required path and component.
    {
        path: 'idle',
        component: IdleComponent
    },
    {
        path: 'home', 
        loadChildren: 'app/hello/hello.module#HelloModule'
    },
    {
        path: 'overview', 
        loadChildren: 'app/overview/overview.module#OverviewModule'
    },
    {
        path: 'dev', 
        loadChildren: 'app/dev-guide/dev-guide.module#DevGuideModule'
    },
    // this child route is used to route back to the home path when an invalid URL is provided to the browser.
    {
        path: '**',
        redirectTo: 'home'  // double check navigation
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                // un-comment to enable debug log messages
                // enableTracing: true,

                // don't navigate at initially.
                initialNavigation: true
            })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}