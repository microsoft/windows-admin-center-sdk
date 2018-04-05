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
import { CommonSettingsComponentBase } from '../../../../../../angular';
var CommonSettingsIsolatedExampleComponent = (function (_super) {
    __extends(CommonSettingsIsolatedExampleComponent, _super);
    function CommonSettingsIsolatedExampleComponent() {
        var _this = _super.call(this) || this;
        _this.settingItems = [];
        _this.settingItems.push({
            label: 'Common Settings 1',
            routeParams: {
                commands: ['settings1']
            },
            smeIconClassName: 'icon-win-permissions'
        }, {
            label: 'Common Settings 2 with a very long name to see how the tooltip works',
            routeParams: {
                commands: ['settings2']
            },
            smeIconClassName: 'icon-win-gateway'
        }, {
            label: 'Common Settings 3',
            routeParams: {
                commands: ['settings3']
            },
            smeIconClassName: 'icon-win-firewall'
        }, {
            label: 'Settings Base Form',
            routeParams: {
                commands: ['settings4']
            },
            smeIconClassName: 'icon-win-settings'
        });
        return _this;
    }
    CommonSettingsIsolatedExampleComponent.prototype.confirmContinueEditingDialogOptions = function (dirtyForm, allForms) {
        return {
            cancelButtonText: 'Discard changes',
            confirmButtonText: 'Continue editing',
            message: "Do you want to to continue editing or discard your changes?: \r\n unsaved changes: " + JSON.stringify(dirtyForm.value),
            title: 'You have unsaved changes'
        };
    };
    return CommonSettingsIsolatedExampleComponent;
}(CommonSettingsComponentBase));
export { CommonSettingsIsolatedExampleComponent };
CommonSettingsIsolatedExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-common-settings-isolated-example',
                template: "\n      <sme-common-settings settingsTitle=\"Common Settings where each page has it's own form that are individually saved and discarded\" [settings]=\"settingItems\" >\n      </sme-common-settings>\n    "
            },] },
];
/** @nocollapse */
CommonSettingsIsolatedExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQvY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUkxQyxPQUFPLEVBQ0gsMkJBQTJCLEVBRzlCLE1BQU0sMkJBQUEsQ0FBNEI7QUFHbkM7SUFBNEQsMERBQTJCO0lBSW5GO1FBQUEsWUFDSSxpQkFBTyxTQThCVjtRQWpDTSxrQkFBWSxHQUFtQyxFQUFFLENBQUM7UUFJckQsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2xCO1lBQ0ksS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixXQUFXLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQzFCO1lBQ0QsZ0JBQWdCLEVBQUUsc0JBQXNCO1NBQzNDLEVBQ0Q7WUFDSSxLQUFLLEVBQUUsc0VBQXNFO1lBQzdFLFdBQVcsRUFBRTtnQkFDVCxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUM7YUFDMUI7WUFDRCxnQkFBZ0IsRUFBRSxrQkFBa0I7U0FDdkMsRUFDRDtZQUNJLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsV0FBVyxFQUFFO2dCQUNULFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQzthQUMxQjtZQUNELGdCQUFnQixFQUFFLG1CQUFtQjtTQUN4QyxFQUNEO1lBQ0ksS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixXQUFXLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQzFCO1lBQ0QsZ0JBQWdCLEVBQUUsbUJBQW1CO1NBQ3hDLENBQUMsQ0FBQzs7SUFDWCxDQUFDO0lBRU0sb0ZBQW1DLEdBQTFDLFVBQ0ksU0FBb0IsRUFDcEIsUUFBcUI7UUFDakIsTUFBTSxDQUFDO1lBQ0gsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLGlCQUFpQixFQUFFLGtCQUFrQjtZQUNyQyxPQUFPLEVBQ0gsd0ZBQXNGLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBRztZQUMzSCxLQUFLLEVBQUUsMEJBQTBCO1NBQ3BDLENBQUM7SUFDTixDQUFDO0lBYVQsNkNBQUM7QUFBRCxDQTVEQSxBQTREQyxDQTVEMkQsMkJBQTJCOztBQWdEaEYsaURBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsbURBQW1EO2dCQUM3RCxRQUFRLEVBQUUsOE1BR1Q7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gscURBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==