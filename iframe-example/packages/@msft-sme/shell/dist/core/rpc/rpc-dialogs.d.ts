import { RpcBaseData } from './rpc-base';
/**
 * The RPC dialog type.
 */
export declare enum RpcDialogType {
    /**
     * Open the confirmation dialog.
     */
    OpenConfirmationDialog = 1,
    /**
     * Open the confirmation list dialog.
     */
    OpenConfirmationListDialog = 2,
    /**
     * Open the message dialog.
     */
    OpenMessageDialog = 3,
    /**
     * Close the dialog.
     */
    Close = 4,
    /**
     * Polling the status of the dialog.
     */
    PollingStatus = 5,
}
/**
 * The RPC dialog state.
 */
export declare enum RpcDialogState {
    /**
     * The dialog is opened.
     */
    Opened = 1,
    /**
     * The dialog is closed.
     */
    Closed = 2,
    /**
     * The dialog is terminated by shell or rpc request.
     */
    ForcedTerminated = 3,
    /**
     * The dialog is failed.
     */
    Failed = 4,
}
/**
 * The RPC confirmation dialog request.
 */
export interface RpcDialogConfirmationRequest {
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
}
/**
 * The RPC confirmation list dialog request.
 */
export interface RpcDialogConfirmationListRequest {
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
     * The list of data.
     */
    list: string[];
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
 * The RPC message dialog link.
 */
export interface RpcDialogMessageLink {
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
 * The RPC message dialog request.
 */
export interface RpcDialogMessageRequest {
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
     * (Optional) The link to open referenced information on new tab.
     */
    externalLink?: RpcDialogMessageLink;
    /**
     * (Optional) The text of the checkbox.
     */
    checkboxText?: string;
}
/**
 * The RPC confirmation dialog response.
 */
export interface RpcDialogConfirmationResponse {
    /**
     * The result of the dialog confirmation.
     */
    confirmed: boolean;
    /**
     * The result of the dialog checkbox.
     */
    checkboxResult?: boolean;
}
/**
 * The RPC message dialog response.
 */
export interface RpcDialogMessageResponse {
    /**
     * The result of the dialog checkbox.
     */
    checkboxResult?: boolean;
}
/**
 * The RPC dialog request data.
 */
export interface RpcDialogData extends RpcBaseData {
    /**
     * The identification of dialog.
     */
    dialogId: string;
    /**
     * The type of RPC dialog request.
     */
    type: RpcDialogType;
    /**
     * The request of RPC dialog.
     */
    request?: RpcDialogConfirmationRequest | RpcDialogConfirmationListRequest | RpcDialogMessageRequest;
}
/**
 * The RPC dialog response.
 */
export interface RpcDialogResult {
    /**
     * The identification of dialog.
     */
    dialogId: string;
    /**
     * The type of RPC dialog.
     */
    type: RpcDialogType;
    /**
     * The state of RPC dialog.
     */
    state: RpcDialogState;
    /**
     * The response of RPC dialog.
     */
    response?: RpcDialogConfirmationResponse | RpcDialogMessageResponse;
    /**
     * The time opened.
     */
    openedTime?: number;
    /**
     * The time closed.
     */
    closedTime?: number;
    /**
     * The failed error message.
     */
    failedMessage?: string;
}
