import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { AnimationComponent } from './animation.component';

const AnimationRoutes: Routes = [
    {
        path: '',
        component: AnimationComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [AnimationComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(AnimationRoutes)
    ],
    exports: [AnimationComponent]
})
export class AnimationStylesModule { }
