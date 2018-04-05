import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { HelloService } from '../hello.service';
export declare class NotificationsExampleComponent implements OnInit, OnDestroy {
    private appContextService;
    private helloService;
    private alertCount;
    private notificationCount;
    private longRunningMessage;
    codeDisplay: string;
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService, helloService: HelloService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    sendAlert(event: any): void;
    sendNotification(event: any): void;
    /**
     * Illustrates how to setup and subscribe to the results of a long running task,
     * as well as process the response from the task.
     *
     * This method uses the RX take(1) rather than managing a local subscription reference.  The reason for doing this
     * is so that the component does not have to manage the descruction / clean up of the subscription.
     * You should use this method of subscription management when you have a quick (sub 200ms) method
     * that needs to be executed.
     */
    initiateLongRunningNotifiaction(event: any): void;
    private setupNotification();
}
