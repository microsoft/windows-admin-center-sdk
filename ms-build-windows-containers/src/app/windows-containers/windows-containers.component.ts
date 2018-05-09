import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AppContextService, DataTableComponent, DataTableCustomSortEvent, DataTableLazyLoadEvent
} from '@microsoft/windows-admin-center-sdk/angular';
import { Net, PowerShellSession } from '@microsoft/windows-admin-center-sdk/core';
import { AjaxError, Subscription } from 'rxjs';
import { ContainerService } from './container.service';

@Component({
  selector: 'sme-windows-containers',
  templateUrl: './windows-containers.component.html',
  styleUrls: ['./windows-containers.component.css']
})
export class WindowsContainersComponent implements OnInit, OnDestroy {
  private containersSubscription: Subscription;
  private startSubscription: Subscription;
  private stopSubscription: Subscription;
  public containers: any[];
  public selectedData1: any;
  public errorMessage: string;
  public loading = true;
  private psSession: PowerShellSession;

  public constructor(private containerService: ContainerService, private appContextService: AppContextService) {
    // todo
  }

  public ngOnInit() {
    this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
    this.getContainers();
  }

  public startSelected(event) {
    this.startSubscription = this.containerService.startContainer(this.psSession, this.selectedData1.image).subscribe(
      (results: any) => {
        //
      },
      (error: AjaxError) => {
        this.errorMessage = Net.getErrorMessage(error);
      }
    );
  }

  public stopSelected(event) {
    this.stopSubscription = this.containerService.stopContainer(this.psSession, this.selectedData1.containerId).subscribe(
      (result: any) => {
        //
      },
      (error: AjaxError) => {
        this.errorMessage = Net.getErrorMessage(error);
      }
    );
  }

  public ngOnDestroy() {
    this.psSession.dispose();
    this.containersSubscription.unsubscribe();
  }

  private getContainers() {
    this.containersSubscription = this.containerService.getContainers(this.psSession).subscribe(
      (results: any[]) => {
        this.loading = false;
        if (results) {
          this.containers = results
        } else {
          // TODO: Error Handle
        }
      },
      (error: AjaxError) => {
        this.errorMessage = Net.getErrorMessage(error);
        this.loading = false;
      }
    );
  }

}
