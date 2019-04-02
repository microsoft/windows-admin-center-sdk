import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
    return 'default';
}

  constructor() { 
    //
  }

  public ngOnInit() {
    //
  }
}
