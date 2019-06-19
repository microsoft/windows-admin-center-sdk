import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { AccessibilityKeyboardComponent } from './accessibility-keyboard.component';

const AccessibilityRoutes: Routes = [
    {
        path: '',
        component: AccessibilityKeyboardComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [AccessibilityKeyboardComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(AccessibilityRoutes)
    ],
    exports: [AccessibilityKeyboardComponent]
})
export class AccessibilityKeyboardModule { }
