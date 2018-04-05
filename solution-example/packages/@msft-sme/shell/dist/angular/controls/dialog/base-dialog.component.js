import { Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * The base dialog component for extending.
 */
var BaseDialogComponent = (function () {
    /**
     * Initializes a new instance of the BaseDialogComponent class.
     */
    function BaseDialogComponent(dialogService) {
        this.dialogService = dialogService;
        /**
         * Keeps the dialog open when another dialog pops up
         * by default the dialog will be closed if another dialog opens while this dialog is visible
         */
        this.keepOpen = false;
    }
    /**
     * The method to run when the component initialized.
     */
    BaseDialogComponent.prototype.ngOnInit = function () {
        /* empty */
    };
    /**
     * The method to run after the component view initialized
     */
    BaseDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.dialog) {
            throw new Error('BaseDialogComponent.ngOnInit: Dialog is not defined');
        }
        if (!this.id) {
            throw new Error('BaseDialogComponent.ngOnInit: ID is not defined');
        }
        this.dialogService.register(this.id, this);
        this.closeSubscription = this.dialog.closeRequested.subscribe(function (reason) {
            _this.closeRequested(reason);
        });
    };
    /**
     * The method to run when the component is destroyed.
     */
    BaseDialogComponent.prototype.ngOnDestroy = function () {
        this.dialogService.unregister(this.id);
        this.closeSubscription.unsubscribe();
    };
    /**
     * handler for when a close is requested
     * by default this closes the dialog with no result.
     * override this function to prevent this behavior
     * @param reason - reason for the close following DialogCloseReason
     */
    BaseDialogComponent.prototype.closeRequested = function (reason) {
        this.hide();
    };
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    BaseDialogComponent.prototype.show = function (options) {
        this.dialog.show();
        this.dialogResult = new Subject();
        return this.dialogResult;
    };
    /**
     * Sets the level of the dialogso it overlays on top of anything else
     * This is set by the dialog service when a dialog opens another dialog
     * @param level The level of the dialog so it shows up on top of other items. this should be a number greater than 0
     */
    BaseDialogComponent.prototype.setLevel = function (level) {
        this.dialog.dialogLevel = level;
    };
    /**
     * refocuses the keyboard on the dialog
     */
    BaseDialogComponent.prototype.autoFocus = function () {
        this.dialog.autoFocus();
    };
    /**
     * Hides the dialog.
     *
     * @param result The result of the dialog action.
     */
    BaseDialogComponent.prototype.hide = function (result) {
        this.dialog.hide();
        this.dialogResult.next(result);
        this.dialogResult.complete();
    };
    return BaseDialogComponent;
}());
export { BaseDialogComponent };
BaseDialogComponent.propDecorators = {
    'id': [{ type: Input },],
    'dialog': [{ type: ViewChild, args: ['dialog',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2Jhc2UtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLEtBQUEsRUFBMEIsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUM5RixPQUFPLEVBQUUsT0FBQSxFQUFzQixNQUFPLE1BQUEsQ0FBTztBQWdCN0M7O0dBRUc7QUFDSDtJQWlCSTs7T0FFRztJQUNILDZCQUFzQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVhsRDs7O1dBR0c7UUFDSSxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBUXhCLENBQUM7SUFFRDs7T0FFRztJQUNJLHNDQUFRLEdBQWY7UUFDSSxXQUFXO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNkNBQWUsR0FBdEI7UUFBQSxpQkFhQztRQVpHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDaEUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLHlDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSw0Q0FBYyxHQUFyQixVQUFzQixNQUF5QjtRQUM1QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxrQ0FBSSxHQUFYLFVBQVksT0FBaUI7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQ0FBUSxHQUFmLFVBQWdCLEtBQWE7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNJLHVDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGtDQUFJLEdBQVgsVUFBWSxNQUFnQjtRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUtMLDBCQUFDO0FBQUQsQ0E3R0EsQUE2R0M7O0FBSk0sa0NBQWMsR0FBMkM7SUFDaEUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDeEIsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRyxFQUFFLEVBQUU7Q0FDbkQsQ0FBQyIsImZpbGUiOiJiYXNlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9