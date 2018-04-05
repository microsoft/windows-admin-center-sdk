import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, DialogService } from '../../../angular';
export declare class LandingComponent {
    private dialogService;
    private appContextService;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(dialogService: DialogService, appContextService: AppContextService);
    manageAs(nodeName?: string, addOverride?: boolean): void;
    clientNotificationClick(): void;
}
