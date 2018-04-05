import { ChangeDetectorRef, Component, ElementRef, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var DialogHeaderComponent = (function () {
    function DialogHeaderComponent() {
    }
    return DialogHeaderComponent;
}());
export { DialogHeaderComponent };
DialogHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-dialog-header',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
DialogHeaderComponent.ctorParameters = function () { return []; };
var DialogContentComponent = (function () {
    function DialogContentComponent() {
    }
    return DialogContentComponent;
}());
export { DialogContentComponent };
DialogContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-dialog-content',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
DialogContentComponent.ctorParameters = function () { return []; };
var DialogFooterComponent = (function () {
    function DialogFooterComponent() {
    }
    return DialogFooterComponent;
}());
export { DialogFooterComponent };
DialogFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-dialog-footer',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
DialogFooterComponent.ctorParameters = function () { return []; };
export var DialogCloseReason;
(function (DialogCloseReason) {
    DialogCloseReason[DialogCloseReason["SoftDismiss"] = 0] = "SoftDismiss";
    DialogCloseReason[DialogCloseReason["CloseButton"] = 1] = "CloseButton";
    DialogCloseReason[DialogCloseReason["EscapeKey"] = 2] = "EscapeKey";
    DialogCloseReason[DialogCloseReason["CompetingDialog"] = 3] = "CompetingDialog";
})(DialogCloseReason || (DialogCloseReason = {}));
export var dialogModePane = 'pane';
export var dialogModeFullscreen = 'fullscreen';
export var dialogModeCentered = 'centered';
var defaultFullScreenLeftDistance = '10%';
var DialogComponent = (function () {
    function DialogComponent(elementRef, changeDetectorRef) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.dialogLevel = 1;
        this.showBackdrop = true;
        /**
         * Indicates the dialog mode to use. The valid values are:
         * @see dialogModePane - 'pane'
         * @see dialogModeFullSCreen - 'fullscreen'
         * @see dialogModeCentered - 'centered'
         */
        this.dialogMode = dialogModePane;
        /**
         * When a dialog is full screen, the distance from the left to show some backdrop
         * Default: 10%.
         * This can be set to any value accepted by css style.left
         */
        this.fullScreenLeftDistance = defaultFullScreenLeftDistance;
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
                case 27:
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
    DialogComponent.prototype.autoFocus = function () {
        this.doAutoFocus = false;
        var autofocus = this.elementRef.nativeElement.querySelector('[autofocus]');
        if (autofocus) {
            autofocus.focus();
        }
        else {
            var firstButton = this.elementRef.nativeElement.querySelector('button');
            if (firstButton) {
                // This enables using the Escape or the Enter key on the dialog
                firstButton.focus();
            }
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
        var newValue = this.dialogMode.toLowerCase().trim();
        switch (newValue) {
            case dialogModeFullscreen:
                this.dialogClasses = {
                    pane: true,
                    'full-screen': true,
                    'modal-dialog relative-center': false
                };
                break;
            case dialogModeCentered:
                this.dialogClasses = {
                    pane: false,
                    'full-screen': false,
                    'modal-dialog relative-center': true
                };
                break;
            default:
                this.dialogClasses = {
                    pane: true,
                    'full-screen': false,
                    'modal-dialog relative-center': false
                };
                break;
        }
    };
    return DialogComponent;
}());
export { DialogComponent };
DialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-dialog',
                template: "\n      <sme-backdrop [level]=\"dialogLevel\" class=\"stretch-fixed\" *ngIf=\"visible\" (clicked)=\"onBackgroundClicked()\" [showBackdrop]=\"showBackdrop\">\n        <div [ngClass]=\"dialogClasses\" [style.left]=\"dialogMode.toLowerCase().trim() === 'fullscreen' ? fullScreenLeftDistance : null\" >\n          <div  class=\"modal-content flex-layout vertical\">\n            <div class=\"modal-header fixed-flex-size\">\n              <ng-content class=\"modal-title\" select=\"sme-dialog-header\"></ng-content>\n            </div>\n            <div class=\"modal-body auto-flex-size vertical-scroll-only\">\n              <ng-content select=\"sme-dialog-content\"></ng-content>\n            </div>\n            <div class=\"modal-footer fixed-flex-size\">\n              <ng-content select=\"sme-dialog-footer\"></ng-content>\n            </div>\n          </div>\n        </div>\n      </sme-backdrop>\n    ",
                styles: ["\n      .pane {\n          position: absolute;\n          top: 0;\n          bottom: 0;\n          right: 0;\n      }\n\n      .pane.full-screen .modal-content {\n          width: 100%;\n          border: 0px;\n      }\n\n      .pane .modal-content {\n        height: 100%;\n        width: 520px;\n        overflow-y: auto;\n        margin: 0px;\n        border-top-width: 0px;\n        border-bottom-width: 0px;\n        border-right-width: 0px;\n      }\n\n      .modal-content {\n        padding: 0;\n      }\n\n      .modal-dialog .modal-body {\n        max-height: 540px;\n        overflow-y: auto;\n        overflow-x: hidden;\n      }\n\n      .modal-body {\n        margin: 0px 0px 0px 36px;\n        padding: 0px 36px 0px 0px;\n      }\n\n      .modal-header {\n        padding: 24px 36px 0 36px;\n      }\n\n      .modal-footer {\n        padding: 0 36px 24px 36px;\n      }\n      :host >>> .modal-footer .btn {\n        width: auto;\n        margin: 4px 8px 0px 0px\n      }\n\n      :host >>> h1,\n      :host >>> h2,\n      :host >>> h3,\n      :host >>> h4,\n      :host >>> h5,\n      :host >>> h6 {\n        padding-top: 0;\n        padding-bottom: 36px;\n      }\n\n      :host >>> p {\n        padding-top: 0;\n        padding-bottom: 15px;\n      }\n\n      /*:host >>> .form-group .form-group-label,\n      :host >>> .form-group label {\n        font-size: 13px;\n      }*/\n\n      :host >>> .dialog-scrollable-content {\n        max-height: 30vh;\n        overflow-y: auto;\n        margin-bottom: 2px;\n      }\n\n      :host.no-footer .modal-content .modal-footer {\n        display: none;\n      }\n\n      :host >>> .list-dialog-header,\n      :host >>> .list-dialog-footer {\n        padding-bottom: 0;\n      }\n    "]
            },] },
];
/** @nocollapse */
DialogComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
]; };
DialogComponent.propDecorators = {
    'showBackdrop': [{ type: Input },],
    'actionPane': [{ type: Input },],
    'dialogMode': [{ type: Input },],
    'fullScreenLeftDistance': [{ type: Input },],
    'onKeyUp': [{ type: HostListener, args: ['document:keyup', ['$event'],] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL2RpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBS1IsTUFBTSxlQUFBLENBQWdCO0FBQ3ZCLE9BQU8sRUFBRSxPQUFBLEVBQVEsTUFBTyxjQUFBLENBQWU7QUFJdkM7SUFBQTtJQVVBLENBQUM7SUFBRCw0QkFBQztBQUFELENBVkEsQUFVQzs7QUFUTSxnQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSwyQkFBMkI7YUFDeEMsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBSUY7SUFBQTtJQVVBLENBQUM7SUFBRCw2QkFBQztBQUFELENBVkEsQUFVQzs7QUFUTSxpQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSwyQkFBMkI7YUFDeEMsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHFDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBSUY7SUFBQTtJQVVBLENBQUM7SUFBRCw0QkFBQztBQUFELENBVkEsQUFVQzs7QUFUTSxnQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSwyQkFBMkI7YUFDeEMsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBR0YsTUFBTSxDQUFOLElBbEJZLGlCQXVCWDtBQUxELFdBbEJZLGlCQUFBO0lBbUJSLHVFQWxCYyxDQUFBO0lBbUJkLHVFQWxCYyxDQUFBO0lBbUJkLG1FQWxCWSxDQUFBO0lBbUJaLCtFQWxCa0IsQ0FBQTtBQW1CdEIsQ0FBQyxFQXZCVyxpQkFBQSxLQUFBLGlCQUFBLFFBdUJYO0FBRUQsTUFBTSxDQWxCQyxJQUFNLGNBQUEsR0FBaUIsTUFBQSxDQUFPO0FBbUJyQyxNQUFNLENBbEJDLElBQU0sb0JBQUEsR0FBdUIsWUFBQSxDQUFhO0FBbUJqRCxNQUFNLENBbEJDLElBQU0sa0JBQUEsR0FBcUIsVUFBQSxDQUFXO0FBb0I3QyxJQWxCTSw2QkFBQSxHQUFnQyxLQUFBLENBQU07QUFxQjVDO0lBb0RJLHlCQUFvQixVQUFzQixFQUM5QixpQkFBb0M7UUFENUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBakR6QyxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVmLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBa0I1Qjs7Ozs7V0FLRztRQUNLLGVBQVUsR0FBVyxjQUFjLENBQUM7UUFFNUM7Ozs7V0FJRztRQUNLLDJCQUFzQixHQUFHLDZCQUE2QixDQUFDO1FBSXZELGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFZdEIseUhBQXlIO1FBQ3pILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUFDdkQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQTNDQSxzQkFBVyx1Q0FBVTtRQU50Qjs7Ozs7V0FLRzthQUNGLFVBQXNCLFFBQWlCO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7WUFDckMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsa0JBQWtCLENBQUM7WUFDekMsQ0FBQztZQUVELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBcUJELHNCQUFXLG9DQUFPO2FBS2xCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzthQVBELFVBQW1CLE9BQWdCO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBY08saUNBQU8sR0FBZixVQUFnQixLQUFVO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUssRUFBRTtvQkFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQztZQUNkLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDRDQUFrQixHQUF6QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0kscUNBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTSxtQ0FBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1osU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLCtEQUErRDtnQkFDL0QsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNJLDhCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNkNBQW1CLEdBQTFCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLHlDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLHFDQUFXLEdBQWxCLFVBQW1CLE9BQXNCO1FBQ3JDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEMsQ0FBQztJQUNMLENBQUM7SUFFTyxnREFBc0IsR0FBOUI7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLG9CQUFvQjtnQkFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRztvQkFDakIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsYUFBYSxFQUFFLElBQUk7b0JBQ25CLDhCQUE4QixFQUFFLEtBQUs7aUJBQ3hDLENBQUM7Z0JBRUYsS0FBSyxDQUFDO1lBQ1YsS0FBSyxrQkFBa0I7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUc7b0JBQ2pCLElBQUksRUFBRSxLQUFLO29CQUNYLGFBQWEsRUFBRSxLQUFLO29CQUNwQiw4QkFBOEIsRUFBRSxJQUFJO2lCQUN2QyxDQUFDO2dCQUVGLEtBQUssQ0FBQztZQUNWO2dCQUNJLElBQUksQ0FBQyxhQUFhLEdBQUc7b0JBQ2pCLElBQUksRUFBRSxJQUFJO29CQUNWLGFBQWEsRUFBRSxLQUFLO29CQUNwQiw4QkFBOEIsRUFBRSxLQUFLO2lCQUN4QyxDQUFDO2dCQUVGLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBd0hMLHNCQUFDO0FBQUQsQ0ExUkEsQUEwUkM7O0FBdkhNLDBCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSwrNEJBZ0JUO2dCQUNELE1BQU0sRUFBRSxDQUFDLG10REFvRlIsQ0FBQzthQUNMLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCw4QkFBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO0lBQ3BCLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0NBQzFCLEVBSDZGLENBRzdGLENBQUM7QUFDSyw4QkFBYyxHQUEyQztJQUNoRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNsQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNoQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNoQyx3QkFBd0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzVDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFHLEVBQUUsRUFBRTtDQUMzRSxDQUFDIiwiZmlsZSI6ImRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9