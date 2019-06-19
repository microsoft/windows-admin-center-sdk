import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { BehaviorsComponent } from './behaviors.component';

const BehaviorsRoutes: Routes = [
    {
        path: '',
        component: BehaviorsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [BehaviorsComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(BehaviorsRoutes)
    ],
    exports: [BehaviorsComponent]
})
export class BehaviorStylesModule { }
