import { Observable } from 'rxjs/Observable';
import { BaseDialogComponent, DialogOptions, DialogResult } from './base-dialog.component';
import { ConfirmationDialogOptions, ConfirmationDialogResult } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationListDialogOptions, ConfirmationListDialogResult } from './confirmation-list-dialog/confirmation-list-dialog.component';
import { MessageDialogOptions } from './message-dialog/message-dialog.component';
export declare class DialogService {
    commonIds: {
        confirmation: string;
        confirmationList: string;
        message: string;
        notifications: string;
        settings: string;
        help: string;
        userPane: string;
        manageAs: string;
    };
    activeDialogsStack: BaseDialogComponent<DialogOptions, DialogResult>[];
    private componentMap;
    private activeDialogResult;
    private dialogOrigins;
    /**
     * Registers the dialog with the service.
     *
     * @type TOptions the type of the dialog options.
     * @type TResult the type of the dialog results.
     * @param id The unique identifier of the dialog.
     * @param component The dialog component.
     */
    register<TOptions extends DialogOptions, TResult extends DialogResult>(id: string, component: BaseDialogComponent<TOptions, TResult>): void;
    /**
     * Unregisters the dialog with the service.
     *
     * @param id The unique identifier of the dialog.
     */
    unregister(id: string): void;
    /**
     * Shows the dialog.
     *
     * @type TOptions The type of the dialog options.
     * @type TResult The result of the dialog.
     * @param id The unique identifier of the dialog.
     * @param options The dialog options.
     */
    show<TOptions extends DialogOptions, TResult extends DialogResult>(id: string, options: TOptions): Observable<TResult>;
    /**
     * Shows a message dialog with the given options
     *
     * @param options The dialog options.
     * @returns A subject that will be published one time with the dialog result
     */
    showMessage(options: MessageDialogOptions): Observable<DialogResult>;
    /**
     * Hide a message dialog.
     */
    hideMessage(): void;
    /**
     * Shows a confirmation dialog with the given options
     *
     * @param options The dialog options.
     * @returns A subject that will be published one time with the dialog result
     */
    showConfirmation(options: ConfirmationDialogOptions): Observable<ConfirmationDialogResult>;
    /**
     * Hide a confirmation dialog.
     */
    hideConfirmation(): void;
    /**
     * Shows a confirmation list dialog with the given options
     *
     * @param options The dialog options.
     * @returns A subject that will be published one time with the dialog result
     */
    showConfirmationList(options: ConfirmationListDialogOptions): Observable<ConfirmationListDialogResult>;
    /**
     * Hide a confirmation list  dialog.
     */
    hideConfirmationList(): void;
    /**
     * Hides the dialog.
     *
     * @type TResult The type of the dialog result.
     * @param id The unique identifier of the dialog.
     * @param result The result of the dialog.
     */
    hide<TResult extends DialogResult>(id: string, result?: TResult): void;
    /**
     * Resume focus back to the original element that shows the dialog.
     * @param id The id of dialog
     */
    resumeFocus(id: string): void;
}
