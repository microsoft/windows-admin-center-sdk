import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'primeng/primeng';
import * as ng2 from '@msft-sme/shell/angular';
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
var ControlsModule = /** @class */ (function () {
    function ControlsModule() {
    }
    ControlsModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    ControlsModule.ctorParameters = function () { return []; };
    return ControlsModule;
}());
export { ControlsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9jb250cm9scy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxlQUFBLENBQWdCO0FBQ3pDLE9BQU8sRUFBRSxXQUFBLEVBQWEsbUJBQUEsRUFBb0IsTUFBTyxnQkFBQSxDQUFpQjtBQUNsRSxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLGlCQUFBLENBQWtCO0FBRWxELE9BQU8sS0FBSyxHQUFBLE1BQVMseUJBQUEsQ0FBMEI7QUFFL0MsT0FBTyxFQUFFLHVCQUFBLEVBQXdCLE1BQU8scUNBQUEsQ0FBc0M7QUFDOUUsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sc0JBQUEsQ0FBdUI7QUFDekQsT0FBTyxFQUFFLE9BQUEsRUFBUSxNQUFPLG9CQUFBLENBQXFCO0FBQzdDLE9BQU8sRUFBRSx5QkFBQSxFQUEwQixNQUFPLDJDQUFBLENBQTRDO0FBQ3RGLE9BQU8sRUFBRSxvQkFBQSxFQUFxQixNQUFPLGdEQUFBLENBQWlEO0FBQ3RGLE9BQU8sRUFBRSwyQkFBQSxFQUE0QixNQUFPLHNEQUFBLENBQXVEO0FBQ25HLE9BQU8sRUFBRSxzQkFBQSxFQUF1QixNQUFPLG1DQUFBLENBQW9DO0FBQzNFLE9BQU8sRUFBRSx3QkFBQSxFQUF5QixNQUFPLHVDQUFBLENBQXdDO0FBQ2pGLE9BQU8sRUFBRSxxQkFBQSxFQUFzQixNQUFPLGlDQUFBLENBQWtDO0FBQ3hFLE9BQU8sRUFBRSw0QkFBQSxFQUE2QixNQUFPLHlDQUFBLENBQTBDO0FBQ3ZGLE9BQU8sRUFBRSw0QkFBQSxFQUE2QixNQUFPLGlEQUFBLENBQWtEO0FBQy9GLE9BQU8sRUFBRSwwQkFBQSxFQUEyQixNQUFPLDZDQUFBLENBQThDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBQSxFQUF3QixNQUFPLHFDQUFBLENB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O3dCQUM1Qyw0Q0FBNEM7d0JBQzVDLDRDQUE0Qzt3QkFDNUMsc0NBQXNDO3dCQUN0QyxzQkFBc0I7d0JBQ3RCLG1DQUFtQzt3QkFDbkMsOEJBQThCO3dCQUM5Qix3QkFBd0I7d0JBQ3hCLGlDQUFpQzt3QkFDakMsc0JBQXNCO3dCQUN0QixpQ0FBaUM7d0JBQ2pDLGdDQUFnQzt3QkFDaEMsa0NBQWtDO3dCQUNsQyxnQ0FBZ0M7d0JBQ2hDLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2Qix5QkFBeUI7cUJBQzVCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxPQUFPO3dCQUNQLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osR0FBRyxDQUFDLGdCQUFnQjt3QkFDcEIsR0FBRyxDQUFDLFlBQVk7d0JBQ2hCLEdBQUcsQ0FBQyxhQUFhO3dCQUNqQixHQUFHLENBQUMsV0FBVzt3QkFDZixHQUFHLENBQUMsa0JBQWtCO3dCQUN0QixHQUFHLENBQUMsY0FBYzt3QkFDbEIsR0FBRyxDQUFDLGNBQWM7d0JBQ2xCLEdBQUcsQ0FBQyxVQUFVO3dCQUNkLEdBQUcsQ0FBQyxpQkFBaUI7d0JBQ3JCLEdBQUcsQ0FBQyx3QkFBd0I7d0JBQzVCLEdBQUcsQ0FBQyxXQUFXO3dCQUNmLEdBQUcsQ0FBQyxlQUFlO3dCQUNuQixHQUFHLENBQUMsZUFBZTt3QkFDbkIsR0FBRyxDQUFDLGFBQWE7d0JBQ2pCLEdBQUcsQ0FBQyx1QkFBdUI7d0JBQzNCLEdBQUcsQ0FBQyxtQkFBbUI7d0JBQ3ZCLEdBQUcsQ0FBQyxzQkFBc0I7d0JBQzFCLEdBQUcsQ0FBQyxrQkFBa0I7d0JBQ3RCLEdBQUcsQ0FBQyxZQUFZO3dCQUNoQixHQUFHLENBQUMsZUFBZTt3QkFDbkIsR0FBRyxDQUFDLGFBQWE7d0JBQ2pCLEdBQUcsQ0FBQyxjQUFjO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsR0FBRyxDQUFDLGFBQWE7d0JBQ2pCLEdBQUcsQ0FBQyxrQkFBa0I7d0JBQ3RCLEdBQUcsQ0FBQyxlQUFlO3FCQUN0QjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2IsaUNBQWlDO3dCQUNqQyxnQ0FBZ0M7d0JBQ2hDLGtDQUFrQzt3QkFDbEMsZ0NBQWdDO3FCQUNuQztpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNkJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRixxQkFBQztDQTFGRCxBQTBGQyxJQUFBO1NBMUZZLGNBQWMiLCJmaWxlIjoiY29udHJvbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==