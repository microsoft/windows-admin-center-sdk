import { BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '../../../angular';
export declare class AppBarBaseDialogComponent<TOptions extends DialogOptions, TResult extends DialogResult> extends BaseDialogComponent<TOptions, TResult> {
    private dialogSelector;
    private appBarButtonId;
    /**
     * Initializes a new instance of the AppBarBaseDialogComponent class.
     */
    constructor(dialogService: DialogService, dialogSelector: string, appBarButtonId: string);
    protected onKeyDown(event: any): void;
}
