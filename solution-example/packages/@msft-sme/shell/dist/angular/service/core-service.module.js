import { ErrorHandler, NgModule } from '@angular/core';
import { ActiveConnectionService } from './active-connection.service';
import { AppContextService } from './app-context.service';
import { AppErrorHandler } from './app-error-handler.service';
import { AuthorizationService } from './authorization.service';
import { BatchService } from './batch.service';
import { CimStreamService } from './cim-stream.service';
import { CimService } from './cim.service';
import { ConnectionStreamService } from './connection-stream.service';
import { ConnectionService } from './connection.service';
import { FileTransferService } from './file-transfer.service';
import { FrameService } from './frame.service';
import { GatewayService } from './gateway.service';
import { HttpService } from './http.service';
import { LifetimeService } from './lifetime.service';
import { NavigationService } from './navigation.service';
import { NodeService } from './node.service';
import { NotificationService } from './notification.service';
import { PowerShellStreamService } from './powershell-stream.service';
import { PowerShellService } from './powershell.service';
import { RpcService } from './rpc.service';
import { UserProfileService } from './user-profile.service';
import { WebsocketStreamService } from './websocket-stream.service';
import { WorkItemService } from './work-item.service';
var CoreServiceModule = (function () {
    function CoreServiceModule() {
    }
    return CoreServiceModule;
}());
export { CoreServiceModule };
CoreServiceModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    LifetimeService,
                    RpcService,
                    NavigationService,
                    ActiveConnectionService,
                    AuthorizationService,
                    AppContextService,
                    GatewayService,
                    NodeService,
                    BatchService,
                    WebsocketStreamService,
                    CimService,
                    CimStreamService,
                    ConnectionService,
                    ConnectionStreamService,
                    FileTransferService,
                    HttpService,
                    NotificationService,
                    PowerShellService,
                    PowerShellStreamService,
                    UserProfileService,
                    WorkItemService,
                    FrameService,
                    { provide: ErrorHandler, useClass: AppErrorHandler }
                ]
            },] },
];
/** @nocollapse */
CoreServiceModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9jb3JlLXNlcnZpY2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWMsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN2RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx1QkFBQSxDQUF3QjtBQUMxRCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLDZCQUFBLENBQThCO0FBQzlELE9BQU8sRUFBRSxvQkFBQSxFQUFxQixNQUFPLHlCQUFBLENBQTBCO0FBQy9ELE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxzQkFBQSxDQUF1QjtBQUN4RCxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUN6RCxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx5QkFBQSxDQUEwQjtBQUM5RCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLG1CQUFBLENBQW9CO0FBQ25ELE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUM3QyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLG9CQUFBLENBQXFCO0FBQ3JELE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHNCQUFBLENBQXVCO0FBQ3pELE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUM3QyxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx3QkFBQSxDQUF5QjtBQUM3RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUV6RCxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyx3QkFBQSxDQUF5QjtBQUM1RCxPQUFPLEVBQUUsc0JBQUEsRUFBdUIsTUFBTyw0QkFBQSxDQUE2QjtBQUNwRSxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLHFCQUFBLENBQXNCO0FBR3REO0lBQUE7SUFnQ0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FoQ0EsQUFnQ0M7O0FBaEN1Qyw0QkFBVSxHQUEwQjtJQUM1RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLFNBQVMsRUFBRTtvQkFDUCxlQUFlO29CQUNmLFVBQVU7b0JBQ1YsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO29CQUNqQixjQUFjO29CQUNkLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWixzQkFBc0I7b0JBQ3RCLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQixXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLGtCQUFrQjtvQkFDbEIsZUFBZTtvQkFDZixZQUFZO29CQUNaLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO2lCQUN2RDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJjb3JlLXNlcnZpY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==