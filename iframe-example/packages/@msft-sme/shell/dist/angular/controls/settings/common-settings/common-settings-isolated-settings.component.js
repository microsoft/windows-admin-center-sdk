import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSettingsComponent } from './common-settings.component';
var CommonSettingsIsolatedSettingsComponent = /** @class */ (function () {
    function CommonSettingsIsolatedSettingsComponent(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    CommonSettingsIsolatedSettingsComponent.prototype.canDeactivate = function (component, route, state) {
        var continueNavigation = true;
        if (this.commonSettingsComponent) {
            return this.commonSettingsComponent.canDeactivate(component, route, state);
        }
        return true;
    };
    CommonSettingsIsolatedSettingsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-common-settings-isolated-settings',
                    template: "\n      <sme-common-settings [backRoute]=\"backRoute\" [settingsTitle]=\"settingsTitle\" [settings]=\"settings\">\n        <sme-settings-content>\n          <router-outlet></router-outlet>\n        </sme-settings-content>\n      </sme-common-settings>\n    "
                },] },
    ];
    /** @nocollapse */
    CommonSettingsIsolatedSettingsComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: ActivatedRoute, },
    ]; };
    CommonSettingsIsolatedSettingsComponent.propDecorators = {
        'settingsTitle': [{ type: Input },],
        'settings': [{ type: Input },],
        'backRoute': [{ type: Input },],
        'commonSettingsComponent': [{ type: ViewChild, args: [CommonSettingsComponent,] },],
    };
    return CommonSettingsIsolatedSettingsComponent;
}());
export { CommonSettingsIsolatedSettingsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3MvY29tbW9uLXNldHRpbmdzL2NvbW1vbi1zZXR0aW5ncy1pc29sYXRlZC1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBc0QsS0FBQSxFQUFpQyxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBQ2pJLE9BQU8sRUFDSCxjQUFjLEVBSWQsTUFBTSxFQUdULE1BQU0saUJBQUEsQ0FBa0I7QUFTekIsT0FBTyxFQUFFLHVCQUFBLEVBQXdCLE1BQU8sNkJBQUEsQ0FBOEI7QUFLdEU7SUFjSSxpREFBb0IsTUFBYyxFQUFVLGNBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBSSxDQUFDO0lBRXhFLCtEQUFhLEdBQXBCLFVBQ0ksU0FBaUMsRUFDakMsS0FBNkIsRUFDN0IsS0FBMEI7UUFDMUIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRSxrREFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSx1Q0FBdUM7b0JBQ2pELFFBQVEsRUFBRSxtUUFNVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0RBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztRQUNoQixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7S0FDdkIsRUFINkYsQ0FHN0YsQ0FBQztJQUNLLHNEQUFjLEdBQTJDO1FBQ2hFLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ25DLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzlCLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQy9CLHlCQUF5QixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLHVCQUF1QixFQUFHLEVBQUUsRUFBRTtLQUNuRixDQUFDO0lBQ0YsOENBQUM7Q0FsREQsQUFrREMsSUFBQTtTQWxEWSx1Q0FBdUMiLCJmaWxlIjoiY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLXNldHRpbmdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=