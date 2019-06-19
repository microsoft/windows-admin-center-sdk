import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClampModule, TooltipModule } from '@msft-sme/angular';
import { ClampExampleComponent } from './clamp-example.component';

const ClampExampleRoutes: Routes = [
    {
        path: '',
        component: ClampExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ClampExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        ClampModule,
        RouterModule.forChild(ClampExampleRoutes)
    ],
    exports: [ClampExampleComponent]
})
export class ClampExampleModule { }
