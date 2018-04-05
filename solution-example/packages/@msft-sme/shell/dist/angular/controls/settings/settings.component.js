import { Location } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../dialog';
import { SettingsFormService } from './settings-form.service';
export var alertBarId = 'settings-alert-bar';
var SettingsComponent = (function () {
    function SettingsComponent(elementRef, settingsForms, activatedRoute, location, router, dialogService) {
        this.elementRef = elementRef;
        this.settingsForms = settingsForms;
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.router = router;
        this.dialogService = dialogService;
        this.allForms = [];
        this.autoFocus = true;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsForms.stopProcessingEvents();
        this.resetSubscriptions();
        this.settingsForms.allForms.forEach(function (form) { return _this.allForms.push(form); });
        this.addFormSubscription = this.settingsForms.formAdded().subscribe(function (formAddedData) {
            // to avoid duplicates we first remove the form if it exists
            MsftSme.remove(_this.allForms, formAddedData.formGroup);
            _this.allForms.push(formAddedData.formGroup);
            // If we have a new form, it means the user navigated so we reset the autofocus
            _this.autoFocus = true;
        });
        this.removeFormSubscription = this.settingsForms.formRemoved().subscribe(function (form) {
            MsftSme.remove(_this.allForms, form);
        });
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.resetSubscriptions();
        this.settingsForms.startProcessingEvents();
    };
    SettingsComponent.prototype.canDeactivate = function (component, route, state) {
        var _this = this;
        var continueNavigation = true;
        this.allForms.first(function (form) {
            if (form.dirty) {
                var subject = _this.dialogService.show('settings-confirmation-dialog', component.confirmContinueEditingDialogOptions(form, _this.allForms));
                continueNavigation = subject.map(function (result) {
                    // The default is to continue editing
                    var discardChanges = !result.confirmed;
                    if (discardChanges) {
                        _this.settingsForms.allForms = [];
                    }
                    return discardChanges;
                });
                // with one dirty form is enough to show the dialog, no need to iterate over all the other dialogs
                return true;
            }
            return false;
        });
        return continueNavigation;
    };
    /**
     * Angular Life Cycle hook for After View Checked.
     * When the visibility changes, we are going to focus on the first element that has the autofocus attribute
     */
    SettingsComponent.prototype.ngAfterViewChecked = function () {
        if (this.autoFocus) {
            var autofocusElement = this.elementRef.nativeElement.querySelector('[autofocus]');
            if (autofocusElement) {
                this.autoFocus = false;
                autofocusElement.focus();
            }
        }
    };
    SettingsComponent.prototype.resetSubscriptions = function () {
        if (this.addFormSubscription) {
            this.addFormSubscription.unsubscribe();
        }
        if (this.removeFormSubscription) {
            this.removeFormSubscription.unsubscribe();
        }
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    };
    return SettingsComponent;
}());
export { SettingsComponent };
SettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-settings',
                template: "\n      <div class=\"auto-flex-size flex-layout vertical\">\n        <sme-alert-bar id=\"settings-alert-bar\" class=\"fixed-flex-layout\"></sme-alert-bar>\n        <sme-confirmation-dialog id=\"settings-confirmation-dialog\"></sme-confirmation-dialog>\n        <div class=\"tool-header-box\">\n          <h4 *ngIf=\"settingsTitle\" class=\"fixed-flex-size tool-header\">{{settingsTitle}}</h4>\n        </div>\n        <div class=\"auto-flex-size flex-layout content\">\n          <ng-content select=\"sme-settings-navigation\"></ng-content>\n          <div class=\"auto-flex-size flex-layout vertical\">\n            <ng-content select=\"sme-settings-header\"></ng-content>\n            <ng-content select=\"sme-settings-content\"></ng-content>\n            <ng-content select=\"sme-settings-footer\"></ng-content>\n          </div>\n        </div>\n      </div>\n    ",
                styles: ["\n      :host {\n          overflow-y: auto;\n          overflow-x: hidden;\n          display: flex;\n          flex-direction: column;\n          flex-wrap: nowrap;\n          align-content: stretch;\n          align-items: stretch;\n          justify-content: flex-start;\n          height: 100%;\n      }\n\n      :host .auto-flex-size {\n          flex: 1 1 auto;\n      }\n\n      h4 {\n          font-weight: 400;\n          padding-top: 0px;\n          padding-bottom: 12px;\n      }\n\n      :host >>> .content {\n          margin-left: 22px;\n      }\n    "]
            },] },
];
/** @nocollapse */
SettingsComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: SettingsFormService, },
    { type: ActivatedRoute, },
    { type: Location, },
    { type: Router, },
    { type: DialogService, },
]; };
SettingsComponent.propDecorators = {
    'backRoute': [{ type: Input },],
    'settingsTitle': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFBLEVBQVMsTUFBTyxpQkFBQSxDQUFrQjtBQUMzQyxPQUFPLEVBQW9CLFNBQUEsRUFBVyxVQUFBLEVBQVksS0FBQSxFQUF5QixNQUFPLGVBQUEsQ0FBZ0I7QUFFbEcsT0FBTyxFQUNILGNBQWMsRUFJZCxNQUFNLEVBR1QsTUFBTSxpQkFBQSxDQUFrQjtBQUt6QixPQUFPLEVBQXVELGFBQUEsRUFBYyxNQUFPLFdBQUEsQ0FBWTtBQUUvRixPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx5QkFBQSxDQUEwQjtBQUk5RCxNQUFNLENBQUMsSUFBTSxVQUFBLEdBQWEsb0JBQUEsQ0FBcUI7QUFHL0M7SUFxQkksMkJBQ1ksVUFBc0IsRUFDdEIsYUFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsUUFBa0IsRUFDbEIsTUFBYyxFQUNkLGFBQTRCO1FBTDVCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQXFCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQW5CakMsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFFMUIsY0FBUyxHQUFHLElBQUksQ0FBQztJQWlCbUIsQ0FBQztJQUV0QyxvQ0FBUSxHQUFmO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJ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QUM5QixJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLENBQUM7SUFDTCxDQUFDO0lBK0RMLHdCQUFDO0FBQUQsQ0E3S0EsQUE2S0M7O0FBOURNLDRCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxzMkJBZ0JUO2dCQUNELE1BQU0sRUFBRSxDQUFDLHdqQkEwQlIsQ0FBQzthQUNMLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO0lBQ3BCLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixHQUFHO0lBQzdCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztJQUN4QixFQUFDLElBQUksRUFBRSxRQUFRLEdBQUc7SUFDbEIsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0lBQ2hCLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztDQUN0QixFQVA2RixDQU83RixDQUFDO0FBQ0ssZ0NBQWMsR0FBMkM7SUFDaEUsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDL0IsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDbEMsQ0FBQyIsImZpbGUiOiJzZXR0aW5ncy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9