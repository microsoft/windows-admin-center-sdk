// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Component, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { ExampleFullScreenDialogOptions, ExampleFullScreenDialogResult } from './dialog-example-full-screen-dialog.component';

import {
    BaseDialogComponent,
    ConfirmationDialogOptions,
    ConfirmationDialogResult,
    DialogCloseReason,
    DialogOptions,
    DialogResult,
    DialogService
} from '@msft-sme/shell/angular';

/**
 * The confirmation dialog options.
 */
export interface ExampleDialogChainOptions extends DialogOptions {
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
export interface ExampleDialogChainResult extends DialogResult {
    /**
     * The result of the dialog confirmation.
     */
    result: string;
}

@Component({
    selector: 'sme-dialog-example-dialog-chain',
    templateUrl: './dialog-example-dialog-chain.component.html'
})
export class DialogChainComponent extends BaseDialogComponent<ExampleDialogChainOptions, ExampleDialogChainResult> {
    public title: string;

    public label: string;

    public openButtonText = 'Open another dialog';

    public closeButtonText = 'Close';

    public cancelButtonText = 'Cancel';

    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    constructor(dialogService: DialogService) {
        super(dialogService);
        this.keepOpen = true;
    }

    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    public show(options: ExampleDialogChainOptions): Subject<ExampleDialogChainResult> {
        if (!options) {
            throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
        }

        let result = super.show(options);
        this.title = options.title;
        this.label = options.label;

        return result;
    }

    /**
     * The method to call when the confirm button is clicked.
     */
    public onClose(): void {
        let subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog-chain', {
            cancelButtonText: 'Cancel',
            confirmButtonText: 'OK',
            message: 'Are you sure you want complete the dialog?',
            title: 'Complete dialog?'
        });

        subject.subscribe((result) => {
            if (result.confirmed) {
                this.hide({
                    result: this.label
                });
            }
        });
    }

    /**
     * The method to call when the cancel button is clicked.
     */
    public onCancel(): void {
        let subject = this.dialogService.show<ConfirmationDialogOptions, ConfirmationDialogResult>('confirmation-dialog-chain', {
            cancelButtonText: 'Cancel',
            confirmButtonText: 'OK',
            message: 'Are you sure you want cancel the dialog?',
            title: 'Cancel dialog?'
        });

        subject.subscribe((result) => {
            if (result.confirmed) {
                this.hide({
                    result: 'dialog Cancelled'
                });
            }
        });
    }

    /**
     * The method to run when the full screen dialog button is clicked.
     */
    public onClickFullScreenDialog(): void {
        let subject = this.dialogService.show<ExampleFullScreenDialogOptions, ExampleFullScreenDialogResult>('full-screen-dialog-chain', {
            title: 'Full screen dialog from a dialog!',
            label: 'Very sad label in a huge dialog.'
        });

        subject.subscribe((result: ExampleFullScreenDialogResult) => {
            // handle result
            this.label += ' Child dialog opened and then closed.';
        });
    }
}
