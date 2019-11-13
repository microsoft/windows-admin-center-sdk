import { Component, Injector, OnInit } from '@angular/core';
import { WizardStepComponent } from '@msft-sme/angular';
import { Data } from '../../models/data';
import { DropdownOne } from '../../models/dropdown-one';
import { DropdownTwo } from '../../models/dropdown-two';

@Component({
    selector: 'sme-app-simple-text-using-model',
    templateUrl: './simple-text-using-model.component.html'
})
export class SimpleTextUsingModelComponent extends WizardStepComponent<Data, String> implements OnInit {

    protected get logSourceName() {
        return 'SimpleTextUsingModelComponent';
    }

    public dropdownOneOptionsMap: { [index: number]: string };
    public dropdownTwoOptionsMap: { [index: number]: string };

    constructor(injector: Injector) { super(injector); }

    public ngOnInit(): void {
        this.dropdownOneOptionsMap = {};
        this.dropdownTwoOptionsMap = {};

        this.dropdownOneOptionsMap[DropdownOne.Option1] = 'Option 1';
        this.dropdownOneOptionsMap[DropdownOne.Option2] = 'Option 2';
        this.dropdownOneOptionsMap[DropdownOne.Option3] = 'Option 3';
        this.dropdownOneOptionsMap[DropdownOne.Option4] = 'Option 4';
        this.dropdownOneOptionsMap[DropdownOne.Option5] = 'Option 5';

        this.dropdownTwoOptionsMap[DropdownTwo.OptionA] = 'Option A';
        this.dropdownTwoOptionsMap[DropdownTwo.OptionB] = 'Option B';
        this.dropdownTwoOptionsMap[DropdownTwo.OptionC] = 'Option C';
        super.ngOnInit();
    }
}
