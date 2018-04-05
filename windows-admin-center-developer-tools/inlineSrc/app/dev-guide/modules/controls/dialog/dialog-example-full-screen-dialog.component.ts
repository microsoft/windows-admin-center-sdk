import { Component, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '@msft-sme/shell/angular';

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
    template: `
      <sme-dialog #dialog dialogMode="fullscreen" fullScreenLeftDistance="20%" >
        <sme-dialog-header>
          <h4 id="sme-dialog-title">{{ title }}</h4>
        </sme-dialog-header>
        <sme-dialog-content>
          <p id="sme-dialog-desc">{{ label }}</p>
        </sme-dialog-content>
        <sme-dialog-footer>
          <div class="pull-right">
            <button type="button" class="btn btn-primary" (click)="onClose()">{{ closeButtonText }}</button>
            <button type="button" class="btn" (click)="onCancel()">{{ cancelButtonText }}</button>
          </div>
        </sme-dialog-footer>
      </sme-dialog>
    `
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

        let result = super.show(options);
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
