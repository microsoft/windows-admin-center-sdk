import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService, DialogService } from '../../../../../../angular';
import { AccessService } from '../access.service';
import { AddSecurityGroupAction } from '../actions/add-secgroup.action';
import { DeleteSecurityGroupAction } from '../actions/delete-secgroup.action';
var SecurityGroupsBaseComponent = /** @class */ (function () {
    function SecurityGroupsBaseComponent(router, appContextService, accessService, dialogService, activatedRoute) {
        this.router = router;
        this.appContextService = appContextService;
        this.accessService = accessService;
        this.dialogService = dialogService;
        this.activatedRoute = activatedRoute;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell;
        this.loading = true;
        this.actions = [];
        this.name = 'name';
        this.type = 'type';
    }
    SecurityGroupsBaseComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().MsftSmeShell.App.SettingsDialog.access.toolTitle;
    };
    SecurityGroupsBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        var intervalInMilliSeconds;
        if (this.router.url.includes('users')) {
            this.accessService.usersQueryCache.createObservable({
                interval: intervalInMilliSeconds,
                params: {},
                delayClean: true
            }).subscribe(function (response) {
                _this.securityGroups = response || [];
                _this.loading = false;
            }, function (error) {
                _this.errorMessage = error;
                _this.loading = false;
            });
        }
        else {
            this.accessService.adminsQueryCache.createObservable({
                interval: intervalInMilliSeconds,
                params: {},
                delayClean: true
            }).subscribe(function (response) {
                _this.securityGroups = response || [];
                _this.loading = false;
            }, function (error) {
                _this.errorMessage = error;
                _this.loading = false;
            });
        }
    };
    SecurityGroupsBaseComponent.prototype.onActionEnded = function (event) {
        // Implemented in child components.
    };
    SecurityGroupsBaseComponent.prototype.onNewAction = function (result) {
        if (result.name && result.type) {
            this.securityGroups.push(result);
            this.selectedSecGroup = this.securityGroups.find(function (x) { return x.name === result.name; });
        }
    };
    SecurityGroupsBaseComponent.prototype.onDeleteAction = function (result) {
        if (result.confirmed === true) {
            var oldVar = this.securityGroups.find(function (x) { return x.name === result.name; });
            MsftSme.remove(this.securityGroups, oldVar);
            this.selectedSecGroup = null;
        }
    };
    SecurityGroupsBaseComponent.prototype.buildActions = function (section) {
        this.actions.push(new AddSecurityGroupAction(this.appContextService, this.accessService, this.dialogService, section));
        this.actions.push(new DeleteSecurityGroupAction(this.appContextService, this.accessService, this.dialogService, section));
    };
    SecurityGroupsBaseComponent.prototype.showAlert = function (message, state) {
        this.appContextService.notification.alert(this.appContextService.gateway.gatewayName, state, message);
    };
    SecurityGroupsBaseComponent.prototype.onCloseClick = function () {
        this.router.navigate(['/']);
    };
    SecurityGroupsBaseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-securitygroup-base',
                    template: "\n      <div class=\"flex-layout vertical stretch-absolute\">\n          <sme-settings-content>   \n              <div class=\"fixed-flex-size flex-layout tool-bar\">\n                  <sme-action-bar #custom [actions]=\"actions\" [target]=\"selectedSecGroup\" (executed)=\"onActionEnded($event)\"></sme-action-bar>\n                  <div class=\"align-padding-right\">\n                      <div class=\"searchbox searchbox-action-bar\">\n                          <input #gb type=\"search\" pInputText [(ngModel)]=\"filter\" autofocus placeholder={{strings.App.SettingsDialog.access.search}}>\n                      </div>\n                  </div>\n              </div>\n\n              <div class=\"auto-flex-size flex-layout relative vertical-scroll-only\">\n                  <sme-loading-wheel *ngIf=\"loading\"></sme-loading-wheel>\n                  <sme-data-table [(items)]=\"securityGroups\" [(selection)]=\"selectedSecGroup\" [globalFilter]=\"gb\" class=\"auto-flex-size\">\n                      <sme-data-table-column [field]=\"name\" [header]=\"strings.App.SettingsDialog.access.nameTitle\" [sortable]=\"true\"></sme-data-table-column>\n                      <sme-data-table-column [field]=\"type\" [header]=\"strings.App.SettingsDialog.access.typeTitle\" [sortable]=\"true\"></sme-data-table-column>\n                  </sme-data-table>\n              </div>\n          </sme-settings-content>\n\n          <div class=\"align-padding-right\">\n              <sme-settings-footer class=\"footer\">\n                  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCloseClick()\">{{strings.App.SettingsDialog.access.close}}</button>\n              </sme-settings-footer>\n          </div>\n      </div>\n      <sme-access-add-secgroup-dialog id=\"sme-access-new-securitygroup\"></sme-access-add-secgroup-dialog>\n    ",
                    providers: [AccessService]
                },] },
    ];
    /** @nocollapse */
    SecurityGroupsBaseComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: AppContextService, },
        { type: AccessService, },
        { type: DialogService, },
        { type: ActivatedRoute, },
    ]; };
    return SecurityGroupsBaseComponent;
}());
export { SecurityGroupsBaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9zZWN1cml0eWdyb3Vwcy9zZWN1cml0eWdyb3Vwcy1iYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFrQixNQUFPLGVBQUEsQ0FBZ0I7QUFDbEQsT0FBTyxFQUFFLGNBQUEsRUFBd0MsTUFBQSxFQUFPLE1BQU8saUJBQUEsQ0FBa0I7QUFFakYsT0FBTyxFQUFjLGlCQUFBLEVBQW1CLGFBQUEsRUFBYyxNQUFPLDJCQUFBLENBQTRCO0FBR3pGLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyxtQkFBQSxDQUFvQjtBQUNsRCxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTyxnQ0FBQSxDQUFpQztBQUN4RSxPQUFPLEVBQUUseUJBQUEsRUFBMEIsTUFBTyxtQ0FBQSxDQUFvQztBQUs5RTtJQWlCSSxxQ0FDWSxNQUFjLEVBQ2QsaUJBQW9DLEVBQ3JDLGFBQTRCLEVBQzNCLGFBQTRCLEVBQzVCLGNBQThCO1FBSjlCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3JDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXBCbkMsWUFBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQztRQUMzRCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBR2YsWUFBTyxHQUFpQixFQUFFLENBQUM7UUFHM0IsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFNBQUksR0FBRyxNQUFNLENBQUM7SUFhckIsQ0FBQztJQVZhLDJDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxD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