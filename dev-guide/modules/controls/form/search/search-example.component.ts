import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'sme-ng2-control-input-search-example',
    templateUrl: './search-example.component.html'
})
export class SearchExampleComponent implements OnInit {
    public search: string;
    public search2: string;
    public search3: string;
    public searchedString: string;
    public searchedString2: string;
    public searchedString3: string;
    public deliberatelySearchedString: string;
    public deliberatelySearchedString2: string;
    public deliberatelySearchedString3: string;
    public searchableComboboxFormGroup: FormGroup;
    public comboBoxData = {
        label1: 'Combobox',
        value1: [],
        label2: 'Combobox with search',
        value2: [],
        label3: 'Multiple combobox',
        value3: [],
        label4: 'Multiple combobox with search',
        value4: [],
        options: [
            { label: 'Cola', value: 'cola' },
            { label: 'Pepper', value: 'pepper' },
            { label: 'Orange', value: 'orange' },
            { label: 'Grape', value: 'grape' },
            { label: 'Lemon Lime', value: 'lemonlime' },
            { label: 'Cherry', value: 'cherry' },
            { label: 'Root Beer', value: 'rootbeer' }
        ]
    };

    public ngOnInit() {
        this.searchableComboboxFormGroup = new FormGroup({
            single1: new FormControl(this.comboBoxData.value1),
            single2: new FormControl(this.comboBoxData.value2),
            multiple1: new FormControl(this.comboBoxData.value3),
            multiple2: new FormControl(this.comboBoxData.value4)
        });
    }

    public onSearch(s: string) {
        this.searchedString = s;
    }

    public onSearch2(s: string) {
        this.searchedString2 = s;
    }

    public onSearch3(s: string) {
        this.searchedString3 = s;
    }

    public onDeliberateSearch(s: string) {
        this.deliberatelySearchedString = s;
    }

    public onDeliberateSearch2(s: string) {
        this.deliberatelySearchedString2 = s;
    }

    public onDeliberateSearch3(s: string) {
        this.deliberatelySearchedString3 = s;
    }
}
