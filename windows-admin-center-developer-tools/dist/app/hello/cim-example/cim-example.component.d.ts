import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';
export declare class CimExampleComponent implements OnInit, OnDestroy {
    private appContextService;
    private helloService;
    private processesSubscription;
    processes: any[];
    errorMessage: string;
    loading: boolean;
    selectedProces: any;
    strings: Strings;
    isExpanded: boolean;
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService, helloService: HelloService);
    ngOnInit(): void;
    /**
     * When dealing with Rx / subscriptions, always remember to unsubscribe to avoid memory leaks
     */
    ngOnDestroy(): void;
    onRowSelect(selectedProcess: any): void;
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
    private getProcesses();
    /**
     * Refresh all current active queue.
     */
    refresh(): void;
}
