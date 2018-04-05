import { Observable, ReplaySubject } from 'rxjs';
import { Net } from '../data/net';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { RpcInboundCommands } from '../rpc/rpc-base';
import { ClientNotificationType } from './client-notification';
import { Notification, NotificationChangeEvent } from './notification';
import { NotificationState } from './notification-state';
/**
 * Notification manager class.
 */
var NotificationManager = /** @class */ (function () {
    /**
     * Initializes a new instance of the NotificationManager class.
     *
     * @param rpc the RPC object.
     */
    function NotificationManager(rpc) {
        this.rpc = rpc;
        this.changedEventSubject = new ReplaySubject(1);
        this.initialize();
    }
    Object.defineProperty(NotificationManager.prototype, "items", {
        /**
         * Gets the items from current notification collection including dismissed.
         */
        get: function () {
            var items = [];
            for (var item in this.collection) {
                if (this.collection.hasOwnProperty(item)) {
                    items.push(this.collection[item]);
                }
            }
            return items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationManager.prototype, "changed", {
        /**
         * Gets the subject of notification changed event.
         */
        get: function () {
            return this.changedEventSubject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes the rpc notification call.
     */
    NotificationManager.prototype.initialize = function () {
        var _this = this;
        this.collection = {};
        // notification request from rpc...
        this.rpcNotifySubscription = this.rpc.moduleSubjects(RpcInboundCommands.Notification)
            .subscribe(function (item) {
            _this.notify(item.data).toPromise().then(item.deferred.resolve, item.deferred.reject);
        }, function (error) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.NotificationRpcInitialization.message;
            Logging.log({
                source: 'Notification',
                level: LogLevel.Error,
                message: message.format(Net.getErrorMessage(error))
            });
        });
        this.rpcQuerySubscription = this.rpc.moduleSubjects(RpcInboundCommands.WorkItemFind)
            .subscribe(function (item) {
            item.deferred.resolve(_this.workItemFind(item.data));
        }, function (error) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.NotificationRpcInitialization.message;
            Logging.log({
                source: 'Notification',
                level: LogLevel.Error,
                message: message.format(Net.getErrorMessage(error))
            });
        });
        this.addEvent(NotificationChangeEvent.Initialized);
    };
    /**
     * Stop the notification manager.
     */
    NotificationManager.prototype.uninitialize = function () {
        if (this.rpcNotifySubscription) {
            this.rpcNotifySubscription.unsubscribe();
            this.rpcNotifySubscription = null;
        }
        if (this.rpcQuerySubscription) {
            this.rpcQuerySubscription.unsubscribe();
            this.rpcQuerySubscription = null;
        }
    };
    /**
     * Find a notification.
     *
     * @param id the notification id.
     */
    NotificationManager.prototype.find = function (id) {
        return this.collection[id];
    };
    /**
     * Remove a notification.
     * There is no dismiss API on the gateway, this just remove from the list.
     * Don't remove active notification. Use dismiss api instead, so it doesn't displays to .items property.
     *
     * @param id the session id (notification id).
     * @return boolean true if removed.
     */
    NotificationManager.prototype.remove = function (id) {
        var notification = this.find(id);
        if (notification) {
            delete this.collection[id];
            this.addEvent(NotificationChangeEvent.Remove, notification);
            return true;
        }
        return false;
    };
    /**
     * Dismiss a notification to mark dismiss property.
     *
     * @param id the session id (notification id).
     * @return boolean true if dismissed.
     */
    NotificationManager.prototype.dismiss = function (id) {
        var notification = this.find(id);
        if (notification) {
            notification.dismissed = true;
            this.addEvent(NotificationChangeEvent.Remove, notification);
            return true;
        }
        return false;
    };
    /**
     * Add notification from WorkItem.
     *
     * @param id the notification ID.
     * @param workItem the RPC work item.
     * @param state the initial state.
     * @param object the object from query result.
     * @return notification the notification object.
     */
    NotificationManager.prototype.addFromWorkItem = function (id, workItem, state, object) {
        var notification = Notification.createFromWorkItem(id, workItem, state, object);
        this.collection[id] = notification;
        this.addEvent(NotificationChangeEvent.Add, notification);
    };
    /**
     * Add notification from Recover.
     *
     * @param id the notification ID.
     * @param workItem the RPC work item.
     * @param state the initial state.
     * @param object the object from query result.
     * @return notification the notification object.
     */
    NotificationManager.prototype.addFromRecover = function (recover) {
        var notification = Notification.createFromRecover(recover);
        this.collection[recover.id] = notification;
        this.addEvent(NotificationChangeEvent.Add, notification);
    };
    /**
     * Update notification from socket message.
     *
     * @param id the notification ID.
     * @param message the socket message.
     */
    NotificationManager.prototype.updateFromMessage = function (id, message) {
        var notification = this.find(id);
        if (notification) {
            if (notification.updateFromMessage(message)) {
                this.addEvent(NotificationChangeEvent.Change, notification);
            }
            return true;
        }
        return false;
    };
    /**
     * Add or update client notification.
     *
     * @param clientNotification the client notification object.
     * @param Observable the observable of void.
     */
    NotificationManager.prototype.notify = function (clientNotification) {
        var notification;
        if (clientNotification.type === ClientNotificationType.AlertBar) {
            notification = Notification.createFromClient(clientNotification);
            this.addEvent(NotificationChangeEvent.Instant, notification);
            return Observable.empty();
        }
        notification = this.find(clientNotification.id);
        if (notification) {
            if (notification.updateFromClient(clientNotification)) {
                this.addEvent(NotificationChangeEvent.Change, notification);
            }
            return Observable.empty();
        }
        notification = Notification.createFromClient(clientNotification);
        this.collection[clientNotification.id] = notification;
        this.addEvent(NotificationChangeEvent.Add, notification);
        return Observable.empty();
    };
    /**
     * Find current work item by the typeId/sourceName/nodeName.
     *
     * @param workItemFind the query notification object.
     * @param RpcWorkItemFindResult the result of query.
     */
    NotificationManager.prototype.workItemFind = function (workItemFind) {
        var _this = this;
        var keys = Object.keys(this.collection);
        var results = keys
            .map(function (key) { return ({ key: key, notification: _this.collection[key] }); })
            .filter(function (data) { return data.notification.moduleName === workItemFind.moduleName
            && data.notification.nodeName === workItemFind.nodeName
            && data.notification.typeId === workItemFind.typeId; })
            .map(function (data) { return ({
            id: data.key,
            state: data.notification.state,
            percent: data.notification.percent,
            error: data.notification.error,
            object: data.notification.object
        }); });
        var notificationResult = {
            results: results,
            typeId: workItemFind.typeId,
            moduleName: workItemFind.moduleName,
            nodeName: workItemFind.nodeName
        };
        return notificationResult;
    };
    /**
     * Add an event to report the change of notification data or collection.
     *
     * @param changeEvent the changed event.
     * @param notification the notification object. (optional)
     */
    NotificationManager.prototype.addEvent = function (changeEvent, notification) {
        this.changedEventSubject.next({ notification: notification, changeEvent: changeEvent });
        // no localization.
        Logging.log({
            source: 'Notification',
            level: LogLevel.Verbose,
            message: notification ?
                'addEvent: {0}/{1}\n{2}\n{3}\n{4}'.format(NotificationChangeEvent[changeEvent], NotificationState[notification.state], notification.title, notification.message, notification.link)
                : 'addEvent: {0}'.format(NotificationChangeEvent[changeEvent])
        });
    };
    return NotificationManager;
}());
export { NotificationManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGtCQUFrQixFQUF3RSxNQUFNLGlCQUFpQixDQUFDO0FBQzNILE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQXFCLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFLekQ7O0dBRUc7QUFDSDtJQU1JOzs7O09BSUc7SUFDSCw2QkFBb0IsR0FBUTtRQUFSLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksYUFBYSxDQUFvQixDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUtELHNCQUFXLHNDQUFLO1FBSGhCOztXQUVHO2FBQ0g7WUFDSSxJQUFJLEtBQUssR0FBbUIsRUFBRSxDQUFDO1lBQy9CLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVyx3Q0FBTztRQUhsQjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ0ksd0NBQVUsR0FBakI7UUFBQSxpQkErQkM7UUE5QkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBa0Isa0JBQWtCLENBQUMsWUFBWSxDQUFDO2FBQ2pHLFNBQVMsQ0FDTixVQUFBLElBQUk7WUFDQSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDO1lBQ2hILE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBa0Isa0JBQWtCLENBQUMsWUFBWSxDQUFDO2FBQ2hHLFNBQVMsQ0FDTixVQUFBLElBQUk7WUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUM7WUFDaEgsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDUixNQUFNLEVBQUUsY0FBYztnQkFDdEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO2dCQUNyQixPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RELENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQ0FBWSxHQUFuQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDdEMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDckMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksa0NBQUksR0FBWCxVQUFZLEVBQVU7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxvQ0FBTSxHQUFiLFVBQWMsRUFBVTtRQUNwQixJQUFJLFlBQVksR0FBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0kscUNBQU8sR0FBZCxVQUFlLEVBQVU7UUFDckIsSUFBSSxZQUFZLEdBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksNkNBQWUsR0FBdEIsVUFBdUIsRUFBVSxFQUFFLFFBQXFCLEVBQUUsS0FBd0IsRUFBRSxNQUFXO1FBQzNGLElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSSw0Q0FBYyxHQUFyQixVQUFzQixPQUEwQjtRQUM1QyxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLCtDQUFpQixHQUF4QixVQUF5QixFQUFVLEVBQUUsT0FBaUQ7UUFDbEYsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksb0NBQU0sR0FBYixVQUFjLGtCQUFtQztRQUM3QyxJQUFJLFlBQTBCLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxLQUFLLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUQsWUFBWSxHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVELFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2hFLENBQUM7WUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFFRCxZQUFZLEdBQUcsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSwwQ0FBWSxHQUFuQixVQUFvQixZQUE2QjtRQUFqRCxpQkFzQkM7UUFyQkcsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQXFCLElBQUk7YUFDdkIsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQSxFQUFyRCxDQUFxRCxDQUFDO2FBQzNELE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxLQUFLLFlBQVksQ0FBQyxVQUFVO2VBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQyxRQUFRO2VBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxNQUFNLEVBRmhELENBRWdELENBQUM7YUFDaEUsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBZ0I7WUFDekIsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ1osS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztZQUM5QixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPO1lBQ2xDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTTtTQUNuQyxDQUFBLEVBTlksQ0FNWixDQUFDLENBQUM7UUFFckIsSUFBSSxrQkFBa0IsR0FBMEI7WUFDNUMsT0FBTyxFQUFFLE9BQU87WUFDaEIsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNO1lBQzNCLFVBQVUsRUFBRSxZQUFZLENBQUMsVUFBVTtZQUNuQyxRQUFRLEVBQUUsWUFBWSxDQUFDLFFBQVE7U0FDbEMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxzQ0FBUSxHQUFoQixVQUFpQixXQUFvQyxFQUFFLFlBQTJCO1FBQzlFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQW9CLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRyxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM1RyxtQkFBbUI7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNSLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTztZQUN2QixPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ25CLGtDQUFrQyxDQUFDLE1BQU0sQ0FDckMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLEVBQ3BDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFDckMsWUFBWSxDQUFDLEtBQUssRUFDbEIsWUFBWSxDQUFDLE9BQU8sRUFDcEIsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckUsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0F2UUEsQUF1UUMsSUFBQSIsImZpbGUiOiJub3RpZmljYXRpb24tbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=