import { ViewChildren } from '@angular/core';
import { CommonSettingsComponent } from '../common-settings/common-settings.component';
import { SingleSettingComponent } from '../common-settings/single-setting.component';
var CommonSettingsComponentBase = /** @class */ (function () {
    function CommonSettingsComponentBase() {
    }
    CommonSettingsComponentBase.prototype.canDeactivate = function (route, state) {
        if (this.commonSettingsComponent && this.commonSettingsComponent.first) {
            return this.commonSettingsComponent.first.canDeactivate(this, route, state);
        }
        return true;
    };
    Object.defineProperty(CommonSettingsComponentBase.prototype, "combinedForm", {
        get: function () {
            if (this.commonSettingsComponent && this.commonSettingsComponent.first && this.commonSettingsComponent.first.combinedForm) {
                return this.commonSettingsComponent.first.combinedForm;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    CommonSettingsComponentBase.propDecorators = {
        'commonSettingsComponent': [{ type: ViewChildren, args: [CommonSettingsComponent,] },],
    };
    return CommonSettingsComponentBase;
}());
export { CommonSettingsComponentBase };
var SingleSettingComponentBase = /** @class */ (function () {
    function SingleSettingComponentBase() {
    }
    SingleSettingComponentBase.prototype.canDeactivate = function (route, state) {
        if (this.singleSettingComponent && this.singleSettingComponent.first) {
            return this.singleSettingComponent.first.canDeactivate(this, route, state);
        }
        return true;
    };
    SingleSettingComponentBase.propDecorators = {
        'singleSettingComponent': [{ type: ViewChildren, args: [SingleSettingComponent,] },],
    };
    return SingleSettingComponentBase;
}());
export { SingleSettingComponentBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3MvY29tbW9uLXNldHRpbmdzL2NvbW1vbi1zZXR0aW5ncy1jb21wb25lbnQtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtFLFlBQUEsRUFBYSxNQUFPLGVBQUEsQ0FBZ0I7QUFVN0csT0FBTyxFQUFFLHVCQUFBLEVBQXdCLE1BQU8sOENBQUEsQ0FBK0M7QUFDdkYsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNkNBQUEsQ0FBOEM7QUFHckY7SUFBQTtJQTZCQSxDQUFDO0lBeEJVLG1EQUFhLEdBQXBCLFVBQ0ksS0FBNkIsRUFDN0IsS0FBMEI7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFNRCxzQkFBVyxxREFBWTthQUF2QjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDeEgsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQzNELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBO0lBQ0UsMENBQWMsR0FBMkM7UUFDaEUseUJBQXlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsdUJBQXVCLEVBQUcsRUFBRSxFQUFFO0tBQ3RGLENBQUM7SUFDRixrQ0FBQztDQTdCRCxBQTZCQyxJQUFBO1NBN0JxQiwyQkFBMkI7QUErQmpEO0lBQUE7SUFxQkEsQ0FBQztJQWhCVSxrREFBYSxHQUFwQixVQUNJLEtBQTZCLEVBQzdCLEtBQTBCO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBS0UseUNBQWMsR0FBMkM7UUFDaEUsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsc0JBQXNCLEVBQUcsRUFBRSxFQUFFO0tBQ3BGLENBQUM7SUFDRixpQ0FBQztDQXJCRCxBQXFCQyxJQUFBO1NBckJxQiwwQkFBMEIiLCJmaWxlIjoiY29tbW9uLXNldHRpbmdzLWNvbXBvbmVudC1iYXNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==