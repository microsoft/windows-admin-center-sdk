/**
 * The deferred class based on native Promise.
 */
export declare class NativeDeferred<T> {
    /**
     * The native promise.
     */
    promise: Promise<T>;
    /**
     * Resolve callback of the deferred object.
     */
    resolve: (value?: T | PromiseLike<T>) => void;
    /**
     * Reject callback of the deferred object.
     */
    reject: (reason?: any) => void;
    /**
     * Is fulfilled tracked status.
     */
    isFulfilled: boolean;
    /**
     * Is pending tracked status.
     */
    isPending: boolean;
    /**
     * Initializes a new instance of the NativeDeferred class.
     */
    constructor();
}
/**
 * Native Q to attach on native Promise.
 */
export declare class NativeQ {
    /**
     * Create native deferred object.
     */
    static defer<T>(): NativeDeferred<T>;
    /**
     * Create rejected native deferred object.
     */
    static rejected<T>(reason?: any): Promise<T>;
    /**
     * Create resolved native deferred object.
     */
    static resolved<T>(data?: T): Promise<T>;
}
