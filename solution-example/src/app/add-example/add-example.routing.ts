import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExampleComponent } from './add-example.component';

const routes: Routes = [
    {
        path: '',
        component: AddExampleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Routing { }