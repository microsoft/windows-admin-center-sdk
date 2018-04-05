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
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService, DialogService, SettingsFormService } from '../../../../../angular';
import { PanelBaseComponent } from '.././panel-base.component';
var AccessComponent = /** @class */ (function (_super) {
    __extends(AccessComponent, _super);
    function AccessComponent(appContextService, router, activatedRoute, dialogService, formbuilder, settingsFormService) {
        var _this = _super.call(this, appContextService, router, activatedRoute, formbuilder, settingsFormService, {
            name: ''
        }, 
        // TODO : Remove these validations from here, include in add group dialog.
        {
            name: {
                required: 'this is a mandatory field'
            }
        }, {
            name: 'setting 1 name value'
        }, 'setting 1') || this;
        _this.strings = MsftSme.resourcesStrings().MsftSmeShell;
        return _this;
    }
    AccessComponent.prototype.ngOnInit = function () {
        this.sampleForm = this.formbuilder.group({
            name: [this.modelData.name, Validators.required]
        });
        _super.prototype.ngOnInit.call(this);
    };
    AccessComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-access',
                    template: "\n      <div class=\"flex-layout vertical stretch-absolute\">\n        <sme-tool-header>\n            <p class=\"sme-icon sme-icon-info icon-size sme-position-flex-none m-r-xxs\">{{strings.App.SettingsDialog.access.description}}</p>\n            <ul class=\"nav nav-tabs\" role=\"tablist\">\n            <li role=\"presentation\">\n              <a role=\"tab\" routerLink=\"users\" routerLinkActive=\"active\">{{strings.App.SettingsDialog.access.gatewayUsers}}</a>\n            </li>\n            <li role=\"presentation\">\n              <a role=\"tab\" routerLink=\"admins\" routerLinkActive=\"active\">{{strings.App.SettingsDialog.access.gatewayAdmins}}</a>\n            </li>\n          </ul>\n        </sme-tool-header>\n\n        <div class=\"auto-flex-size relative\">\n          <router-outlet></router-outlet>\n        </div>\n      </div>\n      <sme-confirmation-dialog id=\"sme-confirmation-dialog\"></sme-confirmation-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    AccessComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
        { type: ActivatedRoute, },
        { type: DialogService, },
        { type: FormBuilder, },
        { type: SettingsFormService, },
    ]; };
    return AccessComponent;
}(PanelBaseComponent));
export { AccessComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9hY2Nlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFDN0QsT0FBTyxFQUFFLFdBQUEsRUFBcUMsVUFBQSxFQUFXLE1BQU8sZ0JBQUEsQ0FBaUI7QUFDakYsT0FBTyxFQUFFLGNBQUEsRUFBZ0IsTUFBQSxFQUFPLE1BQU8saUJBQUEsQ0FBa0I7QUFFekQsT0FBTyxFQUFFLGlCQUFBLEVBQW1CLGFBQUEsRUFBZSxtQkFBQSxFQUFvQixNQUFPLHdCQUFBLENBQXlCO0FBRy9GLE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLDJCQUFBLENBQTRCO0FBSS9EO0lBQ1ksbUNBQStCO0lBSXZDLHlCQUFZLGlCQUFvQyxFQUFFLE1BQWMsRUFBRSxjQUE4QixFQUM1RixhQUE0QixFQUFFLFdBQXdCLEVBQ3RELG1CQUF3QztRQUY1QyxZQUdJLGtCQUNJLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sY0FBYyxFQUNkLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkI7WUFDSSxJQUFJLEVBQUUsRUFBRTtTQUNYO1FBQ0QsMEVBQTBFO1FBQzFFO1lBQ0ksSUFBSSxFQUFFO2dCQUNGLFFBQVEsRUFBRSwyQkFBMkI7YUFDeEM7U0FDSixFQUNEO1lBQ0ksSUFBSSxFQUFFLHNCQUFzQjtTQUMvQixFQUNELFdBQVcsQ0FBQyxTQUNuQjtRQXZCTSxhQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDOztJQXVCbEUsQ0FBQztJQUVNLGtDQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3JDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDbkQsQ0FBQyxDQUFDO1FBRUgsaUJBQU0sUUFBUSxXQUFFLENBQUM7SUFDckIsQ0FBQztJQUNFLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSxtN0JBbUJUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCw4QkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxhQUFhLEdBQUc7UUFDdkIsRUFBQyxJQUFJLEVBQUUsV0FBVyxHQUFHO1FBQ3JCLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixHQUFHO0tBQzVCLEVBUDZGLENBTzdGLENBQUM7SUFDRixzQkFBQztDQXRFRCxBQXNFQyxDQXJFVyxrQkFBa0IsR0FxRTdCO1NBdEVZLGVBQWUiLCJmaWxlIjoiYWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=