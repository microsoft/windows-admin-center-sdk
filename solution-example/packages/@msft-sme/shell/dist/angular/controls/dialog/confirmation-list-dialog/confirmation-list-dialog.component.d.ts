import { Observable } from 'rxjs';
import { Subject } from 'rxjs/subject';
import { BaseDialogComponent, DialogOptions, DialogResult } from '../base-dialog.component';
import { DialogCloseReason } from '../dialog.component';
import { DialogService } from '../dialog.service';
/**
 * The confirmation list dialog options.
 */
export interface ConfirmationListDialogOptions extends DialogOptions {
    /**
     * The cancel button text.
     */
    cancelButtonText: string;
    /**
     * The checkbox text.
     */
    checkboxText?: string;
    /**
     * The confirmation button text.
     */
    confirmButtonText: string;
    /**
     * The list footer text.
     */
    listFooterText: string;
    /**
     * The observable of data source.
     */
    listDataSource: Observable<string[]>;
    /**
     * The list header text.
     */
    listHeaderText: string;
    /**
     * The title text.
     */
    title: string;
}
/**
 * The confirmation list dialog result.
 */
export interface ConfirmationListDialogResult extends DialogResult {
    /**
     * The result of the dialog confirmation.
     */
    confirmed: boolean;
    /**
     * The checkbox result.
     */
    checkboxResult?: boolean;
    /**
     * The observable error object.
     */
    observableError?: any;
}
export declare class ConfirmationListDialogComponent extends BaseDialogComponent<ConfirmationListDialogOptions, ConfirmationListDialogResult> {
    cancelButtonText: string;
    checked: boolean;
    checkboxText: string;
    confirmButtonText: string;
    listFooterText: string;
    listData: string[];
    listHeaderText: string;
    title: string;
    loading: boolean;
    private dataSourceSubscription;
    constructor(dialogService: DialogService);
    closeRequested(reason: DialogCloseReason): void;
    show(options: ConfirmationListDialogOptions): Subject<ConfirmationListDialogResult>;
    hide(result?: ConfirmationListDialogResult): void;
    onConfirm(): void;
    onCancel(): void;
}
