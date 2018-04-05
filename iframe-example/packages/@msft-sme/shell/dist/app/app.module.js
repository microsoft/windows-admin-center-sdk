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
import { AlertBarModule, AppErrorHandler, BackdropModule, CoreServiceModule, DialogModule, GuidedPanelModule, IconModule, LoadingWheelModule, NodeCredentialsFormModule, PipesModule, ResourceService, SmeFormsModule, SmeStylesComponent, SmeStylesModule } from '../angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarModule } from './modules/app-bar/app-bar.module';
import { AboutDialogComponent } from './modules/dialogs/about-dialog/about-dialog.component';
import { AddConnectionDialogComponent } from './modules/dialogs/add-connection-dialog/add-connection-dialog.component';
import { AddConnectionFrameComponent } from './modules/dialogs/add-connection-dialog/add-connection-frame/add-connection-frame.component';
import { DayZeroDialogComponent } from './modules/dialogs/day-zero-dialog/day-zero-dialog.component';
import { EditTagsDialogComponent } from './modules/dialogs/edit-tags-dialog/edit-tags-dialog.component';
import { LoadingConnectionDialogComponent } from './modules/dialogs/loading-connection-dialog/loading-connection-dialog.component';
import { ManageAsDialogComponent } from './modules/dialogs/manage-as-dialog/manage-as-dialog.component';
import { NotificationsDialogComponent } from './modules/dialogs/notifications-dialog/notifications-dialog.component';
import { DevGuardService } from './dev-guard.service';
import { IFrameService } from './modules/iframe/iframe.service';
import { UserProfileService } from './modules/user-profile/user-profile.service';
import { ShellGuardService } from './shell-guard.service';
import { ShellComponent } from './shell.component';
import { ShellService } from './shell.service';
import { WebModeGuardService } from './web-mode-guard.service';
var AppModule = /** @class */ (function () {
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
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AppComponent,
                        ShellComponent,
                        AboutDialogComponent,
                        AddConnectionDialogComponent,
                        AddConnectionFrameComponent,
                        DayZeroDialogComponent,
                        EditTagsDialogComponent,
                        LoadingConnectionDialogComponent,
                        ManageAsDialogComponent,
                        NotificationsDialogComponent
                    ],
                    imports: [
                        CoreServiceModule,
                        CommonModule,
                        BrowserModule,
                        DialogModule,
                        FormsModule,
                        SmeFormsModule,
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
                        UserProfileService,
                        WebModeGuardService,
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
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=data:application/json;base64,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d0JBQ2hCLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCx5QkFBeUI7cUJBQzVCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2Ysa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25COzRCQUNJLE9BQU8sRUFBRSxZQUFZOzRCQUNyQixRQUFRLEVBQUUsZUFBZTt5QkFDNUI7cUJBQ0o7b0JBQ0QsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDO2lCQUM1QixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsd0JBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztLQUNmLEVBRjZGLENBRTdGLENBQUM7SUFDRixnQkFBQztDQXhHRCxBQXdHQyxJQUFBO1NBeEdZLFNBQVMiLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=