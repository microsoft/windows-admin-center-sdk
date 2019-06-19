import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { SettingsServiceComponent } from './settings-service.component';

const SettingsRoutes: Routes = [
    {
        path: '',
        component: SettingsServiceComponent,
        children: [
            {path: 'userProfile', loadChildren: './user-profile/user-profile.module#UserProfileModule'},
            {path: 'applicationSettings', loadChildren: './application-settings/application-settings.module#ApplicationSettingsModule'},
            {path: 'adminSettings', loadChildren: './admin-settings/admin-settings.module#AdminSettingsModule'},
            {path: '**', redirectTo: 'userProfile'}
        ]
    }
];
@NgModule({
    declarations: [
        SettingsServiceComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MarkdownModule,
        PivotModule,
        SmeFormsModule,
        RouterModule.forChild(SettingsRoutes)
    ],
    exports: [SettingsServiceComponent]
})
export class SettingsServiceModule { }
