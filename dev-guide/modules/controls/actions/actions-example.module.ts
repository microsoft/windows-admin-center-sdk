import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsModule, TooltipModule } from '@msft-sme/angular';
import { ActionsExampleComponent } from './actions-example.component';

const ActionsExampleRoutes: Routes = [
    {
        path: '',
        component: ActionsExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [ActionsExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        ActionsModule,
        RouterModule.forChild(ActionsExampleRoutes)
    ],
    exports: [ActionsExampleComponent]
})
export class ActionsExampleModule { }
