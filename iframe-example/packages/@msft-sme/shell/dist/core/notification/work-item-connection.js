var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Observable } from 'rxjs';
import { NotificationState } from './notification-state';
import { WorkItemManager } from './work-item-manager';
import { WorkItemRequestType } from './work-item-request';
/**
 * Work item connection to submit a powershell work item, and to query its state.
 */
var WorkItemConnection = /** @class */ (function () {
    /**
     * Initializes a new instance of the WorkItemConnection class.
     *
     * @param rpc the RPC.
     * @param gatewayConnection the gateway connection.
     * @param notificationConnection the notification connection.
     */
    function WorkItemConnection(rpc, gatewayConnection, nodeConnection, notificationConnection) {
        this.rpc = rpc;
        if (notificationConnection.notificationManager) {
            this.workItemManager = new WorkItemManager(this.rpc, gatewayConnection, nodeConnection, notificationConnection);
        }
    }
    /**
     * Submit a work item either directly to NotificationManager or through RPC.
     *
     * @param nodeName the name of the node to submit the item against.
     * @param request the work item request.
     * @return Observable the observable of WorkItemResult object.
     */
    WorkItemConnection.prototype.submit = function (nodeName, request) {
        var global = window;
        var data = __assign({}, request, {
            type: WorkItemRequestType.PowerShellSubmit,
            sourceName: global.MsftSme.Environment.name,
            nodeName: nodeName,
            timestamp: Date.now()
        });
        if (this.workItemManager) {
            return this.workItemManager.submitWorkItem(data);
        }
        return Observable.fromPromise(this.rpc.submitOrQueryWorkItem(data));
    };
    /**
     * Query a work item either directly to NotificationManager or through RPC.
     *
     * @param request the work item request.
     * @return Observable the observable of WorkItemResult object.
     */
    WorkItemConnection.prototype.query = function (id) {
        var global = window;
        var data = {
            type: WorkItemRequestType.StateQuery,
            sourceName: global.MsftSme.Environment.name,
            timestamp: Date.now(),
            id: id
        };
        if (this.workItemManager) {
            return this.workItemManager.queryWorkItem(data);
        }
        return Observable.fromPromise(this.rpc.submitOrQueryWorkItem(data));
    };
    /**
     * Find existing work item with state.
     *
     * @param nodeName the node name.
     * @param moduleName the module name.
     * @param typeId the type ID.
     * @return Observable<WorkItemFindResult> the observable of WorkItemFindResult.
     */
    WorkItemConnection.prototype.find = function (nodeName, moduleName, typeId) {
        var global = window;
        var data = {
            sourceName: global.MsftSme.Environment.name,
            nodeName: nodeName,
            moduleName: moduleName,
            typeId: typeId
        };
        if (this.workItemManager) {
            return Observable.of(this.workItemManager.notificationConnection.notificationManager.workItemFind(data));
        }
        return Observable.fromPromise(this.rpc.workItemFind(data));
    };
    /**
     * Submit a work item either directly to NotificationManager or through RPC, and wait for completion.
     *
     * @param nodeName the name of the node to submit the work item against
     * @param request the work item request.
     * @param timeout the timeout milliseconds. (optional, default forever until unsubscribe)
     * @param interval the interval period milliseconds. (optional, default 1 sec)
     * @return Observable the observable of WorkItemResult object.
     */
    WorkItemConnection.prototype.submitAndWait = function (nodeName, request, timeout, interval) {
        if (timeout === void 0) { timeout = 0; }
        if (interval === void 0) { interval = 1000; }
        return this.waitObservable(this.submit(nodeName, request), timeout, interval);
    };
    /**
     * Wait for existing work item with state.
     *
     * @param workItemResult the work item result to wait for the final result.
     * @param timeout the timeout milliseconds. (optional, default forever until unsubscribe)
     * @param interval the interval period milliseconds. (optional, default 1 sec)
     * @return Observable<WorkItemFindResult> the observable of WorkItemFindResult.
     */
    WorkItemConnection.prototype.wait = function (workItemResult, timeout, interval) {
        if (timeout === void 0) { timeout = 0; }
        if (interval === void 0) { interval = 1000; }
        if (!workItemResult) {
            return Observable.of(null);
        }
        return this.waitObservable(Observable.of(workItemResult), timeout, interval);
    };
    /**
     * Check if work item result was finished.
     *
     * @param result the work item result.
     * @return boolean true if work item was completed with success or error.
     */
    WorkItemConnection.prototype.isFinished = function (result) {
        if (result.state !== NotificationState.Started && result.state !== NotificationState.InProgress) {
            return true;
        }
        return false;
    };
    /**
     * Wait for existing work item with state.
     *
     * @param workItemResult the work item result to wait for the final result.
     * @param timeout the timeout milliseconds. (optional, default forever until unsubscribe)
     * @param interval the interval period milliseconds. (optional, default 1 sec)
     * @return Observable<WorkItemFindResult> the observable of WorkItemFindResult.
     */
    WorkItemConnection.prototype.waitObservable = function (observable, timeout, interval) {
        var _this = this;
        if (timeout === void 0) { timeout = 0; }
        if (interval === void 0) { interval = 1000; }
        return observable
            .expand(function (result, index) {
            if (_this.isFinished(result)) {
                return Observable.empty();
            }
            else if (timeout > 0 && interval * index > timeout) {
                return Observable.throw('timeout');
            }
            return Observable.of(result)
                .delay(interval)
                .flatMap(function (resultLoop, indexLoop) { return _this.query(result.id); });
        })
            .filter(function (result, index) { return _this.isFinished(result); });
    };
    return WorkItemConnection;
}());
export { WorkItemConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL3dvcmstaXRlbS1jb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU1sQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFzQixtQkFBbUIsRUFBeUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVySDs7R0FFRztBQUNIO0lBR0k7Ozs7OztPQU1HO0lBQ0gsNEJBQ1ksR0FBUSxFQUNoQixpQkFBb0MsRUFDcEMsY0FBOEIsRUFDOUIsc0JBQThDO1FBSHRDLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFJaEIsRUFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUNwSCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLG1DQUFNLEdBQWIsVUFBYyxRQUFnQixFQUFFLE9BQThCO1FBQzFELElBQUksTUFBTSxHQUEyQixNQUFNLENBQUM7UUFDNUMsSUFBSSxJQUFJLEdBQWdCLGFBQ2pCLE9BQU8sRUFDUDtZQUNDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxnQkFBZ0I7WUFDMUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDM0MsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDeEIsQ0FDSixDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkIs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