import { ChangeDetectorRef, Component, ElementRef, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var DialogHeaderComponent = /** @class */ (function () {
    function DialogHeaderComponent() {
    }
    DialogHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dialog-header',
                    template: '<div class="sme-padding-spread-h-sm"><ng-content></ng-content></div>'
                },] },
    ];
    /** @nocollapse */
    DialogHeaderComponent.ctorParameters = function () { return []; };
    return DialogHeaderComponent;
}());
export { DialogHeaderComponent };
var DialogContentComponent = /** @class */ (function () {
    function DialogContentComponent() {
    }
    DialogContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dialog-content',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    DialogContentComponent.ctorParameters = function () { return []; };
    return DialogContentComponent;
}());
export { DialogContentComponent };
var DialogFooterComponent = /** @class */ (function () {
    function DialogFooterComponent() {
    }
    DialogFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dialog-footer',
                    template: '<div class="sme-layout-float-right sme-position-right-inline sme-padding-spread-h-sm"><ng-content></ng-content></div>'
                },] },
    ];
    /** @nocollapse */
    DialogFooterComponent.ctorParameters = function () { return []; };
    return DialogFooterComponent;
}());
export { DialogFooterComponent };
export var DialogCloseReason;
(function (DialogCloseReason) {
    DialogCloseReason[DialogCloseReason["SoftDismiss"] = 0] = "SoftDismiss";
    DialogCloseReason[DialogCloseReason["CloseButton"] = 1] = "CloseButton";
    DialogCloseReason[DialogCloseReason["EscapeKey"] = 2] = "EscapeKey";
    DialogCloseReason[DialogCloseReason["CompetingDialog"] = 3] = "CompetingDialog";
})(DialogCloseReason || (DialogCloseReason = {}));
export var dialogModePane = 'pane';
export var dialogModeCompact = 'compact';
export var dialogModeCompactSquare = 'compact-square';
export var dialogModeFullscreen = 'fullscreen';
export var dialogModeCentered = 'centered';
export var dialogModeCenteredLarge = 'centered-large';
export var modalDialog = 'modal';
export var alertDialog = 'alert';
var DialogComponent = /** @class */ (function () {
    function DialogComponent(elementRef, changeDetectorRef) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.dialogRole = 'alertdialog';
        this.dialogLevel = 1;
        this.showBackdrop = true;
        this.clickBackdrop = true;
        /**
         * Indicates the dialog mode to use. The valid values are:
         * @see dialogModePane - 'pane'
         * @see dialogModeFullSCreen - 'fullscreen'
         * @see dialogModeCentered - 'centered'
         */
        this.dialogMode = dialogModePane;
        /**
         * Dialog types. Mostly used for accessibility. Valid values:
         * @see modalDialog = 'modal';
         * @see alertDialog = "alert";
         */
        this.dialogType = '';
        this.doAutoFocus = false;
        this.isVisible = false;
        // Create closeRequested subject to notify dialogs when a close is requested and how it was requested (DialogCloseReason)
        this.closeRequested = new Subject();
        this.setDialogModeFromInput();
    }
    Object.defineProperty(DialogComponent.prototype, "actionPane", {
        /**
         * Sets whether this should be an action pane or a centered dialog
         *
         * @deprecated Use dialogMode instead
         * @param newValue {boolean} if true, uses a left pane dialog, othewrwise a centered dialog
         */
        set: function (newValue) {
            if (newValue) {
                this.dialogMode = dialogModePane;
            }
            else {
                this.dialogMode = dialogModeCentered;
            }
            this.setDialogModeFromInput();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogComponent.prototype, "visible", {
        get: function () {
            return this.isVisible;
        },
        set: function (visible) {
            this.isVisible = visible;
            this.doAutoFocus = visible;
        },
        enumerable: true,
        configurable: true
    });
    DialogComponent.prototype.onKeyUp = function (event) {
        if (this.visible) {
            switch (event.keyCode) {
                case MsftSme.KeyCode.Escape:
                    this.onEscapePressed();
                    break;
            }
        }
    };
    /**
     * Angular Life Cycle hook for After View Checked.
     * When the visibility changes, we are going to focus on the first element that has the autofocus attribute
     */
    DialogComponent.prototype.ngAfterViewChecked = function () {
        if (this.doAutoFocus) {
            this.autoFocus();
        }
    };
    /**
     * Completed the closeRequested subject
     */
    DialogComponent.prototype.ngOnDestroy = function () {
        this.closeRequested.complete();
    };
    /**
     * Auto focus on first element that is focusable
     */
    DialogComponent.prototype.autoFocus = function () {
        this.doAutoFocus = false;
        var firstFocusable = MsftSme.getFirstFocusableDescendent(this.elementRef.nativeElement);
        if (firstFocusable) {
            firstFocusable.focus();
        }
    };
    /**
     * Shows the dialog.
     */
    DialogComponent.prototype.show = function () {
        this.visible = true;
    };
    /**
     * Hides the dialog.
     */
    DialogComponent.prototype.hide = function () {
        this.visible = false;
        this.changeDetectorRef.detectChanges();
    };
    /**
     * Notifies closeRequested subscribers that the backdrop has been clicked, requesting a soft dismiss
     */
    DialogComponent.prototype.onBackgroundClicked = function () {
        this.closeRequested.next(DialogCloseReason.SoftDismiss);
    };
    DialogComponent.prototype.onEscapePressed = function () {
        this.closeRequested.next(DialogCloseReason.EscapeKey);
    };
    DialogComponent.prototype.ngOnChanges = function (changes) {
        var dialogModeChange = changes['dialogMode'];
        if (dialogModeChange && dialogModeChange.currentValue) {
            this.setDialogModeFromInput();
        }
    };
    DialogComponent.prototype.setDialogModeFromInput = function () {
        var _this = this;
        var newValue = this.dialogMode.toLowerCase().trim();
        var classes = ['sme-layout-absolute', 'sme-scheme-dialog'];
        var commonPaneClasses = ['sme-position-vertical-none', 'sme-position-right-none'];
        if (newValue === dialogModePane) {
            classes.push.apply(classes, commonPaneClasses.concat(['sme-layout-dialog-pane', 'sme-border-left-md']));
        }
        else if (newValue === dialogModeCompact) {
            classes.push.apply(classes, commonPaneClasses.concat(['sme-layout-dialog-compact', 'sme-border-left-md']));
        }
        else if (newValue === dialogModeCompactSquare) {
            classes.push('sme-position-center sme-layout-dialog-centered sme-layout-dialog-compact-square', 'sme-border-inset-md');
        }
        else if (newValue === dialogModeFullscreen) {
            classes.push.apply(classes, commonPaneClasses.concat(['sme-layout-dialog-fullscreen', 'sme-border-left-md']));
        }
        else if (newValue === dialogModeCentered) {
            classes.push('sme-position-center sme-layout-dialog-centered', 'sme-border-inset-md');
        }
        else if (newValue === dialogModeCenteredLarge) {
            classes.push('sme-position-center sme-layout-dialog-centered-large', 'sme-border-inset-md');
        }
        classes.push('sme-arrange-stack-v');
        this.dialogClasses = classes;
        // accessibility
        if (this.dialogType) {
            this.dialogRole = this.dialogType === modalDialog ? 'dialog' : 'alertdialog';
        }
        else {
            // by default centered dialogs are considered as alerts
            var alertModes = [dialogModeCentered, dialogModeCenteredLarge, dialogModeCompactSquare];
            this.dialogRole = alertModes.some(function (mode) { return _this.dialogMode === mode; }) ? 'alertdialog' : 'dialog';
        }
    };
    DialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dialog',
                    template: "\n      <sme-backdrop *ngIf=\"visible\" [level]=\"dialogLevel\" (clicked)=\"!!clickBackdrop ? onBackgroundClicked() : ''\" [showBackdrop]=\"showBackdrop\" class=\"sme-layout-absolute sme-position-inset-none\">\n        <div [ngClass]=\"dialogClasses\" [attr.role]=\"dialogRole\" [attr.aria-hidden]=\"!visible\" aria-labelledby=\"sme-dialog-title\" aria-describedby=\"sme-dialog-desc\" aria-modal=\"true\">\n          <div class=\"sme-position-flex-none\">\n            <ng-content select=\"sme-dialog-header\"></ng-content>\n          </div>\n          <div class=\"sme-layout-relative sme-position-flex-auto sme-padding-horizontal-lg sme-arrange-overflow-auto-y sme-arrange-overflow-hide-x\">\n            <ng-content select=\"sme-dialog-content\"></ng-content>\n          </div>\n          <div class=\"sme-position-flex-none\">\n            <ng-content select=\"sme-dialog-footer\"></ng-content>\n          </div>\n        </div>\n      </sme-backdrop>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
    ]; };
    DialogComponent.propDecorators = {
        'showBackdrop': [{ type: Input },],
        'clickBackdrop': [{ type: Input },],
        'actionPane': [{ type: Input },],
        'dialogMode': [{ type: Input },],
        'dialogType': [{ type: Input },],
        'onKeyUp': [{ type: HostListener, args: ['document:keyup', ['$event'],] },],
    };
    return DialogComponent;
}());
export { DialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2RpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBS1IsTUFBTSxlQUFBLENBQWdCO0FBQ3ZCLE9BQU8sRUFBRSxPQUFBLEVBQVEsTUFBTyxjQUFBLENBQWU7QUFJdkM7SUFBQTtJQVVBLENBQUM7SUFUTSxnQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxzRUFBc0U7aUJBQ25GLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxvQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLDRCQUFDO0NBVkQsQUFVQyxJQUFBO1NBVlkscUJBQXFCO0FBYWxDO0lBQUE7SUFVQSxDQUFDO0lBVE0saUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsMkJBQTJCO2lCQUN4QyxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gscUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRiw2QkFBQztDQVZELEFBVUMsSUFBQTtTQVZZLHNCQUFzQjtBQWFuQztJQUFBO0lBVUEsQ0FBQztJQVRNLGdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLHVIQUF1SDtpQkFDcEksRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsNEJBQUM7Q0FWRCxBQVVDLElBQUE7U0FWWSxxQkFBcUI7QUFZbEMsTUFBTSxDQUFOLElBbEJZLGlCQXVCWDtBQUxELFdBbEJZLGlCQUFBO0lBbUJSLHVFQWxCYyxDQUFBO0lBbUJkLHVFQWxCYyxDQUFBO0lBbUJkLG1FQWxCWSxDQUFBO0lBbUJaLCtFQWxCa0IsQ0FBQTtBQW1CdEIsQ0FBQyxFQXZCVyxpQkFBQSxLQUFBLGlCQUFBLFFBdUJYO0FBRUQsTUFBTSxDQWxCQyxJQUFNLGNBQUEsR0FBaUIsTUFBQSxDQUFPO0FBbUJyQyxNQUFNLENBbEJDLElBQU0saUJBQUEsR0FBb0IsU0FBQSxDQUFVO0FBbUIzQyxNQUFNLENBbEJDLElBQU0sdUJBQUEsR0FBMEIsZ0JBQUEsQ0FBaUI7QUFtQnhELE1BQU0sQ0FsQkMsSUFBTSxvQkFBQSxHQUF1QixZQUFBLENBQWE7QUFtQmpELE1BQU0sQ0FsQkMsSUFBTSxrQkFBQSxHQUFxQixVQUFBLENBQVc7QUFtQjdDLE1BQU0sQ0FsQkMsSUFBTSx1QkFBQSxHQUEwQixnQkFBQSxDQUFpQjtBQW9CeEQsTUFBTSxDQWxCQyxJQUFNLFdBQUEsR0FBYyxPQUFBLENBQVE7QUFtQm5DLE1BQU0sQ0FsQkMsSUFBTSxXQUFBLEdBQWMsT0FBQSxDQUFRO0FBcUJuQztJQXNESSx5QkFBb0IsVUFBc0IsRUFDOUIsaUJBQW9DO1FBRDVCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXBEekMsZUFBVSxHQUFHLGFBQWEsQ0FBQztRQUUzQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVmLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBa0I3Qjs7Ozs7V0FLRztRQUNLLGVBQVUsR0FBVyxjQUFjLENBQUM7UUFFNUM7Ozs7V0FJRztRQUNLLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFJaEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVl0Qix5SEFBeUg7UUFDekgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLE9BQU8sRUFBcUIsQ0FBQztRQUN2RCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBM0NBLHNCQUFXLHVDQUFVO1FBTnRCOzs7OztXQUtHO2FBQ0YsVUFBc0IsUUFBaUI7WUFDcEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztZQUNyQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQztZQUN6QyxDQUFDO1lBRUQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFxQkQsc0JBQVcsb0NBQU87YUFLbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBUEQsVUFBbUIsT0FBZ0I7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFjTyxpQ0FBTyxHQUFmLFVBQWdCLEtBQVU7UUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07b0JBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksNENBQWtCLEdBQXpCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUNBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNJLDhCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNkNBQW1CLEdBQTFCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLHlDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLHFDQUFXLEdBQWxCLFVBQW1CLE9BQXNCO1FBQ3JDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEMsQ0FBQztJQUNMLENBQUM7SUFFTyxnREFBc0IsR0FBOUI7UUFBQSxpQkErQkM7UUE5QkcsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwRCxJQUFJLE9BQU8sR0FBRyxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDLENBQUE7UUFDMUQsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLDRCQUE0QixFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFFbEYsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsT0FBTyxDQUFDLElBQUksT0FBWixPQUFPLEVBQVMsaUJBQWlCLFNBQUUsd0JBQXdCLEVBQUUsb0JBQW9CLElBQUU7UUFDdkYsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxJQUFJLE9BQVosT0FBTyxFQUFTLGlCQUFpQixTQUFFLDJCQUEyQixFQUFFLG9CQUFvQixJQUFFO1FBQzFGLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLGlGQUFpRixFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDM0gsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLE9BQVosT0FBTyxFQUFTLGlCQUFpQixTQUFFLDhCQUE4QixFQUFFLG9CQUFvQixJQUFFO1FBQzdGLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDMUYsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0RBQXNELEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNoRyxDQUFDO1FBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBRTdCLGdCQUFnQjtRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUNqRixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSix1REFBdUQ7WUFDdkQsSUFBTSxVQUFVLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBQzFGLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUF4QixDQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ25HLENBQUM7SUFDTCxDQUFDO0lBQ0UsMEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLG04QkFjVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsOEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztRQUNwQixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUg2RixDQUc3RixDQUFDO0lBQ0ssOEJBQWMsR0FBMkM7UUFDaEUsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbEMsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbkMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUcsRUFBRSxFQUFFO0tBQzNFLENBQUM7SUFDRixzQkFBQztDQXRNRCxBQXNNQyxJQUFBO1NBdE1ZLGVBQWUiLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=