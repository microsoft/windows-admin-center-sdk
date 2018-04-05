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
import { Observable } from 'rxjs/Observable';
import { AppContextService, BaseDialogComponent, DialogService } from '../../../../angular';
import { connectionTypeConstants, EnvironmentModule } from '../../../../core';
var AddConnectionDialogComponent = /** @class */ (function (_super) {
    __extends(AddConnectionDialogComponent, _super);
    /**
     * Initializes a new instance of the AddConnectionDialogComponent class.
     */
    function AddConnectionDialogComponent(appContextService, dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.appContextService = appContextService;
        _this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.Connections.dialogs.add;
        _this.connectionProviders = [];
        _this.tags = [];
        _this.tagSuggestions = [];
        _this.allConnectionProviders = [];
        _this.id = AddConnectionDialogComponent.dialogId;
        return _this;
    }
    AddConnectionDialogComponent.addConnection = function (dialogService, appContextService, alertBarService, options) {
        dialogService.show(AddConnectionDialogComponent.dialogId, options)
            .flatMap(function (result) {
            if (result && result.connections && result.connections.length > 0) {
                // get token if provided
                var token_1 = result.credentials
                    ? appContextService.authorizationManager.createToken(result.credentials)
                    : null;
                // add connections to connection manager
                result.connections.forEach(function (connection) {
                    connection.name = connection.name.toLocaleLowerCase();
                    if (token_1) {
                        appContextService.authorizationManager.nodeTokens[connection.name] = token_1;
                    }
                    appContextService.connectionManager.addOrUpdateConnection(connection, false);
                });
                // save the connections to the gateway
                if (result.tags && result.tags.length > 0) {
                    // if there are tags, then save the connections while tagging them.
                    return appContextService.connectionTagManager.addRemoveTags(result.connections, result.tags, []);
                }
                // otherwise, just save the connection normally.
                return appContextService.connectionManager.saveConnections(result.connections);
            }
            // if there was nothing to save, then we are done.
            return Observable.of(null);
        })
            .subscribe();
    };
    AddConnectionDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        var curatedConnectionList = [
            connectionTypeConstants.server,
            connectionTypeConstants.windowsClient,
            connectionTypeConstants.cluster,
            connectionTypeConstants.hyperConvergedCluster
        ];
        this.allConnectionProviders = EnvironmentModule.getEntryPointsByType(['connectionProvider'])
            .sort(function (left, right) {
            var leftCuratedIndex = curatedConnectionList.indexOf(left.connectionType);
            var rightCuratedIndex = curatedConnectionList.indexOf(right.connectionType);
            if (leftCuratedIndex >= 0) {
                return (!rightCuratedIndex || rightCuratedIndex < leftCuratedIndex)
                    ? 1
                    : (rightCuratedIndex > leftCuratedIndex ? -1 : 0);
            }
            if (rightCuratedIndex >= 0) {
                return 1;
            }
            return left.connectionTypeName.localeCompareIgnoreCase(right.connectionTypeName);
        });
        this.addConnectionFrame.emitResult.subscribe(function (data) {
            _this.addConnectionFrame.close();
            _this.hide({
                connections: data.results.connections,
                tags: _this.tags,
                credentials: data.results.credentials
            });
        });
    };
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    AddConnectionDialogComponent.prototype.show = function (options) {
        var _this = this;
        this.panel.reset();
        var result = _super.prototype.show.call(this, options);
        this.tags = [];
        this.appContextService.connectionTagManager.getTagSuggestions()
            .take(1)
            .subscribe(function (suggestions) { return _this.tagSuggestions = suggestions; });
        // if a connection type filter was passed in, process it
        if (options.connectionTypes && options.connectionTypes.length > 0) {
            // filter out providers that dont match the filter
            this.connectionProviders = this.allConnectionProviders
                .filter(function (acp) { return options.connectionTypes.some(function (type) { return type === acp.connectionType; }); });
            // if there is only one, nevigate directly to it
            if (this.connectionProviders.length === 1) {
                this.openConnectionType(this.connectionProviders.first());
            }
        }
        else {
            // otherwise, show all providers
            this.connectionProviders = this.allConnectionProviders;
        }
        return result;
    };
    AddConnectionDialogComponent.prototype.openConnectionType = function (connectionProvider) {
        this.selectedProvider = connectionProvider;
        this.panel.activate('addConnectionFrame');
        this.addConnectionFrame.open(connectionProvider.connectionType);
    };
    AddConnectionDialogComponent.prototype.closeConnectionType = function () {
        this.addConnectionFrame.close();
        this.panel.back();
        this.selectedProvider = null;
    };
    AddConnectionDialogComponent.prototype.hide = function (result) {
        if (this.addConnectionFrame) {
            this.addConnectionFrame.close();
        }
        _super.prototype.hide.call(this, result);
    };
    /**
     * The method to call when the cancel button is clicked.
     */
    AddConnectionDialogComponent.prototype.onCancel = function () {
        // resolve wit no node name to add
        this.hide(null);
    };
    AddConnectionDialogComponent.dialogId = 'sme-add-connection-dialog';
    AddConnectionDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-add-connection-dialog',
                    template: "\n      <sme-dialog #dialog [actionPane]=\"true\" class=\"no-footer\">\n          <sme-dialog-content>\n              <sme-guided-panel #panel firstPaneId=\"root\" class=\"m-b-xs m-r-sm\">\n                  <sme-guided-pane #pane paneId=\"root\">\n                      <h3 id=\"sme-dialog-title\" class=\"sme-padding-spread-h-sm\">{{strings.title}}</h3>\n                      <div class=\"sme-position-flex-auto sme-arrange-overflow-hide-x sme-arrange-overflow-auto-y\">\n                          <div tabindex=\"0\" *ngFor=\"let provider of connectionProviders\" class=\"connection-type-list-item sme-arrange-stack-h sme-padding-vertical-xs sme-padding-horizontal-lg\" (click)=\"openConnectionType(provider)\" [class.sideloaded]=\"provider.parentModule && provider.parentModule.isSideLoaded\">\n                              <span class=\"sme-position-flex-auto\" [innerHtml]=\"strings.typeTitleFormat | smeFormat:[provider.connectionTypeName]\"></span>\n                              <span *ngIf=\"provider.parentModule && provider.parentModule.isSideLoaded\">{{strings.sideLoadWarning}}</span>\n                              <span class=\"sme-position-flex-none sme-icon sme-icon-chevronRight\"></span>\n                          </div>\n                      </div>\n                      <div class=\"sme-position-flex-none sme-padding-spread-h-sm\">\n                          <div class=\"pull-right\">\n                              <button type=\"button\" (click)=\"onCancel()\">{{strings.buttons.cancel}}</button>\n                          </div>\n                      </div>\n                  </sme-guided-pane>\n                  <sme-guided-pane #pane paneId=\"addConnectionFrame\">\n                      <h3 class=\"sme-position-flex-none sme-arrange-stack-h sme-padding-spread-h-sm\">\n                          <!--TODO: Reenable after 1705 release-->\n                          <!--<span class=\"back-button sme-position-flex-none sme-icon sme-icon-back\" (click)=\"closeConnectionType()\"></span>-->\n                          <span *ngIf=\"selectedProvider\" class=\"sme-position-flex-auto\" [innerHtml]=\"strings.typeTitleFormat | smeFormat:[selectedProvider.connectionTypeName]\"></span>\n                      </h3>\n                      <form class=\"sme-position-flex-none sme-margin-horizontal-lg sme-margin-bottom-lg\">\n                          <div role=\"group\" class=\"form-group\" [attr.aria-label]=\"strings.tags.label\">\n                              <label class=\"control-label\">{{strings.tags.label}}</label>\n                              <sme-input name=\"tags\" type=\"tags\" [(ngModel)]=\"tags\" [suggestions]=\"tagSuggestions\"></sme-input>\n                          </div>\n                      </form>\n                      <div class=\"sme-layout-relative sme-position-flex-auto sme-margin-horizontal-lg sme-margin-bottom-sm\">\n                          <sme-loading-wheel *ngIf=\"!addConnectionFrame.ready\"></sme-loading-wheel>\n                          <sme-add-connection-frame #addConnectionFrame></sme-add-connection-frame>\n                      </div>\n                  </sme-guided-pane>\n              </sme-guided-panel>\n          </sme-dialog-content>\n      </sme-dialog>\n    ",
                    styles: ["\n      .connection-type-list-item {\n          cursor: pointer;\n      }\n\n      .connection-type-list-item:hover,\n      .connection-type-list-item:focus {\n          background: #e5f1fb;\n      }\n\n      .connection-type-list-item .sme-icon {\n          vertical-align: top\n      }\n\n      .back-button {\n          cursor: pointer;\n          padding: 0px 10px;\n      }\n\n      .back-button:hover,\n      .back-button:focus {\n          background: #e5f1fb;\n      }\n\n      .connection-type-list-item.sideloaded {\n          color: #f60;\n          font-weight: bold;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    AddConnectionDialogComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: DialogService, },
    ]; };
    AddConnectionDialogComponent.propDecorators = {
        'panel': [{ type: ViewChild, args: ['panel',] },],
        'addConnectionFrame': [{ type: ViewChild, args: ['addConnectionFrame',] },],
    };
    return AddConnectionDialogComponent;
}(BaseDialogComponent));
export { AddConnectionDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvYWRkLWNvbm5lY3Rpb24tZGlhbG9nL2FkZC1jb25uZWN0aW9uLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTBCLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFFcEUsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGlCQUFBLENBQWtCO0FBRzdDLE9BQU8sRUFHSCxpQkFBaUIsRUFDakIsbUJBQW1CLEVBR25CLGFBQWEsRUFFaEIsTUFBTSxxQkFBQSxDQUFzQjtBQUM3QixPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUVwQixNQUFNLGtCQUFBLENBQW1CO0FBZ0MxQjtJQUNZLGdEQUEwRTtJQXVEbEY7O09BRUc7SUFDSCxzQ0FBb0IsaUJBQW9DLEVBQUUsYUFBNEI7UUFBdEYsWUFDSSxrQkFBTSxhQUFhLENBQUMsU0FFdkI7UUFIbUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXZEakQsYUFBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDdkYseUJBQW1CLEdBQWtDLEVBQUUsQ0FBQztRQUV4RCxVQUFJLEdBQWEsRUFBRSxDQUFDO1FBQ3BCLG9CQUFjLEdBQWEsRUFBRSxDQUFDO1FBUTdCLDRCQUFzQixHQUFrQyxFQUFFLENBQUM7UUE2Qy9ELEtBQUksQ0FBQyxFQUFFLEdBQUcsNEJBQTRCLENBQUMsUUFBUSxDQUFDOztJQUNwRCxDQUFDO0lBNUNhLDBDQUFhLEdBQTNCLFVBQTRCLGFBQTRCLEVBQ3BELGlCQUFvQyxFQUNwQyxlQUFnQyxFQUNoQyxPQUFtQztRQUVuQyxhQUFhLENBQUMsSUFBSSxDQUNiLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7YUFDL0MsT0FBTyxDQUFDLFVBQUEs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a0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVELGlCQUFNLElBQUksWUFBQyxNQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQ0FBUSxHQUFmO1FBQ0ksa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQTlKYSxxQ0FBUSxHQUFHLDJCQUEyQixDQUFDO0lBK0psRCx1Q0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSx3ckdBdUNUO29CQUNELE1BQU0sRUFBRSxDQUFDLG9sQkE0QlIsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMkNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztLQUN0QixFQUg2RixDQUc3RixDQUFDO0lBQ0ssMkNBQWMsR0FBMkM7UUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRyxFQUFFLEVBQUU7UUFDbEQsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUcsRUFBRSxFQUFFO0tBQzNFLENBQUM7SUFDRixtQ0FBQztDQXBQRCxBQW9QQyxDQW5QVyxtQkFBbUIsR0FtUDlCO1NBcFBZLDRCQUE0QiIsImZpbGUiOiJhZGQtY29ubmVjdGlvbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==