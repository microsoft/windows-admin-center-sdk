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
    template: `
      <sme-tool-header>Gateway Extension Example</sme-tool-header>
      <div class="overflow-margins table-indent">
        A Gateway Extension is a special extension that gets compiled as a DLL and managed on the primary Honolulu application that is either installed locally
        or on the remote Gateway server.  For more information on building, compiling, and deploying these kinds of extensions,
        please read the 'gateway-extensions.md' document in the docs folder included in this extension.
      </div>
      <div class="overflow-margins table-indent">
        <sme-action-bar class="fixed-flex-size tool-bar first-row">
            <sme-action-button #action [text]="'Call REST service'" [iconClass]="'sme-icon icon-win-upload'" (execute)="callRestService()"></sme-action-button>
        </sme-action-bar>
        <br />
        <br />
        The service side code for calling the Gateway extension looks like this:
        <pre>
          <code>
      public getGatewayRestResponse(): Observable&lt;string&gt; {{ '{' }}
          return this.http.get('http://localhost:6516/api/nodes/matwils-2016.redmond.corp.microsoft.com/features/RedmondWeather')
          .map((response) => response.response.query.results);
      {{ '}' }}
          </code>
        </pre>
        <br />
        While the calling code follows this structure:
        <pre>
          <code>
      private callRestService() {{ '{' }}
        this.restSubscription = this.helloService.getGatewayRestResponse().subscribe(
            (response: string) => {{ '{' }}
                this.restResponse = response.channel.item.title;
                this.restResponse += ' : ' + response.channel.item.condition.text;
                this.restResponse += ' ' + response.channel.item.condition.temp + ' degrees';
                this.sendNotification(this.restResponse);
            {{ '}' }}
        );
      {{ '}' }}
          </code>
        </pre>
      </div>
    `,
    styles: [`

    `]
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
