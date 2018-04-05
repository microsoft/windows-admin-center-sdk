var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CommonSettingsComponentBase } from '../../../../angular';
var PanelBaseComponent = /** @class */ (function (_super) {
    __extends(PanelBaseComponent, _super);
    function PanelBaseComponent(appContextService, router, activatedRoute, formbuilder, settingsFormService, formErrors, validationMessages, modelData, settingName) {
        var _this = _super.call(this) || this;
        _this.appContextService = appContextService;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.formbuilder = formbuilder;
        _this.settingsFormService = settingsFormService;
        _this.formErrors = formErrors;
        _this.validationMessages = validationMessages;
        _this.modelData = modelData;
        _this.settingName = settingName;
        _this.saveButtonLabel = 'Save';
        _this.discardButtonLabel = 'Discard';
        _this.closeButtonLabel = 'Close';
        _this.nameLabel = 'Name:';
        _this.saving = false;
        return _this;
    }
    PanelBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sampleForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    PanelBaseComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    PanelBaseComponent.prototype.confirmContinueEditingDialogOptions = function (dirtyForm, allForms) {
        throw new Error('Method not implemented.');
    };
    PanelBaseComponent.prototype.onSaveClick = function () {
        var _this = this;
        this.saving = true;
        // remote action started
        setTimeout(function () {
            // remote action finished
            _this.saving = false;
            alert('submit: \r\nOriginal: ' + JSON.stringify(_this.modelData) + '\r\nUpdated: ' + JSON.stringify(_this.sampleForm.value));
            _this.modelData = _this.sampleForm.value;
            _this.sampleForm.reset(_this.modelData);
            _this.sampleForm.markAsUntouched();
        }, 1000);
    };
    PanelBaseComponent.prototype.onDiscardClick = function () {
        // revert data
        this.sampleForm.reset(this.modelData);
        this.sampleForm.markAsPristine();
    };
    PanelBaseComponent.prototype.onCloseClick = function () {
        this.router.navigateByUrl(this.settingsFormService.getBackRoute('/controls/settings'));
    };
    PanelBaseComponent.prototype.onValueChanged = function (data) {
        if (!this.sampleForm) {
            return;
        }
        var form = this.sampleForm;
        for (var field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                var control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages = this.validationMessages[field];
                    for (var key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    };
    return PanelBaseComponent;
}(CommonSettingsComponentBase));
export { PanelBaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL3BhbmVsLWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQXFCLDJCQUEyQixFQUNILE1BQU0scUJBQXFCLENBQUM7QUFJaEY7SUFBb0Qsc0NBQTJCO0lBWTNFLDRCQUFzQixpQkFBb0MsRUFDcEMsTUFBYyxFQUNkLGNBQThCLEVBQzlCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUMzQyxVQUFlLEVBQ2Ysa0JBQXVCLEVBQ3BCLFNBQXFCLEVBQ3hCLFdBQW1CO1FBUnRDLFlBU2dCLGlCQUFPLFNBQ3RCO1FBVnFCLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix5QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQzNDLGdCQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ2Ysd0JBQWtCLEdBQWxCLGtCQUFrQixDQUFLO1FBQ3BCLGVBQVMsR0FBVCxTQUFTLENBQVk7UUFDeEIsaUJBQVcsR0FBWCxXQUFXLENBQVE7UUFqQi9CLHFCQUFlLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLHdCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQixzQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDM0IsZUFBUyxHQUFHLE9BQU8sQ0FBQztRQUVwQixZQUFNLEdBQUcsS0FBSyxDQUFDOztJQWN0QixDQUFDO0lBRU0scUNBQVEsR0FBZjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1FBRTFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMx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