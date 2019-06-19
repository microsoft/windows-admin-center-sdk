import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PowershellExampleComponent } from './powershell-example.component';

const powershellExampleRoutes: Routes = [
    {
        path: '',
        component: PowershellExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [PowershellExampleComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(powershellExampleRoutes)
    ],
    exports: [PowershellExampleComponent]
})
export class PowershellExampleModule { }
