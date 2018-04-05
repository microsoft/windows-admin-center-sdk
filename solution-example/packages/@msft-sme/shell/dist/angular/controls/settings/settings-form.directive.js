import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SettingsFormService } from './settings-form.service';
var SettingsFormDirective = (function () {
    function SettingsFormDirective(formsService) {
        this.formsService = formsService;
        this.smeSettingsForm = null;
        this.smeSettingsFormValueUpdate = new EventEmitter();
        this.oldForm = null;
    }
    SettingsFormDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.smeUpdateDataInComponent && this.smeSettingsForm) {
            if (this.updateDataInComponentSubscription) {
                this.updateDataInComponentSubscription.unsubscribe();
            }
            this.updateDataInComponentSubscription = this.formsService.updateFormValue().subscribe(function (data) {
                _this.smeSettingsFormValueUpdate.emit(data.formGroupNewData);
            });
        }
        if (changes.hasOwnProperty('smeSettingsForm')) {
            // TODO: Register the form in the service
            this.formsService.removeForm(this.oldForm);
            this.formsService.addForm(this.smeSettingsForm, this.smeUpdateDataInComponent);
            this.oldForm = this.smeSettingsForm;
        }
    };
    SettingsFormDirective.prototype.ngOnDestroy = function () {
        if (this.updateDataInComponentSubscription) {
            this.updateDataInComponentSubscription.unsubscribe();
        }
    };
    return SettingsFormDirective;
}());
export { SettingsFormDirective };
SettingsFormDirective.decorators = [
    { type: Directive, args: [{ selector: '[smeSettingsForm]' },] },
];
/** @nocollapse */
SettingsFormDirective.ctorParameters = function () { return [
    { type: SettingsFormService, },
]; };
SettingsFormDirective.propDecorators = {
    'smeSettingsForm': [{ type: Input },],
    'smeUpdateDataInComponent': [{ type: Input },],
    'smeSettingsFormValueUpdate': [{ type: Output },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MtZm9ybS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBdUIsWUFBQSxFQUFjLEtBQUEsRUFBNkIsTUFBQSxFQUFzQixNQUFPLGVBQUEsQ0FBZ0I7QUFLeEgsT0FBTyxFQUFFLG1CQUFBLEVBQXlDLE1BQU8seUJBQUEsQ0FBMEI7QUFHbkY7SUFhSSwrQkFBb0IsWUFBaUM7UUFBakMsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBWDlDLG9CQUFlLEdBQWMsSUFBSSxDQUFDO1FBTWxDLCtCQUEwQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFJckQsWUFBTyxHQUFjLElBQUksQ0FBQztJQUN3QixDQUFDO0lBRW5ELDJDQUFXLEdBQWxCLFVBQW1CLE9BQXNCO1FBQXpDLGlCQWlCQztRQWhCRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDeEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pELENBQUM7WUFFRCxJQUFJLENBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO2dCQUN4RixLQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN4QyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDJDQUFXLEdBQWxCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsaUNBQWlDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekQsQ0FBQztJQUNMLENBQUM7SUFhTCw0QkFBQztBQUFELENBbkRBLEFBbURDOztBQVpNLGdDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxFQUFHLEVBQUU7Q0FDL0QsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztDQUM1QixFQUY2RixDQUU3RixDQUFDO0FBQ0ssb0NBQWMsR0FBMkM7SUFDaEUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNyQywwQkFBMEIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzlDLDRCQUE0QixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7Q0FDaEQsQ0FBQyIsImZpbGUiOiJzZXR0aW5ncy1mb3JtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=