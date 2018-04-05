import { Observable } from 'rxjs';
import { Net } from '../data/net';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { RpcInboundCommands } from '../rpc/rpc-base';
import { NotificationState } from './notification-state';
import { PowerShellNotification } from './powershell-notification';
import { WorkItemRequestType } from './work-item-request';
/**
 * Work item manager class.
 */
var WorkItemManager = /** @class */ (function () {
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
    WorkItemManager.apiWorkItems24hours = '/workitems?lastMinutes=1440';
    return WorkItemManager;
}());
export { WorkItemManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL3dvcmstaXRlbS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBR2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUlsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQTZCLE1BQU0sMkJBQTJCLENBQUM7QUFFOUYsT0FBTyxFQUFxQyxtQkFBbUIsRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUU3Rzs7R0FFRztBQUNIO0lBV0k7Ozs7Ozs7T0FPRztJQUNILHlCQUNZLEdBQVEsRUFDUixpQkFBb0MsRUFDcEMsY0FBOEIsRUFDL0Isc0JBQThDO1FBSDdDLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFDUixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUMvQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBcEJsRCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBcUJsQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDO1FBQzNFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQkFBSyxHQUFaO1FBQUEsaUJBMkVDO1FBMUVHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLDRDQUE0QztRQUU1QyxJ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RUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQWlCO2dCQUNqQyxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQUU7Z0JBQ25CLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztnQkFDekIsT0FBTyxFQUFFLFlBQVksQ0FBQyxlQUFlO2dCQUNyQyxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU07YUFDOUIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztRQUN4RyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUEzTGMsbUNBQW1CLEdBQUcsNkJBQTZCLENBQUM7SUE0THZFLHNCQUFDO0NBN0xELEFBNkxDLElBQUE7U0E3TFksZUFBZSIsImZpbGUiOiJ3b3JrLWl0ZW0tbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=