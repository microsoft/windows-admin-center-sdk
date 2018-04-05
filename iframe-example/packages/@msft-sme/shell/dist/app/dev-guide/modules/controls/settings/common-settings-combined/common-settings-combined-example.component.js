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
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonSettingsComponentBase, SettingsFormService } from '../../../../../../angular';
var CommonSettingsCombinedExampleComponent = /** @class */ (function (_super) {
    __extends(CommonSettingsCombinedExampleComponent, _super);
    function CommonSettingsCombinedExampleComponent(formBuilder, formService, router) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.formService = formService;
        _this.router = router;
        _this.settingItems = [];
        _this.secondaryButtons = [];
        _this.saveButtonLabel = 'Save';
        _this.discardButtonLabel = 'Discard';
        _this.closeButtonLabel = 'Close';
        _this.subscriptions = [];
        _this.saving = false;
        _this.settingItems.push({
            label: 'Common Settings 1',
            routeParams: {
                commands: ['settings1']
            },
            smeIconClassName: 'sme-icon-permissions'
        }, {
            label: 'Common Settings 2 with a very long name to see how the tooltip works',
            routeParams: {
                commands: ['settings2']
            },
            smeIconClassName: 'sme-icon-gateway'
        }, {
            label: 'Common Settings 3',
            routeParams: {
                commands: ['settings3']
            },
            smeIconClassName: 'sme-icon-firewall'
        });
        _this.backRoute = { commands: ['../'] };
        return _this;
    }
    CommonSettingsCombinedExampleComponent.prototype.ngOnInit = function () {
        // We create an empty form that will later be added
    };
    CommonSettingsCombinedExampleComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    CommonSettingsCombinedExampleComponent.prototype.onSaveClick = function () {
        var _this = this;
        this.saving = true;
        // Do stuff
        setTimeout(function () {
            _this.saving = false;
            if (_this.commonSettingsComponent.first) {
                _this.commonSettingsComponent.first.acceptAllChildFormsValue();
                var formValueCallBack_1 = function (setting) {
                    if (setting.form) {
                        return JSON.stringify(setting.form.value);
                    }
                    return '<user did not navigate to the setting>';
                };
                alert("All the values:\n " + _this.commonSettingsComponent.first.settings.map(function (setting) {
                    return setting.label + ' - ' + formValueCallBack_1(setting);
                }).join('\n'));
                // NOTE: You can access a single setting page value with this expression:
                // this.combinedForm.value[this.settingItems[1].label]
                // where settingItems[1] is the second setting item defined in the constructor of this class
            }
            else {
                // We should never get here cause we always have a common settings component underneat
            }
        }, 300);
    };
    CommonSettingsCombinedExampleComponent.prototype.onDiscardClick = function () {
        // TODO: Discard all the changes
        if (this.commonSettingsComponent.first) {
            return this.commonSettingsComponent.first.discardAllChildForms();
        }
        alert('discard what?');
    };
    CommonSettingsCombinedExampleComponent.prototype.onCloseClick = function () {
        this.router.navigateByUrl(this.formService.getBackRoute('/controls/settings'));
    };
    CommonSettingsCombinedExampleComponent.prototype.confirmContinueEditingDialogOptions = function (dirtyForm, allForms) {
        return {
            cancelButtonText: 'Discard changes',
            confirmButtonText: 'Continue editing',
            message: "Do you want to to continue editing or discard your changes?: \r\n unsaved changes: " + JSON.stringify(dirtyForm.value),
            title: 'You have unsaved changes'
        };
    };
    CommonSettingsCombinedExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-common-settings-combined-example',
                    template: "\n      <form class=\"tool-container\">\n        <sme-common-settings settingsTitle=\"Common Settings\" [settings]=\"settingItems\" [backRoute]=\"backRoute\">\n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSaveClick()\" [disabled]=\"!combinedForm || (!combinedForm.dirty || !combinedForm.valid) || saving\">{{ saveButtonLabel }}</button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscardClick()\" [disabled]=\"!combinedForm || !combinedForm.dirty || saving\">{{ discardButtonLabel }}</button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{ closeButtonLabel }}</button>\n        </sme-common-settings>\n      </form>\n    "
                },] },
    ];
    /** @nocollapse */
    CommonSettingsCombinedExampleComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
        { type: SettingsFormService, },
        { type: Router, },
    ]; };
    return CommonSettingsCombinedExampleComponent;
}(CommonSettingsComponentBase));
export { CommonSettingsCombinedExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtY29tYmluZWQvY29tbW9uLXNldHRpbmdzLWNvbWJpbmVkLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFDN0QsT0FBTyxFQUFFLFdBQUEsRUFBdUIsTUFBTyxnQkFBQSxDQUFpQjtBQUN4RCxPQUFPLEVBQW9CLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBSTNELE9BQU8sRUFFSCwyQkFBMkIsRUFHM0IsbUJBQW1CLEVBQ3RCLE1BQU0sMkJBQUEsQ0FBNEI7QUFHbkM7SUFBNEQsMERBQTJCO0lBb0JuRixnREFBb0IsV0FBd0IsRUFBVSxXQUFnQyxFQUFVLE1BQWM7UUFBOUcsWUFDSSxpQkFBTyxTQXlCVjtRQTFCbUIsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxpQkFBVyxHQUFYLFdBQVcsQ0FBcUI7UUFBVSxZQUFNLEdBQU4sTUFBTSxDQUFRO1FBbEJ2RyxrQkFBWSxHQUFtQyxFQUFFLENBQUM7UUFJbEQsc0JBQWdCLEdBQTJCLEVBQUUsQ0FBQztRQUk5QyxxQkFBZSxHQUFHLE1BQU0sQ0FBQztRQUV6Qix3QkFBa0IsR0FBRyxTQUFTLENBQUM7UUFFL0Isc0JBQWdCLEdBQUcsT0FBTyxDQUFDO1FBRTFCLG1CQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUVwQyxZQUFNLEdBQUcsS0FBSyxDQUFDO1FBSWxCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNsQjtZQUNJLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsV0FBVyxFQUFFO2dCQUNULFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQzthQUMxQjtZQUNELGdCQUFnQixFQUFFLHNCQUFzQjtTQUMzQyxFQUNEO1lBQ0ksS0FBSyxFQUFFLHNFQUFzRTtZQUM3RSxXQUFXLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQzFCO1lBQ0QsZ0JBQWdCLEVBQUUsa0JBQWtCO1NBQ3ZDLEVBQ0Q7WUFDSSxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLFdBQVcsRUFBRTtnQkFDVCxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUM7YUFDMUI7WUFDRCxnQkFBZ0IsRUFBRSxtQkFBbUI7U0FDeEMsQ0FBQyxDQUFDO1FBRVAsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7O0lBQzNDLENBQUM7SUFFTSx5REFBUSxHQUFmO1FBQ0ksbURBQW1EO0lBRXZELENBQUM7SUFFTSw0REFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtZQUNwQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sNERBQVcsR0FBbEI7UUFBQSxpQkE2QkM7UUE1QkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsV0FBVztRQUNYLFVBQVUsQ0FDTjtZQUNJLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQzlELElBQUksbUJBQWlCLEdBQUcsVUFBQyxPQUFxQztvQkFDMUQsRUFBRSxDQUFDLENBQU8sT0FBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFPLE9BQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JELENBQUM7b0JBRUQsTUFBTSxDQUFDLHdDQUF3QyxDQUFDO2dCQUNwRCxDQUFDLENBQUM7Z0JBRUYsS0FBSyxDQUFDLHVCQUFxQixLQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO29CQUMvRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsbUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQyxDQUFDO2dCQUVqQix5RUFBeUU7Z0JBQ3pFLHNEQUFzRDtnQkFDdEQsNEZBQTRGO1lBRWhHLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixzRkFBc0Y7WUFDMUYsQ0FBQztRQUNMLENBQUMsRUFDRCxHQUFHLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFTSwrREFBYyxHQUFyQjtRQUNJLGdDQUFnQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3JFLENBQUM7UUFFRCxLQUFLLENBQUUsZUFBZSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLDZEQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFTSxvRkFBbUMsR0FBMUMsVUFDSSxTQUFvQixFQUNwQixRQUFxQjtRQUNyQixNQUFNLENBQUM7WUFDSCxnQkFBZ0IsRUFBRSxpQkFBaUI7WUFDbkMsaUJBQWlCLEVBQUUsa0JBQWtCO1lBQ3JDLE9BQU8sRUFDUCx3RkFBc0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFHO1lBQ3ZILEtBQUssRUFBRSwwQkFBMEI7U0FDcEMsQ0FBQztJQUNOLENBQUM7SUFDRSxpREFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxtREFBbUQ7b0JBQzdELFFBQVEsRUFBRSw4dEJBUVQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHFEQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7UUFDckIsRUFBQyxJQUFJLEVBQUUsbUJBQW1CLEdBQUc7UUFDN0IsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0tBQ2YsRUFKNkYsQ0FJN0YsQ0FBQztJQUNGLDZDQUFDO0NBdElELEFBc0lDLENBdEkyRCwyQkFBMkIsR0FzSXRGO1NBdElZLHNDQUFzQyIsImZpbGUiOiJjb21tb24tc2V0dGluZ3MtY29tYmluZWQtZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9