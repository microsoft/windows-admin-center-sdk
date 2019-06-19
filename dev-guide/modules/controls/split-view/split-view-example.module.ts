import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplitViewModule, TooltipModule } from '@msft-sme/angular';
import { SplitViewExampleComponent } from './split-view-example.component';

const SplitViewExampleRoutes: Routes = [
    {
        path: '',
        component: SplitViewExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [SplitViewExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        SplitViewModule,
        RouterModule.forChild(SplitViewExampleRoutes)
    ],
    exports: [SplitViewExampleComponent]
})
export class SplitViewExampleModule { }
