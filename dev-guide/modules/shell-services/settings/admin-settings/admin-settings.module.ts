import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoadingWheelModule, MarkdownModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { AdminSettingsComponent } from './admin-settings.component';

const AdminSettingsRoutes: Routes = [
    {path: '', component: AdminSettingsComponent},
];

@NgModule({
    declarations: [
        AdminSettingsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MarkdownModule,
        PivotModule,
        LoadingWheelModule,
        SmeFormsModule,
        RouterModule.forChild(AdminSettingsRoutes)
    ],
    exports: [AdminSettingsComponent]
})
export class AdminSettingsModule { }
