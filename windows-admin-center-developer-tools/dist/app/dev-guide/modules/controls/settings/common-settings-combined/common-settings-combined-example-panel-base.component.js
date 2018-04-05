var CommonSettingsCombinedExamplePanelBaseComponent = /** @class */ (function () {
    function CommonSettingsCombinedExamplePanelBaseComponent(router, activatedRoute, formbuilder) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.formbuilder = formbuilder;
        this.saveButtonLabel = 'Save';
        this.discardButtonLabel = 'Discard';
        this.nameLabel = 'Name:';
    }
    CommonSettingsCombinedExamplePanelBaseComponent.prototype.init = function (formErrors, validationMessages, modelData, settingName) {
        this.formErrors = formErrors;
        this.validationMessages = validationMessages;
        this.modelData = modelData;
        this.settingName = settingName;
    };
    CommonSettingsCombinedExamplePanelBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sampleForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    CommonSettingsCombinedExamplePanelBaseComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CommonSettingsCombinedExamplePanelBaseComponent.prototype.onValueChanged = function (data) {
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
    return CommonSettingsCombinedExamplePanelBaseComponent;
}());
export { CommonSettingsCombinedExamplePanelBaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtY29tYmluZWQvY29tbW9uLXNldHRpbmdzLWNvbWJpbmVkLWV4YW1wbGUtcGFuZWwtYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUE7SUFhSSx5REFBc0IsTUFBYyxFQUNkLGNBQThCLEVBQzlCLFdBQXdCO1FBRnhCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFidkMsb0JBQWUsR0FBRyxNQUFNLENBQUM7UUFDekIsdUJBQWtCLEdBQUcsU0FBUyxDQUFDO1FBQy9CLGNBQVMsR0FBRyxPQUFPLENBQUM7SUFZM0IsQ0FBQztJQUVNLDhEQUFJLEdBQVgsVUFBWSxVQUFlLEVBQ2Ysa0JBQXVCLEVBQ3ZCLFNBQXFCLEVBQ3JCLFdBQW1CO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRUUsa0VBQVEsR0FBZjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1FBRTFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0scUVBQVcsR0FBbEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLENBQUM7SUFDTCxDQUFDO0lBRU8sd0VBQWMsR0FBdEIsVUFBdUIsSUFBVTtRQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRTdCLEdBQUcsQ0FBQyxDQUFDLElBQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsd0NBQXdDO2dCQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDNUIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoRCxHQUFHLENBQUMsQ0FBQyxJQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7d0JBQ2xELENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQ0wsc0RBQUM7QUFBRCxDQWhFQSxBQWdFQyxJQUFBIiwiZmlsZSI6ImNvbW1vbi1zZXR0aW5ncy1jb21iaW5lZC1leGFtcGxlLXBhbmVsLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==