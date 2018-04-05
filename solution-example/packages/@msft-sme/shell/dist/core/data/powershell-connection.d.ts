import { Observable } from 'rxjs/Observable';
import { BatchConnection } from './batch-connection';
import { LifetimeData } from './lifetime-data';
import { NodeConnection } from './node-connection';
import { PowerShellOptions, PowerShellSession, PowerShellSessionRequestOptions } from './powershell';
import { PowerShellBatchSession } from './powershell-batch';
/**
 * The PowerShell Connection class.
 */
export declare class PowerShellConnection {
    private lifetimeData;
    private nodeConnection;
    private batchConnection;
    /**
     * Initializes a new instance of the PowerShellConnection class.
     *
     * @param lifetimeService the lifetimeService class instance injected.
     * @param nodeConnection the nodeConnection class instance injected.
     * @param batchConnection the batchConnection class instance injected.
     */
    constructor(lifetimeData: LifetimeData, nodeConnection: NodeConnection, batchConnection: BatchConnection);
    /**
     * Create PowerShell Session object without persisted session.
     *
     * @param nodeName the name of the node to connect to.
     */
    createSession(nodeName: string): PowerShellSession;
    /**
     * Create PowerShell Session object with persisted shared session by the key.
     *
     * @param nodeName the name of the node to connect to.
     * @param key the unique key to share the session.
     * @param requestOptions the options to apply to every request in this session
     */
    createSession(nodeName: string, key: string): PowerShellSession;
    createSession(nodeName: string, key: string, requestOptions: PowerShellSessionRequestOptions): PowerShellSession;
    /**
     * Runs the powershell command on the session.
     *
     * @param session the PowerShell session object.
     * @param command the PowerShell command line.
     */
    run(session: PowerShellSession, command: string): any;
    /**
     * Runs the powershell command on the session.
     *
     * @param session the PowerShell session object.
     * @param command the PowerShell command line.
     * @param options the PowerShell command options.
     */
    run(session: PowerShellSession, command: string, options: PowerShellOptions): any;
    /**
     * Find existing PowerShellSession by the node name and key.
     *
     * @param nodeName the node name.
     * @param key the key string.
     * @return PowerShellSession the powershell session which is not disposable.
     */
    find(nodeName: string, key: string): PowerShellSession;
    /**
     * Cancel the script run.
     * @param session the PowerShell session object.
     */
    cancel(session: PowerShellSession): Observable<any>;
    /**********************************
     * PowerShell Batch Section
     **********************************/
    /**
     * Create PowerShell Batch Session object without persisted session.
     *
     * @param nodeNamesList the Nodes to run the batch commands against.
     */
    createBatchSession(nodeNamesList: string[]): PowerShellBatchSession;
    /**
     * Create PowerShell Batch Session object with persisted shared session by the key.
     *
     * @param nodeNamesList the Nodes to run the batch commands against.
     * @param key the unique key to share the session.
     * @param requestOptions the options to apply to every request in this session
     */
    createBatchSession(nodeNamesList: string[], key: string): PowerShellBatchSession;
    createBatchSession(nodeNamesList: string[], key: string, requestOptions: PowerShellSessionRequestOptions): PowerShellBatchSession;
    /**
     * Runs the powershell commands Batch on the session, with separate command provided for each Node.
     *
     * @param session the PowerShellBatch session object.
     * @param commandList the PowerShell command line array, corresponding to nodeNamesList.
     */
    runBatch(session: PowerShellBatchSession, commandList: string[]): any;
    /**
     * Runs the powershell commands on the session, with separate command for each Node.
     *
     * @param session the PowerShellBatch session object.
     * @param commandList the PowerShell command line array, corresponding to nodeNamesList.
     * @param options the PowerShell command options.
     */
    runBatch(session: PowerShellBatchSession, commandList: string[], options: PowerShellOptions): any;
    /**
     * Runs the same powershell command on a Batch of Nodes.
     *
     * @param session the PowerShellBatch session object.
     * @param command the PowerShell command line to run on all Nodes.
     */
    runBatchSingleCommand(session: PowerShellBatchSession, command: string): any;
    /**
     * Runs the powershell command on the session.
     *
     * @param session the PowerShellBatch session object.
     * @param command the PowerShell command line to run on all Nodes.
     * @param options the PowerShell command options.
     */
    runBatchSingleCommand(session: PowerShellBatchSession, command: string, options: PowerShellOptions): any;
    /**
     * Find existing PowerShellBatchSession by the node names list and key.
     *
     * @param nodeNames the node names list.
     * @param key the key string.
     * @return PowerShellBatchSession the powershell batch session which is not disposable.
     */
    findBatchSession(nodeNamesList: string[], key: string): PowerShellBatchSession;
}
