import { ViewChildren } from '@angular/core';
import { CommonSettingsIsolatedSettingsComponent } from '../common-settings/common-settings-isolated-settings.component';
var CommonSettingsIsolatedSettingsBaseComponent = /** @class */ (function () {
    function CommonSettingsIsolatedSettingsBaseComponent() {
    }
    CommonSettingsIsolatedSettingsBaseComponent.prototype.canDeactivate = function (route, state) {
        if (this.isolatedSettingsComponent && this.isolatedSettingsComponent.first) {
            return this.isolatedSettingsComponent.first.canDeactivate(this, route, state);
        }
        return true;
    };
    CommonSettingsIsolatedSettingsBaseComponent.propDecorators = {
        'isolatedSettingsComponent': [{ type: ViewChildren, args: [CommonSettingsIsolatedSettingsComponent,] },],
    };
    return CommonSettingsIsolatedSettingsBaseComponent;
}());
export { CommonSettingsIsolatedSettingsBaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3MvY29tbW9uLXNldHRpbmdzL2NvbW1vbi1zZXR0aW5ncy1pc29sYXRlZC1zZXR0aW5ncy1iYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtFLFlBQUEsRUFBYSxNQUFPLGVBQUEsQ0FBZ0I7QUFTN0csT0FBTyxFQUFFLHVDQUFBLEVBQXdDLE1BQU8sZ0VBQUEsQ0FBaUU7QUFLekg7SUFBQTtJQXFCQSxDQUFDO0lBaEJVLG1FQUFhLEdBQXBCLFVBQ0ksS0FBNkIsRUFDN0IsS0FBMEI7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixJQUFJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFLRSwwREFBYyxHQUEyQztRQUNoRSwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRyxFQUFFLEVBQUU7S0FDeEcsQ0FBQztJQUNGLGtEQUFDO0NBckJELEFBcUJDLElBQUE7U0FyQnFCLDJDQUEyQyIsImZpbGUiOiJjb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQtc2V0dGluZ3MtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9