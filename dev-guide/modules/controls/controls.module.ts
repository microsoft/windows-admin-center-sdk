import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoremIpsumModule } from '../../lorem-ipsum/lorem-ipsum.module';

import { ActionsExampleComponent } from './actions/actions-example.component';
import { BadgeExampleComponent } from './badge/badge-example.component';
import { BannerExampleComponent } from './banner/banner-example.component';
import { ClampExampleComponent } from './clamp/clamp-example.component';
import { ControlsComponent } from './controls.component';
import { routing } from './controls.routing';
import { DataTableExampleComponent } from './data-table/data-table-example.component';
import { DialogChainComponent } from './dialog/dialog-example-dialog-chain.component';
import { ConfirmationDialogComponent } from './dialog/dialog-example-full-screen-dialog.component';
import { DialogExampleComponent } from './dialog/dialog-example.component';
import { DropdownExampleComponent } from './dropdown/dropdown-example.component';
import { LayeredIconsExampleComponent } from './icons/layered-icons-example.component';
import { LayoutExampleComponent } from './layout/layout-example.component';
import { LoadingWheelExampleComponent } from './loading-wheel/loading-wheel-example.component';
import { MasterViewExampleComponent } from './master-view/master-view-example.component';
import { PivotExampleComponent } from './pivot/pivot-example.component';
import { ResizerExampleComponent } from './resizer/resizer-example.component';
import { SchemaFormTabbedStyleExampleComponent } from './schema-form-tabbed-style/schema-form-tabbed-style-example.component';
import { SchemaFormExampleComponent } from './schema-form/schema-form-example.component';
import { TooltipExampleComponent } from './tooltip/tooltip-example.component';
import { TreeTableExampleComponent } from './tree-table/tree-table-example.component';

import { SettingsExampleComponent } from './settings/settings-example.component';

// tslint:disable:max-line-length
import { CommonSettingsIsolatedExamplePanel1Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel1.component';
import { CommonSettingsIsolatedExamplePanel2Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel2.component';
import { CommonSettingsIsolatedExamplePanel3Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel3.component';
import { CommonSettingsIsolatedExamplePanel4Component } from './settings/common-settings-isolated/common-settings-isolated-example-panel4.component';
import { CommonSettingsIsolatedExampleComponent } from './settings/common-settings-isolated/common-settings-isolated-example.component';

import { SingleFormExamplePageComponent } from './settings/single-form/single-form-example-page.component';
import { SingleFormExampleComponent } from './settings/single-form/single-form-example.component';

// tslint:enable

import { SchemaFormModule } from '@msft-sme/angular';
import { ActionsModule } from '@msft-sme/angular';
import { BadgeModule } from '@msft-sme/angular';
import { BannerModule } from '@msft-sme/angular';
import { BreadcrumbModule } from '@msft-sme/angular';
import { DataTableModule } from '@msft-sme/angular';
import { DetailsModule } from '@msft-sme/angular';
import { DialogModule } from '@msft-sme/angular';
import { DoughnutChartModule } from '@msft-sme/angular';
import { DropdownModule } from '@msft-sme/angular';
import { SmeFormsModule } from '@msft-sme/angular';
import { GuidedPanelModule } from '@msft-sme/angular';
import { HorizontalBarChartModule } from '@msft-sme/angular';
import { IconModule } from '@msft-sme/angular';
import { LayoutModule } from '@msft-sme/angular';
import { LegendModule } from '@msft-sme/angular';
import { LineChartModule } from '@msft-sme/angular';
import { LoadingWheelModule } from '@msft-sme/angular';
import { MasterViewModule } from '@msft-sme/angular';
import { PageAlertBarModule } from '@msft-sme/angular';
import { PivotModule } from '@msft-sme/angular';
import { PropertyGridModule } from '@msft-sme/angular';
import { ResizerModule } from '@msft-sme/angular';
import { AlertBarModule } from '@msft-sme/angular';
import { CanDeactivateGuard } from '@msft-sme/angular';
import { SettingsModule } from '@msft-sme/angular';
import { SplitViewModule } from '@msft-sme/angular';
import { TooltipModule } from '@msft-sme/angular';
import { WizardModule } from '@msft-sme/angular';
import { ClampModule } from '@msft-sme/angular';
import { MarkdownModule } from 'packages/angular/angular';
import { BreadcrumbExampleComponent } from './breadcrumb/breadcrumb-example.component';
import { DetailsExampleComponent } from './details/details-example.component';
import { DoughnutChartExampleComponent } from './doughnut-chart/doughnut-chart-example.component';
import { GuidedPanelExampleComponent } from './guided-panel/guided-panel-example.component';
import { HorizontalBarChartExampleComponent } from './horizontal-bar-chart/horizontal-bar-chart-example.component';
import { LineChartExampleComponent } from './line-chart/line-chart-example.component';
import { MarkdownExampleComponent } from './markdown/markdown-example.component';
import { PageAlertbarExampleComponent } from './page-alert-bar/page-alert-bar-example.component';
import { PropertyGridExampleComponent } from './property-grid/property-grid-example.component';
import { SplitViewExampleComponent } from './split-view/split-view-example.component';
import { CharacterCreatorJobFormComponent } from './wizard/components/character-creator-job-form/character-creator-job-form.component';
import { CharacterCreatorNameFormComponent } from './wizard/components/character-creator-name-form/character-creator-name-form.component';
// tslint:disable-next-line:max-line-length
import { CharacterCreatorSpellFormComponent } from './wizard/components/character-creator-spell-form/character-creator-spell-form.component';
import { CharacterCreatorSummaryComponent } from './wizard/components/character-creator-summary/character-creator-summary.component';
import { WizardExampleComponent } from './wizard/wizard-example.component';

@NgModule({
    declarations: [
        ActionsExampleComponent,
        BadgeExampleComponent,
        BannerExampleComponent,
        BreadcrumbExampleComponent,
        ClampExampleComponent,
        ControlsComponent,
        DialogExampleComponent,
        DoughnutChartExampleComponent,
        ConfirmationDialogComponent,
        DialogChainComponent,
        DropdownExampleComponent,
        GuidedPanelExampleComponent,
        LayeredIconsExampleComponent,
        LineChartExampleComponent,
        LoadingWheelExampleComponent,
        HorizontalBarChartExampleComponent,
        MasterViewExampleComponent,
        PageAlertbarExampleComponent,
        PivotExampleComponent,
        PropertyGridExampleComponent,
        SettingsExampleComponent,
        DataTableExampleComponent,
        LayoutExampleComponent,
        ResizerExampleComponent,
        SchemaFormExampleComponent,
        SchemaFormTabbedStyleExampleComponent,
        CommonSettingsIsolatedExamplePanel1Component,
        CommonSettingsIsolatedExamplePanel2Component,
        CommonSettingsIsolatedExamplePanel3Component,
        CommonSettingsIsolatedExamplePanel4Component,
        CommonSettingsIsolatedExampleComponent,
        SingleFormExamplePageComponent,
        SingleFormExampleComponent,
        WizardExampleComponent,
        CharacterCreatorNameFormComponent,
        CharacterCreatorJobFormComponent,
        CharacterCreatorSpellFormComponent,
        CharacterCreatorSummaryComponent,
        SplitViewExampleComponent,
        DetailsExampleComponent,
        TreeTableExampleComponent,
        TooltipExampleComponent,
        MarkdownExampleComponent
    ],
    imports: [
        routing,
        LoremIpsumModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MasterViewModule,
        DialogModule,
        ActionsModule,
        LoadingWheelModule,
        SettingsModule,
        AlertBarModule,
        IconModule,
        GuidedPanelModule,
        HorizontalBarChartModule,
        LineChartModule,
        DataTableModule,
        LayoutModule,
        ResizerModule,
        DoughnutChartModule,
        BreadcrumbModule,
        SchemaFormModule,
        PageAlertBarModule,
        WizardModule,
        SplitViewModule,
        DetailsModule,
        DropdownModule,
        PivotModule,
        TooltipModule,
        BadgeModule,
        BannerModule,
        SmeFormsModule,
        ClampModule,
        LegendModule,
        PropertyGridModule,
        MarkdownModule
    ],
    providers: [
        CanDeactivateGuard
    ],
    entryComponents: [
        CharacterCreatorNameFormComponent,
        CharacterCreatorJobFormComponent,
        CharacterCreatorSpellFormComponent,
        CharacterCreatorSummaryComponent
    ]
})
export class ControlsModule { }
