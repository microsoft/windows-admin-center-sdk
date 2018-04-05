import { Observable } from 'rxjs';
import { Logging } from '../diagnostics/logging';
/**
 * The application context class.
 */
var AppContext = (function () {
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
    function AppContext(activeConnection, authorizationManager, cim, cimStream, connectionManager, connectionStream, fileTransfer, frame, gateway, node, notification, powerShell, powerShellStream, resourceCache, rpc, userProfileManager, workItem) {
        this.activeConnection = activeConnection;
        this.authorizationManager = authorizationManager;
        this.cim = cim;
        this.cimStream = cimStream;
        this.connectionManager = connectionManager;
        this.connectionStream = connectionStream;
        this.fileTransfer = fileTransfer;
        this.frame = frame;
        this.gateway = gateway;
        this.node = node;
        this.notification = notification;
        this.powerShell = powerShell;
        this.powerShellStream = powerShellStream;
        this.resourceCache = resourceCache;
        this.rpc = rpc;
        this.userProfileManager = userProfileManager;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9hcHAtY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQW9CakQ7O0dBRUc7QUFDSDtJQUNJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILG9CQUNXLGdCQUFrQyxFQUNsQyxvQkFBMEMsRUFDMUMsR0FBa0IsRUFDbEIsU0FBb0IsRUFDcEIsaUJBQW9DLEVBQ3BDLGdCQUFrQyxFQUNsQyxZQUEwQixFQUMxQixLQUFzQixFQUN0QixPQUEwQixFQUMxQixJQUFvQixFQUNwQixZQUFvQyxFQUNwQyxVQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsR0FBUSxFQUNSLGtCQUFzQyxFQUN0QyxRQUE0QjtRQWhCNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLFFBQUcsR0FBSCxHQUFHLENBQWU7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDcEIsaUJBQVksR0FBWixZQUFZLENBQXdCO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQXNCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUNSLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFDbkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELHNCQUFXLHFDQUFhO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLFVBQVU7aUJBQ1osUUFBUSxDQUNULElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsRUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxFQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUN6QixHQUFHLENBQUMsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7aUJBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBQ0wsaUJBQUM7QUFBRCxDQXJEQSxBQXFEQyxJQUFBIiwiZmlsZSI6ImFwcC1jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==