import { AppContext } from '../../core';
import { DialogService } from '../controls/dialog';
import { ActiveConnectionService } from './active-connection.service';
import { AuthorizationService } from './authorization.service';
import { CimStreamService } from './cim-stream.service';
import { CimService } from './cim.service';
import { ConnectionStreamService } from './connection-stream.service';
import { ConnectionService } from './connection.service';
import { FileTransferService } from './file-transfer.service';
import { FrameService } from './frame.service';
import { GatewayService } from './gateway.service';
import { NavigationService, NavigatorServiceOptions } from './navigation.service';
import { NodeService } from './node.service';
import { NotificationService } from './notification.service';
import { PowerShellStreamService } from './powershell-stream.service';
import { PowerShellService } from './powershell.service';
import { ResourceService } from './resource.service';
import { RpcService } from './rpc.service';
import { UserProfileService } from './user-profile.service';
import { WorkItemService } from './work-item.service';
/**
 * The initialization context to AppModule.
 */
export interface AppModuleInitialization {
    /**
     * The svg resource to register.
     */
    svgResource?: any;
}
/**
 * The initialization context to AppComponent.
 */
export interface AppComponentInitialization {
    /**
     * The dialog service.
     */
    dialogService?: DialogService;
    /**
     * The navigation service instance.
     */
    navigationService?: NavigationService;
    /**
     * The options for navigation service.
     */
    navigatorServiceOptions?: NavigatorServiceOptions;
}
export declare class AppContextService extends AppContext {
    private internalResourceService;
    private internalAuthorizationService;
    private internalNavigationService;
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
    constructor(activeConnectionService: ActiveConnectionService, authorizationService: AuthorizationService, cimService: CimService, cimStreamService: CimStreamService, connectionService: ConnectionService, connectionStreamService: ConnectionStreamService, fileTransferService: FileTransferService, frameService: FrameService, gatewayService: GatewayService, nodeService: NodeService, notificationService: NotificationService, powerShellService: PowerShellService, powerShellStreamService: PowerShellStreamService, resourceService: ResourceService, rpcService: RpcService, userProfileService: UserProfileService, workItemService: WorkItemService);
    /**
     * Initialize the app context resource from AppModule constructor.
     *
     * @param options the app module initialization options.
     */
    initializeModule(options: AppModuleInitialization): void;
    /**
     * Initializes the app context resource from ngInit call in AppComponent.
     *
     * @param options the App context initialization options.
     */
    ngInit(options: AppComponentInitialization): void;
    /**
     * Destroy the app context resource from ngDestroy call in AppComponent.
     */
    ngDestroy(): void;
}
