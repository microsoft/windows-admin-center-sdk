import { Component } from '@angular/core';
import { BaseDialogComponent, DialogOptions, DialogResult } from '@msft-sme/angular';
import { DialogService } from '@msft-sme/angular';
import { Subject } from 'rxjs';

/**
 * The confirmation dialog options.
 */
export interface ExampleFullScreenDialogOptions extends DialogOptions {
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
export interface ExampleFullScreenDialogResult extends DialogResult {
    /**
     * The result of the dialog confirmation.
     */
    result: string;
}

@Component({
    selector: 'sme-dialog-example-full-screen-dialog',
    templateUrl: './dialog-example-full-screen-dialog.component.html'
})
export class ConfirmationDialogComponent extends BaseDialogComponent<ExampleFullScreenDialogOptions, ExampleFullScreenDialogResult> {
    public title: string;

    public label: string;

    public closeButtonText = 'Close';

    public cancelButtonText = 'Cancel';

    /**
     * Initializes a new instance of the ConfirmationDialogComponent class.
     */
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    public show(options: ExampleFullScreenDialogOptions): Subject<ExampleFullScreenDialogResult> {
        if (!options) {
            throw new Error('ConfirmationDialogComponent.show: Options are required to show the dialog.');
        }

        const result = super.show(options);
        this.title = options.title;
        this.label = options.label;

        return result;
    }

    /**
     * The method to call when the confirm button is clicked.
     */
    public onClose(): void {
        this.hide({
            result: 'you closed the dialog!'
        });
    }

    /**
     * The method to call when the cancel button is clicked.
     */
    public onCancel(): void {
        this.hide({
            result: 'you canceled the dialog!'
        });
    }
}
