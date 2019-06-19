import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { AccessibilityVisualDesignComponent } from './accessibility-visual-design.component';

const AccessibilityRoutes: Routes = [
    {
        path: '',
        component: AccessibilityVisualDesignComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [AccessibilityVisualDesignComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(AccessibilityRoutes)
    ],
    exports: [AccessibilityVisualDesignComponent]
})

export class AccessibilityVisualDesignModule { }
