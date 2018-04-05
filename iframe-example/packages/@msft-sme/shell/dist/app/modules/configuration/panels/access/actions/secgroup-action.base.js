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
import { ActionButtonAsync } from '../../../../../../angular';
import { NotificationState } from '../../../../../../core';
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["NewSecurityGroup"] = 0] = "NewSecurityGroup";
    ActionType[ActionType["DeleteSecurityGroup"] = 1] = "DeleteSecurityGroup";
})(ActionType || (ActionType = {}));
var SecurityGroupActionBase = /** @class */ (function (_super) {
    __extends(SecurityGroupActionBase, _super);
    function SecurityGroupActionBase(appContextService, dialogService) {
        var _this = _super.call(this) || this;
        _this.appContextService = appContextService;
        _this.dialogService = dialogService;
        _this.strings = _this.appContextService.resourceCache.getStrings().MsftSmeShell;
        return _this;
    }
    SecurityGroupActionBase.prototype.showStartingAlert = function (message) {
        this.appContextService.notification.alert(this.appContextService.gateway.gatewayName, NotificationState.Informational, message);
    };
    SecurityGroupActionBase.prototype.showErrorAlert = function (message) {
        this.appContextService.notification.alert(this.appContextService.gateway.gatewayName, NotificationState.Error, message);
    };
    SecurityGroupActionBase.prototype.showSuccessAlert = function (message) {
        this.appContextService.notification.alert(this.appContextService.gateway.gatewayName, NotificationState.Success, message);
    };
    SecurityGroupActionBase.prototype.setActionState = function (target, container) {
        _super.prototype.setActionState.call(this, target, container);
        this.busy = false;
        this.enabled = this.calculateEnabled(target);
    };
    return SecurityGroupActionBase;
}(ActionButtonAsync));
export { SecurityGroupActionBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9hY3Rpb25zL3NlY2dyb3VwLWFjdGlvbi5iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEVBQ0gsaUJBQWlCLEVBTXBCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHM0QsTUFBTSxDQUFOLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNsQixtRUFBb0IsQ0FBQTtJQUNwQix5RUFBdUIsQ0FBQTtBQUMzQixDQUFDLEVBSFcsVUFBVSxLQUFWLFVBQVUsUUFHckI7QUFFRDtJQUF5RCwyQ0FBb0I7SUFJekUsaUNBQ2MsaUJBQW9DLEVBQ3BDLGFBQTRCO1FBRjFDLFlBSUksaUJBQU8sU0FDVjtRQUphLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWEsR0FBYixhQUFhLENBQWU7UUFMaEMsYUFBTyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFXLENBQUMsWUFBWSxDQUFDOztJQVE1RixDQUFDO0lBRVMsbURBQWlCLEdBQTNCLFVBQTRCLE9BQWU7UUFDdkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRVMsZ0RBQWMsR0FBeEIsVUFBeUIsT0FBZTtRQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUgsQ0FBQztJQUVTLGtEQUFnQixHQUExQixVQUEyQixPQUFlO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5SCxDQUFDO0lBRU0sZ0RBQWMsR0FBckIsVUFBc0IsTUFBUyxFQUFFLFNBQTBCO1FBQ3ZELGlCQUFNLGNBQWMsWUFBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdMLDhCQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsQ0FoQ3dELGlCQUFpQixHQWdDekUiLCJmaWxlIjoic2VjZ3JvdXAtYWN0aW9uLmJhc2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9