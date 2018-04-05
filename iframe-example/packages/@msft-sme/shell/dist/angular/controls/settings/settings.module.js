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
var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
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
    return SettingsModule;
}());
export { SettingsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFFL0MsT0FBTyxFQUFFLGNBQUEsRUFBZ0IsZUFBQSxFQUFnQixNQUFPLGNBQUEsQ0FBZTtBQUMvRCxPQUFPLEVBQUUsWUFBQSxFQUFjLGFBQUEsRUFBYyxNQUFPLFdBQUEsQ0FBWTtBQUV4RCxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyx5Q0FBQSxDQUEwQztBQUM3RSxPQUFPLEVBQUUsd0JBQUEsRUFBeUIsTUFBTyw4QkFBQSxDQUErQjtBQUN4RSxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUscUJBQUEsRUFBc0IsTUFBTywyQkFBQSxDQUE0QjtBQUNsRSxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx5QkFBQSxDQUEwQjtBQUM5RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsMkJBQUEsRUFBNEIsTUFBTyxpQ0FBQSxDQUFrQztBQUM5RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUV6RCxPQUFPLEVBQUUsdUNBQUEsRUFBd0MsTUFBTywrREFBQSxDQUFnRTtBQUN4SCxPQUFPLEVBQUUsaUNBQUEsRUFBa0MsTUFBTyx3REFBQSxDQUF5RDtBQUMzRyxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2Q0FBQSxDQUE4QztBQUN0RixPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTyw0Q0FBQSxDQUE2QztBQUdwRjtJQUFBO0lBMkNBLENBQUM7SUEzQ29DLHlCQUFVLEdBQTBCO1FBQ3pFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDckIsT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLGNBQWM7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIscUJBQXFCO3dCQUNyQix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4QiwyQkFBMkI7d0JBQzNCLHVCQUF1Qjt3QkFDdkIsdUNBQXVDO3dCQUN2QyxpQ0FBaUM7cUJBQ3BDO29CQUNELFlBQVksRUFBRTt3QkFDVixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIscUJBQXFCO3dCQUNyQix1QkFBdUI7d0JBQ3ZCLHVCQUF1Qjt3QkFDdkIsd0JBQXdCO3dCQUN4QiwyQkFBMkI7d0JBQzNCLHVCQUF1Qjt3QkFDdkIsdUNBQXVDO3dCQUN2QyxpQ0FBaUM7cUJBQ3BDO29CQUNELFNBQVMsRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixlQUFlO3FCQUNsQjtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNkJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRixxQkFBQztDQTNDRCxBQTJDQyxJQUFBO1NBM0NZLGNBQWMiLCJmaWxlIjoic2V0dGluZ3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==