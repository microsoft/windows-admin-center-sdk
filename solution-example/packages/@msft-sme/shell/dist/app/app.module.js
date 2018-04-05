var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, UrlTree } from '@angular/router';
import { AlertBarModule, AppErrorHandler, BackdropModule, CoreServiceModule, DialogModule, GuidedPanelModule, IconModule, LoadingWheelModule, NodeCredentialsFormModule, PipesModule, ResourceService, SmeStylesComponent, SmeStylesModule } from '../angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarModule } from './modules/app-bar/app-bar.module';
import { AboutDialogComponent } from './modules/dialogs/about-dialog/about-dialog.component';
import { AddConnectionDialogComponent } from './modules/dialogs/add-connection-dialog/add-connection-dialog.component';
import { AddConnectionFrameComponent } from './modules/dialogs/add-connection-dialog/add-connection-frame/add-connection-frame.component';
import { DayZeroDialogComponent } from './modules/dialogs/day-zero-dialog/day-zero-dialog.component';
import { ManageAsDialogComponent } from './modules/dialogs/manage-as-dialog/manage-as-dialog.component';
import { NotificationsDialogComponent } from './modules/dialogs/notifications-dialog/notifications-dialog.component';
import { SettingsDialogComponent } from './modules/dialogs/settings-dialog/settings-dialog.component';
import { DevGuardService } from './dev-guard.service';
import { IFrameService } from './modules/iframe/iframe.service';
import { ShellGuardService } from './shell-guard.service';
import { ShellComponent } from './shell.component';
import { ShellService } from './shell.service';
var AppModule = (function () {
    /**
     * Initializes a new instance of the AppModule class.
     * @param router the router object.
     */
    function AppModule(router) {
        this.router = router;
        SmeStylesComponent.overridePrimeNgContextMenu();
        this.navigateByUrlOriginal = router.navigateByUrl.bind(router);
        router.navigateByUrl = this.navigateByUrlOverride.bind(this);
    }
    /*
    * Override for the routers main navigation method.
    *
    * WHY?: Angular does not provide a global implementation to preserve query parameters when routing.
    * The one capability they do provide is the 'preservequeryparams' flag in navigation extras.
    * However this does not work with query strings entered by the user on the first url of the site.
    * It also does not work for query strings on the root url. (ie: http://mygateway?param=x)
    *
    * SOLUTION: what we can do is wrap their function with our own that preserves known query parameters before navigating.
    * we do this by reading the current parameters and then merging them with what the router passed in extras.queryParams
    *
    * TODO:
    *   1. Every new version of angular we try, we should see if there is a new way to handle globally preserving query parameters
    *   2. We should provide this override in the our ng2 library so that tool modules can use the same functionality. (done)
    *
    * PROBLEMS:
    *   1. This method prevents the removal of query parameters. Currently this is not a problem but may be in the future.
    *
    */
    AppModule.prototype.navigateByUrlOverride = function (url, extras) {
        if (extras === void 0) { extras = { skipLocationChange: false }; }
        var queryParams = this.router.parseUrl(window.location.search).queryParams;
        if (!(url instanceof UrlTree)) {
            // url parameter preservation does not work on string urls either. convert to UrlTree.
            url = this.router.parseUrl(url);
        }
        // preserve the existing query params and extend with the new ones.
        if (url.queryParams) {
            queryParams = __assign({}, queryParams, url.queryParams);
        }
        url.queryParams = queryParams;
        extras.queryParams = queryParams;
        extras.queryParamsHandling = MsftSme.isNullOrUndefined(extras.queryParamsHandling) ? 'merge' : extras.queryParamsHandling;
        return this.navigateByUrlOriginal(url, extras);
    };
    return AppModule;
}());
export { AppModule };
AppModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AppComponent,
                    ShellComponent,
                    AboutDialogComponent,
                    AddConnectionDialogComponent,
                    AddConnectionFrameComponent,
                    DayZeroDialogComponent,
                    ManageAsDialogComponent,
                    NotificationsDialogComponent,
                    SettingsDialogComponent
                ],
                imports: [
                    CoreServiceModule,
                    CommonModule,
                    BrowserModule,
                    DialogModule,
                    FormsModule,
                    SmeStylesModule,
                    IconModule,
                    LoadingWheelModule,
                    GuidedPanelModule,
                    PipesModule,
                    AppRoutingModule,
                    PipesModule,
                    AlertBarModule,
                    ReactiveFormsModule,
                    AppBarModule,
                    BackdropModule,
                    NodeCredentialsFormModule
                ],
                providers: [
                    ShellService,
                    ResourceService,
                    IFrameService,
                    ShellGuardService,
                    DevGuardService,
                    {
                        provide: ErrorHandler,
                        useClass: AppErrorHandler
                    }
                ],
                bootstrap: [AppComponent]
            },] },
];
/** @nocollapse */
AppModule.ctorParameters = function () { return [
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGlCQUFBLENBQWtCO0FBQy9DLE9BQU8sRUFBRSxZQUFBLEVBQWMsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN2RCxPQUFPLEVBQUUsV0FBQSxFQUFhLG1CQUFBLEVBQW9CLE1BQU8sZ0JBQUEsQ0FBaUI7QUFDbEUsT0FBTyxFQUFFLGFBQUEsRUFBYyxNQUFPLDJCQUFBLENBQTRCO0FBQzFELE9BQU8sRUFBb0IsTUFBQSxFQUFRLE9BQUEsRUFBUSxNQUFPLGlCQUFBLENBQWtCO0FBQ3BFLE9BQU8sRUFDSCxjQUFjLEVBRWQsZUFBZSxFQUNmLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLHlCQUF5QixFQUN6QixXQUFXLEVBQ1gsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixlQUFlLEVBQ2xCLE1BQU0sWUFBQSxDQUFhO0FBQ3BCLE9BQU8sRUFBRSxnQkFBQSxFQUFpQixNQUFPLHNCQUFBLENBQXVCO0FBQ3hELE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sa0NBQUEsQ0FBbUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8sdURBQUEsQ0FBd0Q7QUFDN0YsT0FBTyxFQUFFLDRCQUFBLEVBQTZCLE1BQU8seUVBQUEsQ0FBMEU7QUFDdkgsT0FBTyxFQUFFLDJCQUFBLEVBQTRCLE1BQU8sNkZBQUEsQ0FBOEY7QUFDMUksT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNkRBQUEsQ0FBOEQ7QUFDckcsT0FBTyxFQUFFLHVCQUFBLEVBQXdCLE1BQU8sK0RBQUEsQ0FBZ0U7QUFDeEcsT0FBTyxFQUFFLDRCQUFBLEVBQTZCLE1BQU8sdUVBQUEsQ0FBd0U7QUFDckgsT0FBTyxFQUFFLHVCQUFBLEVBQXdCLE1BQU8sNkRBQUEsQ0FBOEQ7QUFFdEcsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxxQkFBQSxDQUFzQjtBQUN0RCxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8saUNBQUEsQ0FBa0M7QUFDaEUsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sdUJBQUEsQ0FBd0I7QUFDMUQsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLG1CQUFBLENBQW9CO0FBQ25ELE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUcvQztJQUdJOzs7T0FHRztJQUNILG1CQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM5QixrQkFBa0IsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBRWhELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFrQkU7SUFDTSx5Q0FBcUIsR0FBN0IsVUFBOEIsR0FBcUIsRUFBRSxNQUF3RDtRQUF4RCx1QkFBQSxFQUFBLFdBQTZCLGtCQUFrQixFQUFFLEtBQUssRUFBRTtRQUN6RyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUMzRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixzRkFBc0Y7WUFDdEYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxtRUFBbUU7UUFDbkUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEIsV0FBVyxnQkFBUSxXQUFXLEVBQUssR0FBRyxDQUFDLFdBQVcsQ0FBRSxDQUFDO1FBQ3pELENBQUM7UUFFRCxHQUFHLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUM5QixNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxNQUFNLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7UUFDMUgsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQW1ETCxnQkFBQztBQUFELENBcEdBLEFBb0dDOztBQWxETSxvQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLFlBQVksRUFBRTtvQkFDVixZQUFZO29CQUNaLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQiw0QkFBNEI7b0JBQzVCLDJCQUEyQjtvQkFDM0Isc0JBQXNCO29CQUN0Qix1QkFBdUI7b0JBQ3ZCLDRCQUE0QjtvQkFDNUIsdUJBQXVCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsaUJBQWlCO29CQUNqQixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixXQUFXO29CQUNYLGVBQWU7b0JBQ2YsVUFBVTtvQkFDVixrQkFBa0I7b0JBQ2xCLGlCQUFpQjtvQkFDakIsV0FBVztvQkFDWCxnQkFBZ0I7b0JBQ2hCLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osY0FBYztvQkFDZCx5QkFBeUI7aUJBQzVCO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxZQUFZO29CQUNaLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2Y7d0JBQ0ksT0FBTyxFQUFFLFlBQVk7d0JBQ3JCLFFBQVEsRUFBRSxlQUFlO3FCQUM1QjtpQkFDSjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDNUIsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHdCQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7Q0FDZixFQUY2RixDQUU3RixDQUFDIiwiZmlsZSI6ImFwcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9