import { Observable } from 'rxjs';
import { FrameConnection } from '../frame/frame-connection';
import { NotificationConnection } from '../notification/notification-connection';
import { WorkItemConnection } from '../notification/work-item-connection';
import { Rpc } from '../rpc/rpc';
import { ActiveConnection } from '../security/active-connection';
import { AuthorizationManager } from '../security/authorization-manager';
import { ConnectionManager } from '../security/connection-manager';
import { ConnectionStream } from '../security/connection-stream';
import { CimConnection } from './cim-connection';
import { CimStream } from './cim-stream';
import { FileTransfer } from './file-transfer';
import { GatewayConnection } from './gateway-connection';
import { NodeConnection } from './node-connection';
import { PowerShellConnection } from './powershell-connection';
import { PowerShellStream } from './powershell-stream';
import { ResourceCache } from './resource-cache';
import { UserProfileManager } from './user-profile-manager';
/**
 * The application context class.
 */
export declare class AppContext {
    activeConnection: ActiveConnection;
    authorizationManager: AuthorizationManager;
    cim: CimConnection;
    cimStream: CimStream;
    connectionManager: ConnectionManager;
    connectionStream: ConnectionStream;
    fileTransfer: FileTransfer;
    frame: FrameConnection;
    gateway: GatewayConnection;
    node: NodeConnection;
    notification: NotificationConnection;
    powerShell: PowerShellConnection;
    powerShellStream: PowerShellStream;
    resourceCache: ResourceCache;
    rpc: Rpc;
    userProfileManager: UserProfileManager;
    workItem: WorkItemConnection;
    /**
     * Initializes a new instance of the AppContext class.
     *
     * @param activeConnection the active connection.
     * @param authorizationManager the authorization manager.
     * @param cim the cim connection.
     * @param cimStream the cim stream.
     * @param connectionManager the connection manager.
     * @param connectionStream the connection stream.
     * @param fileTransfer the file transfer connection.
     * @param frame the frame connection.
     * @param gateway the gateway connection.
     * @param node the node connection.
     * @param notification the notification connection.
     * @param powerShell the powerShell connection.
     * @param powerShellStream the powerShell stream.
     * @param resourceCache the resource cache.
     * @param rpc the Rpc.
     * @param userProfileManager the user profile.
     * @param workItem the work item connection
     */
    constructor(activeConnection: ActiveConnection, authorizationManager: AuthorizationManager, cim: CimConnection, cimStream: CimStream, connectionManager: ConnectionManager, connectionStream: ConnectionStream, fileTransfer: FileTransfer, frame: FrameConnection, gateway: GatewayConnection, node: NodeConnection, notification: NotificationConnection, powerShell: PowerShellConnection, powerShellStream: PowerShellStream, resourceCache: ResourceCache, rpc: Rpc, userProfileManager: UserProfileManager, workItem: WorkItemConnection);
    readonly servicesReady: Observable<boolean>;
}
