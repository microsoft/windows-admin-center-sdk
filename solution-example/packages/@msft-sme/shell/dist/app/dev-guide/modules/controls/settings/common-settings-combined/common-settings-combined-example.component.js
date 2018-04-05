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
import { CommonSettingsComponentBase } from '../../../../../../angular';
var CommonSettingsCombinedExampleComponent = (function (_super) {
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
    return CommonSettingsCombinedExampleComponent;
}(CommonSettingsComponentBase));
export { CommonSettingsCombinedExampleComponent };
CommonSettingsCombinedExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-common-settings-combined-example',
                template: "\n      <form class=\"tool-container\">\n        <sme-common-settings settingsTitle=\"Common Settings\" [settings]=\"settingItems\" [backRoute]=\"backRoute\">\n            <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSaveClick()\" [disabled]=\"!combinedForm || (!combinedForm.dirty || !combinedForm.valid) || saving\">{{ saveButtonLabel }}</button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onDiscardClick()\" [disabled]=\"!combinedForm || !combinedForm.dirty || saving\">{{ discardButtonLabel }}</button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{ closeButtonLabel }}</button>\n        </sme-common-settings>\n      </form>\n    "
            },] },
];
/** @nocollapse */
CommonSettingsCombinedExampleComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
    null,
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtY29tYmluZWQvY29tbW9uLXNldHRpbmdzLWNvbWJpbmVkLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFDN0QsT0FBTyxFQUFFLFdBQUEsRUFBdUIsTUFBTyxnQkFBQSxDQUFpQjtBQUN4RCxPQUFPLEVBQW9CLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBSTNELE9BQU8sRUFFSCwyQkFBMkIsRUFJOUIsTUFBTSwyQkFBQSxDQUE0QjtBQUduQztJQUE0RCwwREFBMkI7SUFvQm5GLGdEQUFvQixXQUF3QixFQUFVLFdBQWdDLEVBQVUsTUFBYztRQUE5RyxZQUNJLGlCQUFPLFNBeUJWO1FBMUJtQixpQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLGlCQUFXLEdBQVgsV0FBVyxDQUFxQjtRQUFVLFlBQU0sR0FBTixNQUFNLENBQVE7UUFsQnZHLGtCQUFZLEdBQW1DLEVBQUUsQ0FBQztRQUlsRCxzQkFBZ0IsR0FBMkIsRUFBRSxDQUFDO1FBSTlDLHFCQUFlLEdBQUcsTUFBTSxDQUFDO1FBRXpCLHdCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUUvQixzQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFFMUIsbUJBQWEsR0FBbUIsRUFBRSxDQUFDO1FBRXBDLFlBQU0sR0FBRyxLQUFLLENBQUM7UUFJbEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2xCO1lBQ0ksS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixXQUFXLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQzFCO1lBQ0QsZ0JBQWdCLEVBQUUsc0JBQXNCO1NBQzNDLEVBQ0Q7WUFDSSxLQUFLLEVBQUUsc0VBQXNFO1lBQzdFLFdBQVcsRUFBRTtnQkFDVCxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUM7YUFDMUI7WUFDRCxnQkFBZ0IsRUFBRSxrQkFBa0I7U0FDdkMsRUFDRDtZQUNJLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsV0FBVyxFQUFFO2dCQUNULFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQzthQUMxQjtZQUNELGdCQUFnQixFQUFFLG1CQUFtQjtTQUN4QyxDQUFDLENBQUM7UUFFUCxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7SUFDM0MsQ0FBQztJQUVNLHlEQUFRLEdBQWY7UUFDSSxtREFBbUQ7SUFFdkQsQ0FBQztJQUVNLDREQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZO1lBQ3BDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSw0REFBVyxHQUFsQjtRQUFBLGlCQTZCQztRQTVCRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixXQUFXO1FBQ1gsVUFBVSxDQUNOO1lBQ0ksS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFDOUQsSUFBSSxtQkFBaUIsR0FBRyxVQUFDLE9BQXFDO29CQUMxRCxFQUFFLENBQUMsQ0FBTyxPQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQU8sT0FBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckQsQ0FBQztvQkFFRCxNQUFNLENBQUMsd0NBQXdDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQztnQkFFRixLQUFLLENBQUMsdUJBQXFCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU87b0JBQy9FLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxtQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUM7Z0JBRWpCLHlFQUF5RTtnQkFDekUsc0RBQXNEO2dCQUN0RCw0RkFBNEY7WUFFaEcsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLHNGQUFzRjtZQUMxRixDQUFDO1FBQ0wsQ0FBQyxFQUNELEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVNLCtEQUFjLEdBQXJCO1FBQ0ksZ0NBQWdDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDckUsQ0FBQztRQUVELEtBQUssQ0FBRSxlQUFlLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sNkRBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVNLG9GQUFtQyxHQUExQyxVQUNJLFNBQW9CLEVBQ3BCLFFBQXFCO1FBQ3JCLE1BQU0sQ0FBQztZQUNILGdCQUFnQixFQUFFLGlCQUFpQjtZQUNuQyxpQkFBaUIsRUFBRSxrQkFBa0I7WUFDckMsT0FBTyxFQUNQLHdGQUFzRixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUc7WUFDdkgsS0FBSyxFQUFFLDBCQUEwQjtTQUNwQyxDQUFDO0lBQ04sQ0FBQztJQXFCTCw2Q0FBQztBQUFELENBdElBLEFBc0lDLENBdEkyRCwyQkFBMkI7O0FBa0hoRixpREFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxtREFBbUQ7Z0JBQzdELFFBQVEsRUFBRSw4dEJBUVQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gscURBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztJQUNyQixJQUFJO0lBQ0osRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0NBQ2YsRUFKNkYsQ0FJN0YsQ0FBQyIsImZpbGUiOiJjb21tb24tc2V0dGluZ3MtY29tYmluZWQtZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9