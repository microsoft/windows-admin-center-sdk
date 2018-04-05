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
import { AppContextService, DialogService } from '../../../../angular';
import { Net, NotificationState } from '../../../../core';
import { ShellService } from '../../../shell.service';
import { AppBarBaseDialogComponent } from '../app-bar-dialog.component';
var AboutDialogComponent = /** @class */ (function (_super) {
    __extends(AboutDialogComponent, _super);
    /**
     * Initializes a new instance of the Help Pane class.
     */
    function AboutDialogComponent(dialogService, appContextService, shellService) {
        var _this = _super.call(this, dialogService, 'sme-about-dialog', 'sme-about-button') || this;
        _this.appContextService = appContextService;
        _this.shellService = shellService;
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
        this.statusSubscription = this.shellService.inventoryCaches.gatewayCombinedCache.createObservable({})
            .subscribe(function (_a) {
            var status = _a[0], detail = _a[1];
            _this.gatewayVersion = status.gatewayVersion;
            _this.isUpdateAvailable = _this.shellService.compareVersions(status.gatewayVersion, detail.latestVersion) === 1;
        }, function (error) {
            _this.appContextService.notification.alert('', NotificationState.Error, Net.getErrorMessage(error));
            _this.isUpdateAvailable = false;
        });
    };
    AboutDialogComponent.prototype.ngOnDestroy = function () {
        this.statusSubscription.unsubscribe();
    };
    AboutDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-about-dialog',
                    template: "\n      <sme-dialog id=\"sme-about\" #dialog dialogMode=\"compact\" [showBackdrop]=\"false\" class=\"sme-theme-dark\">\n          <sme-dialog-content>\n              <sme-guided-panel #panel firstPaneId=\"root\">\n                  <sme-guided-pane #pane paneId=\"root\">\n                      <div class=\"sme-position-flex-auto sme-arrange-overflow-auto-y sme-arrange-overflow-hide-x\">\n                          <!-- Heading -->\n                          <h2 id=\"sme-dialog-title\" class=\"sme-padding-spread-h-sm\">{{strings.MsftSmeShell.App.Shell.applicationTitle}}</h2>\n                          <!-- Error -->\n                          <p *ngIf=\"gatewayError\" class=\"sme-color-red sme-padding-horizontal-md sme-padding-bottom-sm\" [title]=\"gatewayError\">{{strings.MsftSmeShell.App.Overview.gatewayStatus.error}}</p>\n                          <!-- Loading -->\n                          <div *ngIf=\"!gatewayVersion && !gatewayError\" class=\"sme-progress sme-progress-indeterminate-regional sme-progress-small sme-padding-bottom-sm\" [ngClass]=\"progressSize\" role=\"progressbar\" aria-valuetext=\"Loading...\" tabindex=\"0\">\n                              <span></span>\n                              <span></span>\n                              <span></span>\n                              <span></span>\n                              <span></span>\n                          </div>\n                          <!-- Gateway Data -->\n                          <div id=\"sme-dialog-desc\" *ngIf=\"gatewayVersion\" class=\"sme-padding-horizontal-md sme-padding-bottom-sm sme-arrange-stack-h\">\n                              <div class=\"sme-position-flex-auto sme-arrange-stack-v\">\n                                  <label for=\"applicationVersion\">{{strings.MsftSmeShell.App.Overview.gatewayStatus.versionHeader}}</label>\n                                  <div id=\"applicationVersion\">{{strings.MsftSmeShell.App.Shell.applicationVersion}}</div>\n                              </div>\n                              <div class=\"sme-position-flex-auto sme-arrange-stack-v\">\n                                  <label for=\"buildNumber\">{{strings.MsftSmeShell.App.Overview.gatewayStatus.buildNumberHeader}}</label>\n                                  <div *ngIf=\"isUpdateAvailable\">\n                                      <span>{{gatewayVersion}}{{strings.MsftSmeShell.App.Overview.gatewayStatus.updateAvailable}}</span>\n                                      <a href=\"{{strings.MsftSmeShell.App.Overview.gatewayStatus.smeUpdateUri}}\">{{strings.MsftSmeShell.App.Overview.gatewayStatus.smeUpdate}}</a>\n                                  </div>\n                                  <div id=\"buildNumber\" *ngIf=\"!isUpdateAvailable\">{{gatewayVersion}}</div>\n                              </div>\n                          </div>\n                          <div class=\"sme-padding-left-xs sme-arrange-stack-v\">\n                              <!-- Feedback Link -->\n                              <a class=\"sme-button sme-button-trigger sme-button-align-left\" [href]=\"strings.MsftSmeShell.App.Overview.feedback.link.href\" target=\"_blank\">\n                                  <span>{{strings.MsftSmeShell.App.Overview.feedback.link.text}}</span>\n                                  <span class=\"sme-icon sme-icon-openInNewWindow\"></span>\n                              </a>\n                              <!-- EULA Link -->\n                              <a class=\"sme-button sme-button-trigger sme-button-align-left\" tabindex=\"0\" (click)=\"panel.activate('EULA')\">{{strings.MsftSmeShell.App.AboutDialog.EULA.text}}</a>\n                              <!-- Privacy Link -->\n                              <a class=\"sme-button sme-button-trigger sme-button-align-left\" [href]=\"privacyLink\" target=\"_blank\">\n                                  <span>{{strings.MsftSmeShell.App.AboutDialog.Privacy.text}}</span>\n                                  <span class=\"sme-icon sme-icon-openInNewWindow\"></span>\n                              </a>\n                              <!-- Third Party Link -->\n                              <a class=\"sme-button sme-button-trigger sme-button-align-left\" tabindex=\"0\" (click)=\"panel.activate('3rdParty')\">{{strings.MsftSmeShell.App.AboutDialog.Disclosure.text}}</a>\n                          </div>\n                      </div>\n                      <div class=\"sme-position-flex-none\">\n                          <div class=\"sme-layout-float-right sme-padding-spread-v-sm\">\n                              <button type=\"button\" class=\"sme-button-primary\" (click)=\"hide()\">{{strings.MsftSmeShell.Angular.Common.close}}</button>\n                          </div>\n                      </div>\n                  </sme-guided-pane>\n                  <sme-guided-pane #pane paneId=\"EULA\" class=\"sme-layout-absolute sme-position-inset-none sme-theme-light\">\n                      <div class=\"sme-layout-relative sme-position-flex-auto\">\n                          <iframe src=\"/legal/eula.html\" class=\"sme-layout-absolute sme-position-inset-none\"></iframe>\n                      </div>\n                      <div class=\"sme-position-flex-none\">\n                          <div class=\"sme-layout-float-right sme-padding-spread-v-sm\">\n                              <button type=\"button\" class=\"sme-button-primary\" (click)=\"panel.back()\">{{strings.MsftSmeShell.Angular.Common.back}}</button>\n                          </div>\n                      </div>\n                  </sme-guided-pane>\n                  <sme-guided-pane #pane paneId=\"3rdParty\" class=\"sme-layout-absolute sme-position-inset-none sme-theme-light\">\n                      <div class=\"sme-layout-relative sme-position-flex-auto\">\n                          <iframe src=\"/legal/3rdPartyDisclosure.html\" class=\"sme-layout-absolute sme-position-inset-none\"></iframe>\n                      </div>\n                      <div class=\"sme-position-flex-none\">\n                          <div class=\"sme-layout-float-right sme-padding-spread-v-sm\">\n                              <button type=\"button\" class=\"sme-button-primary\" (click)=\"panel.back()\">{{strings.MsftSmeShell.Angular.Common.back}}</button>\n                          </div>\n                      </div>\n                  </sme-guided-pane>\n              </sme-guided-panel>\n          </sme-dialog-content>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    AboutDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
        { type: AppContextService, },
        { type: ShellService, },
    ]; };
    AboutDialogComponent.propDecorators = {
        'panel': [{ type: ViewChild, args: ['panel',] },],
    };
    return AboutDialogComponent;
}(AppBarBaseDialogComponent));
export { AboutDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvYWJvdXQtZGlhbG9nL2Fib3V0LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFHdkUsT0FBTyxFQUNILGlCQUFpQixFQUdqQixhQUFhLEVBRWhCLE1BQU0scUJBQUEsQ0FBc0I7QUFDN0IsT0FBTyxFQUlILEdBQUcsRUFDSCxpQkFBaUIsRUFHcEIsTUFBTSxrQkFBQSxDQUFtQjtBQUUxQixPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sd0JBQUEsQ0FBeUI7QUFDdEQsT0FBTyxFQUFFLHlCQUFBLEVBQTBCLE1BQU8sNkJBQUEsQ0FBOEI7QUFHeEU7SUFBMEMsd0NBQXNEO0lBWTVGOztPQUVHO0lBQ0gsOEJBQVksYUFBNEIsRUFBVSxpQkFBb0MsRUFBVSxZQUEwQjtRQUExSCxZQUNJLGtCQUFNLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxTQUUvRDtRQUhpRCx1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsa0JBQVksR0FBWixZQUFZLENBQWM7UUFObkgsaUJBQVcsR0FBRyxpQ0FBaUMsQ0FBQztRQUNoRCxhQUFPLEdBQVksT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFPMUQsS0FBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7SUFDM0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksbUNBQUksR0FBWCxVQUFZLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsTUFBTSxDQUFDLGlCQUFNLElBQUksWUFBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8sa0RBQW1CLEdBQTNCO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO2FBQ2hHLFNBQVMsQ0FDTixVQUFDLEVBQWdCO2dCQUFmLGNBQU0sRUFBRSxjQUFNO1lBQ1osS0FBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQzVDLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEgsQ0FBQyxFQUNELFVBQUMsS0FBZ0I7WUFDYixLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVNLDBDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFDRSwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxzMk1BK0VUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO1FBQ3ZCLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztLQUNyQixFQUo2RixDQUk3RixDQUFDO0lBQ0ssbUNBQWMsR0FBMkM7UUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRyxFQUFFLEVBQUU7S0FDakQsQ0FBQztJQUNGLDJCQUFDO0NBOUlELEFBOElDLENBOUl5Qyx5QkFBeUIsR0E4SWxFO1NBOUlZLG9CQUFvQiIsImZpbGUiOiJhYm91dC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==