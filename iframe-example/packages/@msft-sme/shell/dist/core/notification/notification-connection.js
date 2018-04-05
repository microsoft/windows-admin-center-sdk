var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Observable } from 'rxjs';
import { ClientNotificationType } from './client-notification';
import { NotificationManager } from './notification-manager';
/**
 * Notification connection class.
 */
var NotificationConnection = /** @class */ (function () {
    /**
     * Initializes a new instance of the NotificationConnection class.
     *
     * @param rpc the RPC object.
     */
    function NotificationConnection(rpc) {
        this.rpc = rpc;
        // create only if it's on the top.
        if (window.top === window) {
            this.notificationManager = new NotificationManager(this.rpc);
        }
    }
    /**
     * Send a client notification either directly to NotificationManager or through RPC.
     *
     * @param nodeName the node name.
     * @param notification the client notification object.
     */
    NotificationConnection.prototype.notify = function (nodeName, notification) {
        var global = window;
        var data = __assign({}, notification, {
            sourceName: global.MsftSme.Environment.name,
            nodeName: nodeName,
            timestamp: Date.now()
        });
        if (this.notificationManager) {
            return this.notificationManager.notify(data);
        }
        return Observable.fromPromise(this.rpc.notify(data));
    };
    /**
     * Send an alert bar based client notification either directly to NotificationManager or through RPC.
     * (use notify() interface to display on the notification center)
     *
     * @param nodeName the node name of alert source.
     * @param state the notification state.
     * @param message the message of alert bar.
     * @param title the title of alert bar.
     */
    NotificationConnection.prototype.alert = function (nodeName, state, message, title) {
        var global = window;
        var notification = {
            id: MsftSme.getUniqueId(),
            state: state,
            message: message,
            title: title,
            link: null,
            description: null,
            type: ClientNotificationType.AlertBar
        };
        var data = __assign({}, notification, {
            sourceName: global.MsftSme.Environment.name,
            nodeName: nodeName,
            timestamp: Date.now()
        });
        if (this.notificationManager) {
            return this.notificationManager.notify(data);
        }
        return Observable.fromPromise(this.rpc.notify(data));
    };
    return NotificationConnection;
}());
export { NotificationConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi1jb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQXNCLHNCQUFzQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHN0Q7O0dBRUc7QUFDSDtJQUdJOzs7O09BSUc7SUFDSCxnQ0FBb0IsR0FBUTtRQUFSLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFDeEIsa0NBQWtDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHVDQUFNLEdBQWIsVUFBYyxRQUFnQixFQUFFLFlBQWdDO1FBQzVELElBQUksTUFBTSxHQUEyQixNQUFNLENBQUM7UUFDNUMsSUFBSSxJQUFJLGdCQUNELFlBQVksRUFDWjtZQUNDLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJO1lBQzNDLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1NBQ3hCLENBQ0osQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksc0NBQUssR0FBWixVQUNRLFFBQWdCLEVBQ2hCLEtBQXdCLEVBQ3hCLE9BQWUsRUFDZixLQUFjO1FBQ2xCLElBQUksTUFBTSxHQUEyQixNQUFNLENBQUM7UUFDNUMsSUFBSSxZQUFZLEdBQXVCO1lBQ25DLEVBQUUsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3pCLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLE9BQU87WUFDaEIsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxRQUFRO1NBQ3hDLENBQUM7UUFDRixJQUFJLElBQUksZ0JBQ0QsWUFBWSxFQUNaO1lBQ0MsVUFBVSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDM0MsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDeEIsQ0FDSixDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQTlFQSxBQThFQyxJQUFBIiwiZmlsZSI6Im5vdGlmaWNhdGlvbi1jb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==