import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GatewayInventory, GatewayMode } from '../../../../core';
import { ShellService } from '../../../shell.service';
export declare class ConnectionsNavigationComponent implements OnInit, OnDestroy {
    private route;
    private router;
    private shellService;
    strings: {
        connections: {
            title: {
                format: string;
            };
            sidebar: {
                landmark: {
                    aria: {
                        label: string;
                    };
                };
            };
        };
    };
    isMenuExpanded: boolean;
    allConnectionsRoute: string;
    solutionName: string;
    gateway: GatewayInventory;
    gatewayMode: typeof GatewayMode;
    private subscription;
    private gatewaySubscription;
    /**
     * Initializes a new instance of the ConnectionsNavigationComponent class.
     *
     * @param route the activated route service.
     * @param router the router service.
     */
    constructor(route: ActivatedRoute, router: Router, shellService: ShellService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private updateRouteParams();
}
