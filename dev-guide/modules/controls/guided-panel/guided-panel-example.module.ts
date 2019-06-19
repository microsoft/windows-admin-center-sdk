import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuidedPanelModule, TooltipModule } from '@msft-sme/angular';
import { GuidedPanelExampleComponent } from './guided-panel-example.component';

const GuidedPanelExampleRoutes: Routes = [
    {
        path: '',
        component: GuidedPanelExampleComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [GuidedPanelExampleComponent],
    imports: [
        CommonModule,
        TooltipModule,
        GuidedPanelModule,
        RouterModule.forChild(GuidedPanelExampleRoutes)
    ],
    exports: [GuidedPanelExampleComponent]
})
export class GuidedPanelExampleModule { }
