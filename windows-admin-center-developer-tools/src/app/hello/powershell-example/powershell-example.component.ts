// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { Net, PowerShellSession } from '@microsoft/windows-admin-center-sdk/core';
import { AjaxError, Subscription } from 'rxjs/Rx';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';

@Component({
    selector: 'sme-powershell-example',
    templateUrl: './powershell-example.component.html',
    styleUrls: ['./powershell-example.component.css']
})
export class PowershellExampleComponent implements OnInit, OnDestroy {
    public loading = true;
    public displayCode = true;
    public displayCodeButtonContent: string;
    private serviceSubscription: Subscription;
    private psSession: PowerShellSession;
    public errorMessage: string;
    public serviceDisplayName: string;
    public strings = this.appContextService.resourceCache.getStrings<Strings>();
    public serviceDefinition: any;

    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return MsftSme.resourcesStrings<Strings>().HelloWorld.powershell.title;
    }

    constructor(private appContextService: AppContextService, private helloService: HelloService) {
        this.serviceDisplayName = 'Loading...';
    }

    public ngOnInit() {
        this.displayCodeButtonContent = this.strings.HelloWorld.showCode;
        this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
        this.getServices();
    }

    public ngOnDestroy() {
        this.psSession.dispose();
    }

    /*
    //  The Get Services call on the "hello service" initiates a PowerShell session executes
    */
    private getServices() {
        this.serviceSubscription = this.helloService.getService(this.psSession, 'winrm').subscribe(
            (service: any) => {
                this.loading = false;
                if (service) {
                    this.serviceDisplayName = service.displayName;
                    this.serviceDefinition = service;
                } else {
                    this.serviceDisplayName = this.strings.HelloWorld.notFound;
                }
            },
            (error: AjaxError) => {
                this.errorMessage = Net.getErrorMessage(error);
                this.loading = false;
            }
        );
    }

    public toggleCode() {
        this.displayCode = !this.displayCode;

        if (!this.displayCode) { 
            this.displayCodeButtonContent = this.strings.HelloWorld.showCode;
        } else {
            this.displayCodeButtonContent = this.strings.HelloWorld.hideCode;
        }
    }
}
