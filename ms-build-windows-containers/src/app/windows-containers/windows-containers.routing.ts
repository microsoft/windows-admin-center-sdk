import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WindowsContainersComponent } from './windows-containers.component';

const routes: Routes = [
    {
        path: '',
        component: WindowsContainersComponent,
        // if the component has child components that need to be routed to, include them in the children array.
        children: [
            {
                path: '', 
                redirectTo: 'base',
                pathMatch: 'full'
            }
        ]
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