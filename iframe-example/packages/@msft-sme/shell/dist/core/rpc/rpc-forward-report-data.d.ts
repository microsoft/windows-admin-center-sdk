import { RpcBaseData } from './rpc-base';
/**
 * The Rpc Forward type
 */
export declare const enum RpcForwardType {
    /**
     * The execute forward type.
     * This type should execute a method and return a result on the receiver
     */
    Execute = 0,
    /**
     * The notify forward type.
     * This type should notify the receiver that some change has occurred
     */
    Notify = 1,
    /**
     * The init forward type.
     * This type should be used to initialize a service with its corresponding parent service on the receiver
     */
    Init = 2,
}
/**
 * Defines a Rpc Report for forwarded messages
 */
export interface RpcForwardReportData extends RpcBaseData {
    /**
     * The name of the service that should receive this report
     */
    service: string;
    /**
     * An name (key) of the property or method to act upon
     */
    name?: string;
    /**
     * The type of forward report
     */
    type: RpcForwardType;
}
/**
 *
 */
export interface RpcForwardExecuteReportData extends RpcForwardReportData {
    /**
     * An arguments to apply to the method
     */
    arguments: any[];
}
/**
 * Defines a forward notify rpc report.
 * These are fire and forget. simply notifying other windows of a value change
 */
export interface RpcForwardNotifyReportData extends RpcForwardReportData {
    /**
     * An value of the changed property
     */
    value: any;
}
/**
 * Defines the response to a forward report through rpc
 */
export interface RpcForwardResponse<T> extends RpcBaseData {
    /**
     * The result of the report.
     * for execute, this is the result of the executed method
     * for notify, this is always void
     * for init, this is the initialization data
     */
    result?: T;
    /**
     * An error that was thrown on the receiving side of the report
     */
    error?: any;
}
