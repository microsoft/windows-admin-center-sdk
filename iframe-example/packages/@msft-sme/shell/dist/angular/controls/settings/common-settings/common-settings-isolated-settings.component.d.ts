import { ActivatedRoute, ActivatedRouteSnapshot, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommonSettingsNavigationItem } from './common-settings-navigation-item';
import { CommonSettingsComponent } from './common-settings.component';
import { CanComponentDeactivate } from '../settings-can-deactivate-guard.service';
export declare class CommonSettingsIsolatedSettingsComponent {
    private router;
    private activatedRoute;
    settingsTitle: string;
    settings: CommonSettingsNavigationItem[];
    backRoute: {
        commands: any[];
        extras?: NavigationExtras;
    };
    commonSettingsComponent: CommonSettingsComponent;
    constructor(router: Router, activatedRoute: ActivatedRoute);
    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}
