import { RouterModule } from '@angular/router';
import * as ng2 from '../../../../angular';
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
import { SettingsExampleComponent } from './settings/settings-example.component';
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
export var routing = RouterModule.forChild([
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
            { path: 'doughnut-chart', component: DoughnutChartExampleComponent },
            { path: 'error', component: ErrorExampleComponent },
            { path: 'guided-panel', component: GuidedPanelExampleComponent },
            { path: 'icons', component: LayeredIconsExampleComponent },
            { path: 'line-chart', component: LineChartExampleComponent },
            { path: 'data-table', component: DataTableExampleComponent },
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
                    }
                ]
            },
            { path: 'ordered-list-picker', component: OrderedListPickerExampleComponent },
            { path: 'wizard', component: WizardExampleComponent },
            { path: 'split-view', component: SplitViewExampleComponent }
        ]
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9jb250cm9scy5yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEtBQUssR0FBRyxNQUFNLHFCQUFxQixDQUFDO0FBRTNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRWpGLGlDQUFpQztBQUNqQyxPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSx1RkFBdUYsQ0FBQztBQUNySixPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSx1RkFBdUYsQ0FBQztBQUNySixPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSx1RkFBdUYsQ0FBQztBQUNySixPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSx1RkFBdUYsQ0FBQztBQUNySixPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFB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QUFDO3FCQUNMO29CQUNEO3dCQUNJLElBQUksRUFBRSxtQkFBbUI7d0JBQ3pCLFNBQVMsRUFBRSxzQkFBc0I7d0JBQ2pDLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztxQkFDMUM7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLGdCQUFnQjt3QkFDdEIsU0FBUyxFQUFFLDhCQUE4Qjt3QkFDekMsUUFBUSxFQUFFLENBQUM7Z0NBQ1AsSUFBSSxFQUFFLEVBQUU7Z0NBQ1IsU0FBUyxFQUFFLE1BQU07Z0NBQ2pCLFVBQVUsRUFBRSxXQUFXOzZCQUMxQjs0QkFDRDtnQ0FDSSxJQUFJLEVBQUUsY0FBYztnQ0FDcEIsU0FBUyxFQUFFLG1DQUFtQzs2QkFDakQsQ0FBQztxQkFDTDtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsSUFBSTt3QkFDVixVQUFVLEVBQUUsYUFBYTtxQkFDNUI7aUJBQUM7YUFDVDtZQUNELEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxpQ0FBaUMsRUFBRTtZQUM3RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixFQUFFO1lBQ3JELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUseUJBQXlCLEVBQUU7U0FDL0Q7S0FDSjtDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJjb250cm9scy5yb3V0aW5nLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==