import { Observable } from 'rxjs';
import { BatchConnection } from './batch-connection';
import { Disposable, DisposableLifetimeManager } from './disposable';
import { PowerShellCommand, PowerShellOptions, PowerShellSessionRequestOptions } from './powershell';
/**
 * PowerShell batch response Item.
 */
export interface PowerShellBatchResponseItem {
    /**
     * The request Sequence number to which this response correspond to.
     */
    sequenceNumber: number;
    /**
     * The status of the specific call to a node.
     */
    status: number;
    /**
     * The node name returning the response.
     */
    nodeName: string;
    /**
     * The Json properties returned from node.
     */
    properties: any;
    /**
     * The error json obj, in case of error.
     */
    error?: any;
    /**
     * The errors json array obj, in case of aggregated errors.
     */
    errors?: any[];
}
/**
 * The PowerShellBatchSession class.
 */
export declare class PowerShellBatchSession implements Disposable {
    powerShellBatch: PowerShellBatch;
    private lifetime;
    /**
     * Initializes a new instance of the PowerShellBatchSession class.
     *
     * @param powerShellBatch the PowerShellBatch object.
     * @param lifetime the disposable lifetime manager object.
     */
    constructor(powerShellBatch: PowerShellBatch);
    constructor(powerShellBatch: PowerShellBatch, lifetime: DisposableLifetimeManager);
    /**
     * Dispose the session object.
     */
    dispose(): void;
}
/**
 * The PowerShellbatch class.
 *
 * - Single instance of PowerShell batch class manages a single single nodes-runspaces map, with a runspace corresponding to each node.
 * - It queues coming requests and process one at a time sequentially.
 * - If a command is slow and causing with multiple responses, it aggregates response into single Q result.
 * - A PowerShellbatch instance should be created through create() function, and it's statically stored/managed into _map collection.
 * - Once all lifetime references are gone, it deletes the runspaces map.
 * - To dispose the PowerShellbatch instance, it can use lifetime.dispose().
 */
export declare class PowerShellBatch {
    /**
     * Static collection of PowerShellbatch objects.
     */
    private static map;
    /**
     * The context of PowerShellBatch object.
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
     * Current data to return to caller.
     */
    private currentData;
    /**
     * Current data map to aggregate partial data parts from multiple data responses.
     */
    private currentDataMap;
    /**
     * Timestamp when last command started.
     */
    private timestamp;
    /**
     * Find or create new PowerShellbatch object.
     *
     * @param nodesList The nodes list targeted by this PowerShellBatch object.
     * @param batchConnection The batch connection.
     * @param key The shared key to queue the requests to use the single nodes-runspaces map.
     * @param lifetime The lifetime container.
     * @param requestOptions the options to apply to every request in this session
     */
    static create(nodesList: string[], batchConnection: BatchConnection): PowerShellBatch;
    static create(nodesList: string[], batchConnection: BatchConnection, key: string, lifetime: DisposableLifetimeManager): PowerShellBatch;
    static create(nodesList: string[], batchConnection: BatchConnection, key: string, lifetime: DisposableLifetimeManager, requestOptions: PowerShellSessionRequestOptions): PowerShellBatch;
    /**
     * Find existing PowerShellBatch object. Create call must be called before to create the PowerShellBatch instance.
     *
     * @param nodeName The node name.
     * @param key The shared key to queue the requests to use the single runspace.
     */
    static find(nodesList: string[], key: string): PowerShellBatch;
    /**
     * Create the index name in map collection.
     *
     * @param nodesList The nodes list targeted by this PowerShellBatch object.
     * @param key The shared key to queue the requests to use the single runspace.
     */
    private static indexName(nodesList, key);
    /**
     * Initializes a new instance of the PowerShellBatch class.
     * (private constructor which shouldn't be called directly.)
     *
     * @param nodeList The nodes list targeted by this PowerShellBatch object.
     * @param batchConnection The batch connection service.
     * @param key The shared key to queue the requests to use the single runspace map.
     * @param lifetime The lifetime container.
     */
    constructor(nodeList: string[], batchConnection: BatchConnection, key: string, lifetime: DisposableLifetimeManager, options: PowerShellSessionRequestOptions);
    /**
     * Run PowerShellBatch command.
     *
     * @param command The command to run against all nodes in nodesList.
     * @param options The options.
     * @return observable The result of PowerShell batch command.
     */
    runSingleCommand(command: PowerShellCommand, options?: PowerShellOptions): Observable<PowerShellBatchResponseItem[]>;
    /**
     * Run PowerShellBatch command list.
     *
     * @param commandsList The commands to run against given nodesList.
     * @param options The options.
     * @return observable The result of PowerShell batch command.
     */
    run(commandsList: PowerShellCommand[], options?: PowerShellOptions): Observable<PowerShellBatchResponseItem[]>;
    /**
     * Cancel PowerShellBatch command.
     */
    cancel(): Observable<PowerShellBatchResponseItem[]>;
    /**
     * Enqueue a command request.
     *
     * @param nodesList: the node list.
     * @param commandBodyList The command.
     * @param options The options.
     */
    private enqueue(nodesList, commandBodyList, options?);
    /**
     * Dequeue a command request.
     */
    private dequeue();
    /**
     * Collect response results for batch call and aggregate into single object.
     *
     * @param properties The properties of response object.
     * @param timeoutMs The timeout to cancel command.
     * @param observer The observer of powershell results.
     */
    private collect(psResponseList, timeoutMs, observer);
    /**
     * Helper method to convert a map data to list
     *
     * @param map The map of nodenames to PowerShellBatchResponseItem. Used to track different calls in a batch.
     * @return The response data for the calls in a list.
     */
    private convertResponseMapDataToList(map);
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
