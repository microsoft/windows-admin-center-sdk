import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSettingsComponent } from './common-settings.component';
var CommonSettingsIsolatedSettingsComponent = (function () {
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
    return CommonSettingsIsolatedSettingsComponent;
}());
export { CommonSettingsIsolatedSettingsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3MvY29tbW9uLXNldHRpbmdzL2NvbW1vbi1zZXR0aW5ncy1pc29sYXRlZC1zZXR0aW5ncy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBc0QsS0FBQSxFQUFpQyxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBQ2pJLE9BQU8sRUFDSCxjQUFjLEVBSWQsTUFBTSxFQUdULE1BQU0saUJBQUEsQ0FBa0I7QUFTekIsT0FBTyxFQUFFLHVCQUFBLEVBQXdCLE1BQU8sNkJBQUEsQ0FBOEI7QUFLdEU7SUFjSSxpREFBb0IsTUFBYyxFQUFVLGNBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBSSxDQUFDO0lBRXhFLCtEQUFhLEdBQXBCLFVBQ0ksU0FBaUMsRUFDakMsS0FBNkIsRUFDN0IsS0FBMEI7UUFDMUIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUF3QkwsOENBQUM7QUFBRCxDQWxEQSxBQWtEQzs7QUF2Qk0sa0RBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCxRQUFRLEVBQUUsbVFBTVQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsc0RBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztJQUNoQixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7Q0FDdkIsRUFINkYsQ0FHN0YsQ0FBQztBQUNLLHNEQUFjLEdBQTJDO0lBQ2hFLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ25DLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzlCLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQy9CLHlCQUF5QixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLHVCQUF1QixFQUFHLEVBQUUsRUFBRTtDQUNuRixDQUFDIiwiZmlsZSI6ImNvbW1vbi1zZXR0aW5ncy1pc29sYXRlZC1zZXR0aW5ncy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9