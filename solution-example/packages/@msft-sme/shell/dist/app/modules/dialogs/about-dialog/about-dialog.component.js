var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from '../../../../angular';
import { GatewayInventoryCache, GatewayInventoryDetailCache, Net, NotificationState } from '../../../../core';
var AboutDialogComponent = (function (_super) {
    __extends(AboutDialogComponent, _super);
    /**
     * Initializes a new instance of the Help Pane class.
     */
    function AboutDialogComponent(dialogService, appContextService) {
        var _this = _super.call(this, dialogService) || this;
        _this.appContextService = appContextService;
        _this.privacyLink = 'https://aka.ms/winserverprivacy';
        _this.strings = MsftSme.resourcesStrings();
        _this.id = dialogService.commonIds.help;
        return _this;
    }
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    AboutDialogComponent.prototype.show = function (options) {
        this.panel.reset();
        this.getGatewayInventory();
        return _super.prototype.show.call(this, options);
    };
    AboutDialogComponent.prototype.getGatewayInventory = function () {
        var _this = this;
        var statusExpiration = 4 * 60 * 1000; // 4 min
        var versionExpiration = 4 * 60 * 60 * 1000; // 4 hrs
        this.statusSubscription = Observable.zip(new GatewayInventoryCache(this.appContextService, { expiration: statusExpiration }).query({ name: 'gateway' }), new GatewayInventoryDetailCache(this.appContextService, { expiration: versionExpiration }).query({ name: 'gateway' }))
            .subscribe(function (_a) {
            var status = _a[0], detail = _a[1];
            _this.gatewayVersion = status.instance.gatewayVersion;
        }, function (error) {
            _this.appContextService.notification.alert('', NotificationState.Error, Net.getErrorMessage(error));
        });
    };
    AboutDialogComponent.prototype.ngOnDestroy = function () {
        this.statusSubscription.unsubscribe();
    };
    return AboutDialogComponent;
}(BaseDialogComponent));
export { AboutDialogComponent };
AboutDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-about-dialog',
                template: "\n      <sme-dialog #dialog [actionPane]=\"true\" class=\"no-footer\">\n          <sme-dialog-content>\n              <sme-guided-panel #panel firstPaneId=\"root\">\n                  <sme-guided-pane #pane paneId=\"root\">\n                      <div class=\"auto-flex-size vertical-scroll-only\">\n                          <div class=\"flex-layout about-header\">\n                              <div class=\"auto-flex-size flex-layout vertical\">\n                                  <h3>{{strings.MsftSmeShell.App.Shell.applicationTitle}}</h3>\n                              </div>\n                          </div>\n                          <div class=\"m-b-xs\">\n                              <div class=\"fixed-flex-size gateway-status\">\n                                  <div class=\"gateway-status-values relative\">\n                                      <sme-loading-wheel *ngIf=\"!gatewayVersion && !gatewayError\" size=\"small\"></sme-loading-wheel>\n                                      <div *ngIf=\"gatewayError\" class=\"gateway-error\" [title]=\"gatewayError\">{{strings.MsftSmeShell.App.Overview.gatewayStatus.error}}</div>\n                                      <div *ngIf=\"gatewayVersion && !gatewayError\" class=\"gateway-status-value\">\n                                          <label>{{strings.MsftSmeShell.App.Overview.gatewayStatus.versionHeader}}</label>\n                                          <div>{{strings.MsftSmeShell.App.Shell.applicationVersion}}</div>\n                                      </div>\n                                      <div *ngIf=\"gatewayVersion && !gatewayError\" class=\"gateway-status-value\">\n                                          <label>{{strings.MsftSmeShell.App.Overview.gatewayStatus.buildNumberHeader}}</label>\n                                          <div *ngIf=\"isUpdateAvailable\">{{gatewayVersion}}{{strings.MsftSmeShell.App.Overview.gatewayStatus.updateAvailable}}\n                                              <a href=\"{{strings.MsftSmeShell.App.Overview.gatewayStatus.smeUpdateUri}}\">{{strings.MsftSmeShell.App.Overview.gatewayStatus.smeUpdate}}</a>\n                                          </div>\n                                          <div *ngIf=\"!isUpdateAvailable\">{{gatewayVersion}}</div>\n                                      </div>\n                                  </div>\n                              </div>\n                          </div>\n                          <div class=\"m-b-xs\">                        \n                              <a [href]=\"strings.MsftSmeShell.App.Overview.feedback.link.href\" target=\"_blank\">\n                                  <span>{{strings.MsftSmeShell.App.Overview.feedback.link.text}}</span>\n                                  <span class=\"link-icon sme-icon sme-icon-openInNewWindow\"></span>\n                              </a>\n                          </div>\n                          <div class=\"m-b-xxxs\"><a (click)=\"panel.activate('EULA')\">{{strings.MsftSmeShell.App.AboutDialog.EULA.text}}</a></div>\n                          <div class=\"m-b-xxxs\">\n                              <a [href]=\"privacyLink\" target=\"_blank\">\n                              <span>{{strings.MsftSmeShell.App.AboutDialog.Privacy.text}}</span>\n                              <span class=\"link-icon sme-icon sme-icon-openInNewWindow\"></span>\n                          </a>\n                          </div>\n                          <div class=\"m-b-xxxs\"><a (click)=\"panel.activate('3rdParty')\">{{strings.MsftSmeShell.App.AboutDialog.Disclosure.text}}</a></div>\n                      </div>\n                      <div class=\"fixed-flex-size\">\n                          <div class=\"pull-right guided-pane-button\">\n                              <button type=\"button\" class=\"btn btn-primary\" (click)=\"hide()\">{{strings.MsftSmeShell.Angular.Common.close}}</button>\n                          </div>\n                      </div>\n                  </sme-guided-pane>\n                  <sme-guided-pane #pane paneId=\"EULA\">\n                      <div class=\"auto-flex-size relative\">\n                          <iframe src=\"/legal/eula.html\" class=\"stretch-absolute\"></iframe>\n                      </div>\n                      <div class=\"fixed-flex-size\">\n                          <div class=\"pull-right guided-pane-button\">\n                              <button type=\"button\" class=\"btn btn-primary\" (click)=\"panel.back()\">{{strings.MsftSmeShell.Angular.Common.back}}</button>\n                          </div>\n                      </div>\n                  </sme-guided-pane>\n                  <sme-guided-pane #pane paneId=\"3rdParty\">\n                      <div class=\"auto-flex-size relative\">\n                          <iframe src=\"/legal/3rdPartyDisclosure.html\" class=\"stretch-absolute\"></iframe>\n                      </div>\n                      <div class=\"fixed-flex-size\">\n                          <div class=\"pull-right guided-pane-button\">\n                              <button type=\"button\" class=\"btn btn-primary\" (click)=\"panel.back()\">{{strings.MsftSmeShell.Angular.Common.back}}</button>\n                          </div>\n                      </div>\n                  </sme-guided-pane>\n              </sme-guided-panel>\n          </sme-dialog-content>\n      </sme-dialog>\n    ",
                styles: ["\n      .about-header {\n          margin-bottom: 10px;\n      }\n\n      .about-header svg {\n          height: 64px;\n          width: 64px;\n          margin-right: 15px;\n      }\n\n      .about-header h3 {\n          padding: 0;\n      }\n\n      .guided-pane-button {\n          padding-bottom: 24px;\n          padding-right: 36px;\n      }\n\n      .link-icon  {\n          vertical-align: middle;\n          margin-left: 10px;\n          margin-bottom: 1px;\n      }\n\n      .gateway-error {\n        color: #f00;\n      }\n\n      .gateway-status{    \n        width: 300px;\n      }\n\n      .gateway-status-values {\n        min-height: 50px;\n      }\n\n      .gateway-status-value {\n          display: inline-block;\n          padding-right: 20px;\n          font-size: 12px;\n      }\n\n      .gateway-status-value label {\n          display: inline-block;\n          padding-right: 20px;\n          font-size: 10px;\n      }\n    "]
            },] },
];
/** @nocollapse */
AboutDialogComponent.ctorParameters = function () { return [
    null,
    null,
]; };
AboutDialogComponent.propDecorators = {
    'panel': [{ type: ViewChild, args: ['panel',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvYWJvdXQtZGlhbG9nL2Fib3V0LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFDdkUsT0FBTyxFQUFhLFVBQUEsRUFBeUIsTUFBTyxNQUFBLENBQU87QUFFM0QsT0FBTyxFQUVILG1CQUFtQixFQUt0QixNQUFNLHFCQUFBLENBQXNCO0FBQzdCLE9BQU8sRUFFSCxxQkFBcUIsRUFHckIsMkJBQTJCLEVBTzNCLEdBQUcsRUFDSCxpQkFBaUIsRUFHcEIsTUFBTSxrQkFBQSxDQUFtQjtBQUkxQjtJQUEwQyx3Q0FBZ0Q7SUFZdEY7O09BRUc7SUFDSCw4QkFBWSxhQUE0QixFQUFVLGlCQUFvQztRQUF0RixZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQUV2QjtRQUhpRCx1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTi9FLGlCQUFXLEdBQUcsaUNBQWlDLENBQUM7UUFDaEQsYUFBTyxHQUFZLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDO1FBTzFELEtBQUksQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7O0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLG1DQUFJLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxpQkFBTSxJQUFJLFlBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVPLGtEQUFtQixHQUEzQjtRQUFBLGlCQWFDO1FBWkcsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFDaEQsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRO1FBQ3RELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUNoQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQzlHLElBQUksMkJBQTJCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUN6SCxTQUFTLENBQ04sVUFBQyxFQUFnQjtnQkFBZixjQUFNLEVBQUUsY0FBTTtZQUNaLEtBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7UUFDekQsQ0FBQyxFQUNELFVBQUMsS0FBZ0I7WUFDYixLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN2RyxDQUFDLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSwwQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBMklMLDJCQUFDO0FBQUQsQ0E1TEEsQUE0TEMsQ0E1THlDLG1CQUFtQjs7QUFrRHRELCtCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFLG96S0EwRVQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsczdCQWlEUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG1DQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixJQUFJO0lBQ0osSUFBSTtDQUNILEVBSDZGLENBRzdGLENBQUM7QUFDSyxtQ0FBYyxHQUEyQztJQUNoRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUUsRUFBRTtDQUNqRCxDQUFDIiwiZmlsZSI6ImFib3V0LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9