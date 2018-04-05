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
import { BaseDialogComponent } from '../../../../angular';
import { connectionTypeConstants, EnvironmentModule } from '../../../../core';
var AddConnectionDialogComponent = (function (_super) {
    __extends(AddConnectionDialogComponent, _super);
    /**
     * Initializes a new instance of the AddConnectionDialogComponent class.
     */
    function AddConnectionDialogComponent(appContextService, dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.appContextService = appContextService;
        _this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.Connections.dialogs.add;
        _this.connectionProviders = [];
        _this.allConnectionProviders = [];
        _this.id = AddConnectionDialogComponent.dialogId;
        return _this;
    }
    AddConnectionDialogComponent.addConnection = function (dialogService, appContextService, alertBarService, options) {
        dialogService.show(AddConnectionDialogComponent.dialogId, options)
            .subscribe(function (result) {
            if (result && result.connections) {
                var token_1 = result.credentials
                    ? appContextService.authorizationManager.createToken(result.credentials)
                    : null;
                result.connections.forEach(function (connection) {
                    connection.name = connection.name.toLocaleLowerCase();
                    if (token_1) {
                        appContextService.authorizationManager.nodeTokens[connection.name] = token_1;
                    }
                    appContextService.connectionManager.addOrUpdateConnection(connection);
                });
            }
        });
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
        this.panel.reset();
        var result = _super.prototype.show.call(this, options);
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
    return AddConnectionDialogComponent;
}(BaseDialogComponent));
export { AddConnectionDialogComponent };
AddConnectionDialogComponent.dialogId = 'sme-add-connection-dialog';
AddConnectionDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-add-connection-dialog',
                template: "\n      <sme-dialog #dialog [actionPane]=\"true\" class=\"no-footer\">\n          <sme-dialog-content>\n              <sme-guided-panel #panel firstPaneId=\"root\" class=\"m-b-xs m-r-sm\">\n                  <sme-guided-pane #pane paneId=\"root\">\n                      <h4>{{strings.title}}</h4>\n                      <div class=\"auto-flex-size vertical-scroll-only\">\n                          <div *ngFor=\"let provider of connectionProviders\" class=\"connection-type-list-item flex-layout\" (click)=\"openConnectionType(provider)\"\n                              [class.sideloaded]=\"provider.parentModule && provider.parentModule.isSideLoaded\">\n                              <span class=\"auto-flex-size\" [innerHtml]=\"strings.typeTitleFormat | smeFormat:[provider.connectionTypeName]\"></span>\n                              <span *ngIf=\"provider.parentModule && provider.parentModule.isSideLoaded\">{{strings.sideLoadWarning}}</span>\n                              <span class=\"fixed-flex-size sme-icon sme-icon-chevronRight\"></span>\n                          </div>\n                      </div>\n                      <div class=\"fixed-flex-size\">\n                          <div class=\"pull-right\">\n                              <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{strings.buttons.cancel}}</button>\n                          </div>\n                      </div>\n                  </sme-guided-pane>\n                  <sme-guided-pane #pane paneId=\"addConnectionFrame\">\n                      <h4 class=\"fixed-flex-size flex-layout\">\n                          <!--TODO: Reenable after 1705 release-->\n                          <!--<span class=\"back-button fixed-flex-size sme-icon sme-icon-back\" (click)=\"closeConnectionType()\"></span>-->\n                          <span *ngIf=\"selectedProvider\" class=\"auto-flex-size\" [innerHtml]=\"strings.typeTitleFormat | smeFormat:[selectedProvider.connectionTypeName]\"></span>\n                      </h4>\n                      <div class=\"auto-flex-size relative\">\n                          <sme-loading-wheel *ngIf=\"!addConnectionFrame.ready\"></sme-loading-wheel>\n                          <sme-add-connection-frame #addConnectionFrame></sme-add-connection-frame>\n                      </div>\n                  </sme-guided-pane>\n              </sme-guided-panel>\n          </sme-dialog-content>\n      </sme-dialog>\n    ",
                styles: ["\n      .connection-type-list-item {\n          padding: 5px 10px;\n          cursor: pointer;\n      }\n\n      .connection-type-list-item:hover, \n      .connection-type-list-item:focus {\n          background: #e5f1fb;\n      }\n\n\n      .connection-type-list-item .sme-icon {\n          vertical-align: top\n      }\n\n      .back-button {    \n          cursor: pointer;\n          padding: 0px 10px;\n      }\n\n      .back-button:hover,\n      .back-button:focus {    \n          background: #e5f1fb;\n      }\n\n      .connection-type-list-item.sideloaded{\n          color: #f60;\n          font-weight: bold;\n      }\n    "]
            },] },
];
/** @nocollapse */
AddConnectionDialogComponent.ctorParameters = function () { return [
    null,
    null,
]; };
AddConnectionDialogComponent.propDecorators = {
    'panel': [{ type: ViewChild, args: ['panel',] },],
    'addConnectionFrame': [{ type: ViewChild, args: ['addConnectionFrame',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvYWRkLWNvbm5lY3Rpb24tZGlhbG9nL2FkZC1jb25uZWN0aW9uLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTBCLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLcEUsT0FBTyxFQUlILG1CQUFtQixFQUt0QixNQUFNLHFCQUFBLENBQXNCO0FBQzdCLE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRXBCLE1BQU0sa0JBQUEsQ0FBbUI7QUEyQjFCO0lBQ1ksZ0RBQTBFO0lBc0NsRjs7T0FFRztJQUNILHNDQUFvQixpQkFBb0MsRUFBRSxhQUE0QjtRQUF0RixZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQUV2QjtRQUhtQix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdENqRCxhQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN2Rix5QkFBbUIsR0FBa0MsRUFBRSxDQUFDO1FBU3ZELDRCQUFzQixHQUFrQyxFQUFFLENBQUM7UUE4Qi9ELEtBQUksQ0FBQyxFQUFFLEdBQUcsNEJBQTRCLENBQUMsUUFBUSxDQUFDOztJQUNwRCxDQUFDO0lBN0JhLDBDQUFhLEdBQTNCLFVBQTRCLGFBQTRCLEVBQ3BELGlCQUFvQyxFQUNwQyxlQUFnQyxFQUNoQyxPQUFtQztRQUVuQyxhQUFhLENBQUMsSUFBSSxDQUNiLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7YUFDL0MsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNiLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxPQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVc7c0JBQ3hCLGlCQUFpQixDQUFD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a0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRUQsaUJBQU0sSUFBSSxZQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLCtDQUFRLEdBQWY7UUFDSSxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBaUZMLG1DQUFDO0FBQUQsQ0F6TkEsQUF5TkMsQ0F4TlcsbUJBQW1COztBQUNiLHFDQUFRLEdBQUcsMkJBQTJCLENBQUM7QUF1SWxELHVDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsUUFBUSxFQUFFLGc1RUFrQ1Q7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsNG5CQThCUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDJDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixJQUFJO0lBQ0osSUFBSTtDQUNILEVBSDZGLENBRzdGLENBQUM7QUFDSywyQ0FBYyxHQUEyQztJQUNoRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUUsRUFBRTtJQUNsRCxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRyxFQUFFLEVBQUU7Q0FDM0UsQ0FBQyIsImZpbGUiOiJhZGQtY29ubmVjdGlvbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==