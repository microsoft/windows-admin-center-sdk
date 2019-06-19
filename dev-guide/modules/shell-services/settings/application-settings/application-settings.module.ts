import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoadingWheelModule, MarkdownModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { ApplicationSettingsComponent } from './application-settings.component';

const ApplicationSettingsRoutes: Routes = [
    {path: '', component: ApplicationSettingsComponent},
];

@NgModule({
    declarations: [
        ApplicationSettingsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MarkdownModule,
        PivotModule,
        LoadingWheelModule,
        SmeFormsModule,
        RouterModule.forChild(ApplicationSettingsRoutes)
    ],
    exports: [ApplicationSettingsComponent]
})
export class ApplicationSettingsModule { }
