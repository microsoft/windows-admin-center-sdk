import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, LoadingWheelModule, PivotModule, SettingsModule, SmeFormsModule, TooltipModule } from '@msft-sme/angular';
import { CommonSettingsIsolatedExamplePanel1Component } from './common-settings-isolated/common-settings-isolated-example-panel1.component';
import { CommonSettingsIsolatedExamplePanel2Component } from './common-settings-isolated/common-settings-isolated-example-panel2.component';
import { CommonSettingsIsolatedExamplePanel3Component } from './common-settings-isolated/common-settings-isolated-example-panel3.component';
import { CommonSettingsIsolatedExamplePanel4Component } from './common-settings-isolated/common-settings-isolated-example-panel4.component';
import { CommonSettingsIsolatedExampleComponent } from './common-settings-isolated/common-settings-isolated-example.component';
import { SettingsExampleComponent } from './settings-example.component';
import { SingleFormExamplePageComponent } from './single-form/single-form-example-page.component';
import { SingleFormExampleComponent } from './single-form/single-form-example.component';

const SettingsExampleRoutes: Routes = [
    {
        path: '',
        component: SettingsExampleComponent,
        children: [
            {
                path: 'commonSettingsIsolatedPagesForm',
                component: CommonSettingsIsolatedExampleComponent,
                canDeactivate: [CanDeactivateGuard],
                children: [{
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'settings1'
                },
                {
                    path: 'settings1',
                    component: CommonSettingsIsolatedExamplePanel1Component
                },
                {
                    path: 'settings2',
                    component: CommonSettingsIsolatedExamplePanel2Component
                },
                {
                    path: 'settings3',
                    component: CommonSettingsIsolatedExamplePanel3Component
                },
                {
                    path: 'settings4',
                    component: CommonSettingsIsolatedExamplePanel4Component
                }]
            },
            {
                path: 'commonSettingsCombinedPagesForm',
                component: SingleFormExampleComponent,
                canDeactivate: [CanDeactivateGuard],
                children: [{
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'settings1'
                },
                {
                    path: 'settings1',
                    component: SingleFormExamplePageComponent
                },
                {
                    path: 'settings2',
                    component: SingleFormExamplePageComponent
                },
                {
                    path: 'settings3',
                    component: SingleFormExamplePageComponent
                }]
            },
            {
                path: '**',
                redirectTo: 'commonSettingsCombinedPagesForm'
            }]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
@NgModule({
    declarations: [
        SettingsExampleComponent,
        CommonSettingsIsolatedExampleComponent,
        CommonSettingsIsolatedExamplePanel1Component,
        CommonSettingsIsolatedExamplePanel2Component,
        CommonSettingsIsolatedExamplePanel3Component,
        CommonSettingsIsolatedExamplePanel4Component,
        SingleFormExampleComponent,
        SingleFormExamplePageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule,
        PivotModule,
        SettingsModule,
        SmeFormsModule,
        LoadingWheelModule,
        RouterModule.forChild(SettingsExampleRoutes)
    ]
})
export class SettingsExampleModule { }
