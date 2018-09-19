import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { Subscription } from 'rxjs';

import { Strings } from '../../generated/strings';
import { PluginService } from './plugin.service';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  private serviceSubscription: Subscription;
  private responseResult: string;
  /**
   * Navigation Title implementation
   * Provides navigation service with the title of this component,
   * indicating that it should be reflected in the shells route/history/title
   */
  public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
    return MsftSme.resourcesStrings<Strings>().GatewayPluginExample.title;
  }

  constructor(private appContextService: AppContextService, private plugin: PluginService) {
    //
  }

  public ngOnInit() {
    this.responseResult = 'click go to do something';
  }

  public onClick() {
    this.serviceSubscription = this.plugin.getGatewayRestResponse().subscribe(
      (response: any) => {
        this.responseResult = 'response: ' + response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
