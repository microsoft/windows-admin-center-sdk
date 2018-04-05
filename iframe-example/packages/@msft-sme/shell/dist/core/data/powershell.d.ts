import { Observable, Observer } from 'rxjs';
import { Disposable, DisposableLifetimeManager } from './disposable';
import { NodeConnection, NodeRequestOptions } from './node-connection';
/**
 * PowerShell run options.
 */
export interface PowerShellOptions extends NodeRequestOptions {
    /**
     * Close the runspace after the call.
     * (default is false)
     */
    close?: boolean;
    /**
     * Timeout milliseconds to shutdown the session.
     * (default is null and forever)
     */
    timeoutMs?: number;
    /**
     * Processing data progressively instead of waiting all result.
     */
    partial?: boolean;
}
/**
 * The node request options to control the underlying node connections in a powershell session
 */
export interface PowerShellSessionRequestOptions extends NodeRequestOptions {
}
/**
 * PowerShell context object interface.
 */
export interface PowerShellContext {
    /**
     * The node name.
     */
    nodeName: string;
    /**
     * The shared key name for runspace.
     */
    key: string;
    /**
     * The array of referenced containers.
     */
    lifetimes: DisposableLifetimeManager[];
    /**
     * The request options for the powershell session
     */
    requestOptions: PowerShellSessionRequestOptions;
}
/**
 * PowerShell command object.
 */
export interface PowerShellCommand {
    /**
     * The name of powershell module.
     */
    module: string;
    /**
     * The command name.
     */
    command: string;
    /**
     * The parameters (arguments).
     */
    parameters?: any;
    /**
     * The script string.
     */
    script: string;
}
/**
 * PowerShell command queue item.
 */
export interface PowerShellCommandItem {
    /**
     * The command to execute.
     */
    command: PowerShellCommand;
    /**
     * Options for how to handle the command (reserved)
     */
    options?: PowerShellOptions;
    /**
     * Deferred object currently waiting for command run.
     */
    observer: Observer<any>;
}
/**
 * The PowerShellSession class.
 */
export declare class PowerShellSession implements Disposable {
    powerShell: PowerShell;
    private lifetime;
    /**
     * Initializes a new instance of the PowerShellSession class.
     *
     * @param powerShell the PowerShell object.
     * @param lifetime the disposable lifetime manager object.
     */
    constructor(powerShell: PowerShell);
    constructor(powerShell: PowerShell, lifetime: DisposableLifetimeManager);
    /**
     * Gets the node name of session.
     */
    readonly nodeName: string;
    /**
     * Dispose the session object.
     */
    dispose(): void;
}
/**
 * Class containing methods related to PowerShell runspace creation/deletion/command using PowerShell Raw API plugin.
 *  - It's auto holding the session as long as it's used within last 3 minutes.
 */
export declare class PowerShellRaw implements Disposable {
    private nodeConnection;
    private context;
    private static maxDeltaTimeInMs;
    private sessionId;
    private timestampInMs;
    private markDelete;
    private internalActive;
    private cancelPending;
    /**
     * Initializes a new instance of the PowerShellRaw class.
     *
     * @param nodeConnection The node connection service.
     * @param context The context of PowerShell run.
     */
    constructor(nodeConnection: NodeConnection, context: PowerShellContext);
    /**
     * Gets active status of PowerShell execution.
     */
    readonly active: boolean;
    /**
     * Dispose the runspace.
     */
    dispose(): void;
    runCommand(command: PowerShellCommand, options?: NodeRequestOptions): Observable<any>;
    /**
     * Close/Delete the session / runspace.
     */
    close(): Observable<any>;
    /**
     * Cancel the command.
     */
    cancelCommand(): Observable<any>;
    private cancel();
    /**
     * Gets if timestamp was expired.
     */
    private readonly _isExpired;
    /**
     * Initiate command execution. It auto recycles old sessions.
     *
     * @param command the PowerShell command.
     */
    private command(command, options?);
    private checkCompleted(data);
}
/**
 * The PowerShell class.
 *
 * - Single instance of PowerShell class manages single runspace.
 * - It queues coming requests and process one at a time sequentially.
 * - If a command is slow and causing with multiple responses, it aggregates response into single Q result.
 * - A PowerShell instance should be created through create() function, and it's statically stored/managed into _map collection.
 * - In QueryCache operation, it can find the PowerShell instance to run PowerShell command by using find() function.
 * - Once all lifetime references are gone, it deletes the runspace.
 * - To dispose the PowerShell instance, it can use lifetime.dispose().
 */
export declare class PowerShell {
    /**
     * Static collection of PowerShell objects.
     */
    private static map;
    /**
     * Regular expression to match all the occurrences of a single quote
     */
    private static escapeRegex;
    /**
     * The context of PowerShell object.
     */
    private context;
    /**
     * The queue of PowerShell command requests.
     */
    private queue;
    /**
     * The reference to PowerShellRaw class object.
     */
    private raw;
    /**
     * Current data to aggregate from multiple data responses.
     */
    private currentData;
    /**
     * Timestamp when last command started.
     */
    private timestamp;
    /**
     * Create script as string.
     *
     * @param resource the script text from legacy ps-code converter.
     * @param parameters the arguments.
     * @param flags (optional) the switch flags.
     */
    static createScript(script: string, parameters?: any, flags?: string[]): string;
    /**
     * Create PowerShell request command.
     * (It creates a command object of JEA PowerShell request under restricted user role environment.)
     *
     * @param resource the script resource object with command and script data from new ps-code converter.
     * @param parameters the arguments.
     * @param flags (optional) the switch flags.
     * @return PowerShellCommand the PowerShell request command object.
     */
    static createCommand(resource: {
        module: string;
        command: string;
        script: string;
    }, parameters?: any, flags?: string[]): PowerShellCommand;
    /**
     * Find or create new PowerShell object.
     *
     * @param nodeName The node to connect to.
     * @param nodeConnection The node connection.
     * @param key The shared key to queue the requests to use the single runspace.
     * @param lifetime The lifetime container.
     * @param requestOptions the options to apply to every request in this session
     */
    static create(nodeName: string, nodeConnection: NodeConnection): PowerShell;
    static create(nodeName: string, nodeConnection: NodeConnection, key: string, lifetime: DisposableLifetimeManager): PowerShell;
    static create(nodeName: string, nodeConnection: NodeConnection, key: string, lifetime: DisposableLifetimeManager, requestOptions: PowerShellSessionRequestOptions): PowerShell;
    /**
     * Find existing PowerShell object. Create call must be called before to create the PowerShell instance.
     *
     * @param nodeName The node name.
     * @param key The shared key to queue the requests to use the single runspace.
     */
    static find(nodeName: string, key: string): PowerShell;
    /**
     * Create the index name in map collection.
     *
     * @param nodeName The node name.
     * @param key The shared key to queue the requests to use the single runspace.
     */
    private static indexName(nodeName, key);
    /**
     * Initializes a new instance of the PowerShell class.
     * (private constructor which shouldn't be called directly.)
     *
     * @param nodeConnection The node connection service.
     * @param key The shared key to queue the requests to use the single runspace.
     * @param lifetime The lifetime container.
     */
    constructor(nodeName: string, nodeConnection: NodeConnection, key: string, lifetime: DisposableLifetimeManager, options: PowerShellSessionRequestOptions);
    /**
     * Gets node name from current context.
     */
    readonly nodeName: string;
    /**
     * Run PowerShell command.
     *
     * @param command The command.
     * @param options The options.
     * @return PromiseV The result of PowerShell command.
     */
    run(scriptOrCommand: string | PowerShellCommand, options?: PowerShellOptions): Observable<any>;
    /**
     * Cancel PowerShell command.
     */
    cancel(): Observable<any>;
    /**
     * Enqueue a command request.
     *
     * @param command The command.
     * @param options The options.
     */
    private enqueue(command, options?);
    /**
     * Dequeue a command request.
     */
    private dequeue();
    /**
     * Collect response result and aggregate into single object.
     *
     * @param properties The properties of response object.
     * @param timeoutMs The timeout to cancel command.
     * @param observer The observer of powershell results.
     */
    private collect(properties, timeoutMs, observer);
    /**
     * Attach lifetime object to disposer when disposing.
     *
     * @param lifetime The lifetime object.
     */
    private addLifetime(lifetime);
    /**
     * Callback when disposing the container of view model.
     * If none, reference the PowerShell object. Dispose it. (Delete runspace)
     *
     * @param lifetime The lifetime object.
     */
    private lifetimeDisposer(lifetime);
}
