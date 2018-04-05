import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Logging, NotificationState } from '../core';
import { DayZeroDialogComponent } from './modules/dialogs/day-zero-dialog/day-zero-dialog.component';
import { ShellService } from './shell.service';
import { RouteHelpers } from './utility/route-helpers';
var ShellComponent = (function () {
    function ShellComponent(appContextService, shellService, userProfileService, dialogService, activeRoute) {
        this.appContextService = appContextService;
        this.shellService = shellService;
        this.userProfileService = userProfileService;
        this.dialogService = dialogService;
        this.activeRoute = activeRoute;
        this.strings = appContextService.resourceCache.getStrings();
    }
    /**
     * Update the navigation title.
     *
     * @param appContextService the application context service.
     * @param snapshot the route snapshot.
     */
    ShellComponent.navigationTitle = function (appContextService, snapshot) {
        // this is default view. Don't want to include as a sub menu.
        return MsftSme.resourcesStrings().MsftSmeShell.App.Shell.applicationTitle;
    };
    ShellComponent.prototype.ngOnInit = function () {
        var _this = this;
        var dayZeroVersionSettingName = 'dayZeroVersion';
        var currentDayZeroVersion = 1;
        Logging.trace({ view: 'sme-shell', instance: '', action: 'ngOnInit' });
        // In the E2E test, we want to disable the Day Zero dialog by setting the URL parameter "disableDayZero" to true.
        if (!this.activeRoute.snapshot.queryParams[RouteHelpers.queryParams.disableDayZero]) {
            this.userProfileSubscription = this.userProfileService.getModuleSettings(dayZeroVersionSettingName).flatMap(function (dayZeroVersion) {
                if (dayZeroVersion === null || dayZeroVersion !== currentDayZeroVersion) {
                    _this.shellService.dayZeroEnabled = true;
                    _this.dialogService.show(DayZeroDialogComponent.dayZeroDialogComponentId, {}).subscribe();
                    return _this.userProfileService.setModuleSettings(dayZeroVersionSettingName, currentDayZeroVersion)
                        .map(function (x) { return dayZeroVersion; });
                }
                return Observable.of(dayZeroVersion);
            }).catch(function (error) {
                _this.appContextService.notification.alert(null, NotificationState.Error, _this.strings.MsftSmeShell.App.Shell.getUserProfileError.format(error));
                return null;
            }).subscribe();
        }
    };
    ShellComponent.prototype.ngOnDestroy = function () {
        this.userProfileSubscription.unsubscribe();
    };
    return ShellComponent;
}());
export { ShellComponent };
ShellComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-shell',
                template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none\">\n          <router-outlet></router-outlet>\n      </div>\n    "
            },] },
];
/** @nocollapse */
ShellComponent.ctorParameters = function () { return [
    null,
    { type: ShellService, },
    null,
    null,
    { type: ActivatedRoute, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGVsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxjQUFBLEVBQStDLE1BQU8saUJBQUEsQ0FBa0I7QUFDakYsT0FBTyxFQUFFLFVBQUEsRUFBeUIsTUFBTyxNQUFBLENBQU87QUFFaEQsT0FBTyxFQUlILE9BQU8sRUFDUCxpQkFBaUIsRUFFcEIsTUFBTSxTQUFBLENBQVU7QUFFakIsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNkRBQUEsQ0FBOEQ7QUFDckcsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyx5QkFBQSxDQUEwQjtBQUd2RDtJQWVJLHdCQUNZLGlCQUFvQyxFQUNwQyxZQUEwQixFQUMxQixrQkFBc0MsRUFDdEMsYUFBNEIsRUFDNUIsV0FBMkI7UUFKM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQVcsQ0FBQztJQUN6RSxDQUFDO0lBbEJEOzs7OztPQUtHO0lBQ1csOEJBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsNkRBQTZEO1FBQzdELE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztJQUN2RixDQUFDO0lBV00saUNBQVEsR0FBZjtRQUFBLGlCQXdCQztRQXZCRyxJQUFNLHlCQUF5QixHQUFHLGdCQUFnQixDQUFDO1FBQ25ELElBQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFDO1FBRWhDLE9BQU8sQ0FBQyxLQUFLLENBQWtCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXhGLGlIQUFpSDtRQUNqSCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFTLHlCQUF5QixDQUFDLENBQUMsT0FBTyxDQUMvRyxVQUFBLGNBQWM7Z0JBQ1YsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLElBQUksSUFBSSxjQUFjLEtBQUsscUJBQXFCLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxLQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBQ3hDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN6RixNQUFNLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLHlCQUF5QixFQUFFLHFCQUFxQixDQUFDO3lCQUM3RixHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxjQUFjLEVBQWQsQ0FBYyxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7Z0JBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDVixLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDckMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBRU0sb0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQW1CTCxxQkFBQztBQUFELENBdkVBLEFBdUVDOztBQWxCTSx5QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsb0lBSVQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsNkJBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7SUFDSixFQUFDLElBQUksRUFBRSxZQUFZLEdBQUc7SUFDdEIsSUFBSTtJQUNKLElBQUk7SUFDSixFQUFDLElBQUksRUFBRSxjQUFjLEdBQUc7Q0FDdkIsRUFONkYsQ0FNN0YsQ0FBQyIsImZpbGUiOiJzaGVsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9