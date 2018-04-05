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
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService, SettingsFormService } from '../../../../angular';
import { CoreEnvironment, EnvironmentModule, GatewayMode, LocalizationManager } from '../../../../core';
import { ShellService } from '../../../shell.service';
import { PanelBaseComponent } from './panel-base.component';
var GeneralComponent = /** @class */ (function (_super) {
    __extends(GeneralComponent, _super);
    function GeneralComponent(appContextService, router, activatedRoute, formBuilder, settingsFormService, shellService) {
        var _this = _super.call(this, appContextService, router, activatedRoute, formBuilder, settingsFormService, {
            name: ''
        }, {
            name: {
                required: 'this is a mandatory field'
            }
        }, {
            name: 'setting 1 name value'
        }, 'setting 1') || this;
        _this.shellService = shellService;
        _this.strings = MsftSme.resourcesStrings().MsftSmeShell;
        _this.supportedLocaleNames = LocalizationManager.supportedLocales.map(function (item) { return item.name; });
        _this.gatewayMode = GatewayMode;
        return _this;
    }
    GeneralComponent.prototype.ngOnInit = function () {
        var _this = this;
        var localeId = CoreEnvironment.localizationManager.localeId;
        this.selectedLocaleName = LocalizationManager.supportedLocales.find(function (item) { return item.id === localeId; }).name;
        this.gatewaySubscription = this.shellService.inventoryCaches.gatewayCache.createObservable({})
            .subscribe(function (gateway) { return _this.gateway = gateway; });
        var extensionSolution = EnvironmentModule.getEntryPointsByType(['solution'])
            .find(function (ep) { return ep.parentModule.name === 'msft.sme.extension-manager'; });
        if (extensionSolution) {
            this.hasExtensionsSolution = true;
            this.isExtensionsSideLoaded = extensionSolution.parentModule.isSideLoaded;
            this.extensionsSolutionIcon = extensionSolution.icon;
            this.extensionsSolutionFontIcon = extensionSolution.icon && extensionSolution.icon.startsWith('sme-icon:')
                ? extensionSolution.icon.substr(9) : null;
            var moduleEntrySegment = EnvironmentModule.createFormattedEntrypoint(extensionSolution);
            var friendlySegment = EnvironmentModule
                .getFriendlyUrlSegmentForEntryPoint(moduleEntrySegment, extensionSolution.entryPointType);
            this.extensionsSolutionLink = "/" + friendlySegment;
        }
    };
    GeneralComponent.prototype.ngOnDestroy = function () {
        this.gatewaySubscription.unsubscribe();
    };
    GeneralComponent.prototype.setLocale = function (index) {
        var locale = LocalizationManager.supportedLocales[index];
        CoreEnvironment.localizationManager.saveLocale(locale.id);
        // reload the page
        window.location.reload();
        this.router.navigate(['/']);
    };
    GeneralComponent.decorators = [
        { type: Component, args: [{
                    template: "\n      <form id=\"sme-generalForm\" [smeSettingsForm]=\"sampleForm\" class=\"sme-padding-top-xs\">\n          <sme-settings-content>\n              <div class=\"form-group\">\n                  <div class=\"form-input\">\n                      <a *ngIf=\"hasExtensionsSolution && gateway && gateway.mode !== gatewayMode.App\" class=\"sme-button sme-button-trigger\" [routerLink]=\"extensionsSolutionLink\"\n                          [class.sme-scheme-sideloaded]=\"isExtensionsSideLoaded\">\n                          <span *ngIf=\"extensionsSolutionFontIcon\" class=\"sme-icon {{extensionsSolutionFontIcon}}\"></span>\n                          <span *ngIf=\"!extensionsSolutionFontIcon\" class=\"sme-icon\" [style.background-image]=\"'url(' + extensionsSolutionIcon + ')'\"></span>\n                          <span class=\"solution-label sme-position-flex-auto m-l-xxs\">\n                              <span>{{strings.App.SettingsDialog.manageExtensions}}</span>\n                              <span *ngIf=\"isExtensionsSideLoaded\">{{strings.App.SolutionsList.sideLoadWarning}}</span>\n                          </span>\n                      </a>\n                  </div>\n                  <div class=\"form-input\">\n                      <label for=\"language\">{{strings.App.SettingsDialog.language}}</label>\n                      <div class=\"sme-select\">\n                          <select id=\"language\" (change)=\"setLocale($event.target.selectedIndex)\" [(ngModel)]=\"selectedLocaleName\" name=\"localeName\" autofocus>\n                              <option *ngFor=\"let localeName of supportedLocaleNames\">{{localeName}}</option>\n                          </select>\n                      </div>\n                  </div>\n              </div>\n          </sme-settings-content>\n      </form>\n    "
                },] },
    ];
    /** @nocollapse */
    GeneralComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: Router, },
        { type: ActivatedRoute, },
        { type: FormBuilder, },
        { type: SettingsFormService, },
        { type: ShellService, },
    ]; };
    return GeneralComponent;
}(PanelBaseComponent));
export { GeneralComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2dlbmVyYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFDN0QsT0FBTyxFQUFFLFdBQUEsRUFBZ0QsTUFBTyxnQkFBQSxDQUFpQjtBQUNqRixPQUFPLEVBQUUsY0FBQSxFQUFnQixNQUFBLEVBQU8sTUFBTyxpQkFBQSxDQUFrQjtBQUV6RCxPQUFPLEVBQUUsaUJBQUEsRUFBbUIsbUJBQUEsRUFBb0IsTUFBTyxxQkFBQSxDQUFzQjtBQUM3RSxPQUFPLEVBQUUsZUFBQSxFQUFpQixpQkFBQSxFQUFxQyxXQUFBLEVBQWEsbUJBQUEsRUFBb0IsTUFBTyxrQkFBQSxDQUFtQjtBQUUxSCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sd0JBQUEsQ0FBeUI7QUFFdEQsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sd0JBQUEsQ0FBeUI7QUFHNUQ7SUFDWSxvQ0FBZ0M7SUFnQnhDLDBCQUNJLGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsY0FBOEIsRUFDOUIsV0FBd0IsRUFDeEIsbUJBQXdDLEVBQ2hDLFlBQTBCO1FBTnRDLFlBT0ksa0JBQ0ksaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixjQUFjLEVBQ2QsV0FBVyxFQUNYLG1CQUFtQixFQUNuQjtZQUNJLElBQUksRUFBRSxFQUFFO1NBQ1gsRUFDRDtZQUNJLElBQUksRUFBRTtnQkFDRixRQUFRLEVBQUUsMkJBQTJCO2FBQ3hDO1NBQ0osRUFDRDtZQUNJLElBQUksRUFBRSxzQkFBc0I7U0FDL0IsRUFDRCxXQUFXLENBQUMsU0FDbkI7UUFuQlcsa0JBQVksR0FBWixZQUFZLENBQWM7UUFuQi9CLGFBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUM7UUFDM0QsMEJBQW9CLEdBQUcsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksRUFBVCxDQUFTLENBQUMsQ0FBQztRQVFuRixpQkFBVyxHQUFHLFdBQVcsQ0FBQzs7SUE2QmpDLENBQUM7SUFFTSxtQ0FBUSxHQUFmO1FBQUEsaUJBcUJDO1FBcEJHLElBQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7UUFDOUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUFwQixDQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDO1FBRXZHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO2FBQ3pGLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFFbEQsSUFBSSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3ZFLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLDRCQUE0QixFQUFyRCxDQUFxRCxDQUFDLENBQUM7UUFFdkUsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7WUFDMUUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUNyRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO2dCQUN0RyxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzlDLElBQUksa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN4RixJQUFJLGVBQWUsR0FBRyxpQkFBaUI7aUJBQ2xDLGtDQUFrQyxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxNQUFJLGVBQWlCLENBQUM7UUFDeEQsQ0FBQztJQUNMLENBQUM7SUFFTSxzQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU0sb0NBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUMxQixJQUFJLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxlQUFlLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUxRCxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNFLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGd5REEwQlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtCQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztRQUMzQixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO1FBQ3hCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztRQUNyQixFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztRQUM3QixFQUFDLElBQUksRUFBRSxZQUFZLEdBQUc7S0FDckIsRUFQNkYsQ0FPN0YsQ0FBQztJQUNGLHVCQUFDO0NBdkhELEFBdUhDLENBdEhXLGtCQUFrQixHQXNIN0I7U0F2SFksZ0JBQWdCIiwiZmlsZSI6ImdlbmVyYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==