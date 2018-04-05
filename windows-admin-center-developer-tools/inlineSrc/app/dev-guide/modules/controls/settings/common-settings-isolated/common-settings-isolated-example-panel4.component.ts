import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
    BasePropertiesForm,
    FormArrayValidationMessages,
    FormControlContainerValidationMessages,
    FormGroupValidationMessages,
    SettingsFormService
} from '@msft-sme/shell/angular';
import { Address, IsolatedSetting4FormData, IsolatedSettings4ServiceData } from './model/isolated-setting4-model';

@Component({
    selector: 'sme-ng2-controls-common-settings-isolated-example-panel4',
    template: `
      <form [smeSettingsForm]="form" aria-labelledby="sme-shell-setting-selectedTitle">
        <sme-settings-content>
          <fieldset *ngIf="!loading" [disabled]="saving" [formGroup]="form">
            <span>This is the generic settings message!</span>
            <h6>Identity Information</h6>
              <div class="form-group">
              <div class="form-input">
                <label class="control-label" for="name">Name Label</label>
                <div class="required-clue">Required Clue *</div>
                <div>
                  <input id="name" [title]="formErrors.name" class="form-control" type="text" formControlName="name" required autofocus/>
                </div>
                <div *ngIf="formErrors.name" class="alert alert-danger">
                  {{ formErrors.name }}
                </div>
              </div>
            </div>
            <h6>Financial Information</h6>
            <div class="form-group">
              <div class="form-input">
                <label class="control-label" for="salary">Salary Label</label>
                <div class="required-clue">Required Clue *</div>
                <div>
                  <input id="salary" [title]="formErrors.salary" class="form-control" type="text" formControlName="salary" required />
                </div>
                <div *ngIf="formErrors.salary" class="alert alert-danger">
                  {{ formErrors.salary }}
                </div>
              </div>
            </div>
            <div class="form-group">
              <div formArrayName="addresses">
                <div *ngFor="let address of form.controls.addresses.controls; let i = index;" [formGroupName]="i">
                  <h6>Address {{ i + 1 }}</h6>
                  <div class="form-group">
                    <div class="form-input">
                      <label class="control-label" for="city">City Label</label>
                      <div class="required-clue">Required Clue *</div>
                      <div>
                        <input id="city" [title]="formErrors.addresses[i].city" class="form-control" type="text" formControlName="city" required
                        />
                      </div>
                      <div *ngIf="formErrors.addresses[i].city" class="alert alert-danger">
                        {{ formErrors.addresses[i].city }}
                      </div>
                    </div>

                    <div class="form-input">
                      <label class="control-label" for="state">State Label</label>
                      <div class="required-clue">Required Clue *</div>
                      <div>
                        <input id="state" [title]="formErrors.addresses[i].state" class="form-control" type="text" formControlName="state" required
                        />
                      </div>
                      <div *ngIf="formErrors.addresses[i].state" class="alert alert-danger">
                        {{ formErrors.addresses[i].state }}
                      </div>
                    </div>

                    <div class="form-input">
                      <label class="control-label" for="street">Street Label</label>
                      <div class="required-clue">Required Clue *</div>
                      <div>
                        <input id="street" [title]="formErrors.addresses[i].street" class="form-control" type="text" formControlName="street" required
                        />
                      </div>
                      <div *ngIf="formErrors.addresses[i].street" class="alert alert-danger">
                        {{ formErrors.addresses[i].street }}
                      </div>
                    </div>

                    <div class="form-input">
                      <label class="control-label" for="zipCode">Zip Label</label>
                      <div class="required-clue">Required Clue *</div>
                      <div>
                        <input id="zipCode" [title]="formErrors.addresses[i].zipCode" class="form-control" type="number" formControlName="zipCode"
                          min="0" required />
                      </div>
                      <div *ngIf="formErrors.addresses[i].zipCode" class="alert alert-danger">
                        {{ formErrors.addresses[i].zipCode }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <sme-loading-wheel *ngIf="loading"></sme-loading-wheel>
        </sme-settings-content>
        <sme-settings-footer class="footer">
          <button type="submit" class="btn btn-primary" (click)="onSave()" [disabled]="!form || !form.dirty || !form.valid || saving">Save</button>
          <button type="button" class="btn btn-secondary" (click)="onDiscard()" [disabled]="!form || !form.dirty || saving">Discard</button>
          <button type="button" class="btn btn-secondary" (click)="onCloseClick()">Close</button>
        </sme-settings-footer>
      </form>
    `,
    styles: [`
      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      h4 {
        padding-top: 0;
      }
    `]
})
export class CommonSettingsIsolatedExamplePanel4Component
    extends BasePropertiesForm<IsolatedSettings4ServiceData, IsolatedSetting4FormData> {
    /**
     * Note: It's important that the names of controls are identical with the control names that you place in the form.
     * If these don't line up properly, the form won't be able to access the correct errors.
     */
    private formErrorsField = {
        addresses: [],
        name: '',
        salary: ''
    };

    /**
     * Note: It's important that the names of controls are identical with the control names that you place in the form.
     * If these don't line up properly, the form won't be able to access the correct errors.
     */
    private validationMessagesField: FormGroupValidationMessages = {
        controls: {
            addresses: {
                controls: {
                    city: {
                        required: 'Required'
                    },
                    street: {
                        required: 'Required'
                    },
                    state: {
                        required: 'Required'
                    },
                    zipCode: {
                        required: 'Required'
                    }
                }
            },
            name: {
                required: 'A name is required'
            },
            salary: {
                required: 'A salary is required'
            }
        }
    };

    constructor(public formBuilder: FormBuilder, private settingsFormService: SettingsFormService, private router: Router) {
        super('common-settings-isolate-example-panel4.component.ts');

        this.init(); // This line is important! If you don't do this, the form won't be pre-populated!
    }

    public get formErrors(): any {
        return this.formErrorsField;
    }

    public get validationMessages(): FormGroupValidationMessages {
        return this.validationMessagesField;
    }

    public fetchData(): Observable<IsolatedSettings4ServiceData> {
        let subject = new Subject<IsolatedSettings4ServiceData>();
        setTimeout(
            () => {
                subject.next({
                    addresses: [
                        {
                            city: 'Redmond',
                            state: 'Washington',
                            street: '1 Micrsoft Way',
                            zipCode: 98052
                        },
                        {
                            city: 'New York',
                            state: 'New York',
                            street: '1 Micrsoft Way',
                            zipCode: 12345
                        },
                        {
                            city: 'Bellevue',
                            state: 'Washington',
                            street: '1 Micrsoft Way',
                            zipCode: 14567
                        }
                    ],
                    name: 'Bill Gates',
                    salary: 1000000000000
                });

                subject.complete();
            },
            5000);

        return subject;
    }

    public createForm(): FormGroup {
        let addressesGroups = this.formData.addresses.map((address) => {
            this.formErrors.addresses.push({
                city: '',
                state: '',
                street: '',
                zipCode: ''
            });

            let group = this.formBuilder.group({
                city: [
                    address.city,
                    [
                        Validators.required
                    ]
                ],
                state: [
                    address.state,
                    [
                        Validators.required
                    ]
                ],
                street: [
                    address.street,
                    [
                        Validators.required
                    ]
                ],
                zipCode: [
                    address.zipCode,
                    [
                        Validators.required
                    ]
                ]
            });

            return group;
        });

        let form = this.formBuilder.group(
            {
                addresses: this.formBuilder.array(addressesGroups),
                name: [
                    this.formData.name,
                    [
                        Validators.required
                    ]
                ],
                salary: [
                    this.formData.salary,
                    [
                        Validators.required
                    ]
                ]
            }
        );

        return form;
    }

    public createFormDataFromDataModel(): IsolatedSetting4FormData {
        return new IsolatedSetting4FormData(this.dataModel);
    }

    public onFetchError(error: any): void {
        // Raise an alert or create logs
    }

    public onSaveError(error: any): void {
        // Raise an alert or create logs
    }

    public onSaveSuccess(): void {
        // Raise an alert or create logs
    }

    public onCloseClick(): void {
        this.router.navigateByUrl(this.settingsFormService.getBackRoute());
    }

    public saveForm(newDataModel: IsolatedSettings4ServiceData): Observable<IsolatedSettings4ServiceData> {
        return Observable.of<IsolatedSettings4ServiceData>(newDataModel);
    }
}
