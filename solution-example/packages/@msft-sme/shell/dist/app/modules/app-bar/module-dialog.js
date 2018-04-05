import { Observable } from 'rxjs';
import { NativeDeferred, RpcDialogState, RpcDialogType, RpcInboundCommands } from '../../../core';
var ModuleDialog = (function () {
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
            externalLink: dialog.externalLink ? { title: dialog.externalLink.title, url: dialog.externalLink.url } : undefined
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
            checkboxText: dialog.checkboxText
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
            cancelButtonText: dialog.cancelButtonText
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FwcC1iYXIvbW9kdWxlLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQVVoRCxPQUFPLEVBRUgsY0FBYyxFQU9kLGNBQWMsRUFDZCxhQUFhLEVBRWIsa0JBQWtCLEVBRXJCLE1BQU0sZUFBZSxDQUFDO0FBRXZCO0lBK0JJOzs7OztPQUtHO0lBQ0gsc0JBQW9CLGlCQUFvQyxFQUFVLGFBQTRCO1FBQTlGLGlCQW1EQztRQW5EbUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzFGLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQWdCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQzthQUN4RyxTQUFTLENBQUMsVUFBQyxVQUF3RDtZQUNoRSxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUssYUFBYSxDQUFDLGlCQUFpQjtvQkFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxLQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDdEMsS0FBSyxDQUFDO29CQUNWLENBQUM7b0JBRUQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNuQyxLQUFLLENBQUM7Z0JBRVYsS0FBSyxhQUFhLENBQUMsc0JBQXNCO29CQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7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QUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLG1DQUFZLEdBQXBCLFVBQXFCLFVBQXdEO1FBQTdFLGlCQWlCQztRQWhCRywrQ0FBK0M7UUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNsQyxVQUFVLENBQ047Z0JBQ0ksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNoQyx3Q0FBd0M7b0JBQ3hDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxNQUFNLElBQUksS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNsRSxDQUFDO2dCQUVELEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsRUFDRCxHQUFHLENBQUMsQ0FBQztRQUNiLENBQUM7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXJTQSxBQXFTQyxJQUFBIiwiZmlsZSI6Im1vZHVsZS1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9