import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DialogCloseReason } from './dialog.component';
var DialogService = /** @class */ (function () {
    function DialogService() {
        this.commonIds = {
            confirmation: 'sme-common-confirmation-dialog',
            confirmationList: 'sme-common-confirmation-list-dialog',
            message: 'sme-common-message-dialog',
            notifications: 'sme-common-notifications-pane',
            settings: 'sme-common-settings-pane',
            help: 'sme-common-help-pane',
            userPane: 'sme-common-user-pane',
            manageAs: 'sme-common-manage-as-dialog'
        };
        this.activeDialogsStack = [];
        this.componentMap = {};
        this.dialogOrigins = {};
    }
    /**
     * Registers the dialog with the service.
     *
     * @type TOptions the type of the dialog options.
     * @type TResult the type of the dialog results.
     * @param id The unique identifier of the dialog.
     * @param component The dialog component.
     */
    DialogService.prototype.register = function (id, component) {
        if (!id) {
            throw new Error('DialogService.register: ID is required to register a dialog.');
        }
        if (!component) {
            throw new Error('DialogService.register: A dialog is required to register a dialog.');
        }
        /**
         * removing until we understand cases where angular can call ngOnInit twice.
         * see: http://stackoverflow.com/questions/42700116/angular2-routing-issue-and-ngoninit-called-twice
         * and @msft-sme/local-users-groups for examples
         */
        // if (this.componentMap[id]) {
        //     console.warn(`DialogService.register: A dialog with the ID \'${id}\' has already been registered`);
        // }
        this.componentMap[id] = component;
    };
    /**
     * Unregisters the dialog with the service.
     *
     * @param id The unique identifier of the dialog.
     */
    DialogService.prototype.unregister = function (id) {
        if (this.componentMap[id]) {
            delete this.componentMap[id];
        }
        if (this.activeDialogsStack && this.activeDialogsStack.length > 0 && MsftSme.last(this.activeDialogsStack).id === id) {
            this.activeDialogsStack.pop();
        }
    };
    /**
     * Shows the dialog.
     *
     * @type TOptions The type of the dialog options.
     * @type TResult The result of the dialog.
     * @param id The unique identifier of the dialog.
     * @param options The dialog options.
     */
    DialogService.prototype.show = function (id, options) {
        var _this = this;
        if (!id) {
            throw new Error('DialogService.show: ID is required to show a dialog.');
        }
        if (!this.componentMap[id]) {
            throw new Error("DialogService.show: No dialog associated with provided ID '" + id + "'.");
        }
        var newDialog = this.componentMap[id];
        var oldDialog = MsftSme.last(this.activeDialogsStack);
        // accessibility
        if (!options.isFromRpc) {
            var origin = document.activeElement;
            if (origin) {
                this.dialogOrigins[id] = origin;
            }
        }
        // dont do anything unless we have a subscriber
        return Observable.of(oldDialog).flatMap(function (it) {
            // create a placeholder for the new dialog result
            var resultObservable;
            // remember if there was an active dialog when we started
            var existingActiveDialog = !!oldDialog;
            if (existingActiveDialog) {
                if (oldDialog.keepOpen) {
                    // If the currently active dialog wants to stay open, then keep it open and show the new dialog on top
                    _this.activeDialogsStack.push(newDialog);
                    // we set the dilaog level as the length of the active dialogs stack
                    newDialog.setLevel(_this.activeDialogsStack.length);
                    _this.activeDialogResult = newDialog.show(options).map(function (result) {
                        _this.activeDialogsStack.pop();
                        if (oldDialog) {
                            oldDialog.autoFocus();
                        }
                        return result;
                    });
                    resultObservable = _this.activeDialogResult;
                }
                else {
                    // if there is an active dialog, wait for it to complete, then show a the new one
                    resultObservable = _this.activeDialogResult
                        .takeLast(1)
                        .flatMap(function () {
                        return _this.show(id, options);
                    });
                }
            }
            else {
                // if there is no active dialog, then just show the new one
                _this.activeDialogsStack.push(newDialog);
                _this.activeDialogResult = newDialog.show(options).map(function (result) {
                    if (oldDialog) {
                        oldDialog.autoFocus();
                    }
                    _this.activeDialogsStack.pop();
                    return result;
                });
                resultObservable = _this.activeDialogResult;
            }
            // if we had an active dialog, request the previous dialog to close unless it wants to stay open
            if (existingActiveDialog && !oldDialog.keepOpen) {
                oldDialog.closeRequested(DialogCloseReason.CompetingDialog);
            }
            return resultObservable;
        });
    };
    /**
     * Shows a message dialog with the given options
     *
     * @param options The dialog options.
     * @returns A subject that will be published one time with the dialog result
     */
    DialogService.prototype.showMessage = function (options) {
        return this.show(this.commonIds.message, options);
    };
    /**
     * Hide a message dialog.
     */
    DialogService.prototype.hideMessage = function () {
        this.hide(this.commonIds.message);
    };
    /**
     * Shows a confirmation dialog with the given options
     *
     * @param options The dialog options.
     * @returns A subject that will be published one time with the dialog result
     */
    DialogService.prototype.showConfirmation = function (options) {
        return this.show(this.commonIds.confirmation, options);
    };
    /**
     * Hide a confirmation dialog.
     */
    DialogService.prototype.hideConfirmation = function () {
        this.hide(this.commonIds.confirmation);
    };
    /**
     * Shows a confirmation list dialog with the given options
     *
     * @param options The dialog options.
     * @returns A subject that will be published one time with the dialog result
     */
    DialogService.prototype.showConfirmationList = function (options) {
        return this.show(this.commonIds.confirmationList, options);
    };
    /**
     * Hide a confirmation list  dialog.
     */
    DialogService.prototype.hideConfirmationList = function () {
        this.hide(this.commonIds.confirmationList);
    };
    /**
     * Hides the dialog.
     *
     * @type TResult The type of the dialog result.
     * @param id The unique identifier of the dialog.
     * @param result The result of the dialog.
     */
    DialogService.prototype.hide = function (id, result) {
        if (!id) {
            throw new Error('DialogService.hide: ID is required to hide a dialog.');
        }
        if (!this.componentMap[id]) {
            throw new Error("DialogService.hide: No dialog associated with provided ID '" + id + "'.");
        }
        this.componentMap[id].hide(result);
    };
    /**
     * Resume focus back to the original element that shows the dialog.
     * @param id The id of dialog
     */
    DialogService.prototype.resumeFocus = function (id) {
        var _this = this;
        if (this.dialogOrigins[id]) {
            setTimeout(function () {
                _this.dialogOrigins[id].focus();
                delete _this.dialogOrigins[id];
            }, 0);
        }
    };
    DialogService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DialogService.ctorParameters = function () { return []; };
    return DialogService;
}());
export { DialogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2RpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRTNDLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxpQkFBQSxDQUFrQjtBQUs3QyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxvQkFBQSxDQUFxQjtBQUl2RDtJQUFBO1FBQ1csY0FBUyxHQUFHO1lBQ2YsWUFBWSxFQUFFLGdDQUFnQztZQUM5QyxnQkFBZ0IsRUFBRSxxQ0FBcUM7WUFDdkQsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxhQUFhLEVBQUUsK0JBQStCO1lBQzlDLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSw2QkFBNkI7U0FDMUMsQ0FBQztRQUVLLHVCQUFrQixHQUF1RCxFQUFFLENBQUM7UUFFM0UsaUJBQVksR0FBMEUsRUFBRSxDQUFDO1FBRXpGLGtCQUFhLEdBQXFDLEVBQUUsQ0FBQztJQTBOakUsQ0FBQztJQXhORzs7Ozs7OztPQU9HO0lBQ0ksZ0NBQVEsR0FBZixVQUNJLEVBQVUsRUFDVixTQUFpRDtRQUVqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztRQUMxRixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILCtCQUErQjtRQUMvQiwwR0FBMEc7UUFDMUcsSUFBSTtRQUVKLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3RDLENBQUM7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Q0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1DQUFXLEdBQWxCLFVBQW1CLEVBQVU7UUFBN0IsaUJBU0M7UUFSRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixVQUFVLENBQ047Z0JBQ0MsS0FBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLENBQUMsRUFDRCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDTCxDQUFDO0lBQ0Usd0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCw0QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLG9CQUFDO0NBMU9ELEFBME9DLElBQUE7U0ExT1ksYUFBYSIsImZpbGUiOiJkaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=