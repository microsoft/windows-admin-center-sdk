var CommonSettingsIsolatedExamplePanelBaseComponent = /** @class */ (function () {
    function CommonSettingsIsolatedExamplePanelBaseComponent(router, activatedRoute, formbuilder, settingsFormService, formErrors, validationMessages, modelData, settingName) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.formbuilder = formbuilder;
        this.settingsFormService = settingsFormService;
        this.formErrors = formErrors;
        this.validationMessages = validationMessages;
        this.modelData = modelData;
        this.settingName = settingName;
        this.saveButtonLabel = 'Save';
        this.discardButtonLabel = 'Discard';
        this.closeButtonLabel = 'Close';
        this.nameLabel = 'Name:';
        this.saving = false;
    }
    CommonSettingsIsolatedExamplePanelBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sampleForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    CommonSettingsIsolatedExamplePanelBaseComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CommonSettingsIsolatedExamplePanelBaseComponent.prototype.onSaveClick = function () {
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
    CommonSettingsIsolatedExamplePanelBaseComponent.prototype.onDiscardClick = function () {
        // revert data
        this.sampleForm.reset(this.modelData);
        this.sampleForm.markAsPristine();
    };
    CommonSettingsIsolatedExamplePanelBaseComponent.prototype.onCloseClick = function () {
        this.router.navigateByUrl(this.settingsFormService.getBackRoute('/controls/settings'));
    };
    CommonSettingsIsolatedExamplePanelBaseComponent.prototype.onValueChanged = function (data) {
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
    return CommonSettingsIsolatedExamplePanelBaseComponent;
}());
export { CommonSettingsIsolatedExamplePanelBaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQvY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWwtYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUE7SUFXSSx5REFBc0IsTUFBYyxFQUNkLGNBQThCLEVBQzlCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUMzQyxVQUFlLEVBQ2Ysa0JBQXVCLEVBQ3BCLFNBQXFCLEVBQ3hCLFdBQW1CO1FBUGhCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUMzQyxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ2YsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFLO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFoQi9CLG9CQUFlLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLHVCQUFrQixHQUFHLFNBQVMsQ0FBQztRQUMvQixxQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDM0IsY0FBUyxHQUFHLE9BQU8sQ0FBQztRQUVwQixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBWXRCLENBQUM7SUFFTSxrRUFBUSxHQUFmO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSxxRUFBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsQ0FBQztJQUNMLENBQUM7SUFFTSxxRUFBVyxHQUFsQjtRQUFBLGlCQWFDO1FBWkcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsd0JBQXdCO1FBQ3hCLFVBQVUsQ0FDTjtZQUNJLHlCQUF5QjtZQUN6QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixLQUFLLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNILEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDdkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEMsQ0FBQyxFQUNELElBQUksQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVNLHdFQUFjLEdBQXJCO1FBQ0ksY0FBYztRQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxzRUFBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFTyx3RUFBYyxHQUF0QixVQUF1QixJQUFVO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFN0IsR0FBRyxDQUFDLENBQUMsSUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4Qyx3Q0FBd0M7Z0JBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM1QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hELEdBQUcsQ0FBQyxDQUFDLElBQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFDbEQsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFDTCxzREFBQztBQUFELENBbEZBLEFBa0ZDLElBQUEiLCJmaWxlIjoiY29tbW9uLXNldHRpbmdzLWlzb2xhdGVkLWV4YW1wbGUtcGFuZWwtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9