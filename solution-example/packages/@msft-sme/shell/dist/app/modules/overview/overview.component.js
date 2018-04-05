import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GatewayInventoryCache, GatewayInventoryDetailCache, Logging, Net, NotificationState } from '../../../core';
var OverviewComponent = (function () {
    function OverviewComponent(appContextService) {
        this.appContextService = appContextService;
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
        var statusExpiration = 4 * 60 * 1000; // 4 min
        var versionExpiration = 4 * 60 * 60 * 1000; // 4 hrs
        this.statusSubscription = Observable.zip(new GatewayInventoryCache(this.appContextService, { expiration: statusExpiration }).query({ name: 'gateway' }), new GatewayInventoryDetailCache(this.appContextService, { expiration: versionExpiration }).query({ name: 'gateway' }))
            .subscribe(function (_a) {
            var status = _a[0], detail = _a[1];
            _this.productVersion = '1.0.4-PrivatePreview';
            _this.gatewayLastUpdated = status.instance.installedDate;
            _this.isUpdateAvailable = _this.compareVersions(status.instance.gatewayVersion, detail.instance.latestVersion) === 1;
        }, function (error) {
            _this.appContextService.notification.alert('', NotificationState.Error, Net.getErrorMessage(error));
            _this.isUpdateAvailable = false;
        });
    };
    /**
     * Compares two software versions, assuming that a valid version is a 4 part dot separated number.
     *
     * @param currentVersion The current software version.
     * @param targetVersion The version that is available for download.
     *
     * @returns 0 if versions are the same; 1 if a newer version is available for download; -1 for a current version that is downlevel.
     */
    OverviewComponent.prototype.compareVersions = function (currentVersion, targetVersion) {
        if (MsftSme.isNull(currentVersion) || MsftSme.isNull(targetVersion)) {
            return 0;
        }
        var currentVersionParts = currentVersion.split('.').map(Number);
        // Target version is going to be hyphen separated as opposed to dot; due to limitations from aka.ms site.
        var targetVersionParts = targetVersion.split('-').map(Number);
        // We don't want to be too strict on the format; and allow ourselves room for
        // change in the future without breaking customers experience.
        if (currentVersionParts.length !== 4 || targetVersionParts.length !== 4) {
            return 0;
        }
        // Always assuming a 4 part number.
        for (var i = 0; i <= 3; i++) {
            if (targetVersionParts[i] === currentVersionParts[i]) {
                continue;
            }
            else if (targetVersionParts[i] > currentVersionParts[i]) {
                return 1;
            }
            else {
                return -1;
            }
        }
        return 0;
    };
    return OverviewComponent;
}());
export { OverviewComponent };
OverviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-overview',
                template: "\n      <div class=\"stretch-absolute flex-layout vertical vertical-scroll-only\">\n        <section class=\"fixed-flex-size banner flex-layout vertical\">\n          <div class=\"auto-flex-size\" role=\"region\" aria-labelledby=\"Heading\" aria-describedby=\"Heading\">\n            <h2 id=\"Heading\">{{strings.Shell.applicationTitle}} {{strings.Shell.applicationTitleSuffix}}</h2>\n            <div class=\"update-link\" *ngIf=\"isUpdateAvailable\"><a href=\"{{strings.Overview.gatewayStatus.smeUpdateUri}}\">{{strings.Overview.gatewayStatus.updateAvailable}}</a></div>\n          </div>    \n        </section>\n        <section class=\"auto-flex-size relative flex-layout vertical\">\n          <sme-tool-header>{{strings.Connections.title}}</sme-tool-header>\n          <sme-connections-list class=\"auto-flex-size relative\">\n          </sme-connections-list>\n        </section>\n      </div>\n    ",
                styles: ["\n      .banner {\n        background: #05ACFF;\n        background: -moz-linear-gradient(-210deg, rgba(0,120,215,1) 40%, rgba(6,152,234,1) 100%); /* FF3.6-15 */\n        background: -webkit-linear-gradient(-210deg, rgba(0,120,215,1) 40%,rgba(6,152,234,1) 100%); /* Chrome10-25,Safari5.1-6 */\n        background: linear-gradient(30deg, rgba(0,120,215,1) 40%,rgba(6,152,234,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0078d7', endColorstr='#0698ea',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */\n        color: white;\n        padding: 24px 32px;;\n      }\n\n      .banner >>> a {\n        color: white;\n        text-decoration: underline;\n      }\n\n      .banner >>>  a:hover, .banner >>>  a:focus, .banner >>> a:active {\n        color: white;\n        text-decoration: none;\n      }\n\n      .banner >>> .progress-cover {\n        background: transparent\n      }\n\n      .banner >>> .progress-ring .progress-circle:after\n      {\n        color: white;\n      }\n\n      .banner .update-link {\n        display:inline-block;\n        margin-left: 17px;\n      }\n\n      .feedback-notice{\n        max-width: 675px;\n        margin-bottom: 24px;\n        white-space: pre-line;\n        text-align: justify;\n      }\n    "]
            },] },
];
/** @nocollapse */
OverviewComponent.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL292ZXJ2aWV3L292ZXJ2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFFN0QsT0FBTyxFQUFhLFVBQUEsRUFBeUIsTUFBTyxNQUFBLENBQU87QUFFM0QsT0FBTyxFQUVILHFCQUFxQixFQUdyQiwyQkFBMkIsRUFJM0IsT0FBTyxFQUdQLEdBQUcsRUFDSCxpQkFBaUIsRUFFRCxNQUFPLGVBQUEsQ0FBZ0I7QUFJM0M7SUFTSSwyQkFDWSxpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVR6QyxZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztJQVVsRSxDQUFDO0lBRUUsb0NBQVEsR0FBZjtRQUNJLE9BQU8sQ0FBQyxLQUFLLENBQWtCO1lBQzNCLElBQUksRUFBRSxjQUFjO1lBQ3BCLFFBQVEsRUFBRSxFQUFFO1lBQ1osTUFBTSxFQUFFLFVBQVU7U0FDckIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVNLHVDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTywrQ0FBbUIsR0FBM0I7UUFBQSxpQkFnQkM7UUFmRyxJQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUTtRQUNoRCxJQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQ2hDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFDOUcsSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQ3pILFNBQVMsQ0FDTixVQUFDLEVBQWdCO2dCQUFmLGNBQU0sRUFBRSxjQUFNO1lBQ1osS0FBSSxDQUFDLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQztZQUM3QyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDeEQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkgsQ0FBQyxFQUNELFVBQUMsS0FBZ0I7WUFDYixLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSywyQ0FBZSxHQUF2QixVQUF3QixjQUFzQixFQUFFLGFBQXFCO1FBRWpFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNiLENBQUM7UUFFRCxJQUFJLG1CQUFtQixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWhFLHlHQUF5RztRQUN6RyxJQUFJLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlELDZFQUE2RTtRQUM3RSw4REFBOEQ7UUFDOUQsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUVELG1DQUFtQztRQUNuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsUUFBUSxDQUFDO1lBQ2IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQW1FTCx3QkFBQztBQUFELENBckpBLEFBcUpDOztBQWxFTSw0QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsNjRCQWNUO2dCQUNELE1BQU0sRUFBRSxDQUFDLG8wQ0F5Q1IsQ0FBQzthQUNMLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsSUFBSTtDQUNILEVBRjZGLENBRTdGLENBQUMiLCJmaWxlIjoib3ZlcnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==