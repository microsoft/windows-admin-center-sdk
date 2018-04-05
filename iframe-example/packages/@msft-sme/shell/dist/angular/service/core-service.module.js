import { ErrorHandler, NgModule } from '@angular/core';
import { ActiveConnectionService } from './active-connection.service';
import { AppContextService } from './app-context.service';
import { AppErrorHandler } from './app-error-handler.service';
import { AuthorizationService } from './authorization.service';
import { BatchService } from './batch.service';
import { CimStreamService } from './cim-stream.service';
import { CimService } from './cim.service';
import { ConnectionStreamService } from './connection-stream.service';
import { ConnectionTagService } from './connection-tag.service';
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
import { SettingsService } from './settings.service';
import { WebsocketStreamService } from './websocket-stream.service';
import { WorkItemService } from './work-item.service';
var CoreServiceModule = /** @class */ (function () {
    function CoreServiceModule() {
    }
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
                        ConnectionTagService,
                        FileTransferService,
                        HttpService,
                        NotificationService,
                        PowerShellService,
                        PowerShellStreamService,
                        SettingsService,
                        WorkItemService,
                        FrameService,
                        { provide: ErrorHandler, useClass: AppErrorHandler }
                    ]
                },] },
    ];
    /** @nocollapse */
    CoreServiceModule.ctorParameters = function () { return []; };
    return CoreServiceModule;
}());
export { CoreServiceModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9jb3JlLXNlcnZpY2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWMsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN2RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx1QkFBQSxDQUF3QjtBQUMxRCxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLDZCQUFBLENBQThCO0FBQzlELE9BQU8sRUFBRSxvQkFBQSxFQUFxQixNQUFPLHlCQUFBLENBQTBCO0FBQy9ELE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsZ0JBQUEsRUFBaUIsTUFBTyxzQkFBQSxDQUF1QjtBQUN4RCxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTywwQkFBQSxDQUEyQjtBQUNoRSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUN6RCxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx5QkFBQSxDQUEwQjtBQUM5RCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8saUJBQUEsQ0FBa0I7QUFDL0MsT0FBTyxFQUFFLGNBQUEsRUFBZSxNQUFPLG1CQUFBLENBQW9CO0FBQ25ELE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUM3QyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLG9CQUFBLENBQXFCO0FBQ3JELE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHNCQUFBLENBQXVCO0FBQ3pELE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUM3QyxPQUFPLEVBQUUsbUJBQUEsRUFBb0IsTUFBTyx3QkFBQSxDQUF5QjtBQUM3RCxPQUFPLEVBQUUsdUJBQUEsRUFBd0IsTUFBTyw2QkFBQSxDQUE4QjtBQUN0RSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxzQkFBQSxDQUF1QjtBQUV6RCxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLG9CQUFBLENBQXFCO0FBQ3JELE9BQU8sRUFBRSxzQkFBQSxFQUF1QixNQUFPLDRCQUFBLENBQTZCO0FBQ3BFLE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8scUJBQUEsQ0FBc0I7QUFHdEQ7SUFBQTtJQWlDQSxDQUFDO0lBakN1Qyw0QkFBVSxHQUEwQjtRQUM1RSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLFNBQVMsRUFBRTt3QkFDUCxlQUFlO3dCQUNmLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQixjQUFjO3dCQUNkLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixzQkFBc0I7d0JBQ3RCLFVBQVU7d0JBQ1YsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLFlBQVk7d0JBQ1osRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7cUJBQ3ZEO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHdCQUFDO0NBakNELEFBaUNDLElBQUE7U0FqQ1ksaUJBQWlCIiwiZmlsZSI6ImNvcmUtc2VydmljZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9