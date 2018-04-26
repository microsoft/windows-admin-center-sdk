// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { NotificationState, WorkItemResult, WorkItemSubmitRequest } from '@msft-sme/shell/core';
import { Observable, Subscription } from 'rxjs';
import { PowerShellScripts } from '../../../generated/powerShell-scripts';
import { Strings } from '../../../generated/strings';
import { HelloService } from '../hello.service';

@Component({
    selector: 'sme-dll-example',
    templateUrl: './dll-example.component.html',
    styleUrls: ['./dll-example.component.css']
})
export class DllExampleComponent implements OnInit, OnDestroy {
    private alertCount: number;
    private notificationCount: number;
    private longRunningMessage: string;
    public codeDisplay: string;
    private restSubscription: Subscription;
    private restResponse: string;
    
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return MsftSme.resourcesStrings<Strings>().HelloWorld.dll.title;
    }

    constructor(private appContextService: AppContextService, private helloService: HelloService) {
        this.alertCount = 0;
        this.notificationCount = 0;
    }

    public ngOnInit() {
        // todo: init logic.
    }

    public ngOnDestroy() {
        // Cleanup logic.
        this.restSubscription.unsubscribe();
    }

    private callRestService() {
        this.restSubscription = this.helloService.getGatewayRestResponse().subscribe(
            (response: any) => {
                this.restResponse = response.channel.item.title + ' : ' + response.channel.item.condition.text;
                this.restResponse += ' ' + response.channel.item.condition.temp + ' degrees';
                this.sendNotification(this.restResponse);
            }
        );
    }

    public sendNotification(event) {
        //  Notifications show up as a grey message box on the right hand side of the screen.
        //  These messages will automatically close after ~10 seconds.
        //  There is currently no way to modify the icon on the notification.
        const nodeName = this.appContextService.activeConnection.nodeName;
        ++this.notificationCount;
        this.appContextService.notification.alert(
            nodeName,
            NotificationState.Informational,
            event);

        this.codeDisplay = 'notify';
    }
}
