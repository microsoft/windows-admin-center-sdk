import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogCloseReason, DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
/**
 * The default dialog options.
 */
export interface DialogOptions {
}
/**
 * The default dialog result.
 */
export interface DialogResult {
}
/**
 * The base dialog component for extending.
 */
export declare class BaseDialogComponent<TOptions extends DialogOptions, TResult extends DialogResult> implements AfterViewInit, OnInit, OnDestroy {
    protected dialogService: DialogService;
    id: string;
    protected dialog: DialogComponent;
    dialogResult: Subject<TResult>;
    /**
     * Keeps the dialog open when another dialog pops up
     * by default the dialog will be closed if another dialog opens while this dialog is visible
     */
    keepOpen: boolean;
    private closeSubscription;
    /**
     * Initializes a new instance of the BaseDialogComponent class.
     */
    constructor(dialogService: DialogService);
    /**
     * The method to run when the component initialized.
     */
    ngOnInit(): void;
    /**
     * The method to run after the component view initialized
     */
    ngAfterViewInit(): void;
    /**
     * The method to run when the component is destroyed.
     */
    ngOnDestroy(): void;
    /**
     * handler for when a close is requested
     * by default this closes the dialog with no result.
     * override this function to prevent this behavior
     * @param reason - reason for the close following DialogCloseReason
     */
    closeRequested(reason: DialogCloseReason): void;
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    show(options: TOptions): Subject<TResult>;
    /**
     * Sets the level of the dialogso it overlays on top of anything else
     * This is set by the dialog service when a dialog opens another dialog
     * @param level The level of the dialog so it shows up on top of other items. this should be a number greater than 0
     */
    setLevel(level: number): void;
    /**
     * refocuses the keyboard on the dialog
     */
    autoFocus(): void;
    /**
     * Hides the dialog.
     *
     * @param result The result of the dialog action.
     */
    hide(result?: TResult): void;
}
