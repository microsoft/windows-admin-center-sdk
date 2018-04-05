import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GatewayInventory, GatewayMode } from '../../../../core';
import { ShellService } from '../../../shell.service';
export declare class ConnectionComponent implements OnInit, OnDestroy {
    private route;
    private router;
    private shellService;
    connectionName: string;
    gateway: GatewayInventory;
    gatewayMode: typeof GatewayMode;
    private subscription;
    private gatewaySubscription;
    constructor(route: ActivatedRoute, router: Router, shellService: ShellService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
