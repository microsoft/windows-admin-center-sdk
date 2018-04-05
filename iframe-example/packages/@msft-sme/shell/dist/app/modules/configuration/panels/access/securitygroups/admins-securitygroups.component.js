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
var AdminsSecurityGroupsComponent = /** @class */ (function (_super) {
    __extends(AdminsSecurityGroupsComponent, _super);
    function AdminsSecurityGroupsComponent(router, appContextService, accessService, dialogService, activatedRoute) {
        var _this = _super.call(this, router, appContextService, accessService, dialogService, activatedRoute) || this;
        _super.prototype.buildActions.call(_this, 'admins');
        return _this;
    }
    AdminsSecurityGroupsComponent.prototype.onActionEnded = function (event) {
        this.accessService.adminsQueryCache.refresh();
        if (event.item.actionType === ActionType.NewSecurityGroup) {
            this.onNewAction(event.result);
        }
        else if (event.item.actionType === ActionType.DeleteSecurityGroup) {
            this.onDeleteAction(event.result);
        }
    };
    AdminsSecurityGroupsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-admins-securitygroups-list',
                    template: "\n      <div class=\"flex-layout vertical stretch-absolute\">\n          <sme-settings-content>   \n              <div class=\"fixed-flex-size flex-layout tool-bar\">\n                  <sme-action-bar #custom [actions]=\"actions\" [target]=\"selectedSecGroup\" (executed)=\"onActionEnded($event)\"></sme-action-bar>\n                  <div class=\"align-padding-right\">\n                      <div class=\"searchbox searchbox-action-bar\">\n                          <input #gb type=\"search\" pInputText [(ngModel)]=\"filter\" autofocus placeholder={{strings.App.SettingsDialog.access.search}}>\n                      </div>\n                  </div>\n              </div>\n\n              <div class=\"auto-flex-size flex-layout relative vertical-scroll-only\">\n                  <sme-loading-wheel *ngIf=\"loading\"></sme-loading-wheel>\n                  <sme-data-table [(items)]=\"securityGroups\" [(selection)]=\"selectedSecGroup\" [globalFilter]=\"gb\" class=\"auto-flex-size\">\n                      <sme-data-table-column [field]=\"name\" [header]=\"strings.App.SettingsDialog.access.nameTitle\" [sortable]=\"true\"></sme-data-table-column>\n                      <sme-data-table-column [field]=\"type\" [header]=\"strings.App.SettingsDialog.access.typeTitle\" [sortable]=\"true\"></sme-data-table-column>\n                  </sme-data-table>\n              </div>\n          </sme-settings-content>\n\n          <div class=\"align-padding-right\">\n              <sme-settings-footer class=\"footer\">\n                  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{strings.App.SettingsDialog.access.close}}</button>\n              </sme-settings-footer>\n          </div>\n      </div>\n      <sme-access-add-secgroup-dialog id=\"sme-access-new-securitygroup\"></sme-access-add-secgroup-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    AdminsSecurityGroupsComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: AppContextService, },
        { type: AccessService, },
        { type: DialogService, },
        { type: ActivatedRoute, },
    ]; };
    return AdminsSecurityGroupsComponent;
}(SecurityGroupsBaseComponent));
export { AdminsSecurityGroupsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9zZWN1cml0eWdyb3Vwcy9hZG1pbnMtc2VjdXJpdHlncm91cHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUMxQyxPQUFPLEVBQUUsY0FBQSxFQUFnQixNQUFBLEVBQU8sTUFBTyxpQkFBQSxDQUFrQjtBQUN6RCxPQUFPLEVBQUUsaUJBQUEsRUFBbUIsYUFBQSxFQUFjLE1BQU8sMkJBQUEsQ0FBNEI7QUFDN0UsT0FBTyxFQUFFLGFBQUEsRUFBYyxNQUFPLG1CQUFBLENBQW9CO0FBQ2xELE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxpQ0FBQSxDQUFrQztBQUU3RCxPQUFPLEVBQUUsMkJBQUEsRUFBNEIsTUFBTyxpQ0FBQSxDQUFrQztBQUc5RTtJQUFtRCxpREFBMkI7SUFFMUUsdUNBQ0ksTUFBYyxFQUNkLGlCQUFvQyxFQUNwQyxhQUE0QixFQUM1QixhQUE0QixFQUM1QixjQUE4QjtRQUxsQyxZQU9JLGtCQUFNLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQyxTQUVqRjtRQURHLGlCQUFNLFlBQVksYUFBQyxRQUFRLENBQUMsQ0FBQzs7SUFDakMsQ0FBQztJQUVNLHFEQUFhLEdBQXBCLFVBQXFCLEtBQVU7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUNFLHdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsUUFBUSxFQUFFLDh6REE0QlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDRDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO1FBQ3ZCLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztRQUN2QixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7S0FDdkIsRUFONkYsQ0FNN0YsQ0FBQztJQUNGLG9DQUFDO0NBL0RELEFBK0RDLENBL0RrRCwyQkFBMkIsR0ErRDdFO1NBL0RZLDZCQUE2QiIsImZpbGUiOiJhZG1pbnMtc2VjdXJpdHlncm91cHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==