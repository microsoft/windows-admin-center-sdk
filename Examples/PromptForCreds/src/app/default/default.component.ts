import { Component, OnInit } from '@angular/core';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';

@Component({
  selector: 'default-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  constructor(private appContextService: AppContextService) {
    //
  }

  public ngOnInit() {
    //
  }

  public doIt() {
    this.appContextService.authorizationManager.getNewToken(this.appContextService.activeConnection.nodeName);
  }

}
