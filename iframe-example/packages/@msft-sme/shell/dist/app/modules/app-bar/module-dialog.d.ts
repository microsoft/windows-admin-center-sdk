import { AppContextService, DialogService } from '../../../angular';
export declare class ModuleDialog {
    private appContextService;
    private dialogService;
    /**
     * Maintain active opened dialog result.
     */
    private result;
    /**
     * Keep last closed dialog result.
     */
    private closedResult;
    /**
     * Only one dialog request works at a time, and deferred object maintain the state.
     */
    private deferred;
    /**
     * Subscription to the dialog object.
     */
    private dialogSubscription;
    /**
     * Subscription to the module RPC request.
     */
    private moduleSubscription;
    /**
     * Current long polling waiter object.
     */
    private waiter;
    /**
     * Initializes a new instance of the ModuleDialog class.
     *
     * @param appContextService the application context service.
     * @param dialogService the dialog service.
     */
    constructor(appContextService: AppContextService, dialogService: DialogService);
    /**
     * Dispose the current subscriptions.
     */
    dispose(): void;
    /**
     * Validate dialog object.
     *
     * @param create whether creating new dialog.
     * @param dialog the dialog data from RPC.
     * @return boolean the value indicating whether it's right condition.
     */
    private validateDialog(create, dialog);
    /**
     * Reject dialog request from RPC.
     *
     * @param dialogData The RPC dialog Data.
     * @param message The message to send as an error.
     */
    private rejectDialog(dialogData, message);
    private openMessageDialog(dialogData);
    private openConfirmationDialog(dialogData);
    private openConfirmationListDialog(dialogData);
    private closeDialog(dialogData);
    private statusDialog(dialogData);
}
