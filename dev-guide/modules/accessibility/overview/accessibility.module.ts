import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { AccessibilityOverviewComponent } from './accessibility-overview.component';

const AccessibilityRoutes: Routes = [
    {
        path: '',
        component: AccessibilityOverviewComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [AccessibilityOverviewComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(AccessibilityRoutes)
    ],
    exports: [AccessibilityOverviewComponent]
})
export class AccessibilityModule { }
