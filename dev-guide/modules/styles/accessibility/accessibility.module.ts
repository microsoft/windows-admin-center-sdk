import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { AccessibilityComponent } from './accessibility.component';

const AccessibilityRoutes: Routes = [
    {
        path: '',
        component: AccessibilityComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [AccessibilityComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(AccessibilityRoutes)
    ],
    exports: [AccessibilityComponent]
})
export class AccessibilityStylesModule { }
