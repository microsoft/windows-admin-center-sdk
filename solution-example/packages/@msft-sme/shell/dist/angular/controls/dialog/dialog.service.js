import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DialogCloseReason } from './dialog.component';
var DialogService = (function () {
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
    return DialogService;
}());
export { DialogService };
DialogService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DialogService.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2RpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRTNDLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxpQkFBQSxDQUFrQjtBQUs3QyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxvQkFBQSxDQUFxQjtBQUl2RDtJQUFBO1FBQ1csY0FBUyxHQUFHO1lBQ2YsWUFBWSxFQUFFLGdDQUFnQztZQUM5QyxnQkFBZ0IsRUFBRSxxQ0FBcUM7WUFDdkQsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxhQUFhLEVBQUUsK0JBQStCO1lBQzlDLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSw2QkFBNkI7U0FDMUMsQ0FBQztRQUVLLHVCQUFrQixHQUF1RCxFQUFFLENBQUM7UUFFM0UsaUJBQVksR0FBMEUsRUFBRSxDQUFDO0lBdU1yRyxDQUFDO0lBcE1HOzs7Ozs7O09BT0c7SUFDSSxnQ0FBUSxHQUFmLFVBQ0ksRUFBVSxFQUNWLFNBQWlEO1FBRWpELEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQztRQUNwRixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1FBQzFGLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsK0JBQStCO1FBQy9CLDBHQUEwRztRQUMxRyxJQUFJO1FBRUosSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrQ0FBVSxHQUFq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