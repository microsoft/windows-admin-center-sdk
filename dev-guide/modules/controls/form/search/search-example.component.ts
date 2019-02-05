import { Component } from '@angular/core';

@Component({
    selector: 'sme-ng2-control-input-search-example',
    templateUrl: './search-example.component.html'
})
export class SearchExampleComponent {
    public search: string;
    public search2: string;
    public searchedString: string;
    public searchedString2: string;
    public deliberatelySearchedString: string;
    public deliberatelySearchedString2: string;

    public onSearch(s: string) {
        this.searchedString = s;
    }

    public onSearch2(s: string) {
        this.searchedString2 = s;
    }

    public onDeliberateSearch(s: string) {
        this.deliberatelySearchedString = s;
    }

    public onDeliberateSearch2(s: string) {
        this.deliberatelySearchedString2 = s;
    }
}
