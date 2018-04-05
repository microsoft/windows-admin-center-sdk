import { Component } from '@angular/core';
var SettingsExampleComponent = (function () {
    function SettingsExampleComponent(settingsFormService) {
        this.settingsFormService = settingsFormService;
    }
    return SettingsExampleComponent;
}());
export { SettingsExampleComponent };
SettingsExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-settings-example',
                template: "\n      <div class=\"tool-container flex-layout vertical\">\n        <ul class=\"nav nav-tabs fixed-flex-size\" role=\"tablist\">\n          <li role=\"presentation\">\n            <a routerLink=\"commonSettingsIsolatedPagesForm\" routerLinkActive=\"active\" role=\"tab\">One Form per setting</a>\n          </li>\n          <li role=\"presentation\">\n            <a routerLink=\"commonSettingsCombinedPagesForm\" routerLinkActive=\"active\" role=\"tab\">One Form for all settings</a>\n          </li>\n          <li role=\"presentation\">\n            <a routerLink=\"singleSettingForm\" routerLinkActive=\"active\" role=\"tab\">Setting with one page</a>\n          </li>\n          <li role=\"presentation\">\n            <a routerLink=\"CustomSettings\" routerLinkActive=\"active\" role=\"tab\">Custom Settings</a>\n          </li>\n        </ul>\n        <div class=\"auto-flex-size relative m-t-xxxs\">\n          <div class=\"tool-container\">\n          <router-outlet></router-outlet>\n          </div>\n        </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
SettingsExampleComponent.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9zZXR0aW5ncy1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUcxQztJQUNJLGtDQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUM1RCxDQUFDO0lBaUNMLCtCQUFDO0FBQUQsQ0FuQ0EsQUFtQ0M7O0FBaENNLG1DQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLG1DQUFtQztnQkFDN0MsUUFBUSxFQUFFLHloQ0FzQlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsdUNBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7Q0FDSCxFQUY2RixDQUU3RixDQUFDIiwiZmlsZSI6InNldHRpbmdzLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==