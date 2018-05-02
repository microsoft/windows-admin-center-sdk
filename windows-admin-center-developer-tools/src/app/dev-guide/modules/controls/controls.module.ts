// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'primeng/primeng';

import * as ng2 from '@microsoft/windows-admin-center-sdk/angular';

import { ActionsExampleComponent } from './actions/actions-example.component';
import { ControlsComponent } from './controls.component';
import { routing } from './controls.routing';
import { DataTableExampleComponent } from './data-table/data-table-example.component';
import { DialogChainComponent } from './dialog/dialog-example-dialog-chain.component';
import { ConfirmationDialogComponent } from './dialog/dialog-example-full-screen-dialog.component';
import { DialogExampleComponent } from './dialog/dialog-example.component';
import { DropdownExampleComponent } from './dropdown/dropdown-example.component';
import { ErrorExampleComponent } from './error/error-example.component';
import { LayeredIconsExampleComponent } from './icons/layered-icons-example.component';
import { LoadingWheelExampleComponent } from './loading-wheel/loading-wheel-example.component';
import { MasterViewExampleComponent } from './master-view/master-view-example.component';
import { ResizerExampleComponent } from './resizer/resizer-example.component';
import { TreeTableExampleComponent } from './tree-table/tree-table-example.component';

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

import { CustomSettingsExamplePanelComponent } from './settings/custom-settings/custom-settings-example-panel.component';
import { CustomSettingsExampleComponent } from './settings/custom-settings/custom-settings-example.component';

import { AlertBarExampleComponent } from './alert-bar/alert-bar-example.component';
import { BreadcrumbHeaderExampleComponent } from './breadcrumb-header/breadcrumb-header-example.component';
import { DoughnutChartExampleComponent } from './doughnut-chart/doughnut-chart-example.component';
import { GuidedPanelExampleComponent } from './guided-panel/guided-panel-example.component';
import { LineChartExampleComponent } from './line-chart/line-chart-example.component';

import { HorizontalBarChartExampleComponent } from './horizontal-bar-chart/horizontal-bar-chart-example.component';

import { OrderedListPickerExampleComponent } from './ordered-list-picker/ordered-list-picker-example.component';
import { PageAlertbarExampleComponent } from './page-alert-bar/page-alert-bar-example.component';

import { CharacterCreatorJobFormComponent } from './wizard/components/character-creator-job-form/character-creator-job-form.component';
import { CharacterCreatorNameFormComponent } from './wizard/components/character-creator-name-form/character-creator-name-form.component';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorSpellFormComponent } from './wizard/components/character-creator-spell-form/character-creator-spell-form.component';
import { CharacterCreatorSummaryComponent } from './wizard/components/character-creator-summary/character-creator-summary.component';
import { WizardExampleComponent } from './wizard/wizard-example.component';

import { DetailsExampleComponent } from './details/details-example.component';
import { SplitViewExampleComponent } from './split-view/split-view-example.component';

@NgModule({
    declarations: [
        ActionsExampleComponent,
        BreadcrumbHeaderExampleComponent,
        ControlsComponent,
        DialogExampleComponent,
        DoughnutChartExampleComponent,
        ConfirmationDialogComponent,
        DialogChainComponent,
        DropdownExampleComponent,
        ErrorExampleComponent,
        GuidedPanelExampleComponent,
        LayeredIconsExampleComponent,
        LineChartExampleComponent,
        LoadingWheelExampleComponent,
        HorizontalBarChartExampleComponent,
        MasterViewExampleComponent,
        PageAlertbarExampleComponent,
        SettingsExampleComponent,
        DataTableExampleComponent,
        ResizerExampleComponent,
        CommonSettingsIsolatedExamplePanel1Component,
        CommonSettingsIsolatedExamplePanel2Component,
        CommonSettingsIsolatedExamplePanel3Component,
        CommonSettingsIsolatedExamplePanel4Component,
        CommonSettingsIsolatedExampleComponent,
        CommonSettingsCombinedExamplePanel1Component,
        CommonSettingsCombinedExamplePanel2Component,
        CommonSettingsCombinedExamplePanel3Component,
        CommonSettingsCombinedExampleComponent,
        SingleSettingComponent,
        CustomSettingsExamplePanelComponent,
        CustomSettingsExampleComponent,
        AlertBarExampleComponent,
        OrderedListPickerExampleComponent,
        WizardExampleComponent,
        CharacterCreatorNameFormComponent,
        CharacterCreatorJobFormComponent,
        CharacterCreatorSpellFormComponent,
        CharacterCreatorSummaryComponent,
        SplitViewExampleComponent,
        DetailsExampleComponent,
        TreeTableExampleComponent
    ],
    imports: [
        routing,
        DataTableModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ng2.MasterViewModule,
        ng2.DialogModule,
        ng2.ActionsModule,
        ng2.ErrorModule,
        ng2.LoadingWheelModule,
        ng2.SettingsModule,
        ng2.AlertBarModule,
        ng2.IconModule,
        ng2.GuidedPanelModule,
        ng2.HorizontalBarChartModule,
        ng2.PipesModule,
        ng2.LineChartModule,
        ng2.DataTableModule,
        ng2.ResizerModule,        
        ng2.OrderedListPickerModule,
        ng2.DoughnutChartModule,
        ng2.BreadcrumbHeaderModule,
        ng2.PageAlertBarModule,
        ng2.WizardModule,
        ng2.SplitViewModule,
        ng2.DetailsModule,
        ng2.DropdownModule
    ],
    providers: [
        ng2.DialogService,
        ng2.CanDeactivateGuard,
        ng2.AlertBarService
    ],
    entryComponents: [
        CharacterCreatorNameFormComponent,
        CharacterCreatorJobFormComponent,
        CharacterCreatorSpellFormComponent,
        CharacterCreatorSummaryComponent
    ]
})
export class ControlsModule { }
