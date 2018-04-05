import { Subject } from 'rxjs/Subject';
import { BaseDialogComponent, DialogOptions, DialogResult } from '../base-dialog.component';
import { DialogCloseReason } from '../dialog.component';
import { DialogService } from '../dialog.service';
/**
 * The confirmation dialog options.
 */
export interface ConfirmationDialogOptions extends DialogOptions {
    /**
     * The text for the dialog cancel button.
     */
    cancelButtonText: string;
    /**
     * The text for the dialog checkbox.
     */
    checkboxText?: string;
    /**
     * The text for the doubleCheck checkbox
     */
    doubleCheckText?: string;
    /**
     * The text for the dialog confirm button.
     */
    confirmButtonText: string;
    /**
     * The message of the dialog body.
     */
    message: string;
    /**
     * The title of the dialog.
     */
    title: string;
    /**
     * If the dialog is opened from Rpc
     */
    isFromRpc?: boolean;
}
/**
 * The confirmation dialog result.
 */
export interface ConfirmationDialogResult extends DialogResult {
    /**
     * The result of the dialog confirmation.
     */
    confirmed: boolean;
    /**
     * The result of the dialog checkbox.
     */
    checkboxResult?: boolean;
}
export declare class ConfirmationDialogComponent extends BaseDialogComponent<ConfirmationDialogOptions, ConfirmationDialogResult> {
    cancelButtonText: string;
    checkboxText: string;
    doubleCheckText: string;
    checked: boolean;
    confirmButtonText: string;
    message: string;
    title: string;
    /**
     *  false value disables confirm button
     */
    doubleChecked: any;
    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    constructor(dialogService: DialogService);
    /**
     * handler for when a close is requested
     * this override cancels the confirmation when requested to close
     * @param reason - reason for the close following DialogCloseReason
     */
    closeRequested(reason: DialogCloseReason): void;
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    show(options: ConfirmationDialogOptions): Subject<ConfirmationDialogResult>;
    /**
     * The method to call when the confirm button is clicked.
     */
    onConfirm(): void;
    /**
     * The method to call when the cancel button is clicked.
     */
    onCancel(): void;
}
