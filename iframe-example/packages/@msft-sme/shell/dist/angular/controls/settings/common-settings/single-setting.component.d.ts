import { OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationExtras, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../settings-can-deactivate-guard.service';
import { SettingsComponent } from '../settings.component';
export declare class SingleSettingComponent implements OnInit, OnChanges, OnDestroy {
    settingsTitle: string;
    backRoute: {
        commands: any[];
        extras?: NavigationExtras;
    };
    settingsComponent: SettingsComponent;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}
