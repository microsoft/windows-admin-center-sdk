import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionExampleComponent } from './solution-example.component';

const routes: Routes = [
    {
        path: '',
        component: SolutionExampleComponent
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