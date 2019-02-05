import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface CombinedSettingModel {
    field1: string;
}

@Component({
    selector: 'sme-ng2-controls-common-settings-single-form-example',
    templateUrl: './single-form-example-page.component.html'
})
export class SingleFormExamplePageComponent implements OnInit {
    public saveButtonLabel = 'Save';
    public discardButtonLabel = 'Discard';
    public nameLabel = 'Field:';
    public sampleForm: FormGroup;
    protected modelData: CombinedSettingModel;

    constructor(private formBuilder: FormBuilder) {
        this.modelData = { field1: `Constructed At: ${Date.now()}` };
    }

    public ngOnInit() {
        this.sampleForm = this.formBuilder.group({
            name: [this.modelData.field1]
        });
    }
}
