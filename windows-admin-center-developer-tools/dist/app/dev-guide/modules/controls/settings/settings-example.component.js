import { SettingsFormService } from '@msft-sme/shell/angular';
import { Component } from '@angular/core';
var SettingsExampleComponent = /** @class */ (function () {
    function SettingsExampleComponent(settingsFormService) {
        this.settingsFormService = settingsFormService;
    }
    SettingsExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-settings-example',
                    template: "\n      <div class=\"tool-container sme-arrange-stack-v\">\n          <div class=\"sme-pivot sme-position-flex-none sme-padding-bottom-sm sme-padding-horizontal-md\">\n              <div role=\"tablist\">\n                  <a role=\"tab\" routerLink=\"commonSettingsIsolatedPagesForm\" routerLinkActive=\"sme-active\">One Form per setting</a>\n                  <a role=\"tab\" routerLink=\"commonSettingsCombinedPagesForm\" routerLinkActive=\"sme-active\">One Form for all settings</a>\n                  <a role=\"tab\" routerLink=\"singleSettingForm\" routerLinkActive=\"sme-active\">Setting with one page</a>\n                  <a role=\"tab\" routerLink=\"CustomSettings\" routerLinkActive=\"sme-active\">Custom Settings</a>\n              </div>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-auto m-t-xxxs\">\n              <div class=\"tool-container\">\n                  <router-outlet></router-outlet>\n              </div>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    SettingsExampleComponent.ctorParameters = function () { return [
        { type: SettingsFormService, },
    ]; };
    return SettingsExampleComponent;
}());
export { SettingsExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9zZXR0aW5ncy1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx5QkFBQSxDQUEwQjtBQUU5RCxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUcxQztJQUNJLGtDQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUM1RCxDQUFDO0lBQ0UsbUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsbUNBQW1DO29CQUM3QyxRQUFRLEVBQUUsZy9CQWdCVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixHQUFHO0tBQzVCLEVBRjZGLENBRTdGLENBQUM7SUFDRiwrQkFBQztDQTdCRCxBQTZCQyxJQUFBO1NBN0JZLHdCQUF3QiIsImZpbGUiOiJzZXR0aW5ncy1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=