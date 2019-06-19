import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { SpacingComponent } from './spacing.component';

const SpacingRoutes: Routes = [
    {
        path: '',
        component: SpacingComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [SpacingComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(SpacingRoutes)
    ],
    exports: [SpacingComponent]
})
export class SpacingStylesModule { }
