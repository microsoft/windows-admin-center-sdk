import { Observable } from 'rxjs';
import { Rpc } from '../rpc/rpc';
import { RpcDialogConfirmationListRequest, RpcDialogConfirmationRequest, RpcDialogConfirmationResponse, RpcDialogMessageRequest, RpcDialogMessageResponse } from '../rpc/rpc-dialogs';
/**
 * Frame connection class.
 */
export declare class FrameConnection {
    private rpc;
    /**
     * Initializes a new instance of the FrameConnection class.
     *
     * @param rpc the RPC object.
     */
    constructor(rpc: Rpc);
    /**
     * Open a message dialog and wait for completion through RPC.
     * To close the dialog before user input, unsubscribe the observable.
     *
     * @param request the request object of rpc based dialog message.
     */
    showDialogMessage(request: RpcDialogMessageRequest): Observable<RpcDialogMessageResponse>;
    /**
     * Open a confirmation dialog and wait for completion through RPC.
     * To close the dialog before user input, unsubscribe the observable.
     *
     * @param request the request object of rpc based dialog confirmation.
     */
    showDialogConfirmation(request: RpcDialogConfirmationRequest): Observable<RpcDialogConfirmationResponse>;
    /**
     * Open a confirmation list dialog and wait for completion through RPC.
     * To close the dialog before user input, unsubscribe the observable.
     *
     * @param request the request object of rpc based dialog confirmation list.
     */
    showDialogConfirmationList(request: RpcDialogConfirmationListRequest): Observable<RpcDialogConfirmationResponse>;
    /**
     * Open a message dialog and wait for completion through RPC.
     *
     * @param request the request object of rpc based dialog message.
     */
    private showDialog<TRequest, TResult>(request, type);
    private openAndLongPolling(data);
    private requestDialog(data);
}
