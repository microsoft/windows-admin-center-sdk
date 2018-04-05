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
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService, DialogService } from '../../../../../../angular';
import { AccessService } from '../access.service';
import { ActionType } from '../actions/secgroup-action.base';
import { SecurityGroupsBaseComponent } from './securitygroups-base.component';
var UsersSecurityGroupsComponent = /** @class */ (function (_super) {
    __extends(UsersSecurityGroupsComponent, _super);
    function UsersSecurityGroupsComponent(router, appContextService, accessService, dialogService, activatedRoute) {
        var _this = _super.call(this, router, appContextService, accessService, dialogService, activatedRoute) || this;
        _super.prototype.buildActions.call(_this, 'users');
        return _this;
    }
    UsersSecurityGroupsComponent.prototype.onActionEnded = function (event) {
        this.accessService.usersQueryCache.refresh();
        if (event.item.actionType === ActionType.NewSecurityGroup) {
            this.onNewAction(event.result);
        }
        else if (event.item.actionType === ActionType.DeleteSecurityGroup) {
            this.onDeleteAction(event.result);
        }
    };
    UsersSecurityGroupsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-users-securitygroups-list',
                    template: "\n      <div class=\"flex-layout vertical stretch-absolute\">\n          <sme-settings-content>   \n              <div class=\"fixed-flex-size flex-layout tool-bar\">\n                  <sme-action-bar #custom [actions]=\"actions\" [target]=\"selectedSecGroup\" (executed)=\"onActionEnded($event)\"></sme-action-bar>\n                  <div class=\"align-padding-right\">\n                      <div class=\"searchbox searchbox-action-bar\">\n                          <input #gb type=\"search\" pInputText [(ngModel)]=\"filter\" autofocus placeholder={{strings.App.SettingsDialog.access.search}}>\n                      </div>\n                  </div>\n              </div>\n\n              <div class=\"auto-flex-size flex-layout relative vertical-scroll-only\">\n                  <sme-loading-wheel *ngIf=\"loading\"></sme-loading-wheel>\n                  <sme-data-table [(items)]=\"securityGroups\" [(selection)]=\"selectedSecGroup\" [globalFilter]=\"gb\" class=\"auto-flex-size\">\n                      <sme-data-table-column [field]=\"name\" [header]=\"strings.App.SettingsDialog.access.nameTitle\" [sortable]=\"true\"></sme-data-table-column>\n                      <sme-data-table-column [field]=\"type\" [header]=\"strings.App.SettingsDialog.access.typeTitle\" [sortable]=\"true\"></sme-data-table-column>\n                  </sme-data-table>\n              </div>\n          </sme-settings-content>\n\n          <div class=\"align-padding-right\">\n              <sme-settings-footer class=\"footer\">\n                  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{strings.App.SettingsDialog.access.close}}</button>\n              </sme-settings-footer>\n          </div>\n      </div>\n      <sme-access-add-secgroup-dialog id=\"sme-access-new-securitygroup\"></sme-access-add-secgroup-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    UsersSecurityGroupsComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: AppContextService, },
        { type: AccessService, },
        { type: DialogService, },
        { type: ActivatedRoute, },
    ]; };
    return UsersSecurityGroupsComponent;
}(SecurityGroupsBaseComponent));
export { UsersSecurityGroupsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9zZWN1cml0eWdyb3Vwcy91c2Vycy1zZWN1cml0eWdyb3Vwcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBQzFDLE9BQU8sRUFBRSxjQUFBLEVBQWdCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBQ3pELE9BQU8sRUFBRSxpQkFBQSxFQUFtQixhQUFBLEVBQWMsTUFBTywyQkFBQSxDQUE0QjtBQUM3RSxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sbUJBQUEsQ0FBb0I7QUFDbEQsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGlDQUFBLENBQWtDO0FBRTdELE9BQU8sRUFBRSwyQkFBQSxFQUE0QixNQUFPLGlDQUFBLENBQWtDO0FBRzlFO0lBQWtELGdEQUEyQjtJQUV6RSxzQ0FDSSxNQUFjLEVBQ2QsaUJBQW9DLEVBQ3BDLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLGNBQThCO1FBTGxDLFlBT0ksa0JBQU0sTUFBTSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDLFNBRWpGO1FBREcsaUJBQU0sWUFBWSxhQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUNoQyxDQUFDO0lBRU0sb0RBQWEsR0FBcEIsVUFBcUIsS0FBVTtRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUNFLHVDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsUUFBUSxFQUFFLDh6REE0QlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO1FBQ3ZCLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztRQUN2QixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7S0FDdkIsRUFONkYsQ0FNN0YsQ0FBQztJQUNGLG1DQUFDO0NBL0RELEFBK0RDLENBL0RpRCwyQkFBMkIsR0ErRDVFO1NBL0RZLDRCQUE0QiIsImZpbGUiOiJ1c2Vycy1zZWN1cml0eWdyb3Vwcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9