import { Location } from '@angular/common';
import { AfterViewChecked, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../dialog';
import { SettingsFormService } from './settings-form.service';
import { CanComponentDeactivate } from './settings-can-deactivate-guard.service';
export declare const alertBarId = "settings-alert-bar";
export declare class SettingsComponent implements OnInit, OnDestroy, AfterViewChecked {
    private elementRef;
    private settingsForms;
    private activatedRoute;
    private location;
    private router;
    private dialogService;
    private addFormSubscription;
    private removeFormSubscription;
    private navigationSubscription;
    allForms: FormGroup[];
    private autoFocus;
    /**
     * @deprecated Add your own custom back button in the form
     */
    backRoute: {
        commands: any[];
        extras?: NavigationExtras;
    };
    settingsTitle: string;
    constructor(elementRef: ElementRef, settingsForms: SettingsFormService, activatedRoute: ActivatedRoute, location: Location, router: Router, dialogService: DialogService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    /**
     * Angular Life Cycle hook for After View Checked.
     * When the visibility changes, we are going to focus on the first element that has the autofocus attribute
     */
    ngAfterViewChecked(): void;
    private resetSubscriptions();
}
