import { Component } from '@angular/core';
import { AppContextService } from '../../../angular';
import { Logging, Net, NotificationState } from '../../../core';
import { ShellService } from '../../shell.service';
var OverviewComponent = /** @class */ (function () {
    function OverviewComponent(appContextService, shellService) {
        this.appContextService = appContextService;
        this.shellService = shellService;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App;
    }
    OverviewComponent.prototype.ngOnInit = function () {
        Logging.trace({
            view: 'sme-overview',
            instance: '',
            action: 'ngOnInit'
        });
        this.getGatewayInventory();
    };
    OverviewComponent.prototype.ngOnDestroy = function () {
        this.statusSubscription.unsubscribe();
    };
    OverviewComponent.prototype.getGatewayInventory = function () {
        var _this = this;
        this.statusSubscription = this.shellService.inventoryCaches.gatewayCombinedCache.createObservable({})
            .subscribe(function (_a) {
            var status = _a[0], detail = _a[1];
            _this.gatewayLastUpdated = status.installedDate;
            _this.isUpdateAvailable = _this.shellService.compareVersions(status.gatewayVersion, detail.latestVersion) === 1;
        }, function (error) {
            _this.appContextService.notification.alert('', NotificationState.Error, Net.getErrorMessage(error));
            _this.isUpdateAvailable = false;
        });
    };
    OverviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-overview',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v\">\n          <section class=\"sme-position-flex-none sme-scheme-banner sme-padding-squish-v-xl sme-arrange-stack-h\" role=\"banner\" aria-labelledby=\"sme-shell-main-banner\">\n              <h2 id=\"sme-shell-main-banner\">{{strings.Shell.applicationTitle}} {{strings.Shell.applicationTitleSuffix}}</h2>\n              <a *ngIf=\"isUpdateAvailable\" class=\"sme-margin-left-sm sme-padding-squish-v-xs\" href=\"{{strings.Overview.gatewayStatus.smeUpdateUri}}\">{{strings.Overview.gatewayStatus.updateAvailable}}</a>\n          </section>\n          <h3 class=\"sme-position-flex-none sme-padding-squish-v-xl\" id=\"sme-shell-connection-list-title\">{{strings.Connections.title}}</h3>\n          <sme-connections-list class=\"sme-layout-relative sme-position-flex-auto\" role=\"main\" aria-labelledby=\"sme-shell-connection-list-title\">\n          </sme-connections-list>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    OverviewComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: ShellService, },
    ]; };
    return OverviewComponent;
}());
export { OverviewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL292ZXJ2aWV3L292ZXJ2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFHN0QsT0FBTyxFQUFpQixpQkFBQSxFQUFrQixNQUFPLGtCQUFBLENBQW1CO0FBQ3BFLE9BQU8sRUFDSCxPQUFPLEVBR1AsR0FBRyxFQUNILGlCQUFpQixFQUVELE1BQU8sZUFBQSxDQUFnQjtBQUUzQyxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8scUJBQUEsQ0FBc0I7QUFHbkQ7SUFRSSwyQkFBb0IsaUJBQW9DLEVBQVUsWUFBMEI7UUFBeEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBUHJGLFlBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO0lBT3lCLENBQUM7SUFFekYsb0NBQVEsR0FBZjtRQUNJLE9BQU8sQ0FBQyxLQUFLLENBQWtCO1lBQzNCLElBQUksRUFBRSxjQUFjO1lBQ3BCLFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLFVBQVU7U0FDckIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVNLHVDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTywrQ0FBbUIsR0FBM0I7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7YUFDaEcsU0FBUyxDQUNOLFVBQUMsRUFBZ0I7Z0JBQWYsY0FBTSxFQUFFLGNBQU07WUFDWixLQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUMvQyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xILENBQUMsRUFDRCxVQUFDLEtBQWdCO1lBQ2IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkcsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFRSw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsbTlCQVVUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsWUFBWSxHQUFHO0tBQ3JCLEVBSDZGLENBRzdGLENBQUM7SUFDRix3QkFBQztDQTFERCxBQTBEQyxJQUFBO1NBMURZLGlCQUFpQiIsImZpbGUiOiJvdmVydmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9