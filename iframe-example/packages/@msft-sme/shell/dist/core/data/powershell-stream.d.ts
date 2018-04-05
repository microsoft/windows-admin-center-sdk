import { Observable } from 'rxjs';
import { AuthorizationManager } from '../security/authorization-manager';
import { NodeRequestOptions } from './node-connection';
import { PowerShellCommand } from './powershell';
import { WebsocketStream, WebsocketStreamDataRequestState, WebsocketStreamDataState, WebsocketStreamDataTarget, WebsocketStreamHandler } from './websocket-stream';
/**
 * PowerShell result object including an error.
 */
export interface PowerShellResult {
    /**
     * The runspace pool instance ID.
     */
    sessionId: string;
    /**
     * Completed state.
     */
    completed: 'True' | 'False';
    /**
     * Progress data.
     */
    progress?: any[];
    /**
     * Results data.
     */
    results?: any[];
    /**
     * Errors data.
     */
    errors?: any[];
    /**
     * Warning data.
     */
    warning?: any[];
}
/**
 * PowerShell Stream options.
 */
export interface PowerShellStreamOptions extends NodeRequestOptions {
    /**
     * Partial data response.
     * (default is waiting for completion.)
     */
    partial?: boolean;
    /**
     * Close the session each time, so it gets priority.
     */
    close?: boolean;
    /**
     * Override Query ID so it can request cancel.
     */
    queryId?: string;
    /**
     * Buffering time period by milliseconds.
     */
    bufferTime?: number;
    /**
     * Buffering count.
     */
    bufferCount?: number;
}
/**
 * The request packet of Cim Stream to the gateway.
 */
export interface PowerShellStreamRequest {
    /**
     * The identification string (auto generated or supplied as queryId option.)
     */
    id: string;
    /**
     * The stream target
     */
    target: WebsocketStreamDataTarget;
    /**
     * The date request state.
     */
    requestState: WebsocketStreamDataRequestState;
    /**
     * The name of PowerShell module.
     */
    module: string;
    /**
     * The command.
     */
    command: string;
    /**
     * The parameters.
     */
    parameters: any;
    /**
     * The script.
     */
    script: string;
    /**
     * The Cim stream options.
     */
    options: PowerShellStreamOptions;
}
/**
 * Cim stream response.
 */
export interface PowerShellStreamResponse {
    /**
     * The identification string (auto generated.)
     */
    id: string;
    /**
     * Web socket data stream state.
     */
    state: WebsocketStreamDataState;
    /**
     * Index number of response for the original request.
     */
    index: number;
    /**
     * The PowerShell result.
     */
    response: PowerShellResult;
}
/**
 * The PowerShell stream class.
 */
export declare class PowerShellStream implements WebsocketStreamHandler {
    private websocketStream;
    private authorizationManager;
    private static maxRunPerNode;
    private processors;
    private queues;
    private strings;
    /**
     * Initializes a new instance of the PowerShellStream class.
     *
     * @param websocketStream the websocket stream object.
     * @param authorizationManager the authorization manager object.
     */
    constructor(websocketStream: WebsocketStream, authorizationManager: AuthorizationManager);
    /**
     * PowerShell script run.
     *
     * @param nodeName the node name.
     * @param script the script to run.
     * @param options the options for this request.
     * @return Observable<PowerShellResult> the query observable.
     */
    run(nodeName: string, commandOrScript: string | PowerShellCommand, options?: PowerShellStreamOptions): Observable<PowerShellResult>;
    /**
     * Cancel active powershell script.
     * Result response comes back to the original query to end.
     *
     * @param nodeName the node name.
     * @param id the id of original request specified as options.queryId.
     */
    cancel(nodeName: string, id: string): void;
    /**
     * Reset data for connection cleanup.
     */
    reset(): void;
    /**
     * Process the socket message.
     *
     * @param message the socket message.
     */
    process(message: PowerShellStreamResponse): void;
    private operationNext(processor, response);
    private operationComplete(processor, response);
    private operationError(processor, error);
    private operationEnd(id);
    private createRequest<T>(nodeName, command, options?);
    private createRequestSimple<T>(nodeName, command, options?);
    private sendRequest(observer, target, requestState, command, options?);
    private getTarget(nodeName);
}
