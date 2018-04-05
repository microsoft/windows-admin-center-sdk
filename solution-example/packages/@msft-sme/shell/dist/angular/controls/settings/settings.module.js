import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertBarModule, AlertBarService } from '../alert-bar';
import { DialogModule, DialogService } from '../dialog';
import { CanDeactivateGuard } from './settings-can-deactivate-guard.service';
import { SettingsContentComponent } from './settings-content.component';
import { SettingsFooterComponent } from './settings-footer.component';
import { SettingsFormDirective } from './settings-form.directive';
import { SettingsFormService } from './settings-form.service';
import { SettingsHeaderComponent } from './settings-header.component';
import { SettingsNavigationComponent } from './settings-navigation.component';
import { SettingsComponent } from './settings.component';
import { CommonSettingsIsolatedSettingsComponent } from './common-settings/common-settings-isolated-settings.component';
import { CommonSettingsNavigationDirective } from './common-settings/common-settings-navigation.directive';
import { CommonSettingsComponent } from './common-settings/common-settings.component';
import { SingleSettingComponent } from './common-settings/single-setting.component';
var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
export { SettingsModule };
SettingsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule,
                    CommonModule,
                    DialogModule,
                    AlertBarModule
                ],
                exports: [
                    SettingsComponent,
                    SingleSettingComponent,
                    SettingsFormDirective,
                    SettingsFooterComponent,
                    SettingsHeaderComponent,
                    SettingsContentComponent,
                    SettingsNavigationComponent,
                    CommonSettingsComponent,
                    CommonSettingsIsolatedSettingsComponent,
                    CommonSettingsNavigationDirective
                ],
                declarations: [
                    SettingsComponent,
                    SingleSettingComponent,
                    SettingsFormDirective,
                    SettingsFooterComponent,
                    SettingsHeaderComponent,
                    SettingsContentComponent,
                    SettingsNavigationComponent,
                    CommonSettingsComponent,
                    CommonSettingsIsolatedSettingsComponent,
                    CommonSettingsNavigationDirective
                ],
                providers: [
                    SettingsFormService,
                    CanDeactivateGuard,
                    DialogService,
                    AlertBarService
                ]
            },] },
];
/** @nocollapse */
SettingsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFFL0MsT0FBTyxFQUFFLGNBQUEsRUFBZ0IsZUFBQSxFQUFnQixNQUFPLGNBQUEsQ0FBZTtBQUMvRCxPQUFPLEVBQUUsWUFBQSxFQUFjLGFBQUEsRUFBYyxNQUFPLFdBQUEsQ0FBWTtBQUV4RCxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyx5Q0FBQSxDQUEwQztBQUM3RSxPQUFPLEVBQUUsd0JBQUEsRUFBeUIsTUFBTyw4QkFBQSxDQUErQjtBQUN4RSxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUscUJBQUEsRUFBc0IsTUFBTywyQkFBQSxDQUE0QjtBQUNsRSxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx5QkFBQSxDQUEwQjtBQUM5RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsMkJBQUEsRUFBNEIsTUFBTyxpQ0FBQSxDQUFrQztBQUM5RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUV6RCxPQUFPLEVBQUUsdUNBQUEsRUFBd0MsTUFBTywrREFBQSxDQUFnRTtBQUN4SCxPQUFPLEVBQUUsaUNBQUEsRUFBa0MsTUFBTyx3REFBQSxDQUF5RDtBQUMzRyxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2Q0FBQSxDQUE4QztBQUN0RixPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTyw0Q0FBQSxDQUE2QztBQUdwRjtJQUFBO0lBMkNBLENBQUM7SUFBRCxxQkFBQztBQUFELENBM0NBLEFBMkNDOztBQTNDb0MseUJBQVUsR0FBMEI7SUFDekUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyQixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixZQUFZO29CQUNaLFlBQVk7b0JBQ1osY0FBYztpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGlCQUFpQjtvQkFDakIsc0JBQXNCO29CQUN0QixxQkFBcUI7b0JBQ3JCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLDJCQUEyQjtvQkFDM0IsdUJBQXVCO29CQUN2Qix1Q0FBdUM7b0JBQ3ZDLGlDQUFpQztpQkFDcEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLGlCQUFpQjtvQkFDakIsc0JBQXNCO29CQUN0QixxQkFBcUI7b0JBQ3JCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLDJCQUEyQjtvQkFDM0IsdUJBQXVCO29CQUN2Qix1Q0FBdUM7b0JBQ3ZDLGlDQUFpQztpQkFDcEM7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixhQUFhO29CQUNiLGVBQWU7aUJBQ2xCO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDZCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6InNldHRpbmdzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=