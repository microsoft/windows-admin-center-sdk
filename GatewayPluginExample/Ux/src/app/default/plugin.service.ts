// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Injectable } from '@angular/core';
import { AppContextService, HttpService } from '@microsoft/windows-admin-center-sdk/angular';
import { Cim, Http, PowerShell, PowerShellSession } from '@microsoft/windows-admin-center-sdk/core';
import { AjaxResponse, Observable } from 'rxjs';

@Injectable()
export class PluginService {
    constructor(private appContextService: AppContextService, private http: Http) {
    }

    private buildUrlParams(): string {
        let gateway = this.appContextService.gateway.gatewayUrl
        let node = this.appContextService.activeConnection.nodeName;
        let url = `${gateway}/api/nodes/${node}/features/Sample Uno`;

        console.log(url);
        return url;
    }

    public getGatewayRestResponse(): Observable<any> {
        let test = this.appContextService.gateway.gatewayUrl
        let callUrl = this.appContextService.activeConnection.nodeName;

        return this.appContextService.node.get(callUrl, 'features/Sample%20Uno').map(
            (response: any) => {
                return response;
            }
        )

        // return this.http.get(this.buildUrlParams())
        // .map((response: AjaxResponse) => {
        //     debugger;
        //     return response;
        // });
    }
}