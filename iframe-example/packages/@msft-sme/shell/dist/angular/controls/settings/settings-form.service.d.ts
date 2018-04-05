import { OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
export interface UpdateFormValueData {
    formGroupToUpdate: FormGroup;
    formGroupNewData: any;
}
export interface FormAddedData {
    formGroup: FormGroup;
    updateValueInComponent: boolean;
}
export declare class SettingsFormService implements OnDestroy {
    private router;
    allForms: FormGroup[];
    private formAddedSubject;
    private formRemovedSubject;
    private updateFormValueData;
    private routerSubscription;
    private backRoute;
    private nextBackRoute;
    private freezeBackRoute;
    constructor(router: Router);
    addForm(form: FormGroup, updateDataInComponent: boolean): void;
    removeForm(form: FormGroup): void;
    newFormValue(form: FormGroup, newValue: any): void;
    formAdded(): Observable<FormAddedData>;
    formRemoved(): Observable<FormGroup>;
    updateFormValue(): Observable<UpdateFormValueData>;
    stopProcessingEvents(): void;
    startProcessingEvents(): void;
    getBackRoute(fallBackRoute?: string): string;
    ngOnDestroy(): void;
}
