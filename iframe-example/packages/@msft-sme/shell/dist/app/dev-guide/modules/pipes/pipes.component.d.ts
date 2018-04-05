import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '../../../../angular';
export declare class PipesComponent {
    links: {
        href: string;
        text: string;
    }[];
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
}
