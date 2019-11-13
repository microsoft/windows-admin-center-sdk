import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-control-input-search-example',
    templateUrl: './search-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Search'
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
        label5: 'Multiple combobox with search and with min-content width',
        value5: [],
        label6: 'Multiple combobox with search and disabled options',
        value6: [],
        label7: 'Single combobox with search and disabled options',
        value7: [],
        label8: 'Multiple combobox custom tooltip for disabled options',
        value8: [],
        label9: 'Multiple combobox update disable states',
        value9: [],
        options: [
            { label: 'Cola', value: 'cola', disabled: true },
            { label: 'Pepper', value: 'pepper' },
            { label: 'Orange', value: 'orange' },
            { label: 'Grape', value: 'grape' },
            { label: 'Lemon Lime', value: 'lemonlime' },
            { label: 'Cherry', value: 'cherry' },
            { label: 'This is a very long string to see how combobox is actually dealing with long stringgggg :)', value: 'longstring' },
            {
                label: 'This is the other very long string to see how combobox is actually dealing with long stringgggg :)',
                value: 'longstring2'
            }
        ],
        options2: [
            { label: 'Cola', value: 'cola', disabled: true },
            { label: 'Pepper', value: 'pepper' },
            { label: 'Orange', value: 'orange' },
            { label: 'Grape', value: 'grape', disabled: true, description: 'Disabled because it is grape' },
            { label: 'Lemon Lime', value: 'lemonlime' },
            { label: 'Cherry', value: 'cherry' },
            { label: 'This is a very long string to see how combobox is actually dealing with long stringgggg :)', value: 'longstring' },
            {
                label: 'This is the other very long string to see how combobox is actually dealing with long stringgggg :)',
                value: 'longstring2',
                disabled: true
            }
        ]
    };

    public ngOnInit() {
        this.searchableComboboxFormGroup = new FormGroup({
            single1: new FormControl(this.comboBoxData.value1),
            single2: new FormControl(this.comboBoxData.value2),
            single3: new FormControl(this.comboBoxData.value7),
            multiple1: new FormControl(this.comboBoxData.value3),
            multiple2: new FormControl(this.comboBoxData.value4),
            multiple3: new FormControl(this.comboBoxData.value5),
            multiple4: new FormControl(this.comboBoxData.value6),
            multiple5: new FormControl(this.comboBoxData.value8),
            multiple6: new FormControl(this.comboBoxData.value9)
        });
    }

    public onComboBox9Change(event) {
        if (event && event.length) {
            this.comboBoxData.options2.forEach((data) => {
                data.disabled = event.includes(data.value) ? false : true;
            });
        } else {
            this.comboBoxData.options2.forEach((data) => {
                data.disabled = false;
            });
        }

        this.comboBoxData.options2 = JSON.parse(JSON.stringify(this.comboBoxData.options2));
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
