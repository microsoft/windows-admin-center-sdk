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
import { AppContextService, AuthorizationService, BaseDialogComponent, DialogService } from '../../../../angular';
import { Cim, HttpStatusCode, Net } from '../../../../core';
import { PowerShellScripts } from '../../../../generated/powershell-scripts';
/**
 * TODO: While this dialog works for current scenarios, we will need to think broader when non-node connections come into play.
 * One option would be to treat this dialog similar to the add-connection dialog and let connection providers
 * also provide the authentication mechanism for those connections
 */
var ManageAsDialogComponent = /** @class */ (function (_super) {
    __extends(ManageAsDialogComponent, _super);
    /**
     * Initializes a new instance of the ManageAsDialogComponent class.
     */
    function ManageAsDialogComponent(dialogService, appContextService, authorizationService) {
        var _this = _super.call(this, dialogService) || this;
        _this.appContextService = appContextService;
        _this.authorizationService = authorizationService;
        _this.checkingCredentials = false;
        _this.showCheckingCredentials = false;
        _this.credentialsError = '';
        _this.strings = MsftSme.resourcesStrings();
        _this.id = dialogService.commonIds.manageAs;
        return _this;
    }
    ;
    ManageAsDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        AuthorizationService.authorize = function (nodeNames) {
            if (!Array.isArray(nodeNames)) {
                nodeNames = [nodeNames];
            }
            return _this.dialogService.show(_this.dialogService.commonIds.manageAs, { nodeNames: nodeNames }).map(function (result) {
                if (!result || !result.continue) {
                    // user canceled, so throw and allow auth handler to fail the current request
                    throw new Error('Node authorization was skipped or failed.');
                }
                return result.credentials;
            });
        };
        _super.prototype.ngOnInit.call(this);
    };
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    ManageAsDialogComponent.prototype.show = function (options) {
        this.checkingCredentials = false;
        this.showCheckingCredentials = false;
        this.credentialsError = '';
        if (!options) {
            throw new Error('ManageAsDialogComponent.show: Options are required to show the dialog.');
        }
        if (options.nodeNames.length === 0) {
            throw new Error('ManageAsDialogComponent.show: options.nodenames requires at least one node name.');
        }
        this.nodeNames = options.nodeNames;
        var nodeName = options.nodeNames.length === 1
            ? options.nodeNames.first()
            : this.strings.MsftSmeShell.App.ManageAsDialog.messageCountFormat.format(options.nodeNames.length);
        this.message = this.strings.MsftSmeShell.App.ManageAsDialog.messageFormat.format(nodeName);
        this.credentialsForm.reset(options.nodeNames.first());
        return _super.prototype.show.call(this, options);
    };
    ManageAsDialogComponent.prototype.onCredentialsChanged = function (creds) {
        this.creds = creds;
    };
    /**
     * The method to call when the confirm button is clicked.
     */
    ManageAsDialogComponent.prototype.onContinue = function () {
        var _this = this;
        if (this.checkingCredentials) {
            return;
        }
        this.checkingCredentials = true;
        this.credentialsError = '';
        var token = this.authorizationService.createToken({
            lapsLocalAdminName: this.creds.lapsLocalAdminName,
            password: this.creds.password,
            useLaps: this.creds.useLaps,
            username: this.creds.username
        });
        // most of this time this action will be so fast that the there is no need to show the spinner.
        setTimeout(function () {
            if (_this.checkingCredentials) {
                _this.showCheckingCredentials = true;
            }
        }, 250);
        this.appContextService.cim
            .getInstanceMultiple(this.nodeNames.first(), Cim.namespace.cimV2, Cim.cimClass.win32OperatingSystem, {
            authToken: token,
            powerShellCommand: PowerShellScripts.Get_CimWin32OperatingSystem.command
        })
            .subscribe(function (response) {
            // Yay, we have valid credentials
            _this.checkingCredentials = false;
            _this.showCheckingCredentials = false;
            _this.hide({
                continue: true,
                credentials: _this.creds
            });
        }, function (error) {
            // Boo, we have invalid credentials, or something bad is happening
            _this.checkingCredentials = false;
            _this.showCheckingCredentials = false;
            if (error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden) {
                _this.credentialsError = _this.strings.MsftSmeShell.App.ManageAsDialog.authError;
            }
            else {
                _this.credentialsError = Net.getErrorMessage(error);
            }
        });
    };
    /**
     * The method to call when the cancel button is clicked.
     */
    ManageAsDialogComponent.prototype.onCancel = function () {
        var _this = this;
        /**
         * HACK: Need to look deeper into what happens when the observable that consumes this dialog throws an error that is never caught.
         * Angular is treating the condition as if the UI actually threw an error and creates a ViewWrappedError and locks the UI.
         * We can get around this by disconnecting the context of the button 'click' from the context that triggers
         * the error. setTimeout accomplishes this, but is a bad solution for obvious reasons.
         * This should be a high priority to fix.
         */
        setTimeout(function () {
            _this.hide({
                continue: false
            });
        }, 0);
    };
    ManageAsDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-manage-as-dialog',
                    template: "\n      <sme-dialog #dialog [actionPane]=\"true\" (keyup.enter)=\"onContinue()\">\n          <sme-dialog-header>\n              <h4 id=\"sme-dialog-title\" >{{strings.MsftSmeShell.App.ManageAsDialog.title}}</h4>\n          </sme-dialog-header>\n          <sme-dialog-content>\n              <p id=\"sme-dialog-desc\">{{message}}</p>\n              <sme-node-credentials-form #credentialsForm (credentialsChanged)=\"onCredentialsChanged($event)\"></sme-node-credentials-form>\n              <sme-loading-wheel *ngIf=\"showCheckingCredentials\" [message]=\"strings.MsftSmeShell.App.ManageAsDialog.validatingMessage\"></sme-loading-wheel>\n              <div *ngIf=\"credentialsError\" class=\"sme-arrange-stack-h color-error m-t-xxs\">\n                  <div class=\"sme-icon sme-icon-error icon-size sme-position-flex-none m-r-xxs\"> </div>\n                  <p class=\"sme-position-flex-auto\">{{credentialsError}}</p>\n              </div>\n          </sme-dialog-content>\n          <sme-dialog-footer>\n              <div class=\"pull-right\">\n                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"onContinue()\" [disabled]=\"checkingCredentials\">\n              {{strings.MsftSmeShell.Angular.Common.continue}}\n            </button>\n                  <button type=\"button\" class=\"btn\" (click)=\"onCancel()\">{{strings.MsftSmeShell.Angular.Common.cancel}}</button>\n              </div>\n          </sme-dialog-footer>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    ManageAsDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
        { type: AppContextService, },
        { type: AuthorizationService, },
    ]; };
    ManageAsDialogComponent.propDecorators = {
        'credentialsForm': [{ type: ViewChild, args: ['credentialsForm',] },],
    };
    return ManageAsDialogComponent;
}(BaseDialogComponent));
export { ManageAsDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvbWFuYWdlLWFzLWRpYWxvZy9tYW5hZ2UtYXMtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBMEIsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUdwRSxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUNwQixtQkFBbUIsRUFHbkIsYUFBYSxFQUVoQixNQUFNLHFCQUFBLENBQXNCO0FBQzdCLE9BQU8sRUFBNEIsR0FBQSxFQUFLLGNBQUEsRUFBZ0IsR0FBQSxFQUFJLE1BQU8sa0JBQUEsQ0FBbUI7QUFDdEYsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sMENBQUEsQ0FBMkM7QUE0QjdFOzs7O0dBSUc7QUFFSDtJQUE2QywyQ0FBZ0U7SUFhekc7O09BRUc7SUFDSCxpQ0FDSSxhQUE0QixFQUNwQixpQkFBb0MsRUFDcEMsb0JBQTBDO1FBSHRELFlBS0ksa0JBQU0sYUFBYSxDQUFDLFNBRXZCO1FBTFcsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywwQkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBaEIvQyx5QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsNkJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLHNCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixhQUFPLEdBQVksT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFnQjFELEtBQUksQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7O0lBQy9DLENBQUM7SUFmNEIsQ0FBQztJQWlCdkIsMENBQVEsR0FBZjtRQUFBLGlCQWlCQztRQWhCRyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsVUFBQyxTQUE0QjtZQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxD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Q0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQ25GLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQ0FBUSxHQUFmO1FBQUEsaUJBZ0JDO1FBZEc7Ozs7OztXQU1HO1FBQ0gsVUFBVSxDQUNOO1lBQ0ksS0FBSSxDQUFDLElBQUksQ0FBQztnQkFDTixRQUFRLEVBQUUsS0FBSzthQUNsQixDQUFDLENBQUM7UUFDUCxDQUFDLEVBQ0QsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0Usa0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsNDhDQXVCVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztRQUN2QixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztRQUMzQixFQUFDLElBQUksRUFBRSxvQkFBb0IsR0FBRztLQUM3QixFQUo2RixDQUk3RixDQUFDO0lBQ0ssc0NBQWMsR0FBMkM7UUFDaEUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUcsRUFBRSxFQUFFO0tBQ3JFLENBQUM7SUFDRiw4QkFBQztDQTlMRCxBQThMQyxDQTlMNEMsbUJBQW1CLEdBOEwvRDtTQTlMWSx1QkFBdUIiLCJmaWxlIjoibWFuYWdlLWFzLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9