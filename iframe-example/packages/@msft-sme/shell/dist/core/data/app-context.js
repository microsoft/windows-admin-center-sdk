// import all RXJS operator commonly used.
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
import { Logging } from '../diagnostics/logging';
/**
 * The application context class.
 */
var AppContext = /** @class */ (function () {
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
    function AppContext(activeConnection, authorizationManager, cim, cimStream, connectionManager, connectionStream, connectionTagManager, fileTransfer, frame, gateway, node, notification, powerShell, powerShellStream, resourceCache, rpc, settingsManager, workItem) {
        this.activeConnection = activeConnection;
        this.authorizationManager = authorizationManager;
        this.cim = cim;
        this.cimStream = cimStream;
        this.connectionManager = connectionManager;
        this.connectionStream = connectionStream;
        this.connectionTagManager = connectionTagManager;
        this.fileTransfer = fileTransfer;
        this.frame = frame;
        this.gateway = gateway;
        this.node = node;
        this.notification = notification;
        this.powerShell = powerShell;
        this.powerShellStream = powerShellStream;
        this.resourceCache = resourceCache;
        this.rpc = rpc;
        this.settingsManager = settingsManager;
        this.workItem = workItem;
        Logging.current.registerRpc(this.rpc, this.gateway);
        rpc.init();
    }
    Object.defineProperty(AppContext.prototype, "servicesReady", {
        get: function () {
            return Observable
                .forkJoin(this.authorizationManager.initialize(), this.connectionManager.initialize(), this.gateway.initialize())
                .map(function () { return true; })
                .take(1);
        },
        enumerable: true,
        configurable: true
    });
    return AppContext;
}());
export { AppContext };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9hcHAtY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQ0FBMEM7QUFDMUMsT0FBTyxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sOEJBQThCLENBQUM7QUFDdEMsT0FBTywyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sMEJBQTBCLENBQUM7QUFDbEMsT0FBTywrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8saUNBQWlDLENBQUM7QUFDekMsT0FBTyw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sOEJBQThCLENBQUM7QUFDdEMsT0FBTywyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyx1Q0FBdUMsQ0FBQztBQUMvQyxPQUFPLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sMEJBQTBCLENBQUM7QUFDbEMsT0FBTywyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sMkJBQTJCLENBQUM7QUFDbkMsT0FBTywyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLHlCQUF5QixDQUFDO0FBRWpDLE9BQU8seUJBQXlCLENBQUM7QUFDakMsT0FBTyw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sK0JBQStCLENBQUM7QUFDdkMsT0FBTyw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sOEJBQThCLENBQUM7QUFDdEMsT0FBTyx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLDhCQUE4QixDQUFDO0FBQ3RDLE9B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QVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNwQixpQkFBWSxHQUFaLFlBQVksQ0FBd0I7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ1Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxzQkFBVyxxQ0FBYTthQUF4QjtZQUNJLE1BQU0sQ0FBQyxVQUFVO2lCQUNaLFFBQVEsQ0FDVCxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLEVBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsRUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDekIsR0FBRyxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO2lCQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDOzs7T0FBQTtJQUNMLGlCQUFDO0FBQUQsQ0F2REEsQUF1REMsSUFBQSIsImZpbGUiOiJhcHAtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=