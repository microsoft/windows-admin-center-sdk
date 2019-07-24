import { Component, OnInit } from '@angular/core';
import {
  BaseDialogComponent,
  ConfirmationDialogOptions,
  ConfirmationDialogResult,
  DialogOptions,
  DialogResult,
  DialogService,
} from '@microsoft/windows-admin-center-sdk/angular';
import { Subject } from 'rxjs';

/**
 * The confirmation dialog options.
 */
export interface CredentialDialogOptions extends DialogOptions {
  /**
   * The title of the dialog.
   */
  title: string;

  /**
   * The label.
   */
  label: string;
}

/**
 * The confirmation dialog result.
 */
export interface CredentialDialogResults extends DialogResult {
  /**
   * The result of the dialog confirmation.
   */
  uid: string;

  /**
   * The password for the account.
   */
  password: string;

  /**
   * The final result
   */
  result: string;
}

@Component({
  selector: 'sme-credential-dialog',
  templateUrl: './credential-dialog.component.html',
  styleUrls: ['./credential-dialog.component.css']
})
export class CredentialDialogComponent extends BaseDialogComponent<CredentialDialogOptions, CredentialDialogResults> implements OnInit {
  public title: string;
  public label: string;
  public closeButtonText = 'Ok';
  public cancelButtonText = 'Cancel';
  public username: string;
  public password: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
    this.keepOpen = true;
  }

  ngOnInit() {
  }

  /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
  public show(options: CredentialDialogOptions): Subject<CredentialDialogResults> {
    if (!options) {
      throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
    }

    const result = super.show(options);
    this.title = options.title;
    this.label = options.label;
    this.password = '';
    this.username = '';

    return result;
  }

  /**
     * The method to call when the confirm button is clicked.
     */
  public onClose(): void {
    const subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog-credentials', {
      cancelButtonText: 'Cancel',
      confirmButtonText: 'OK',
      message: 'Are you sure you want to continue?',
      title: 'Log in'
    });

    subject.subscribe((result) => {
      if (result.confirmed) {
        this.hide({
          uid: this.username,
          password: this.password,
          result: 'confirmed'
        });
      }
    });
  }

  /**
   * The method to call when the cancel button is clicked.
   */
  public onCancel(): void {
    const subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog-credentials', {
      cancelButtonText: 'Cancel',
      confirmButtonText: 'OK',
      message: 'Are you sure you want cancel the log in attempt?',
      title: 'Cancel'
    });

    subject.subscribe((result) => {
      if (result.confirmed) {
        this.hide({
          uid: '',
          password: '',
          result: 'canceled'
        });
      }
    });
  }

}
