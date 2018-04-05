/**
 * An object that is disposable.
 */
export interface Disposable {
    /**
     * A function called on the object when it is disposed.
     */
    dispose(): void;
}
export declare type ActionOrDisposable = MsftSme.Action | Disposable;
export interface RegisterForDisposeFunction {
    (disposables: ActionOrDisposable[]): LifetimeManagerBase;
    (disposable: ActionOrDisposable): LifetimeManagerBase;
}
/**
 * An object that can limit the lifetime of other objects. When a LifetimeManager object
 * is disposed, it will dispose all other objects that were registered for disposal.
 */
export interface LifetimeManagerBase {
    /**
     * Registers an object to be disposed.  It will throw if the object doesn't have dispose method.
     *
     * @param disposable An object to be disposed once the LifetimeManager object itself is disposed.
     */
    registerForDispose: RegisterForDisposeFunction;
}
export interface LifetimeManager extends LifetimeManagerBase {
    /**
     * Create a createChildLifetime to localize the LifetimeManager.
     * It will provide the function on tracking who create it and when it dispose,
     * it will remove itself from Container's lifetimeManager
     */
    createChildLifetime(): DisposableLifetimeManager;
}
export interface DisposableLifetimeManager extends Disposable, LifetimeManager {
    /**
     * A value indicating whether or not the lifetime is disposed.
     */
    isDisposed(): boolean;
}
/**
 * An object that tracks and invokes disposal callbacks. This can be used
 * in other classes that wish to implement LifetimeManager.
 */
export declare class TriggerableLifetimeManager implements DisposableLifetimeManager {
    private disposables;
    private isDisposedInternal;
    private isDisposing;
    private container;
    private children;
    /**
     * Gets a value indicating whether or not the lifetime is disposed.
     */
    isDisposed(): boolean;
    /**
     * See interface.
     */
    registerForDispose(disposable: any): TriggerableLifetimeManager;
    /**
     * See interface.
     */
    createChildLifetime(): DisposableLifetimeManager;
    /**
     * Causes the instance to regard itself as disposed, and to trigger any
     * callbacks that were already registered.
     */
    dispose(): void;
    private unregisterChildForDispose(disposable);
    private isRegistered(disposable);
    private registerForDisposeInternal(disposable);
}
/**
 * Auto disposer class used with lifetime manager.
 */
export declare class Disposer implements Disposable {
    private callback;
    /**
     * Initializes a new instance of the Disposer class.
     *
     * @param callback the callback function.
     */
    constructor(callback: () => void);
    /**
     * dispose function called when lifetime is gone.
     */
    dispose(): void;
}
