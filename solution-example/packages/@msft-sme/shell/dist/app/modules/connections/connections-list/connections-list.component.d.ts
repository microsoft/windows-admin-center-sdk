import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertBarService, AppContextService, DialogService } from '../../../../angular';
import { Connection, LiveConnection, LiveConnectionStatusType } from '../../../../core';
export interface User {
    userId: string;
}
export interface SortEvent {
    field: string;
    order: number;
}
export interface ConnectionModel {
    id: string;
    name: string;
    typeIcon: string;
    typeName: string;
    lastUpdated: string;
    statusType: LiveConnectionStatusType;
    statusLabel: string;
    statusDetails: string;
    statusClass: string;
    osName: string;
    user: string;
    loading: boolean;
    connection: Connection;
}
export declare class ConnectionsListComponent implements OnInit, OnDestroy {
    private appContextService;
    private dialogService;
    private alertBarService;
    private router;
    solution: any;
    private dataTable;
    strings: {
        title: string;
        nodeNameHeader: string;
        nodeTypeHeader: string;
        nodeStatusHeader: string;
        nodeOsHeader: string;
        nodeManagingAsHeader: string;
        nodeLastUpdatedHeader: string;
        connectionTypeHeader: string;
        actions: {
            add: string;
            remove: string;
            connect: string;
            manageAs: string;
            manageAsLaps: string;
            refreshServer: string;
            search: {
                placeholder: string;
            };
        };
        empty: {
            loading: string;
            none: string;
        };
        nodeOs: {
            Nano: string;
            Server2016: string;
            Server2012: string;
            cluster: string;
        };
        gettingStarted: {
            title: {
                format: string;
            };
        };
        serverStatus: {
            refreshing: string;
            loading: string;
            unreachable: string;
            ready: string;
            unauthorized: string;
            unknown: string;
            untrusted: string;
            unsupported: string;
            wmiProvidersNotInstalled: string;
            wmfNotPresent: string;
            prerequisitesNotMet: string;
        };
        listStatus: {
            message: string;
        };
        dialogs: {
            remove: {
                title: string;
                messageFormat: string;
                multiMessageFormat: string;
                cancelButtonText: string;
                confirmButtonText: string;
                error: {
                    titleFormat: string;
                };
            };
            elevate: {
                confirmButtonText: string;
                cancelButtonText: string;
                elevateGatewayTitle: string;
                elevateGatewayMessage: string;
            };
            add: {
                title: string;
                typeTitleFormat: string;
                sideLoadWarning: string;
                buttons: {
                    cancel: string;
                };
            };
        };
        Dialogs: {
            Buttons: {
                Close: {
                    label: string;
                };
            };
        };
        User: {
            Error: {
                title: string;
            };
        };
    };
    shellStrings: {
        applicationTitle: string;
        applicationTitleSuffix: string;
        applicationVersion: string;
        welcomeMessage: string;
        settings: string;
        nodeLabel: string;
        userLabel: string;
        changeConnection: string;
        getUserProfileError: string;
    };
    user: User;
    connections: ConnectionModel[];
    selectedConnections: ConnectionModel[];
    connectionsSubscription: Subscription;
    connectionsReadySubscription: Subscription;
    statusSubscription: Subscription;
    userSubscription: Subscription;
    filterSubscription: Subscription;
    filterInput: FormControl;
    connectionsReady: boolean;
    gettingStarted: boolean;
    connectionsIcons: MsftSme.StringMap<string>;
    connectionsTypeNames: MsftSme.StringMap<string>;
    pendingConnectToId: string;
    pendingConnectToName: string;
    private masterConnections;
    private filter;
    private lastSortEvent;
    private sortRequired;
    private internalSolution;
    private activeDialogConnectionModel;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService, dialogService: DialogService, alertBarService: AlertBarService, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Refreshes one or all servers in the server list
     */
    refresh(connectionModels?: ConnectionModel[]): void;
    addConnection(): void;
    removeConnection(connectionModels: ConnectionModel[]): void;
    openDefaultAction(connectionModel: ConnectionModel, connectWhenReady?: boolean): void;
    openConnection(connectionModel: ConnectionModel): void;
    getManagingAs(liveConnection: LiveConnection): string;
    getToken(connectionModels: ConnectionModel[], connectWhenReady?: boolean): void;
    showStatusSolution(connectionModel: ConnectionModel, connectWhenReady?: boolean): void;
    sortCompareFunction: (a: any, b: any, field: string) => number;
    /**
     * displays confirmation dialog
     * @param title
     * @param message
     */
    private showConfirmationDialog(title, message);
    private verifyStatusChange(connectionModel);
    private startListening();
    /**
     * Create new model connection.
     * @param liveConnection the live connection.
     */
    private liveToModelConnection(liveConnection);
    /**
     * Update the model connection. Watch the change and determine if sort is needed.
     * @param liveConnection the live connection.
     * @param model the model connection.
     */
    private updateToModel(liveConnection, model);
    private getStatusClass(statusType, loading);
    private getSortableValue(connectionModel, field);
    private sortCollection(inputCollection, event?);
    private checkSearchFilter(connectionModel, filter);
    private filterConnections();
}
