import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';
import { DateRange } from '@msft-sme/core/base/date/date-range';
import { Globalization } from '@msft-sme/core/data/globalization';

@Component({
    selector: 'sme-ng2-control-input-datetime-editors-example',
    templateUrl: './datetime-editors-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Date and Time Editors'
})
export class DateTimeEditorsExampleComponent {
    public datetime = new Date();
    public datetimerange = new DateRange(new Date(), Date.now() + 10000);

    public get dateTimeLocal() {
        return this.datetime ? this.datetime.toLocaleString(Globalization.localeId) : '' ;
    }


}
