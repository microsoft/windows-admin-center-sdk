import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
export declare class ConnectionsNavigationComponent implements OnInit, OnDestroy {
    private route;
    private router;
    strings: {
        connections: {
            title: {
                format: string;
            };
        };
    };
    isMenuExpanded: boolean;
    allConnectionsRoute: string;
    solutionName: string;
    private subscription;
    /**
     * Initializes a new instance of the ConnectionsNavigationComponent class.
     *
     * @param route the activated route service.
     * @param router the router service.
     */
    constructor(route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private updateRouteParams();
}
