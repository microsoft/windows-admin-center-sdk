import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@msft-sme/angular';
import { LoremIpsumComponent } from '../../lorem-ipsum/lorem-ipsum.component';
import { ActionsExampleComponent } from './actions/actions-example.component';
import { BadgeExampleComponent } from './badge/badge-example.component';
import { BannerExampleComponent } from './banner/banner-example.component';
import { ClampExampleComponent } from './clamp/clamp-example.component';
import { ControlsComponent } from './controls.component';
import { DataTableExampleComponent } from './data-table/data-table-example.component';
import { DialogExampleComponent } from './dialog/dialog-example.component';
import { DropdownExampleComponent } from './dropdown/dropdown-example.component';
import { LayeredIconsExampleComponent } from './icons/layered-icons-example.component';
import { LayoutExampleComponent } from './layout/layout-example.component';
import { LoadingWheelExampleComponent } from './loading-wheel/loading-wheel-example.component';
import { MasterViewExampleComponent } from './master-view/master-view-example.component';
import { PageAlertbarExampleComponent } from './page-alert-bar/page-alert-bar-example.component';
import { PivotExampleComponent } from './pivot/pivot-example.component';
import { ResizerExampleComponent } from './resizer/resizer-example.component';
import { SchemaFormTabbedStyleExampleComponent } from './schema-form-tabbed-style/schema-form-tabbed-style-example.component';
import { SchemaFormExampleComponent } from './schema-form/schema-form-example.component';
import { SettingsExampleComponent } from './settings/settings-example.component';
import { TooltipExampleComponent } from './tooltip/tooltip-example.component';
import { TreeTableExampleComponent } from './tree-table/tree-table-example.component';

// tslint:disable:max-line-length
import { CommonSettingsIsolatedExamplePanel1Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel1.component';
import { CommonSettingsIsolatedExamplePanel2Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel2.component';
import { CommonSettingsIsolatedExamplePanel3Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel3.component';
import { CommonSettingsIsolatedExamplePanel4Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel4.component';
import { CommonSettingsIsolatedExampleComponent } from './settings/common-settings-isolated/common-settings-isolated-example.component';

import { SingleFormExamplePageComponent } from './settings/single-form/single-form-example-page.component';
import { SingleFormExampleComponent } from './settings/single-form/single-form-example.component';

// tslint:enable

import { BreadcrumbExampleComponent } from './breadcrumb/breadcrumb-example.component';
import { DetailsExampleComponent } from './details/details-example.component';
import { DoughnutChartExampleComponent } from './doughnut-chart/doughnut-chart-example.component';
import { GuidedPanelExampleComponent } from './guided-panel/guided-panel-example.component';
import { HorizontalBarChartExampleComponent } from './horizontal-bar-chart/horizontal-bar-chart-example.component';
import { LineChartExampleComponent } from './line-chart/line-chart-example.component';
import { MarkdownExampleComponent } from './markdown/markdown-example.component';
import { PropertyGridExampleComponent } from './property-grid/property-grid-example.component';
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
                { path: 'badge', component: BadgeExampleComponent },
                { path: 'banner', component: BannerExampleComponent },
                { path: 'breadcrumb', component: BreadcrumbExampleComponent },
                { path: 'clamp', component: ClampExampleComponent },
                { path: 'details', component: DetailsExampleComponent },
                { path: 'dialog', component: DialogExampleComponent },
                { path: 'dropdown', component: DropdownExampleComponent },
                { path: 'forms', loadChildren: './form/form-controls.module#FormControlsModule' },
                { path: 'doughnut-chart', component: DoughnutChartExampleComponent },
                { path: 'guided-panel', component: GuidedPanelExampleComponent },
                { path: 'markdown', component: MarkdownExampleComponent },
                { path: 'icons', component: LayeredIconsExampleComponent },
                { path: 'line-chart', component: LineChartExampleComponent },
                { path: 'data-table', component: DataTableExampleComponent },
                { path: 'layout', component: LayoutExampleComponent },
                { path: 'resizer', component: ResizerExampleComponent },
                {
                    path: 'schema-form',
                    component: SchemaFormExampleComponent
                },
                {
                    path: 'schema-form-tabbed-style',
                    component: SchemaFormTabbedStyleExampleComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'schema-form-tabbed-style/form/:name',
                    component: SchemaFormTabbedStyleExampleComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                { path: 'loading-wheel', component: LoadingWheelExampleComponent },
                { path: 'horizontal-bar-chart', component: HorizontalBarChartExampleComponent },
                { path: 'master-view', component: MasterViewExampleComponent },
                { path: 'page-alert-bar', component: PageAlertbarExampleComponent },
                {
                    path: 'pivot',
                    component: PivotExampleComponent,
                    children: [
                        {
                            path: 'lorem-ipsum1',
                            component: LoremIpsumComponent
                        },
                        {
                            path: 'lorem-ipsum2',
                            component: LoremIpsumComponent
                        },
                        {
                            path: '**',
                            redirectTo: 'lorem-ipsum1'
                        }
                    ]
                },
                {
                    path: 'property-grid',
                    component: PropertyGridExampleComponent
                },
                {
                    path: 'settings',
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
                { path: 'wizard', component: WizardExampleComponent },
                { path: 'split-view', component: SplitViewExampleComponent },
                { path: 'tooltip', component: TooltipExampleComponent },
                { path: 'tree-table', component: TreeTableExampleComponent }
            ]
        }
    ]);
