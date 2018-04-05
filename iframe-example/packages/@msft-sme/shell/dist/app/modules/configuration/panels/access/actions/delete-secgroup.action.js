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
var DeleteSecurityGroupAction = /** @class */ (function (_super) {
    __extends(DeleteSecurityGroupAction, _super);
    function DeleteSecurityGroupAction(appContextService, accessService, dialogService, section) {
        var _this = _super.call(this, appContextService, dialogService) || this;
        _this.appContextService = appContextService;
        _this.accessService = accessService;
        _this.dialogService = dialogService;
        _this.section = section;
        _this.confirmationDialogId = 'sme-confirmation-dialog';
        _this.text = _this.strings.App.SettingsDialog.access.delete;
        _this.iconClass = 'sme-icon icon-win-delete';
        _this.actionType = ActionType.DeleteSecurityGroup;
        return _this;
    }
    DeleteSecurityGroupAction.prototype.onExecute = function (target) {
        var _this = this;
        return this.showConfirmationDialog(target).flatMap(function (result) {
            if (result.confirmed) {
                var name_1 = target.name;
                var type = target.type;
                return _this.accessService.deleteSecurityGroup(name_1, type, _this.section).map(function (x) {
                    _this.showSuccessAlert(_this.strings.App.SettingsDialog.access.removedGroup.format(name_1, _this.section));
                    return { confirmed: true };
                });
            }
            return Observable.of(result);
        }).catch(function (error) {
            _this.showErrorAlert(Net.getErrorMessage(error));
            return Observable.of(target);
        });
    };
    DeleteSecurityGroupAction.prototype.calculateEnabled = function (target) {
        return target != null;
    };
    DeleteSecurityGroupAction.prototype.showConfirmationDialog = function (target) {
        return this.dialogService.show(this.confirmationDialogId, {
            cancelButtonText: this.strings.App.SettingsDialog.access.no,
            confirmButtonText: this.strings.App.SettingsDialog.access.yes,
            message: this.strings.App.SettingsDialog.access.deleteConfirmation.format(target.name),
            title: this.strings.App.SettingsDialog.access.delete
        });
    };
    return DeleteSecurityGroupAction;
}(SecurityGroupActionBase));
export { DeleteSecurityGroupAction };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9hY3Rpb25zL2RlbGV0ZS1zZWNncm91cC5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSTdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RTtJQUErQyw2Q0FBMkM7SUFLdEYsbUNBQ2MsaUJBQW9DLEVBQ3RDLGFBQTRCLEVBQzFCLGFBQTRCLEVBQy9CLE9BQWU7UUFKMUIsWUFNSSxrQkFBTSxpQkFBaUIsRUFBRSxhQUFhLENBQUMsU0FFMUM7UUFQYSx1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3RDLG1CQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzFCLG1CQUFhLEdBQWIsYUFBYSxDQUFlO1FBQy9CLGFBQU8sR0FBUCxPQUFPLENBQVE7UUFSbEIsMEJBQW9CLEdBQUcseUJBQXlCLENBQUM7UUFDbEQsVUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3JELGVBQVMsR0FBRywwQkFBMEIsQ0FBQztRQVMxQyxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQzs7SUFDckQsQ0FBQztJQUVTLDZDQUFTLEdBQW5CLFVBQW9CLE1BQTBCO1FBQTlDLGlCQWtCQztRQWhCRyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FDOUMsVUFBQyxNQUFNO1lBQ0gsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQU0sTUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLE1BQUksRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7b0JBQ3pFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBSSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN0RyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQztZQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDUixVQUFDLEtBQUs7WUFDRixLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFUyxvREFBZ0IsR0FBMUIsVUFBMkIsTUFBMEI7UUFDakQsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVPLDBEQUFzQixHQUE5QixVQUErQixNQUEwQjtRQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQXNELElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUMzRyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0QsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQzdELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3RGLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU07U0FDdkQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0EvQ0EsQUErQ0MsQ0EvQzhDLHVCQUF1QixHQStDckUiLCJmaWxlIjoiZGVsZXRlLXNlY2dyb3VwLmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=