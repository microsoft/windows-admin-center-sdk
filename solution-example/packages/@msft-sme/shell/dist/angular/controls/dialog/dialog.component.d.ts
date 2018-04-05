import { AfterViewChecked, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class DialogHeaderComponent {
}
export declare class DialogContentComponent {
}
export declare class DialogFooterComponent {
}
export declare enum DialogCloseReason {
    SoftDismiss = 0,
    CloseButton = 1,
    EscapeKey = 2,
    CompetingDialog = 3,
}
export declare const dialogModePane = "pane";
export declare const dialogModeFullscreen = "fullscreen";
export declare const dialogModeCentered = "centered";
export declare class DialogComponent implements OnChanges, OnDestroy, AfterViewChecked {
    private elementRef;
    private changeDetectorRef;
    dialogClasses: any;
    dialogLevel: number;
    showBackdrop: boolean;
    /**
     * Sets whether this should be an action pane or a centered dialog
     *
     * @deprecated Use dialogMode instead
     * @param newValue {boolean} if true, uses a left pane dialog, othewrwise a centered dialog
     */
    actionPane: boolean;
    /**
     * Indicates the dialog mode to use. The valid values are:
     * @see dialogModePane - 'pane'
     * @see dialogModeFullSCreen - 'fullscreen'
     * @see dialogModeCentered - 'centered'
     */
    dialogMode: string;
    /**
     * When a dialog is full screen, the distance from the left to show some backdrop
     * Default: 10%.
     * This can be set to any value accepted by css style.left
     */
    fullScreenLeftDistance: string;
    closeRequested: Subject<DialogCloseReason>;
    private doAutoFocus;
    private isVisible;
    visible: boolean;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef);
    private onKeyUp(event);
    /**
     * Angular Life Cycle hook for After View Checked.
     * When the visibility changes, we are going to focus on the first element that has the autofocus attribute
     */
    ngAfterViewChecked(): void;
    /**
     * Completed the closeRequested subject
     */
    ngOnDestroy(): void;
    autoFocus(): void;
    /**
     * Shows the dialog.
     */
    show(): void;
    /**
     * Hides the dialog.
     */
    hide(): void;
    /**
     * Notifies closeRequested subscribers that the backdrop has been clicked, requesting a soft dismiss
     */
    onBackgroundClicked(): void;
    onEscapePressed(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private setDialogModeFromInput();
}
