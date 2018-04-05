import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdleComponent } from '@msft-sme/shell/angular';

// These are the basic routes that are required in order to load an extension and make service calls.
const appRoutes: Routes = [
    // The idle component route is used for 'long running' processes that take any amount of time (async).
    // This is a required path and component.
    {
        path: 'idle',
        component: IdleComponent
    },
    {
        path: 'solution', 
        loadChildren: 'app/solution-example/solution-example.module#SolutionExampleModule'
    },
    {
        path: 'add',
        loadChildren: 'app/add-example/add-example.module#AddExampleModule'
    },
    // this child route is used to route back to the home path when an invalid URL is provided to the browser.
    {
        path: '**',
        redirectTo: 'solution'  // double check navigation
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