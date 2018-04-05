import { Observable } from 'rxjs';
import { Rpc } from './rpc';
import { RpcRelationshipType } from './rpc-base';
import { RpcForwardReportData, RpcForwardResponse } from './rpc-forward-report-data';
export declare class RpcForwarder {
    private static ready;
    private static forwardMap;
    static waitForReady(rpc: Rpc): Observable<any>;
    static register(serviceId: string, forwarder: RpcServiceForwarder): void;
    private static onForwardReceived(data);
    /**
     * Transform object into something that can be serializable by dropping
     * any non-serializable properties
     *
     * @param obj the object to make serializable.
     * @return a new object that is serializable
     */
    static ensureSerializable(obj: any): any;
}
/**
 * Base class to allow 2+ instances of a service to behave as one across the iframe boundary
 * three mechanisms are surfaced for communication:
 * - Execute: expects a response with data from the receiver
 * - Notify: expects a response with no data from the receiver just for confirmation that it was received
 * - Init: always called from a child instance, used to synchronize parent and child as the child starts up
 */
export declare abstract class RpcServiceForwarder {
    private serviceId;
    private rpc;
    /**
     * Instantiates a new instance of the RpcServiceForwarder
     */
    constructor(serviceId: string, rpc: Rpc);
    /**
     * Called when a forwarded message is received from the rpc.
     * @param data The RpcForwardReportData of the request
     * @returns an observable for the result of the request call
     */
    handleForwardedMessage(data: RpcForwardReportData): Observable<any>;
    /**
     * Initializes the service. The serviceReady observable is assigned to the output of this function.
     */
    initialize(): Observable<boolean>;
    /**
     * Called on a child service instance when onForwardInit returns from the parent
     * @param data The response from the forwardInit call
     */
    protected abstract onForwardInitResponse(data: RpcForwardResponse<any>): void;
    /**
     * Called when a new instance of the service in another window is initialized and needs to synchronize with its parent
     * @param from The RpcRelationshipType that this request is from
     * @returns an observable for the all the values needed to initialize the service
     */
    protected abstract onForwardInit(): Observable<any>;
    /**
     * Called when the forwarded services counterpart wants to get data from the parent
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the method to forward to
     * @param args The arguments of the method
     * @returns an observable for the result of the method call
     */
    protected abstract onForwardExecute(from: RpcRelationshipType, name: string, args: any[]): Observable<any>;
    /**
     * Called when the forwarded services counterpart sends a notify message
     * @param from The RpcRelationshipType that this request is from
     * @param name The name of the property to change
     * @param value The new value of the property
     * @returns an observable that completes when the property has been changed.
     */
    protected abstract onForwardNotify(from: RpcRelationshipType, name: string, value: any): Observable<void>;
    /**
     * Creates an observable that errors with name not found
     * @returns an observable that will error with a name not found message
     */
    protected nameNotFound(name: string): Observable<any>;
    /**
     * Determines if a message can be forwarded to the specified RpcRelationshipType
     * @param to The RpcRelationshipType that needs to be checked
     * @returns true if messages can be forwarded to the specified RpcRelationshipType
     */
    protected canForward(to: RpcRelationshipType): boolean;
    /**
     * Forwards a execution of some named method to the target relationship type
     * @param to The RpcRelationshipType that this request is intended for
     * @param name The name of the method to execute
     * @param value The arguments for the method
     * @returns an observable for the result of the method call
     */
    protected forwardExecute<T>(to: RpcRelationshipType, name: string, args: any[]): Observable<T> | void;
    /**
     * Forwards a notification of some state change to the target relationship type
     * @param to The RpcRelationshipType that this request is intended for
     * @param name The name of the state change
     * @param value The new value of some state
     * @returns an observable that completes when the state has been changed on the target instance.
     */
    protected forwardNotify(to: RpcRelationshipType, name: string, value: any): Observable<void> | void;
}
