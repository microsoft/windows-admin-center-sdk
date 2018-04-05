import { EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsFormService } from './settings-form.service';
export declare class SettingsFormDirective implements OnChanges, OnDestroy {
    private formsService;
    smeSettingsForm: FormGroup;
    smeUpdateDataInComponent: boolean;
    smeSettingsFormValueUpdate: EventEmitter<any>;
    private updateDataInComponentSubscription;
    oldForm: FormGroup;
    constructor(formsService: SettingsFormService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
