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
import { Component } from '@angular/core';
import { BaseDialogComponent } from '../../../../angular';
import { defaultSupportedLocales, EnvironmentModule } from '../../../../core';
var SettingsDialogComponent = (function (_super) {
    __extends(SettingsDialogComponent, _super);
    /**
     * Initializes a new instance of the Settings Pane class.
     */
    function SettingsDialogComponent(dialogService, appContextService) {
        var _this = _super.call(this, dialogService) || this;
        _this.appContextService = appContextService;
        _this.strings = MsftSme.resourcesStrings();
        _this.id = dialogService.commonIds.settings;
        _this.supportedLocales = defaultSupportedLocales;
        _this.currentLocale = _this.getCurrentLocaleName();
        return _this;
    }
    SettingsDialogComponent.prototype.ngOnInit = function () {
        var extensionSolution = EnvironmentModule.getEntryPointsByType(['solution'])
            .find(function (ep) { return ep.parentModule.name === 'msft.sme.extension-manager'; });
        if (extensionSolution) {
            this.hasExtensionsSolution = true;
            this.isExtensionsisSideLoaded = extensionSolution.parentModule.isSideLoaded;
            this.extensionsSolutionIcon = extensionSolution.icon;
            this.extensionsSolutionFontIcon = extensionSolution.icon && extensionSolution.icon.startsWith('sme-icon:')
                ? extensionSolution.icon.substr(9) : null;
            var moduleEntrySegment = EnvironmentModule.createFormattedEntrypoint(extensionSolution);
            var friendlySegment = EnvironmentModule
                .getFriendlyUrlSegmentForEntryPoint(moduleEntrySegment, extensionSolution.entryPointType);
            this.extensionsSolutionLink = "/" + friendlySegment;
        }
    };
    SettingsDialogComponent.prototype.setLocale = function (localeIndex) {
        var locale = this.supportedLocales[localeIndex];
        var global = window;
        global.MsftSme.Resources.localizationManger.setCurrentLocale(locale.id);
        // reload the page
        window.location.reload();
    };
    SettingsDialogComponent.prototype.getCurrentLocaleName = function () {
        var global = window;
        if (global.MsftSme.Resources.currentLocale) {
            var locale = this.supportedLocales.first(function (localeEntry) {
                return localeEntry.id === global.MsftSme.Resources.currentLocale;
            });
            if (locale) {
                return locale.name;
            }
        }
        // unknown language so show whatever the browser has configured
        return navigator.language;
    };
    return SettingsDialogComponent;
}(BaseDialogComponent));
export { SettingsDialogComponent };
SettingsDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-settings-dialog',
                template: "\n      <sme-dialog #dialog [showBackdrop]=\"false\" [actionPane]=\"true\" class=\"dark-theme\">\n          <sme-dialog-header>\n              <h4>{{strings.MsftSmeShell.App.SettingsDialog.title}}</h4>\n          </sme-dialog-header>\n          <sme-dialog-content>\n              <a *ngIf=\"hasExtensionsSolution\" class=\"extension-manager flex-layout m-b-xxs\" [routerLink]=\"extensionsSolutionLink\" routerLinkActive=\"active\"\n                  [class.sideloaded]=\"isExtensionsisSideLoaded\" (click)=\"hide()\">\n                  <div *ngIf=\"extensionsSolutionFontIcon\" class=\"fixed-flex-size sme-icon {{extensionsSolutionFontIcon}}\" [title]=\"strings.MsftSmeShell.App.SettingsDialog.manageExtensions\"></div>\n                  <div *ngIf=\"!extensionsSolutionFontIcon\" class=\"fixed-flex-size\" [style.background-image]=\"'url(' + extensionsSolutionIcon + ')'\"></div>\n                  <div class=\"solution-label auto-flex-size m-l-xxs\">\n                      <span>{{strings.MsftSmeShell.App.SettingsDialog.manageExtensions}}</span>\n                      <span *ngIf=\"isExtensionsisSideLoaded\">{{strings.sideLoadWarning}}</span>\n                  </div>\n              </a>\n              <form name=\"settings\">\n                  <div class=\"form-group\">\n                      <label class=\"control-label\">{{strings.MsftSmeShell.App.SettingsDialog.language}}</label>\n                      <div class=\"combobox\">\n                          <select class=\"form-control\" (change)=\"setLocale($event.target.selectedIndex)\" [disabled]=\"true\">\n                              <option *ngFor=\"let locale of supportedLocales\">{{locale.name}}</option>\n                          </select>\n                      </div>\n                  </div>\n              </form>\n          </sme-dialog-content>\n          <sme-dialog-footer>\n              <div class=\"pull-right\">\n                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"hide()\">{{strings.MsftSmeShell.Angular.Common.close}}</button>\n              </div>\n          </sme-dialog-footer>\n      </sme-dialog>\n    ",
                styles: ["\n      :host >>> * {\n        color: #ffffff;\n      }\n      :host >>> select.form-control:hover:not(:disable), \n      :host >>> select.form-control:active:not(:disable), \n      :host >>> select.form-control:focus:not(:disable) {\n          background-color: rgba(255,255,255,.6);\n          color: black;\n      }\n  \n      :host >>> .form-control[disabled], \n      :host >>> .form-control[readonly], \n      :host >>> fieldset[disabled] .form-control {\n          color: rgba(255,255,255,.2);\n          border-color: rgba(255,255,255,.2);\n      }\n\n      :host >>> .combobox:after {\n        color: black;\n      }\n\n      :host >>> .pane .modal-content {\n        width: 384px!important;\n        background: #414141;\n        overflow-x: hidden;\n      }\n\n      :host >>> .extension-manager {\n        height: 36px;\n        align-items: center;\n      }\n\n\n      a, a:hover, a:focus {\n          color: white;   \n      }\n\n      a:hover {\n          text-decoration: underline; \n      }\n\n      a:focus, \n      :host >>> select.form-control:focus {\n          outline: white dashed 1px;\n          outline-offset: -1px;   \n      }\n    "]
            },] },
];
/** @nocollapse */
SettingsDialogComponent.ctorParameters = function () { return [
    null,
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3Mvc2V0dGluZ3MtZGlhbG9nL3NldHRpbmdzLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQXlCLE1BQU8sZUFBQSxDQUFnQjtBQUV6RCxPQUFPLEVBQXFCLG1CQUFBLEVBQWdFLE1BQU8scUJBQUEsQ0FBc0I7QUFDekgsT0FBTyxFQUFFLHVCQUFBLEVBQXlCLGlCQUFBLEVBQW1DLE1BQU8sa0JBQUEsQ0FBbUI7QUFJL0Y7SUFBNkMsMkNBQWdEO0lBV3pGOztPQUVHO0lBQ0gsaUNBQVksYUFBNEIsRUFBVSxpQkFBb0M7UUFBdEYsWUFDSSxrQkFBTSxhQUFhLENBQUMsU0FJdkI7UUFMaUQsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUwvRSxhQUFPLEdBQVksT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFPMUQsS0FBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUMzQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsdUJBQXVCLENBQUM7UUFDaEQsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7SUFDckQsQ0FBQztJQUVNLDBDQUFRLEdBQWY7UUFFSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkUsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssNEJBQTRCLEVBQXJELENBQXFELENBQUMsQ0FBQztRQUV2RSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztZQUM1RSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ3JELElBQUksQ0FBQywwQkFBMEIsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7a0JBQ3BHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBRTlDLElBQUksa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN4RixJQUFJLGVBQWUsR0FBRyxpQkFBaUI7aUJBQ2xDLGtDQUFrQyxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxNQUFJLGVBQWlCLENBQUM7UUFDeEQsQ0FBQztJQUNMLENBQUM7SUFFTSwyQ0FBUyxHQUFoQixVQUFpQixXQUFtQjtRQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxNQUFNLEdBQTJCLE1BQU0sQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEUsa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLHNEQUFvQixHQUE1QjtRQUNJLElBQUksTUFBTSxHQUEyQixNQUFNLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQUMsV0FBVztnQkFDakQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUN2QixDQUFDO1FBQ0wsQ0FBQztRQUVELCtEQUErRDtRQUMvRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBNEZMLDhCQUFDO0FBQUQsQ0EzSkEsQUEySkMsQ0EzSjRDLG1CQUFtQjs7QUFnRXpELGtDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLG9sRUFnQ1Q7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsMm9DQStDUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHNDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixJQUFJO0lBQ0osSUFBSTtDQUNILEVBSDZGLENBRzdGLENBQUMiLCJmaWxlIjoic2V0dGluZ3MtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=