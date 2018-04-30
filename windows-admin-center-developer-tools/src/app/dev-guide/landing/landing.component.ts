// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService, DialogService } from '@msft-sme/shell/angular';
import { ClientNotification, ClientNotificationType, NodeConnection, NotificationState } from '@msft-sme/shell/core';

@Component({
    selector: 'sme-ng2-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent {
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Landing';
    }

    constructor(private dialogService: DialogService, private appContextService: AppContextService) {
    }

    public manageAs(nodeName: string = '', addOverride: boolean = false) {
        if (addOverride) {
            this.appContextService.authorizationManager.nodeTokens[nodeName] =
                { username: 'admin', value: 'thisisafaketoken', useLaps: false, lapsLocalAdminName: 'administrator' };
        }

        this.appContextService.authorizationManager.getNewToken(nodeName);
    }

    public clientNotificationClick(): void {
        /**
         * Create client based notification. (not tracked by the gateway.)
         */
        let notification: ClientNotification = {
            id: MsftSme.getUniqueId(),
            type: ClientNotificationType.NotificationCenter,
            title: 'My notification for the click button action',
            message: 'message 0 something happened that was really interesting',
            description: 'my notification description',
            state: NotificationState.Started
        };
        this.appContextService.notification.notify('<noNodename.nodomain.abc.123.xyz.com>', notification);

        setTimeout(
            () => {
                notification.message = 'message 1';
                notification.state = NotificationState.InProgress;
                this.appContextService.notification.notify('', notification);
            },
            5000);

        setTimeout(
            () => {
                notification.message = 'message 2';
                notification.state = NotificationState.InProgress;
                this.appContextService.notification.notify('', notification);
            },
            10000);

        setTimeout(
            () => {
                notification.message = 'message 3';
                notification.state = NotificationState.Success;
                this.appContextService.notification.notify('', notification);
            },
            15000);
    }
}
