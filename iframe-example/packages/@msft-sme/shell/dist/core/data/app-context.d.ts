import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/generate';
import 'rxjs/add/observable/if';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/onErrorResumeNext';
import 'rxjs/add/observable/pairs';
import 'rxjs/add/observable/race';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/using';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/audit';
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/bufferToggle';
import 'rxjs/add/operator/bufferWhen';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineAll';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/concatMapTo';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/delayWhen';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/distinctUntilKeyChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/elementAt';
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/exhaust';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/findIndex';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/isEmpty';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/max';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeScan';
import 'rxjs/add/operator/min';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/partition';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/publishBehavior';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/race';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/repeat';
import 'rxjs/add/operator/repeatWhen';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/sample';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/sequenceEqual';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/single';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/skipLast';
import 'rxjs/add/operator/skipUntil';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/subscribeOn';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/timeoutWith';
import 'rxjs/add/operator/timestamp';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/window';
import 'rxjs/add/operator/windowCount';
import 'rxjs/add/operator/windowTime';
import 'rxjs/add/operator/windowToggle';
import 'rxjs/add/operator/windowWhen';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/zipAll';
import { Observable } from 'rxjs/Observable';
import { FrameConnection } from '../frame/frame-connection';
import { NotificationConnection } from '../notification/notification-connection';
import { WorkItemConnection } from '../notification/work-item-connection';
import { Rpc } from '../rpc/rpc';
import { ActiveConnection } from '../security/active-connection';
import { AuthorizationManager } from '../security/authorization-manager';
import { ConnectionManager } from '../security/connection-manager';
import { ConnectionStream } from '../security/connection-stream';
import { ConnectionTagManager } from '../security/connection-tag-manager';
import { CimConnection } from './cim-connection';
import { CimStream } from './cim-stream';
import { FileTransfer } from './file-transfer';
import { GatewayConnection } from './gateway-connection';
import { NodeConnection } from './node-connection';
import { PowerShellConnection } from './powershell-connection';
import { PowerShellStream } from './powershell-stream';
import { ResourceCache } from './resource-cache';
import { SettingsManager } from './settings-manager';
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
    connectionTagManager: ConnectionTagManager;
    fileTransfer: FileTransfer;
    frame: FrameConnection;
    gateway: GatewayConnection;
    node: NodeConnection;
    notification: NotificationConnection;
    powerShell: PowerShellConnection;
    powerShellStream: PowerShellStream;
    resourceCache: ResourceCache;
    rpc: Rpc;
    settingsManager: SettingsManager;
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
     * @param connectionTagManager the connection tag manager.
     * @param fileTransfer the file transfer connection.
     * @param frame the frame connection.
     * @param gateway the gateway connection.
     * @param node the node connection.
     * @param notification the notification connection.
     * @param powerShell the powerShell connection.
     * @param powerShellStream the powerShell stream.
     * @param resourceCache the resource cache.
     * @param rpc the Rpc.
     * @param settingsManager the user profile.
     * @param workItem the work item connection
     */
    constructor(activeConnection: ActiveConnection, authorizationManager: AuthorizationManager, cim: CimConnection, cimStream: CimStream, connectionManager: ConnectionManager, connectionStream: ConnectionStream, connectionTagManager: ConnectionTagManager, fileTransfer: FileTransfer, frame: FrameConnection, gateway: GatewayConnection, node: NodeConnection, notification: NotificationConnection, powerShell: PowerShellConnection, powerShellStream: PowerShellStream, resourceCache: ResourceCache, rpc: Rpc, settingsManager: SettingsManager, workItem: WorkItemConnection);
    readonly servicesReady: Observable<boolean>;
}
