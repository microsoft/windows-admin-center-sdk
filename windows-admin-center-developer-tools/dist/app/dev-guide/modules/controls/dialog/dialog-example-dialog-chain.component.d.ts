import { Subject } from 'rxjs/Subject';
import { BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '@msft-sme/shell/angular';
/**
 * The confirmation dialog options.
 */
export interface ExampleDialogChainOptions extends DialogOptions {
    /**
     * The title of the dialog.
     */
    title: string;
    /**
     * The label.
     */
    label: string;
}
/**
 * The confirmation dialog result.
 */
export interface ExampleDialogChainResult extends DialogResult {
    /**
     * The result of the dialog confirmation.
     */
    result: string;
}
export declare class DialogChainComponent extends BaseDialogComponent<ExampleDialogChainOptions, ExampleDialogChainResult> {
    title: string;
    label: string;
    openButtonText: string;
    closeButtonText: string;
    cancelButtonText: string;
    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    constructor(dialogService: DialogService);
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    show(options: ExampleDialogChainOptions): Subject<ExampleDialogChainResult>;
    /**
     * The method to call when the confirm button is clicked.
     */
    onClose(): void;
    /**
     * The method to call when the cancel button is clicked.
     */
    onCancel(): void;
    /**
     * The method to run when the full screen dialog button is clicked.
     */
    onClickFullScreenDialog(): void;
}
