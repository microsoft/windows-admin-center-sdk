import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import * as ng2 from '@msft-sme/shell/angular';

import { ActionsExampleComponent } from './actions/actions-example.component';
import { ControlsComponent } from './controls.component';
import { DataTableExampleComponent } from './data-table/data-table-example.component';
import { DialogExampleComponent } from './dialog/dialog-example.component';
import { DropdownExampleComponent } from './dropdown/dropdown-example.component';
import { ErrorExampleComponent } from './error/error-example.component';
import { LayeredIconsExampleComponent } from './icons/layered-icons-example.component';
import { LoadingWheelExampleComponent } from './loading-wheel/loading-wheel-example.component';
import { MasterViewExampleComponent } from './master-view/master-view-example.component';
import { PageAlertbarExampleComponent } from './page-alert-bar/page-alert-bar-example.component';
import { ResizerExampleComponent } from './resizer/resizer-example.component';
import { SettingsExampleComponent } from './settings/settings-example.component';
import { TreeTableExampleComponent } from './tree-table/tree-table-example.component';

// tslint:disable:max-line-length
import { CommonSettingsIsolatedExamplePanel1Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel1.component';
import { CommonSettingsIsolatedExamplePanel2Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel2.component';
import { CommonSettingsIsolatedExamplePanel3Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel3.component';
import { CommonSettingsIsolatedExamplePanel4Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel4.component';
import { CommonSettingsIsolatedExampleComponent } from './settings/common-settings-isolated/common-settings-isolated-example.component';

import { CommonSettingsCombinedExamplePanel1Component } from './settings/common-settings-combined/common-settings-combined-example-panel1.component';
import { CommonSettingsCombinedExamplePanel2Component } from './settings/common-settings-combined/common-settings-combined-example-panel2.component';
import { CommonSettingsCombinedExamplePanel3Component } from './settings/common-settings-combined/common-settings-combined-example-panel3.component';
import { CommonSettingsCombinedExampleComponent } from './settings/common-settings-combined/common-settings-combined-example.component';

import { SingleSettingComponent } from './settings/single-setting/single-setting-example.component';
// tslint:enable

import { AlertBarExampleComponent } from './alert-bar/alert-bar-example.component';
import { BreadcrumbHeaderExampleComponent } from './breadcrumb-header/breadcrumb-header-example.component';
import { DetailsExampleComponent } from './details/details-example.component';
import { DoughnutChartExampleComponent } from './doughnut-chart/doughnut-chart-example.component';
import { GuidedPanelExampleComponent } from './guided-panel/guided-panel-example.component';
import { HorizontalBarChartExampleComponent } from './horizontal-bar-chart/horizontal-bar-chart-example.component';
import { LineChartExampleComponent } from './line-chart/line-chart-example.component';
import { OrderedListPickerExampleComponent } from './ordered-list-picker/ordered-list-picker-example.component';
import { CustomSettingsExamplePanelComponent } from './settings/custom-settings/custom-settings-example-panel.component';
import { CustomSettingsExampleComponent } from './settings/custom-settings/custom-settings-example.component';
import { SplitViewExampleComponent } from './split-view/split-view-example.component';
import { WizardExampleComponent } from './wizard/wizard-example.component';

export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {
            path: '',
            component: ControlsComponent,
            children: [
                { path: '', redirectTo: 'actions', pathMatch: 'full' },
                { path: 'actions', component: ActionsExampleComponent },
                { path: 'alert-bar', component: AlertBarExampleComponent },
                { path: 'breadcrumb-header', component: BreadcrumbHeaderExampleComponent },
                { path: 'details', component: DetailsExampleComponent },
                { path: 'dialog', component: DialogExampleComponent },
                { path: 'dropdown', component: DropdownExampleComponent },               
                { path: 'forms', loadChildren: 'app/dev-guide/modules/controls/form/form-controls.module#FormControlsModule' },
                { path: 'doughnut-chart', component: DoughnutChartExampleComponent },
                { path: 'error', component: ErrorExampleComponent },
                { path: 'guided-panel', component: GuidedPanelExampleComponent },
                { path: 'icons', component: LayeredIconsExampleComponent },
                { path: 'line-chart', component: LineChartExampleComponent },
                { path: 'data-table', component: DataTableExampleComponent },                
                { path: 'resizer', component: ResizerExampleComponent },                
                { path: 'loading-wheel', component: LoadingWheelExampleComponent },
                { path: 'horizontal-bar-chart', component: HorizontalBarChartExampleComponent },
                { path: 'master-view', component: MasterViewExampleComponent },
                { path: 'page-alert-bar', component: PageAlertbarExampleComponent },
                {
                    path: 'settings',
                    component: SettingsExampleComponent,
                    children: [
                        {
                            path: 'commonSettingsIsolatedPagesForm',
                            component: CommonSettingsIsolatedExampleComponent,
                            canDeactivate: [ng2.CanDeactivateGuard],
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
                            component: CommonSettingsCombinedExampleComponent,
                            canDeactivate: [ng2.CanDeactivateGuard],
                            children: [{
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'settings1'
                            },
                            {
                                path: 'settings1',
                                component: CommonSettingsCombinedExamplePanel1Component
                            },
                            {
                                path: 'settings2',
                                component: CommonSettingsCombinedExamplePanel2Component
                            },
                            {
                                path: 'settings3',
                                component: CommonSettingsCombinedExamplePanel3Component
                            }]
                        },
                        {
                            path: 'singleSettingForm',
                            component: SingleSettingComponent,
                            canDeactivate: [ng2.CanDeactivateGuard]
                        },
                        {
                            path: 'CustomSettings',
                            component: CustomSettingsExampleComponent,
                            children: [{
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'settings1'
                            },
                            {
                                path: ':settingName',
                                component: CustomSettingsExamplePanelComponent
                            }]
                        },
                        {
                            path: '**',
                            redirectTo: '../settings'
                        }]
                },
                { path: 'ordered-list-picker', component: OrderedListPickerExampleComponent },
                { path: 'wizard', component: WizardExampleComponent },
                { path: 'split-view', component: SplitViewExampleComponent },
                { path: 'tree-table', component: TreeTableExampleComponent }
            ]
        }
    ]);
