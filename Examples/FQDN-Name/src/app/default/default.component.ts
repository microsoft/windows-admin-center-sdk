import { Component, OnInit } from '@angular/core';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  public title = '';

  constructor(private appContextService: AppContextService) { 
    //
  }

  public ngOnInit() {
    this.title = this.appContextService.activeConnection.value.properties.networkName;
  }

}
