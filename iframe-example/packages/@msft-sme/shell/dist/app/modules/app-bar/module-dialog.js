import { Observable } from 'rxjs';
import { NativeDeferred, RpcDialogState, RpcDialogType, RpcInboundCommands } from '../../../core';
var ModuleDialog = /** @class */ (function () {
    /**
     * Initializes a new instance of the ModuleDialog class.
     *
     * @param appContextService the application context service.
     * @param dialogService the dialog service.
     */
    function ModuleDialog(appContextService, dialogService) {
        var _this = this;
        this.appContextService = appContextService;
        this.dialogService = dialogService;
        // Subscribe to RPC Dialog request.
        this.moduleSubscription = this.appContextService.rpc.moduleSubjects(RpcInboundCommands.Dialog)
            .subscribe(function (dialogData) {
            switch (dialogData.data.type) {
                case RpcDialogType.OpenMessageDialog:
                    if (!_this.validateDialog(true, dialogData.data)) {
                        _this.rejectDialog(dialogData, 'busy');
                        break;
                    }
                    _this.openMessageDialog(dialogData);
                    break;
                case RpcDialogType.OpenConfirmationDialog:
                    if (!_this.validateDialog(true, dialogData.data)) {
                        _this.rejectDialog(dialogData, 'busy');
                        break;
                    }
                    _this.openConfirmationDialog(dialogData);
                    break;
                case RpcDialogType.OpenConfirmationListDialog:
                    if (!_this.validateDialog(true, dialogData.data)) {
                        _this.rejectDialog(dialogData, 'busy');
                        break;
                    }
                    _this.openConfirmationListDialog(dialogData);
                    break;
                case RpcDialogType.Close:
                    if (!_this.validateDialog(false, dialogData.data)) {
                        _this.rejectDialog(dialogData, 'noMatch');
                        break;
                    }
                    _this.closeDialog(dialogData);
                    break;
                case RpcDialogType.PollingStatus:
                    if (!_this.validateDialog(false, dialogData.data)) {
                        _this.rejectDialog(dialogData, 'noMatch');
                        break;
                    }
                    _this.statusDialog(dialogData);
                    break;
            }
        });
    }
    /**
     * Dispose the current subscriptions.
     */
    ModuleDialog.prototype.dispose = function () {
        if (this.moduleSubscription) {
            this.moduleSubscription.unsubscribe();
            this.moduleSubscription = null;
        }
        if (this.dialogSubscription) {
            this.dialogSubscription.unsubscribe();
            this.dialogSubscription = null;
        }
    };
    /**
     * Validate dialog object.
     *
     * @param create whether creating new dialog.
     * @param dialog the dialog data from RPC.
     * @return boolean the value indicating whether it's right condition.
     */
    ModuleDialog.prototype.validateDialog = function (create, dialog) {
        var _this = this;
        if (create) {
            if (this.result) {
                // already active dialog.
                return false;
            }
            // crete new dialog result object.
            this.result = {
                dialogId: dialog.dialogId,
                state: RpcDialogState.Opened,
                type: dialog.type,
                openedTime: Date.now()
            };
            this.closedResult = null;
            this.deferred = new NativeDeferred();
            this.deferred.promise.then(function (result) {
                _this.closedResult = result;
                _this.closedResult.closedTime = Date.now();
                _this.result = null;
                if (_this.waiter) {
                    _this.waiter.resolve(_this.closedResult);
                }
            }, function (error) {
                _this.closedResult = _this.result;
                _this.result = null;
                _this.closedResult.closedTime = Date.now();
                _this.closedResult.failedMessage = error;
                _this.closedResult.state = RpcDialogState.Failed;
                if (_this.waiter) {
                    _this.waiter.resolve(_this.closedResult);
                }
            });
            return true;
        }
        var currentResult = this.result || this.closedResult;
        if (!currentResult || currentResult.dialogId !== dialog.dialogId) {
            // not match.
            return false;
        }
        return true;
    };
    /**
     * Reject dialog request from RPC.
     *
     * @param dialogData The RPC dialog Data.
     * @param message The message to send as an error.
     */
    ModuleDialog.prototype.rejectDialog = function (dialogData, message) {
        var response = {
            dialogId: dialogData.data.dialogId,
            type: dialogData.data.type,
            failedMessage: message,
            state: RpcDialogState.Failed
        };
        dialogData.deferred.reject(response);
    };
    ModuleDialog.prototype.openMessageDialog = function (dialogData) {
        var _this = this;
        var dialog = dialogData.data.request;
        var options = {
            title: dialog.title,
            message: dialog.message,
            buttonText: dialog.buttonText,
            externalLink: dialog.externalLink ? { title: dialog.externalLink.title, url: dialog.externalLink.url } : undefined,
            checkboxText: dialog.checkboxText ? dialog.checkboxText : undefined,
            isFromRpc: true
        };
        this.dialogSubscription = this.dialogService.showMessage(options)
            .subscribe(function (result) {
            _this.result.response = result;
            _this.result.state = RpcDialogState.Closed;
            _this.deferred.resolve(_this.result);
        }, function (error) {
            _this.deferred.reject(error);
        });
        dialogData.deferred.resolve(this.result);
    };
    ModuleDialog.prototype.openConfirmationDialog = function (dialogData) {
        var _this = this;
        var dialog = dialogData.data.request;
        var options = {
            title: dialog.title,
            message: dialog.message,
            confirmButtonText: dialog.confirmButtonText,
            cancelButtonText: dialog.cancelButtonText,
            doubleCheckText: dialog.doubleCheckText,
            checkboxText: dialog.checkboxText,
            isFromRpc: true
        };
        this.dialogSubscription = this.dialogService.showConfirmation(options)
            .subscribe(function (result) {
            var response = {
                confirmed: result.confirmed,
                checkboxResult: result.checkboxResult
            };
            _this.result.response = response;
            _this.result.state = RpcDialogState.Closed;
            _this.deferred.resolve(_this.result);
        }, function (error) {
            _this.deferred.reject(error);
        });
        dialogData.deferred.resolve(this.result);
    };
    ModuleDialog.prototype.openConfirmationListDialog = function (dialogData) {
        var _this = this;
        var dialog = dialogData.data.request;
        var options = {
            title: dialog.title,
            listDataSource: Observable.of(dialog.list),
            listFooterText: dialog.listFooterText,
            listHeaderText: dialog.listHeaderText,
            confirmButtonText: dialog.confirmButtonText,
            checkboxText: dialog.checkboxText,
            cancelButtonText: dialog.cancelButtonText,
            isFromRpc: true
        };
        this.dialogSubscription = this.dialogService.showConfirmationList(options)
            .subscribe(function (result) {
            var response = {
                confirmed: result.confirmed,
                checkboxResult: result.checkboxResult
            };
            _this.result.response = response;
            _this.result.state = RpcDialogState.Closed;
            _this.deferred.resolve(_this.result);
        }, function (error) {
            _this.deferred.reject(error);
        });
        dialogData.deferred.resolve(this.result);
    };
    ModuleDialog.prototype.closeDialog = function (dialogData) {
        var _this = this;
        if (!this.result) {
            dialogData.deferred.resolve(this.closedResult);
            return;
        }
        switch (this.result.type) {
            case RpcDialogType.OpenMessageDialog:
                this.dialogService.hideMessage();
                break;
            case RpcDialogType.OpenConfirmationDialog:
                this.dialogService.hideConfirmation();
                break;
            case RpcDialogType.OpenConfirmationListDialog:
                this.dialogService.hideConfirmationList();
                break;
        }
        this.result.state = RpcDialogState.ForcedTerminated;
        this.dialogSubscription.unsubscribe();
        this.deferred.promise.then(function () { return dialogData.deferred.resolve(_this.closedResult); });
        this.deferred.resolve(this.result);
    };
    ModuleDialog.prototype.statusDialog = function (dialogData) {
        var _this = this;
        // status is using long-polling to hold 500 ms.
        if (this.closedResult) {
            dialogData.deferred.resolve(this.closedResult);
        }
        else {
            this.waiter = dialogData.deferred;
            setTimeout(function () {
                if (dialogData.deferred.isPending) {
                    // still pending so send current status.
                    dialogData.deferred.resolve(_this.result || _this.closedResult);
                }
                _this.waiter = null;
            }, 500);
        }
    };
    return ModuleDialog;
}());
export { ModuleDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcC1iYXIvbW9kdWxlLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQVVoRCxPQUFPLEVBRUgsY0FBYyxFQU9kLGNBQWMsRUFDZCxhQUFhLEVBRWIsa0JBQWtCLEVBRXJCLE1BQU0sZUFBZSxDQUFDO0FBRXZCO0lBK0JJOzs7OztPQUtHO0lBQ0gsc0JBQW9CLGlCQUFvQyxFQUFVLGFBQTRCO1FBQTlGLGlCQW1EQztRQW5EbUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzFGLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQWdCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQzthQUN4RyxTQUFTLENBQUMsVUFBQyxVQUF3RDtZQUNoRSxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUssYUFBYSxDQUFDLGlCQUFpQjtvQkFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxLQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDdEMsS0FBSyxDQUFDO29CQUNWLENBQUM7b0JBRUQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNuQyxLQUFLLENBQUM7Z0JBRVYsS0FBSyxhQUFhLENBQUMsc0JBQXNCO29CQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7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