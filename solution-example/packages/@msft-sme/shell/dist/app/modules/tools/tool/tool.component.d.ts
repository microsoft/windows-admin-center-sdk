import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../../../../angular';
import { EnvironmentModuleEntryPoint } from '../../../../core';
import { IFrameService } from '../../iframe/iframe.service';
import { ShellCanDeactivateTool } from '../tools-guard-base.service';
export declare class ToolComponent implements OnInit, OnDestroy, ShellCanDeactivateTool {
    private appContext;
    private route;
    private router;
    private iFrameService;
    tool: EnvironmentModuleEntryPoint;
    private subscription;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContext: AppContextService, route: ActivatedRoute, router: Router, iFrameService: IFrameService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    canDeactivateTool(currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean>;
    private updateTool();
}
