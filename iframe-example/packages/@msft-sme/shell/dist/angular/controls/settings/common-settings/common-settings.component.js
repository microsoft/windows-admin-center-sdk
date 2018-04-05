import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFormService } from '../settings-form.service';
import { SettingsComponent } from '../settings.component';
var CommonSettingsComponent = /** @class */ (function () {
    function CommonSettingsComponent(router, activatedRoute, settingsForms) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.settingsForms = settingsForms;
        this.combinedForm = new FormGroup({});
    }
    CommonSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addFormSubscription = this.settingsForms.formAdded().subscribe(function (formAddedData) {
            // to avoid duplicates we first remove the form if it exists
            _this.latestForm = formAddedData.formGroup;
            _this.latestPristineFormValue = _this.getRawValueRecursive(formAddedData.formGroup);
            _this.latestFormUpdateValueInComponent = formAddedData.updateValueInComponent;
            _this.recalculateActivePanel();
        });
        this.recalculateActivePanel();
    };
    CommonSettingsComponent.prototype.ngOnChanges = function (changes) {
        // nothing to do?
        this.recalculateActivePanel();
    };
    CommonSettingsComponent.prototype.ngOnDestroy = function () {
        this.resetSubscriptions();
    };
    CommonSettingsComponent.prototype.recalculateActivePanel = function () {
        var setting = this.getActiveSettingItem();
        if (setting) {
            var formSetting = setting;
            if (formSetting.form && formSetting.form.dirty) {
                var formValue = this.getRawValueRecursive(formSetting.form);
                if (formSetting.updateValueInComponent) {
                    this.settingsForms.newFormValue(formSetting.form, formValue);
                }
                else {
                    this.latestForm.setValue(formValue);
                }
                this.latestForm.markAsDirty();
            }
            this.settingsForms.removeForm(formSetting.form);
            formSetting.form = this.latestForm;
            if (formSetting.form) {
                if (this.combinedForm.controls[formSetting.label]) {
                    this.combinedForm.setControl(formSetting.label, formSetting.form);
                }
                else {
                    this.combinedForm.addControl(formSetting.label, formSetting.form);
                }
            }
            formSetting.updateValueInComponent = this.latestFormUpdateValueInComponent;
        }
    };
    CommonSettingsComponent.prototype.discardAllChildForms = function () {
        var _this = this;
        // For the current active setting, we need to reset the form to its
        // original pristine form when discarding changes
        var activeSetting = this.getActiveSettingItem();
        var settingWithForm = activeSetting;
        if (settingWithForm.form) {
            settingWithForm.form.reset(this.latestPristineFormValue);
        }
        this.settings.forEach(function (otherSetting) {
            if (otherSetting !== activeSetting) {
                var othersettingWithForm = otherSetting;
                _this.settingsForms.removeForm(othersettingWithForm.form);
                othersettingWithForm.form = null;
                if (_this.combinedForm.controls[othersettingWithForm.label]) {
                    _this.combinedForm.removeControl(othersettingWithForm.label);
                }
            }
        });
    };
    CommonSettingsComponent.prototype.acceptAllChildFormsValue = function () {
        var _this = this;
        var activeSetting = this.getActiveSettingItem();
        this.settings.forEach(function (setting) {
            var settingWithForm = setting;
            if (settingWithForm.form) {
                settingWithForm.form.reset(_this.getRawValueRecursive(settingWithForm.form));
                if (activeSetting === settingWithForm) {
                    _this.latestPristineFormValue = _this.getRawValueRecursive(settingWithForm.form);
                }
            }
        });
    };
    CommonSettingsComponent.prototype.getSmeIconClass = function (setting) {
        var ngClassParameter = {};
        if (setting.smeIconClassName) {
            ngClassParameter[setting.smeIconClassName] = true;
        }
        return ngClassParameter;
    };
    CommonSettingsComponent.prototype.canDeactivate = function (component, route, state) {
        var continueNavigation = true;
        if (this.settingsComponent) {
            return this.settingsComponent.canDeactivate(component, route, state);
        }
        return true;
    };
    CommonSettingsComponent.prototype.resetSubscriptions = function () {
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
    CommonSettingsComponent.prototype.detectActiveSettingItem = function () {
        if (this.settings && this.settings.length > 0) {
            for (var _i = 0, _a = this.settings; _i < _a.length; _i++) {
                var setting = _a[_i];
                var extras = setting.routeParams.extras || {};
                Object.assign(extras, {
                    relativeTo: this.activatedRoute
                });
                var urlTree = this.router.createUrlTree(setting.routeParams.commands, extras);
                if (this.router.isActive(urlTree, false)) {
                    this.selectedSettingTitle = setting.label;
                    return setting;
                }
            }
        }
        return undefined;
    };
    CommonSettingsComponent.prototype.getActiveSettingItem = function () {
        return this.detectActiveSettingItem();
    };
    /**
     * Returns the value of the current control and all its children recursivelly,
     * including disabled controls.
     *
     * Workaround for missing functionality added in later versions of angular
     * Currently getRawValue only returns the value of hte current control disabled
     * children but only enabled controls of other descendants:
     * https://github.com/angular/angular/commit/1ece7366c8b67f387fbe13f8d128c19f4c50dd19
     *
     * Once we upgrade angular version we can remove this code.
     *
     * @param formControl The form control to get the value from
     */
    CommonSettingsComponent.prototype.getRawValueRecursive = function (formControl) {
        var _this = this;
        if (formControl instanceof FormGroup) {
            var value_1 = {};
            Object.keys(formControl.controls).forEach(function (key) {
                value_1[key] = _this.getRawValueRecursive(formControl.controls[key]);
            });
            return value_1;
        }
        else if (formControl instanceof FormArray) {
            return formControl.controls.map(function (control) {
                return _this.getRawValueRecursive(control);
            });
        }
        return formControl.value;
    };
    CommonSettingsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-common-settings',
                    template: "\n      <div class=\"sme-position-flex-auto sme-arrange-stack-h sme-position-stretch-v\">\n          <sme-settings class=\"sme-position-flex-auto\" [settingsTitle]=\"settingsTitle\">\n              <sme-settings-navigation>\n                  <nav role=\"tablist\" id=\"settingsSideNavigation\" [title]=\"settingsTitle\" class=\"settings-navigation nav side-navigation side-navigation-large theme-default sme-arrange-stack-v\">\n                      <ul class=\"sme-position-flex-auto sme-arrange-stack-v sme-arrange-overflow-hide-x sme-arrange-overflow-auto-y\">\n                          <li *ngFor=\"let setting of settings\">\n                              <a class=\"sme-position-flex-none\" role=\"tab\"  [routerLink]=\"setting.routeParams.commands\" routerLinkActive=\"active\"\n                                  [ngClass]=\"{dirty: !!(setting.form && setting.form.dirty)}\" [preserveQueryParams]=\"setting.routeParams.extras && setting.routeParams.extras.preserveQueryParams\"\n                                  [preserveFragment]=\"setting.routeParams.extras && setting.routeParams.extras.preserveFragment\" [skipLocationChange]=\"setting.routeParams.extras && setting.routeParams.extras.skipLocationChange\"\n                                  [replaceUrl]=\"setting.routeParams.extras && setting.routeParams.extras.replaceUrl\" [queryParams]=\"setting.routeParams.extras && setting.routeParams.extras.queryParams\"\n                                  [title]=\"setting.label\">\n                                  <div class=\"item-border sme-arrange-stack-h\">\n                                      <div class=\"sme-icon\" [ngClass]=\"getSmeIconClass(setting)\">\n                                      </div>\n                                      <span class=\"ellipsis sme-position-flex-auto\">\n                                          {{setting.label}}\n                                      </span>\n                                  </div>\n                              </a>\n                          </li>\n                      </ul>\n                  </nav>\n              </sme-settings-navigation>\n              <sme-settings-header>\n                  <h4 id=\"sme-shell-setting-selectedTitle\" *ngIf=\"!!detectActiveSettingItem()\">{{selectedSettingTitle}}</h4>\n              </sme-settings-header>\n              <sme-settings-content>\n                  <router-outlet></router-outlet>\n              </sme-settings-content>\n              <sme-settings-footer>\n                  <ng-content></ng-content>\n              </sme-settings-footer>\n          </sme-settings>\n      </div>\n    ",
                    styles: ["\n      :host {\n        height: 100%;\n      }\n\n      .side-navigation.side-navigation-large {\n        max-width: 320px;\n        width: auto\n      }\n      .side-navigation.side-navigation-large ul li {\n        padding: 0px;\n        text-decoration: none;\n      }\n      .side-navigation.side-navigation-large ul li a {\n        height: 48px;\n        padding: 13px 12px 13px 0px;\n        cursor: pointer;\n        font-size: 15px;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        justify-content: center;\n        color: inherit;\n        text-decoration: none;\n      }\n\n      .side-navigation.side-navigation-large ul li a div.sme-icon {\n        margin-right: 12px;\n      }\n\n      .side-navigation.side-navigation-large ul li a:focus {\n        outline: 1px dashed #000;\n        outline-offset: -1px;\n      }\n\n      .side-navigation.side-navigation-large ul li a:hover {\n        background: rgba(242,242,242,1);\n      }\n\n      .side-navigation.side-navigation-large ul li a.active {\n        color: rgba(0,120,215,1);\n      }\n\n      .side-navigation.side-navigation-large ul li a.dirty {\n        font-style: italic;\n      }\n\n      .side-navigation.side-navigation-large ul li a.active .item-border {\n        border-left-color: rgba(0,120,215,1);\n      }\n\n      .item-border {\n        border-left: 4px solid transparent;\n        padding-left: 9px;\n        width: 100%;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        border-color: transparent;\n      }\n\n      .ellipsis {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: block;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    CommonSettingsComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: ActivatedRoute, },
        { type: SettingsFormService, },
    ]; };
    CommonSettingsComponent.propDecorators = {
        'settingsTitle': [{ type: Input },],
        'settings': [{ type: Input },],
        'backRoute': [{ type: Input },],
        'settingsComponent': [{ type: ViewChild, args: [SettingsComponent,] },],
    };
    return CommonSettingsComponent;
}());
export { CommonSettingsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3MvY29tbW9uLXNldHRpbmdzL2NvbW1vbi1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBd0MsS0FBQSxFQUE0QyxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBQzlILE9BQU8sRUFBbUIsU0FBQSxFQUF3QixTQUFBLEVBQVUsTUFBTyxnQkFBQSxDQUFpQjtBQUNwRixPQUFPLEVBQ0gsY0FBYyxFQUlkLE1BQU0sRUFHVCxNQUFNLGlCQUFBLENBQWtCO0FBV3pCLE9BQU8sRUFBaUIsbUJBQUEsRUFBb0IsTUFBTywwQkFBQSxDQUEyQjtBQUM5RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx1QkFBQSxDQUF3QjtBQUcxRDtJQTRCSSxpQ0FBb0IsTUFBYyxFQUFVLGNBQThCLEVBQVUsYUFBa0M7UUFBbEcsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSwwQ0FBUSxHQUFmO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxhQUFhO1lBQzlFLDREQUE0RDtZQUM1RCxLQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUM7WUFDMUMsS0FBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEYsS0FBSSxDQUFDLGdDQUFnQyxHQUFHLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztZQUM3RSxLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTSw2Q0FBVyxHQUFsQixVQUFtQixPQUFPO1FBQ3RCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sNkNBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sd0RBQXNCLEdBQTdCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUVWLElBQU0sV0FBVyxHQUF5QyxPQUFPLENBQUM7WUFDbEUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTlELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUVuQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7WUFDTCxDQUFDO1lBRUQsV0FBVyxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQztRQUMvRSxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNEQUFvQixHQUEzQjtRQUFBLGlCQW1CQztRQWxCRyxtRUFBbUU7UUFDbkUsaURBQWlEO1FBQ2pELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2hELElBQUksZUFBZSxHQUF5QyxhQUFhLENBQUM7UUFDMUUsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkIsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtZQUMvQixFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxvQkFBb0IsR0FBeUMsWUFBWSxDQUFDO2dCQUM5RSxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDekQsb0JBQW9CLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6RCxLQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEUsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSwwREFBd0IsR0FBL0I7UUFBQSxpQkFXQztRQVZHLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUMxQixJQUFJLGVBQWUsR0FBeUMsT0FBTyxDQUFDO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxLQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkYsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxpREFBZSxHQUF0QixVQUF1QixPQUFxQztRQUN4RCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzNCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN0RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFTSwrQ0FBYSxHQUFwQixVQUNJLFNBQWlDLEVBQ2pDLEtBQTZCLEVBQzdCLEtBQTBCO1FBQzFCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sb0RBQWtCLEdBQTFCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHlEQUF1QixHQUE5QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxHQUFHLENBQUMsQ0FBZ0IsVUFBYSxFQUFiLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixjQUFhLEVBQWIsSUFBYTtnQkFBNUIsSUFBSSxPQUFPLFNBQUE7Z0JBQ1osSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO2dCQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFDbEIsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjO2lCQUNsQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUMxQyxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNuQixDQUFDO2FBQ0o7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0sc0RBQW9CLEdBQTNCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSyxzREFBb0IsR0FBNUIsVUFBNkIsV0FBNEI7UUFBekQsaUJBZ0JDO1FBZkcsRUFBRSxDQUFDLENBQUMsV0FBVyxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxPQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDekMsT0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsT0FBSyxDQUFDO1FBRWpCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBd0I7Z0JBQ3JELE1BQU0sQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUNFLGtDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLGtrRkFtQ1Q7b0JBQ0QsTUFBTSxFQUFFLENBQUMsOHNEQW1FUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxzQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztLQUM1QixFQUo2RixDQUk3RixDQUFDO0lBQ0ssc0NBQWMsR0FBMkM7UUFDaEUsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbkMsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDOUIsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDL0IsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUcsRUFBRSxFQUFFO0tBQ3ZFLENBQUM7SUFDRiw4QkFBQztDQXZVRCxBQXVVQyxJQUFBO1NBdlVZLHVCQUF1QiIsImZpbGUiOiJjb21tb24tc2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==