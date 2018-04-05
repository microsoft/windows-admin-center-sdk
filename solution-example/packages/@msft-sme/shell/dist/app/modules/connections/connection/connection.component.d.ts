import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
export declare class ConnectionComponent implements OnInit, OnDestroy {
    private route;
    private router;
    connectionName: string;
    private subscription;
    constructor(route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
