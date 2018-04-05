import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppContextService } from '../../angular';
import { EnvironmentModuleEntryPoint } from '../../core';
export interface ShellRoutingParameters {
    solutionFriendlyName?: string;
    solutionId?: string;
    solution?: EnvironmentModuleEntryPoint;
    toolId?: string;
    toolUrl?: string[];
    toolFriendlyName?: string;
    tool?: EnvironmentModuleEntryPoint;
    connectionName?: string;
    connectionType?: string;
    connectionFriendlyType?: string;
}
export declare const routeParts: {
    solutionId: string;
    toolId: string;
    toolUrl: string;
    tools: string;
    connections: string;
    connectionName: string;
    connectionType: string;
};
export declare class RouteHelpers {
    static queryParams: {
        disableDayZero: string;
    };
    static getFullRouteParams(route: ActivatedRouteSnapshot): MsftSme.StringMap<string>;
    static getFullShellRoutingParameters(route: ActivatedRouteSnapshot): ShellRoutingParameters;
    static getShellRoutingParameters(params: MsftSme.StringMap<string>): ShellRoutingParameters;
    private static resolveEntryPointOfType(id, entryPointType);
    static navigateToHome(router: Router): Promise<boolean>;
    static navigateToSolution(router: Router, solutionEntryPoint: EnvironmentModuleEntryPoint): Promise<boolean>;
    static navigateToConnections(router: Router, solutionEntryPoint?: EnvironmentModuleEntryPoint): Promise<boolean>;
    static navigateToConnection(router: Router, connectionType: string, connectionName: string, solution?: EnvironmentModuleEntryPoint): Promise<boolean>;
    static navigateToTool(router: Router, params: ShellRoutingParameters, appendTools?: boolean): Promise<boolean>;
    static navigateByParams(router: Router, params: ShellRoutingParameters): Promise<boolean>;
    static getBaseToolsRoute(params: ShellRoutingParameters): string[];
    static getToolsListFromShellParameters(appContextService: AppContextService, params: ShellRoutingParameters): EnvironmentModuleEntryPoint[];
    static getDefaultToolForSolution(appContextService: AppContextService, params: ShellRoutingParameters): EnvironmentModuleEntryPoint;
}
