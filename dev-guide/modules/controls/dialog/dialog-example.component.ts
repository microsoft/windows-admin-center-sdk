import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { MessageDialogOptions, MessageDialogResult } from '@msft-sme/angular';
import { DialogResult } from '@msft-sme/angular';
import { ChoiceDialogOptions, ChoiceDialogResult } from '@msft-sme/angular';
import {
    ConfirmationDialogOptions, ConfirmationDialogResult
} from '@msft-sme/angular';
import {
    ConfirmationListDialogOptions, ConfirmationListDialogResult
} from '@msft-sme/angular';
import { DialogService } from '@msft-sme/angular';
import { RpcAlertSeverity } from '@msft-sme/core/rpc/dialog/rpc-dialog-model';
import { of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ExampleFullScreenDialogOptions, ExampleFullScreenDialogResult } from './dialog-example-full-screen-dialog.component';

@Component({
    selector: 'sme-ng2-controls-dialog-example',
    templateUrl: './dialog-example.component.html'
})
export class DialogExampleComponent {

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-dialog';
    }

    /**
     * Initializes a new instance of the DialogExampleComponent class.
     *
     * @param dialogService The dialog service provider.
     */
    constructor(private dialogService: DialogService) { }

    /**
     * The method to run when the message dialog button is clicked.
     */
    public onClickMessageDialog(): void {
        const subject = this.dialogService.show('message-dialog', {
            buttonText: 'Button Text',
            message: 'My message!',
            title: 'My title!'
        });

        subject.subscribe((result) => {
            //
        });
    }

    /**
     * The method to run when the message dialog button is clicked.
     */
    public onClickMessageDialogWithLink(): void {
        const subject = this.dialogService.show<MessageDialogOptions, DialogResult>('message-dialog', {
            buttonText: 'Button Text2',
            message: 'Check out microsoft site for more information!',
            title: 'My title2!',
            externalLink: { url: 'http://www.microsoft.com', title: 'Microsoft' }
        });

        subject.subscribe((result) => {
            //
        });
    }

    /**
     * The method called when the message dialog with checkbox button is clicked.
     */
    public onClickMessageDialogWithCheckbox(): void {
        const subject = this.dialogService.show<MessageDialogOptions, MessageDialogResult>('message-dialog', {
            buttonText: 'Button Text2',
            message: 'Check out microsoft site for more information!',
            title: 'My title2!',
            checkboxText: 'Do not show this message again'
        });

        subject.subscribe((result) => {
            console.log(result);
        });
    }

    /**
     * The method to run when the choice dialog button is clicked.
     */
    public onClickChoiceDialog(): void {
        const subject = this.dialogService.show<ChoiceDialogOptions, ChoiceDialogResult>('choice-dialog', {
            cancelButtonText: 'Cancel',
            choices: [
                {
                    name: 'Choose me!',
                    value: 0
                },
                {
                    name: 'No choose me!',
                    value: 1
                }
            ],
            confirmButtonText: 'OK',
            footnote: 'Here is some additional information about this choice',
            title: 'Make a choice',
            message: ''
        });

        subject.subscribe();
    }

    /**
     * The method to run when the confirmation dialog button is clicked.
     */
    public onClickConfirmationDialog(): void {
        const subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Click here to do a thing!',
            confirmButtonText: 'OK',
            message: 'My message!',
            title: 'My title!'
        });

        subject.subscribe((result) => {
            //
        });
    }

    /**
     * The method to run when the double check confirmation dialog button is clicked.
     */
    public onClickDoubleCheckConfirmationDialog(): void {
        const subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Click here to do a thing!',
            doubleCheckText: 'Click here to enable the confirm button!',
            confirmButtonText: 'OK',
            message: 'My message!',
            title: 'My title!'
        });

        subject.subscribe((result) => {
            //
        });
    }

    /**
     * The method to run when the alert confirmation dialog button is clicked.
     */
    public onClickAlertConfirmationDialog(severity: string): void {
        const subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog', {
            cancelButtonText: 'Cancel',
            confirmButtonText: 'OK',
            message: 'My message!',
            title: 'My title!',
            alert: { severity: RpcAlertSeverity[severity], message: 'My alert message!' }
        });

        subject.subscribe((result) => {
            //
        });
    }

    /**
     * The method to run when the alert confirmation dialog button is clicked.
     */
    public onClickConfirmationDialogWithAlertStyleButton(severity: string): void {
        const alertButtonStyle = severity ? RpcAlertSeverity[severity] : null;

        const options: ConfirmationDialogOptions = {
            cancelButtonText: 'Cancel',
            confirmButtonText: 'OK',
            message: 'My message!',
            title: 'My title!',
            alertButtonStyle: alertButtonStyle
        };

        const subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog', options);

        subject.subscribe((result) => {
            //
        });
    }

    /**
     * The method to run when the confirmation dialog button is clicked.
     */
    public onClickConfirmationListDialog(listT?: string): void {
        const strings: any[] = [];
        for (let i = 0; i < 50; i++) {
            strings.push({ title: 'list item #' + i, value: 'list item #' + i });
            // strings.push('list item ' + i);
        }

        const obs = timer(2000).pipe(mergeMap(_ => of(strings)));

        const subject = this.dialogService.show<ConfirmationListDialogOptions, ConfirmationListDialogResult>('confirmation-list-dialog', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Click here to do a thing!',
            confirmButtonText: 'OK',
            listDataSource: obs,
            listType: listT,
            title: 'My title!',
            listFooterText: 'This is the list footer.',
            listHeaderText: 'The list header:'
        });

        subject.subscribe((result) => {
            // handle result
        });
    }

    /**
     * The method to run when the full screen dialog button is clicked.
     */
    public onClickFullScreenDialog(): void {
        const subject = this.dialogService.show<ExampleFullScreenDialogOptions, ExampleFullScreenDialogResult>('full-screen-dialog', {
            title: 'Full screen!',
            label: 'Very sad label in a huge dialog.'
        });

        subject.subscribe((result: ExampleFullScreenDialogResult) => {
            // handle result
        });
    }

    /**
     * The method to run when the confirmation dialog button is clicked.
     */
    public onClickConfirmationDialogChain(): void {
        const subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('dialog-chain', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Do not show another dialog confirmation dialog',
            confirmButtonText: 'OK',
            message: 'This should open another dialog when you click OK and the checkbox is unchecked',
            title: 'first dialog'
        });

        subject.subscribe((result) => {
            // handle the result
        });
    }
}
