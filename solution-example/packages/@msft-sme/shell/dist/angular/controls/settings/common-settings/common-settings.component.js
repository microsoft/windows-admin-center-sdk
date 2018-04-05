import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SettingsFormService } from '../settings-form.service';
import { SettingsComponent } from '../settings.component';
var CommonSettingsComponent = (function () {
    function CommonSettingsComponent(router, activatedRoute, settingsForms) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.settingsForms = settingsForms;
        this.combinedForm = new FormGroup({});
    }
    CommonSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resetSubscriptions();
        this.addFormSubscription = this.settingsForms.formAdded().subscribe(function (formAddedData) {
            // to avoid duplicates we first remove the form if it exists
            _this.latestForm = formAddedData.formGroup;
            _this.latestPristineFormValue = _this.getRawValueRecursive(formAddedData.formGroup);
            _this.latestFormUpdateValueInComponent = formAddedData.updateValueInComponent;
            _this.recalculateActivePanel();
        });
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                var setting = _this.getActiveSettingItem();
                _this.selectedSettingTitle = setting.label;
            }
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
        this.selectedSettingTitle = setting.label;
        var settingWithForm = setting;
        if (settingWithForm.form && settingWithForm.form.dirty) {
            var formValue = this.getRawValueRecursive(settingWithForm.form);
            if (settingWithForm.updateValueInComponent) {
                this.settingsForms.newFormValue(settingWithForm.form, formValue);
            }
            else {
                this.latestForm.setValue(formValue);
            }
            this.latestForm.markAsDirty();
        }
        this.settingsForms.removeForm(settingWithForm.form);
        settingWithForm.form = this.latestForm;
        if (settingWithForm.form) {
            if (this.combinedForm.controls[settingWithForm.label]) {
                this.combinedForm.setControl(settingWithForm.label, settingWithForm.form);
            }
            else {
                this.combinedForm.addControl(settingWithForm.label, settingWithForm.form);
            }
        }
        settingWithForm.updateValueInComponent = this.latestFormUpdateValueInComponent;
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
    CommonSettingsComponent.prototype.getActiveSettingItem = function () {
        if (this.settings) {
            for (var _i = 0, _a = this.settings; _i < _a.length; _i++) {
                var setting = _a[_i];
                var extras = setting.routeParams.extras || {};
                Object.assign(extras, {
                    relativeTo: this.activatedRoute
                });
                var urlTree = this.router.createUrlTree(setting.routeParams.commands, extras);
                if (this.router.isActive(urlTree, false)) {
                    return setting;
                }
            }
        }
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
    return CommonSettingsComponent;
}());
export { CommonSettingsComponent };
CommonSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-common-settings',
                template: "\n      <div class=\"auto-flex-size flex-layout stretch-vertical\">\n        <sme-settings class=\"auto-flex-size\" [settingsTitle]=\"settingsTitle\">\n          <sme-settings-navigation>\n            <nav role=\"navigation\"\n                id=\"settingsSideNavigation\"\n                [title]=\"settingsTitle\"\n                class=\"settings-navigation nav side-navigation side-navigation-large theme-default auto-flex-layout flex-layout vertical\">\n              <ul class=\"auto-flex-size flex-layout vertical vertical-scroll-only\">\n                <li *ngFor=\"let setting of settings\">\n                  <a\n                    class=\"fixed-flex-size\"\n                    role=\"tab\"\n                    [routerLink]=\"setting.routeParams.commands\"\n                    routerLinkActive=\"active\"\n                    [ngClass]=\"{dirty: !!(setting.form && setting.form.dirty)}\"\n                    [preserveQueryParams]=\"setting.routeParams.extras && setting.routeParams.extras.preserveQueryParams\"\n                    [preserveFragment]=\"setting.routeParams.extras && setting.routeParams.extras.preserveFragment\"\n                    [skipLocationChange]=\"setting.routeParams.extras && setting.routeParams.extras.skipLocationChange\"\n                    [replaceUrl]=\"setting.routeParams.extras && setting.routeParams.extras.replaceUrl\"\n                    [queryParams]=\"setting.routeParams.extras && setting.routeParams.extras.queryParams\"\n                    [title]=\"setting.label\">\n                  <div class=\"item-border flex-layout\">\n                    <div class=\"sme-icon sme-icon-16\" [ngClass]=\"getSmeIconClass(setting)\">\n                    </div>\n                    <span class=\"ellipsis\">\n                      {{setting.label}}\n                    </span>\n                  </div>\n                  </a>\n                </li>\n              </ul>\n            </nav>\n          </sme-settings-navigation>\n          <sme-settings-header>\n            <h4>{{selectedSettingTitle}}</h4>\n          </sme-settings-header>\n          <sme-settings-content>\n            <router-outlet></router-outlet>\n          </sme-settings-content>\n          <sme-settings-footer>\n            <ng-content></ng-content>\n          </sme-settings-footer>\n        </sme-settings>\n      </div>\n    ",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3MvY29tbW9uLXNldHRpbmdzL2NvbW1vbi1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBd0MsS0FBQSxFQUE0QyxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBQzlILE9BQU8sRUFBbUIsU0FBQSxFQUF3QixTQUFBLEVBQVUsTUFBTyxnQkFBQSxDQUFpQjtBQUNwRixPQUFPLEVBQ0gsY0FBYyxFQUVkLGFBQWEsRUFFYixNQUFNLEVBR1QsTUFBTSxpQkFBQSxDQUFrQjtBQVd6QixPQUFPLEVBQWlCLG1CQUFBLEVBQW9CLE1BQU8sMEJBQUEsQ0FBMkI7QUFDOUUsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sdUJBQUEsQ0FBd0I7QUFHMUQ7SUE0QkksaUNBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQWtDO1FBQWxHLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFDbEgsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sMENBQVEsR0FBZjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxhQUFhO1lBQzlFLDREQUE0RDtZQUM1RCxLQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUM7WUFDMUMsS0FBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEYsS0FBSSxDQUFDLGdDQUFnQyxHQUFHLGFBQWEsQ0FB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