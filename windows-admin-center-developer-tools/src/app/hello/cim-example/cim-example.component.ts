// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { Net } from '@msft-sme/shell/core';
import { AjaxError, Subscription } from 'rxjs/Rx';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';

/*
//  This component illustrates how to execute a CIM / WMI call to fetch the running processes
//  on the current host (the machine that the app is running on).
//  
//  Included in this example is the PrimeNG grid that we re currently using for displaying 
//  table based data.  

//  NOTE: There might be a future shift away from PrimeNG data grids, but the current direction
//  is as it stands.
*/
@Component({
    selector: 'sme-cim-example',
    templateUrl: './cim-example.component.html',
    styleUrls: ['./cim-example.component.css']
})
export class CimExampleComponent implements OnInit, OnDestroy {
    private processesSubscription: Subscription;
    public processes: any[];
    public errorMessage: string;
    public loading = true;
    public selectedProces: any;
    public strings: Strings;
    public isExpanded: boolean;

    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return MsftSme.resourcesStrings<Strings>().HelloWorld.cim.title;
    }

    constructor(private appContextService: AppContextService,
        private helloService: HelloService) {
        this.strings = MsftSme.resourcesStrings<Strings>();
    }

    public ngOnInit() {
        this.getProcesses();
    }

    /**
     * When dealing with Rx / subscriptions, always remember to unsubscribe to avoid memory leaks
     */
    public ngOnDestroy() {
        this.processesSubscription.unsubscribe();
    }

    public onRowSelect(selectedProcess) {
        // TODO: manage click / grid selection.
    }

    /**
     *  The Get Processes call on the "hello service" execute a WIM call utilizing the CIM standard.
     *  More info: https://msdn.microsoft.com/en-us/library/aa389234(v=vs.85).aspx
     *  Also: https://en.wikipedia.org/wiki/Windows_Management_Instrumentation
     * 
     * This method uses a local subscription reference.  This method should be used on any long running 
     * calls (greater than 200ms) as the ngOnDestroy will ensure that the subscription is canceled,
     * which then results in the cancelation of the task / call.  This is important for navigation, if a
     * user opens a page and navigates away before the call is executed.
     */
    private getProcesses() {
        this.processesSubscription = this.helloService.getProcesses().subscribe(
            (response: any) => {
                this.processes = response;
                this.loading = false;
            },
            (error: AjaxError) => {
                this.errorMessage = Net.getErrorMessage(error);
                this.loading = false;
            }
        );
    }

    /**
     * Refresh all current active queue.
     */
    public refresh(): void {
        // Refresh any QueryCache components and recall data from services.
    }
}