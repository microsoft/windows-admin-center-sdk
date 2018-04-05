import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '../../../../../angular';
export declare class LoadingWheelExampleComponent {
    clicked: boolean;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    readonly status: string;
    onClick(): void;
}
