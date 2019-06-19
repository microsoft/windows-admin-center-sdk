import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipModule } from '@msft-sme/angular';
import { AccessibilitySpeechOutputComponent } from './accessibility-speech-output.component';

const AccessibilityRoutes: Routes = [
    {
        path: '',
        component: AccessibilitySpeechOutputComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [AccessibilitySpeechOutputComponent],
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild(AccessibilityRoutes)
    ],
    exports: [AccessibilitySpeechOutputComponent]
})
export class AccessibilitySpeechOutputModule { }
