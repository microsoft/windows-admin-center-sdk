import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService, DialogService } from '../angular';
import { Logging, NotificationState } from '../core';
import { DayZeroDialogComponent } from './modules/dialogs/day-zero-dialog/day-zero-dialog.component';
import { ShellService } from './shell.service';
import { RouteHelpers } from './utility/route-helpers';
var ShellComponent = /** @class */ (function () {
    function ShellComponent(appContextService, shellService, dialogService, activeRoute) {
        this.appContextService = appContextService;
        this.shellService = shellService;
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
        Logging.trace({ view: 'sme-shell', instance: '', action: 'ngOnInit' });
        // In the E2E test, we want to disable the Day Zero dialog by setting the URL parameter "disableDayZero" to true.
        if (!this.activeRoute.snapshot.queryParams[RouteHelpers.queryParams.disableDayZero]) {
            this.shellService.getShellUserSettings()
                .flatMap(function (settings) {
                if (settings.dayZeroEnabled) {
                    return _this.dialogService.show(DayZeroDialogComponent.dayZeroDialogComponentId, {})
                        .flatMap(function () { return settings.trySave(function () { return settings.completeDayZeroExperience(); }); });
                }
                return Observable.of(null);
            })
                .catch(function (error) {
                _this.appContextService.notification.alert(null, NotificationState.Error, _this.strings.MsftSmeShell.App.Shell.getUserProfileError.format(error));
                return null;
            })
                .take(1) // take(1) ensures the observable chain is cleaned up.
                .subscribe();
        }
    };
    ShellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-shell',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none\">\n          <router-outlet></router-outlet>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ShellComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: ShellService, },
        { type: DialogService, },
        { type: ActivatedRoute, },
    ]; };
    return ShellComponent;
}());
export { ShellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGVsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxjQUFBLEVBQStDLE1BQU8saUJBQUEsQ0FBa0I7QUFDakYsT0FBTyxFQUFFLFVBQUEsRUFBeUIsTUFBTyxNQUFBLENBQU87QUFDaEQsT0FBTyxFQUFFLGlCQUFBLEVBQW1CLGFBQUEsRUFBMEIsTUFBTyxZQUFBLENBQWE7QUFDMUUsT0FBTyxFQUlILE9BQU8sRUFDUCxpQkFBaUIsRUFFcEIsTUFBTSxTQUFBLENBQVU7QUFFakIsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNkRBQUEsQ0FBOEQ7QUFDckcsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyx5QkFBQSxDQUEwQjtBQUd2RDtJQWNJLHdCQUNZLGlCQUFvQyxFQUNwQyxZQUEwQixFQUMxQixhQUE0QixFQUM1QixXQUEyQjtRQUgzQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQVcsQ0FBQztJQUN6RSxDQUFDO0lBakJEOzs7OztPQUtHO0lBQ1csOEJBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsNkRBQTZEO1FBQzdELE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztJQUN2RixDQUFDO0lBVU0saUNBQVEsR0FBZjtRQUFBLGlCQW9CQztRQW5CRyxPQUFPLENBQUMsS0FBSyxDQUFrQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN4RixpSEFBaUg7UUFDakgsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRTtpQkFDbkMsT0FBTyxDQUFDLFVBQUEsUUFBUTtnQkFDYixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQzt5QkFDbEYsT0FBTyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMseUJBQXlCLEVBQUUsRUFBcEMsQ0FBb0MsQ0FBQyxFQUE1RCxDQUE0RCxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQ3JDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtpQkFDOUQsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFDRSx5QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsb0lBSVQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDZCQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztRQUMzQixFQUFDLElBQUksRUFBRSxZQUFZLEdBQUc7UUFDdEIsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO1FBQ3ZCLEVBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRztLQUN2QixFQUw2RixDQUs3RixDQUFDO0lBQ0YscUJBQUM7Q0E1REQsQUE0REMsSUFBQTtTQTVEWSxjQUFjIiwiZmlsZSI6InNoZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=