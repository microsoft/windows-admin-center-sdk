import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseDialogComponent, DialogOptions, DialogResult } from '@msft-sme/angular';
import { DialogService } from '@msft-sme/angular';
import { AppContextService } from '@msft-sme/angular';
import { Subject } from 'rxjs';

export interface LongRunningNotificationDialogResult extends DialogResult {
    targetMachine: string;
}

@Component({
    selector: 'sme-dev-guide-shell-services-notifications-long-running-notification-dialog',
    templateUrl: './long-running-notification-dialog.component.html'
})
export class LongRunningNotificationDialogComponent
    extends BaseDialogComponent<DialogOptions, LongRunningNotificationDialogResult> implements OnInit {

    public form: FormGroup;
    public targetMachine: string;

    constructor(private appContextService: AppContextService, dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
        this.id = 'sme-long-running-notification-dialog';
    }

    public ngOnInit() {
        super.ngOnInit();

        this.form = this.formBuilder.group({
            name: [
                this.targetMachine,
                [
                    Validators.required
                ]
            ]
        });
    }

    public show(options: DialogOptions): Subject<LongRunningNotificationDialogResult> {
        this.form.reset({
            name: ''
        });

        return super.show(options);
    }

    public onSubmit() {
        this.hide({
            targetMachine: this.targetMachine
        });
    }

    public onExit() {
        this.hide();
    }
}
