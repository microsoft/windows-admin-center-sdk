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
import { Observable } from 'rxjs';
import { Net } from '../../../../../../core';
import { ActionType, SecurityGroupActionBase } from './secgroup-action.base';
var AddSecurityGroupAction = /** @class */ (function (_super) {
    __extends(AddSecurityGroupAction, _super);
    function AddSecurityGroupAction(appContextService, accessService, dialogService, section) {
        var _this = _super.call(this, appContextService, dialogService) || this;
        _this.appContextService = appContextService;
        _this.accessService = accessService;
        _this.dialogService = dialogService;
        _this.section = section;
        _this.text = _this.strings.App.SettingsDialog.access.add;
        _this.iconClass = 'sme-icon icon-win-add';
        _this.actionType = ActionType.NewSecurityGroup;
        return _this;
    }
    AddSecurityGroupAction.prototype.onExecute = function (target) {
        var _this = this;
        var addSecGroupDialogOptions = {
            cancelButtonText: this.strings.App.SettingsDialog.access.cancel,
            confirmButtonText: this.strings.App.SettingsDialog.access.save,
            message: this.strings.App.SettingsDialog.access.addSecurityGroupMessage,
            title: this.strings.App.SettingsDialog.access.addSecurityGroupHeader
        };
        return this.dialogService.show('sme-access-new-securitygroup', addSecGroupDialogOptions).flatMap(function (result) {
            if (result.confirmed) {
                var name_1 = result.name;
                var type_1 = result.secGroupType;
                return _this.accessService.addSecurityGroup(name_1, type_1, _this.section).map(function (x) {
                    _this.showSuccessAlert(_this.strings.App.SettingsDialog.access.addedGroup.format(name_1, _this.section));
                    var newSecurityGroup = {
                        name: name_1,
                        type: type_1
                    };
                    return newSecurityGroup;
                });
            }
            return Observable.of(target);
        }).catch(function (error) {
            _this.showErrorAlert(Net.getErrorMessage(error));
            return Observable.of(target);
        });
    };
    AddSecurityGroupAction.prototype.calculateEnabled = function (target) {
        return true;
    };
    return AddSecurityGroupAction;
}(SecurityGroupActionBase));
export { AddSecurityGroupAction };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9hY3Rpb25zL2FkZC1zZWNncm91cC5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RTtJQUE0QywwQ0FBMkM7SUFJbkYsZ0NBQ2MsaUJBQW9DLEVBQ3RDLGFBQTRCLEVBQzFCLGFBQTRCLEVBQy9CLE9BQWU7UUFKMUIsWUFNSSxrQkFBTSxpQkFBaUIsRUFBRSxhQUFhLENBQUMsU0FFMUM7UUFQYSx1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3RDLG1CQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzFCLG1CQUFhLEdBQWIsYUFBYSxDQUFlO1FBQy9CLGFBQU8sR0FBUCxPQUFPLENBQVE7UUFQbkIsVUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2xELGVBQVMsR0FBRyx1QkFBdUIsQ0FBQztRQVN2QyxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQzs7SUFDbEQsQ0FBQztJQUVTLDBDQUFTLEdBQW5CLFVBQW9CLE1BQTBCO1FBQTlDLGlCQThCQztRQTVCRyxJQUFNLHdCQUF3QixHQUE2QjtZQUN2RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDL0QsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQzlELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLHVCQUF1QjtZQUN2RSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0I7U0FDdkUsQ0FBQTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDMUIsOEJBQThCLEVBQzlCLHdCQUF3QixDQUFDLENBQUMsT0FBTyxDQUNqQyxVQUFDLE1BQStCO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFNLE1BQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUN6QixJQUFNLE1BQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2dCQUNqQyxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFJLEVBQUUsTUFBSSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO29CQUN0RSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQUksRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDcEcsSUFBSSxnQkFBZ0IsR0FBdUI7d0JBQ3ZDLElBQUksRUFBRSxNQUFJO3dCQUNWLElBQUksRUFBRSxNQUFJO3FCQUNiLENBQUM7b0JBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQ1IsVUFBQyxLQUFLO1lBQ0YsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRVMsaURBQWdCLEdBQTFCLFVBQTJCLE1BQTBCO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FqREEsQUFpREMsQ0FqRDJDLHVCQUF1QixHQWlEbEUiLCJmaWxlIjoiYWRkLXNlY2dyb3VwLmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=