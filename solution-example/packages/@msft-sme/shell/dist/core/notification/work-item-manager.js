import { Observable } from 'rxjs';
import { Net } from '../data/net';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { RpcInboundCommands } from '../rpc/rpc-base';
import { NotificationState } from './notification';
import { PowerShellNotification } from './powershell-notification';
import { WorkItemRequestType } from './work-item-request';
/**
 * Work item manager class.
 */
var WorkItemManager = (function () {
    /**
     * Initializes a new instance of the WorkItemManager class.
     *
     * @param rpc the RPC object.
     * @param gatewayConnection the gateway connection service.
     * @param nodeConnection the node connection service.
     * @param notificationManager the notification manager.
     */
    function WorkItemManager(rpc, gatewayConnection, nodeConnection, notificationConnection) {
        this.rpc = rpc;
        this.gatewayConnection = gatewayConnection;
        this.nodeConnection = nodeConnection;
        this.notificationConnection = notificationConnection;
        this.active = false;
        this.notificationManager = this.notificationConnection.notificationManager;
        this.start();
    }
    /**
     * Start the work item management.
     */
    WorkItemManager.prototype.start = function () {
        var _this = this;
        this.stop();
        this.active = true;
        // pickup active work items for last 24hours
        this.startSubscription = this.gatewayConnection.get(WorkItemManager.apiWorkItems24hours)
            .catch(function (error, obj) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.NotificationNoWorkItemFound.message;
            Logging.log({
                source: 'Notification',
                level: LogLevel.Error,
                message: message.format(Net.getErrorMessage(error))
            });
            return Observable.of({ response: { value: null } });
        })
            .switchMap(function (response) {
            if (response.value) {
                response.value.forEach(function (element) {
                    _this.notificationManager.addFromRecover(element);
                });
            }
            // start websocket status query.
            _this.powerShellNotification = new PowerShellNotification(_this.gatewayConnection.gatewayUrl);
            return Observable.fromPromise(
            // converting jQueryPromise to native Promise.
            new Promise(function (resolve, reject) { return _this.powerShellNotification.initialize().then(resolve, reject); }));
        })
            .subscribe(function () {
            // notification from the gateway...
            _this.notificationSubscription = _this.powerShellNotification.subject
                .subscribe(function (item) {
                if (item && item.message && item.message.sessionId) {
                    var id = item.message.sessionId;
                    if (!_this.notificationManager.updateFromMessage(id, item)) {
                        var message = MsftSme.resourcesStrings()
                            .MsftSmeShell.Core.Error.NotificationUnexpectedReceived.message;
                        Logging.log({
                            source: 'Notification',
                            level: LogLevel.Warning,
                            message: message.format(id)
                        });
                    }
                }
            });
            // workItem request from rpc...
            _this.rpcWorkItemSubscription = _this.rpc.moduleSubjects(RpcInboundCommands.WorkItem)
                .subscribe(function (item) {
                if (item.data.type === WorkItemRequestType.PowerShellSubmit) {
                    _this.submitWorkItem(item.data).toPromise().then(item.deferred.resolve, item.deferred.reject);
                }
                else {
                    _this.queryWorkItem(item.data).toPromise().then(item.deferred.resolve, item.deferred.reject);
                }
            });
            // subscribe the session notification to the gateway...
            _this.notificationManager.items.forEach(function (value) {
                // only if it's not finalized.
                if (value.state === NotificationState.Started || value.state === NotificationState.InProgress) {
                    _this.powerShellNotification.subscribeSession(value.id);
                }
            });
        }, function (error) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.NotificationWebsocketInitialize.message;
            Logging.log({
                source: 'Notification',
                level: LogLevel.Error,
                message: message.format(Net.getErrorMessage(error))
            });
        });
    };
    /**
     * Stop the work item management.
     */
    WorkItemManager.prototype.stop = function () {
        this.active = false;
        if (this.startSubscription) {
            this.startSubscription.unsubscribe();
            this.startSubscription = null;
        }
        if (this.notificationSubscription) {
            this.notificationSubscription.unsubscribe();
            this.notificationSubscription = null;
        }
        if (this.powerShellNotification) {
            this.powerShellNotification.uninitialize();
            this.powerShellNotification = null;
        }
        if (this.rpcWorkItemSubscription) {
            this.rpcWorkItemSubscription.unsubscribe();
            this.rpcWorkItemSubscription = null;
        }
    };
    /**
     * Create and submit a workItem.
     *
     * @param request the work item request.
     * @return Observable the WorkItemResult observable.
     */
    WorkItemManager.prototype.submitWorkItem = function (request) {
        var _this = this;
        var script = request.powerShellScript;
        delete request['powerShellScript'];
        var nodeRequestOptions = request.nodeRequestOptions;
        delete request['nodeRequestOptions'];
        // remember current URL where original request generated.
        request.locationPathname = window.location.pathname;
        request.locationSearch = window.location.search;
        return this.powerShellNotification.submit(this.nodeConnection, request.nodeName, script, request, nodeRequestOptions, function (result) {
            _this.notificationManager.addFromWorkItem(result.id, request, result.state, result.error);
        });
    };
    /**
     * Query a workItem.
     *
     * @param request the work item request.
     * @return Observable the WorkItemResult observable.
     */
    WorkItemManager.prototype.queryWorkItem = function (request) {
        var notification = this.notificationManager.find(request.id);
        if (notification) {
            if (notification.state === NotificationState.Error) {
                return Observable.of({
                    id: notification.id,
                    state: notification.state,
                    percent: notification.progressPercent,
                    error: notification.object
                });
            }
            return Observable.of({
                id: notification.id,
                state: notification.state,
                percent: notification.progressPercent,
                object: notification.object
            });
        }
        var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.NotificationNoIdFound.message;
        return Observable.throw(message.format(request.id));
    };
    return WorkItemManager;
}());
export { WorkItemManager };
WorkItemManager.apiWorkItems24hours = '/workitems?lastMinutes=1440';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL3dvcmstaXRlbS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBR2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQWdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakUsT0FBTyxFQUFFLHNCQUFzQixFQUE2QixNQUFNLDJCQUEyQixDQUFDO0FBRTlGLE9BQU8sRUFBcUMsbUJBQW1CLEVBQWtCLE1BQU0scUJBQXFCLENBQUM7QUFFN0c7O0dBRUc7QUFDSDtJQVdJOzs7Ozs7O09BT0c7SUFDSCx5QkFDWSxHQUFRLEVBQ1IsaUJBQW9DLEVBQ3BDLGNBQThCLEVBQy9CLHNCQUE4QztRQUg3QyxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ1Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDL0IsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQXBCbEQsV0FBTSxHQUFHLEtBQUssQ0FBQztRQXFCbEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQztRQUMzRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksK0JBQUssR0FBWjtRQUFBLGlCQTJFQztRQTFFRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQiw0Q0FBNEM7UUFFNUMs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QUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFpQjtnQkFDakMsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFO2dCQUNuQixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7Z0JBQ3pCLE9BQU8sRUFBRSxZQUFZLENBQUMsZUFBZTtnQkFDckMsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNO2FBQzlCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUM7UUFDeEcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQTdMQSxBQTZMQzs7QUE1TGtCLG1DQUFtQixHQUFHLDZCQUE2QixDQUFDIiwiZmlsZSI6IndvcmstaXRlbS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==