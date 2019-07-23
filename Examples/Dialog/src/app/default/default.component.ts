import { Component, OnInit } from '@angular/core';
import { AppContextService, ConfirmationDialogOptions, DialogService } from '@microsoft/windows-admin-center-sdk/angular';

import { CredentialDialogResults } from './credential-dialog/credential-dialog.component';

@Component({
  selector: 'default-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public givenUser: string;
  public givenPass: string;

  constructor(private dialogService: DialogService, private appContextService: AppContextService) {
    //
  }

  public ngOnInit() {
    //
  }

  public onClickCredentialCollect() {
    // fill
    const subject = this.dialogService.show<ConfirmationDialogOptions, CredentialDialogResults>('credential-dialog', {
      cancelButtonText: 'Cancel',
      confirmButtonText: 'OK',
      message: 'Collecting credentials',
      title: 'Creds'
    }).subscribe((result) => {
      if (result.result) {
        // do stuff with uid and password.
        this.givenUser = result.uid;
        this.givenPass = result.password;
        this.authenticate({ user: result.uid, pass: result.password });
      }
    });
  }

  private authenticate(creds: any) {
    // Authenticate against your source here.
    let testUser = creds.user;
    let testPass = creds.pass;
  }
}
