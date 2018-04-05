var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { AppContext } from '../../core';
import { SmeStylesComponent } from '../controls/styles/sme-styles.component';
import { SvgResource } from '../directives/svg/svg-resource';
import { ActiveConnectionService } from './active-connection.service';
import { AuthorizationService } from './authorization.service';
import { CimStreamService } from './cim-stream.service';
import { CimService } from './cim.service';
import { ConnectionStreamService } from './connection-stream.service';
import { ConnectionService } from './connection.service';
import { FileTransferService } from './file-transfer.service';
import { FrameService } from './frame.service';
import { GatewayService } from './gateway.service';
import { Navigation } from './navigation';
import { NodeService } from './node.service';
import { NotificationService } from './notification.service';
import { PowerShellStreamService } from './powershell-stream.service';
import { PowerShellService } from './powershell.service';
import { ResourceService } from './resource.service';
import { RpcService } from './rpc.service';
import { UserProfileService } from './user-profile.service';
import { WorkItemService } from './work-item.service';
/**
 * The application context service class.
 */
var AppContextService = (function (_super) {
    __extends(AppContextService, _super);
    /**
     * Initializes a new instance of the AppContextService class.
     *
     * @param activeConnectionService the active connection service.
     * @param authorizationService the authorization service.
     * @param cimService the cim service.
     * @param cimStreamService the cim stream service.
     * @param connectionService the connection service.
     * @param connectionStreamService the connection stream service.
     * @param fileTransferService the file transfer service.
     * @param frameService the frame of window and dialog service.
     * @param gatewayService the gateway service.
     * @param nodeService the node service.
     * @param notificationService the notification service.
     * @param powerShellService the powerShell service.
     * @param powerShellStreamService the powerShell stream service.
     * @param resourceService the resource service.
     * @param rpcService the Rpc service.
     * @param userProfileService the user profile service.
     * @param workItemService the work item service.
     */
    function AppContextService(activeConnectionService, authorizationService, cimService, cimStreamService, connectionService, connectionStreamService, fileTransferService, frameService, gatewayService, nodeService, notificationService, powerShellService, powerShellStreamService, resourceService, rpcService, userProfileService, workItemService) {
        var _this = _super.call(this, activeConnectionService, authorizationService, cimService, cimStreamService, connectionService, connectionStreamService, fileTransferService, frameService, gatewayService, nodeService, notificationService, powerShellService, powerShellStreamService, resourceService, rpcService, userProfileService, workItemService) || this;
        _this.internalResourceService = resourceService;
        _this.internalAuthorizationService = authorizationService;
        return _this;
    }
    /**
     * Initialize the app context resource from AppModule constructor.
     *
     * @param options the app module initialization options.
     */
    AppContextService.prototype.initializeModule = function (options) {
        if (options.svgResource) {
            // register SVG resources to resource service.
            SvgResource.buildRegister(this.internalResourceService, options.svgResource);
        }
        // turn off browser history-push.
        // RouterLink click in html will push history to the browser at default.
        Navigation.turnOffHistory();
        // override PrimeNg Context menu.
        SmeStylesComponent.overridePrimeNgContextMenu();
    };
    /**
     * Initializes the app context resource from ngInit call in AppComponent.
     *
     * @param options the App context initialization options.
     */
    AppContextService.prototype.ngInit = function (options) {
        if (options.navigationService) {
            options.navigationService.initialize(options.navigatorServiceOptions);
            this.internalNavigationService = options.navigationService;
        }
    };
    /**
     * Destroy the app context resource from ngDestroy call in AppComponent.
     */
    AppContextService.prototype.ngDestroy = function () {
        if (this.internalNavigationService) {
            this.internalNavigationService.shutdown();
        }
    };
    return AppContextService;
}(AppContext));
export { AppContextService };
AppContextService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AppContextService.ctorParameters = function () { return [
    { type: ActiveConnectionService, },
    { type: AuthorizationService, },
    { type: CimService, },
    { type: CimStreamService, },
    { type: ConnectionService, },
    { type: ConnectionStreamService, },
    { type: FileTransferService, },
    { type: FrameService, },
    { type: GatewayService, },
    { type: NodeService, },
    { type: NotificationService, },
    { type: PowerShellService, },
    { type: PowerShellStreamService, },
    { type: ResourceService, },
    { type: RpcService, },
    { type: UserProfileService, },
    { type: WorkItemService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9hcHAtY29udGV4dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sWUFBQSxDQUFhO0FBRXhDLE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLHlDQUFBLENBQTBDO0FBQzdFLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQ0FBQSxDQUFpQztBQUM3RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTyx5QkFBQSxDQUEwQjtBQUMvRCxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxzQkFBQSxDQUF1QjtBQUN4RCxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUN6RCxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx5QkFBQSxDQUEwQjtBQUM5RCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLG1CQUFBLENBQW9CO0FBQ25ELE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxjQUFBLENBQWU7QUFFMUMsT0FBTyxFQUFFLFdBQUEsRUFBWSxNQUFPLGdCQUFBLENBQWlCO0FBQzdDLE9BQU8sRUFBRSxtQkFBQSxFQUFvQixNQUFPLHdCQUFBLENBQXlCO0FBQzdELE9BQU8sRUFBRSx1QkFBQSxFQUF3QixNQUFPLDZCQUFBLENBQThCO0FBQ3RFLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHNCQUFBLENBQXVCO0FBQ3pELE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8sb0JBQUEsQ0FBcUI7QUFDckQsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLGVBQUEsQ0FBZ0I7QUFDM0MsT0FBTyxFQUFFLGtCQUFBLEVBQW1CLE1BQU8sd0JBQUEsQ0FBeUI7QUFDNUQsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxxQkFBQSxDQUFzQjtBQWlDdEQ7O0dBRUc7QUFDSDtJQUF1QyxxQ0FBVTtJQUs3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCwyQkFDSSx1QkFBZ0QsRUFDaEQsb0JBQTBDLEVBQzFDLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxpQkFBb0MsRUFDcEMsdUJBQWdELEVBQ2hELG1CQUF3QyxFQUN4QyxZQUEwQixFQUMxQixjQUE4QixFQUM5QixXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsaUJBQW9DLEVBQ3BDLHVCQUFnRCxFQUNoRCxlQUFnQyxFQUNoQyxVQUFzQixFQUN0QixrQkFBc0MsRUFDdEMsZUFBZ0M7UUFqQnBDLFlBa0JJLGtCQUNJLHVCQUF1QixFQUN2QixvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLG1CQUFtQixFQUNuQixZQUFZLEVBQ1osY0FBYyxFQUNkLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixlQUFlLEVBQ2YsVUFBVSxFQUNWLGtCQUFrQixFQUNsQixlQUFlLENBQ2xCLFNBSUo7UUFGRyxLQUFJLENBQUMsdUJBQXVCLEdBQUcsZUFBZSxDQUFDO1FBQy9DLEtBQUksQ0FBQyw0QkFBNEIsR0FBRyxvQkFBb0IsQ0FBQzs7SUFDN0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw0Q0FBZ0IsR0FBdkIsVUFBd0IsT0FBZ0M7UUFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsOENBQThDO1lBQzlDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBRUQsaUNBQWlDO1FBQ2pDLHdFQUF3RTtRQUN4RSxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFNUIsaUNBQWlDO1FBQ2pDLGtCQUFrQixDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrQ0FBTSxHQUFiLFVBQWMsT0FBbUM7UUFDN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDL0QsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLHFDQUFTLEdBQWhCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUMsQ0FBQztJQUNMLENBQUM7SUF3Qkwsd0JBQUM7QUFBRCxDQWxJQSxBQWtJQyxDQWxJc0MsVUFBVTs7QUEyRzFDLDRCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtDQUNuQixDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsZ0NBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLHVCQUF1QixHQUFHO0lBQ2pDLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixHQUFHO0lBQzlCLEVBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztJQUNwQixFQUFDLElBQUksRUFBRSxnQkFBZ0IsR0FBRztJQUMxQixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztJQUMzQixFQUFDLElBQUksRUFBRSx1QkFBdUIsR0FBRztJQUNqQyxFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztJQUM3QixFQUFDLElBQUksRUFBRSxZQUFZLEdBQUc7SUFDdEIsRUFBQyxJQUFJLEVBQUUsY0FBYyxHQUFHO0lBQ3hCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztJQUNyQixFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztJQUM3QixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztJQUMzQixFQUFDLElBQUksRUFBRSx1QkFBdUIsR0FBRztJQUNqQyxFQUFDLElBQUksRUFBRSxlQUFlLEdBQUc7SUFDekIsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO0lBQ3BCLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixHQUFHO0lBQzVCLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRztDQUN4QixFQWxCNkYsQ0FrQjdGLENBQUMiLCJmaWxlIjoiYXBwLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=