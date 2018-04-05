import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleGuideComponent } from './style-guide.component';

export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {
            path: '', 
            component: StyleGuideComponent
            // children: [
            //     {
            //         path: '', 
            //         redirectTo: 'dll',
            //         pathMatch: 'full'
            //     },
            //     {
            //         path: 'dll', 
            //         component: DllExampleComponent
            //     }
            // ]
        }
    ]
);