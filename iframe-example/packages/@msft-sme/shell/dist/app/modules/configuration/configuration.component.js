var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { AppContextService, CommonSettingsComponentBase } from '../../../angular';
var ConfigurationComponent = /** @class */ (function (_super) {
    __extends(ConfigurationComponent, _super);
    function ConfigurationComponent(appContextService) {
        var _this = _super.call(this) || this;
        _this.appContextService = appContextService;
        _this.strings = MsftSme.resourcesStrings();
        _this.settingItems = [];
        _this.settingItems.push({
            label: _this.strings.MsftSmeShell.App.SettingsDialog.general,
            routeParams: {
                commands: ['general']
            },
            smeIconClassName: 'sme-icon-settings'
        } /*,
        {
            label: this.strings.MsftSmeShell.App.SettingsDialog.extensions,
            routeParams: {
                commands: ['extensions']
            },
            smeIconClassName: 'sme-icon-registrayEditor'
        },
        {
            label: this.strings.MsftSmeShell.App.SettingsDialog.connection,
            routeParams: {
                commands: ['connection']
            },
            smeIconClassName: 'sme-icon-networkSettings'
        }*/);
        return _this;
    }
    ConfigurationComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().MsftSmeShell.App.SettingsDialog.title;
    };
    ConfigurationComponent.prototype.confirmContinueEditingDialogOptions = function (dirtyForm, allForms) {
        return {
            cancelButtonText: 'Discard changes',
            confirmButtonText: 'Continue editing',
            message: "Do you want to to continue editing or discard your changes?: \r\n unsaved changes: " + JSON.stringify(dirtyForm.value),
            title: 'You have unsaved changes'
        };
    };
    ConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appContextService.gateway
            .get('gateway/status')
            .take(1)
            .subscribe(function (gateway) {
            if (gateway.gatewayMode === 'Service') {
                _this.appContextService.gateway
                    .get('access/check')
                    .take(1)
                    .subscribe(function (response) {
                    _this.hasAccess = response;
                    if (_this.hasAccess) {
                        _this.settingItems.push({
                            label: _this.strings.MsftSmeShell.App.SettingsDialog.access.toolTitle,
                            routeParams: {
                                commands: ['access']
                            },
                            smeIconClassName: 'sme-icon-localAdmin'
                        });
                    }
                });
            }
        });
    };
    ConfigurationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-configuration',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v\">\n          <sme-common-settings settingsTitle=\"{{strings.MsftSmeShell.App.SettingsDialog.title}}\" [settings]=\"settingItems\" aria-labelledby=\"sme-setting-title\">\n          </sme-common-settings>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ConfigurationComponent.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    return ConfigurationComponent;
}(CommonSettingsComponentBase));
export { ConfigurationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQWtCLE1BQU8sZUFBQSxDQUFnQjtBQUlsRCxPQUFPLEVBQzZCLGlCQUFBLEVBQW1CLDJCQUFBLEVBRXRELE1BQU0sa0JBQUEsQ0FBbUI7QUFNMUI7SUFBNEMsMENBQTJCO0lBU25FLGdDQUFvQixpQkFBb0M7UUFBeEQsWUFDSSxpQkFBTyxTQXdCVjtRQXpCbUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVJqRCxhQUFPLEdBQVksT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFDdkQsa0JBQVksR0FBbUMsRUFBRSxDQUFDO1FBU3JELEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNsQjtZQUNJLEtBQUssRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU87WUFDM0QsV0FBVyxFQUFFO2dCQUNULFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUN4QjtZQUNELGdCQUFnQixFQUFFLG1CQUFtQjtTQUN4QyxDQUFBOzs7Ozs7Ozs7Ozs7OztXQWNFLENBQ04sQ0FBQzs7SUFDTixDQUFDO0lBN0JhLHNDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDckYsQ0FBQztJQTZCTSxvRUFBbUMsR0FBMUMsVUFDSSxTQUFvQixFQUNwQixRQUFxQjtRQUNyQixNQUFNLENBQUM7WUFDSCxnQkFBZ0IsRUFBRSxpQkFBaUI7WUFDbkMsaUJBQWlCLEVBQUUsa0JBQWtCO1lBQ3JDLE9BQU8sRUFDSCx3RkFBc0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFHO1lBQzNILEtBQUssRUFBRSwwQkFBMEI7U0FDcEMsQ0FBQztJQUNOLENBQUM7SUFFTSx5Q0FBUSxHQUFmO1FBQUEsaUJBeUJDO1FBeEJHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO2FBQ3pCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNyQixJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ1AsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUNkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU87cUJBRXpCLEdBQUcsQ0FBQyxjQUFjLENBQUM7cUJBQ25CLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQ1AsU0FBUyxDQUFDLFVBQUEsUUFBUTtvQkFDZixLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztvQkFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNsQjs0QkFDSSxLQUFLLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUzs0QkFDcEUsV0FBVyxFQUFFO2dDQUNULFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs2QkFDdkI7NEJBQ0QsZ0JBQWdCLEVBQUUscUJBQXFCO3lCQUMxQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRSxpQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxzVEFLVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gscUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0tBQzFCLEVBRjZGLENBRTdGLENBQUM7SUFDRiw2QkFBQztDQXpGRCxBQXlGQyxDQXpGMkMsMkJBQTJCLEdBeUZ0RTtTQXpGWSxzQkFBc0IiLCJmaWxlIjoiY29uZmlndXJhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9