import { Subject } from 'rxjs/Subject';
import { BaseDialogComponent, DialogOptions, DialogResult } from '../base-dialog.component';
import { DialogService } from '../dialog.service';
export interface MessageDialogLink {
    /**
     * The link title.
     */
    title: string;
    /**
     * The link url.
     */
    url: string;
}
/**
 * The message dialog options.
 */
export interface MessageDialogOptions extends DialogOptions {
    /**
     * The button text of the dialog.
     */
    buttonText: string;
    /**
     * The message of the dialog body.
     */
    message: string;
    /**
     * The title of the dialog.
     */
    title: string;
    /**
     * (Optional) The text of the checkbox.
     */
    checkboxText?: string;
    /**
     * (Optional) The link to open referenced information on new tab.
     */
    externalLink?: MessageDialogLink;
    /**
     * If the dialog is opened from Rpc
     */
    isFromRpc?: boolean;
}
/**
 * The message dialog result.
 */
export interface MessageDialogResult extends DialogResult {
    /**
     * The result of the dialog checkbox.
     */
    checkboxResult?: boolean;
}
export declare class MessageDialogComponent extends BaseDialogComponent<MessageDialogOptions, MessageDialogResult> {
    /**
     * The text for the dialog button.
     */
    buttonText: string;
    /**
     * The text to display next to the checkbox.
     */
    checkboxText: string;
    /**
     * Whether or not the checkbox is checked.
     */
    checkboxResult: boolean;
    /**
     * The message to display on the dialog.
     */
    message: string;
    /**
     * The title of the dialog.
     */
    title: string;
    /**
     * The hyperlink to display on the dialog.
     */
    externalLink: MessageDialogLink;
    /**
     * Initializes a new instance of the MessageDialogComponent class.
     */
    constructor(dialogService: DialogService);
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    show(options: MessageDialogOptions): Subject<DialogResult>;
    /**
     * The method to call when the dialog button is clicked.
     */
    onClick(): void;
}
