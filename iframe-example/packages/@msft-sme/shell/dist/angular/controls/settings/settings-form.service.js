import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
var SettingsFormService = /** @class */ (function () {
    function SettingsFormService(router) {
        var _this = this;
        this.router = router;
        this.allForms = [];
        this.formAddedSubject = new Subject();
        this.formRemovedSubject = new Subject();
        this.updateFormValueData = new Subject();
        this.routerSubscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) {
            if (_this.freezeBackRoute) {
                _this.nextBackRoute = _this.router.url;
            }
            else {
                _this.backRoute = _this.router.url;
            }
        });
    }
    SettingsFormService.prototype.addForm = function (form, updateDataInComponent) {
        if (form) {
            this.formAddedSubject.next({
                formGroup: form,
                updateValueInComponent: updateDataInComponent
            });
            if (this.allForms.indexOf(form) < 0) {
                this.allForms.push(form);
            }
        }
    };
    SettingsFormService.prototype.removeForm = function (form) {
        if (form) {
            this.formRemovedSubject.next(form);
            MsftSme.remove(this.allForms, form);
        }
    };
    SettingsFormService.prototype.newFormValue = function (form, newValue) {
        this.updateFormValueData.next({
            formGroupToUpdate: form,
            formGroupNewData: newValue
        });
    };
    SettingsFormService.prototype.formAdded = function () {
        return this.formAddedSubject.asObservable();
    };
    SettingsFormService.prototype.formRemoved = function () {
        return this.formRemovedSubject.asObservable();
    };
    SettingsFormService.prototype.updateFormValue = function () {
        return this.updateFormValueData.asObservable();
    };
    SettingsFormService.prototype.stopProcessingEvents = function () {
        this.freezeBackRoute = true;
    };
    SettingsFormService.prototype.startProcessingEvents = function () {
        this.freezeBackRoute = false;
        this.backRoute = this.nextBackRoute;
    };
    SettingsFormService.prototype.getBackRoute = function (fallBackRoute) {
        if (fallBackRoute === void 0) { fallBackRoute = '/'; }
        if (this.backRoute) {
            return this.backRoute;
        }
        return fallBackRoute;
    };
    SettingsFormService.prototype.ngOnDestroy = function () {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    };
    SettingsFormService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SettingsFormService.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return SettingsFormService;
}());
export { SettingsFormService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MtZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFzQixNQUFPLGVBQUEsQ0FBZ0I7QUFFcEUsT0FBTyxFQUdILGFBQWEsRUFFYixNQUFNLEVBR1QsTUFBTSxpQkFBQSxDQUFrQjtBQUd6QixPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8sY0FBQSxDQUFlO0FBY3ZDO0lBYUksNkJBQW9CLE1BQWM7UUFBbEMsaUJBVUM7UUFWbUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVgzQixhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUUxQixxQkFBZ0IsR0FBMkIsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFDeEUsdUJBQWtCLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7UUFDbEUsd0JBQW1CLEdBQWlDLElBQUksT0FBTyxFQUF1QixDQUFDO1FBUTNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDdkMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLGFBQWEsRUFBOUIsQ0FBOEIsQ0FBQzthQUMvQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ1osRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDekMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDckMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLHFDQUFPLEdBQWQsVUFBZSxJQUFlLEVBQUUscUJBQThCO1FBQzFELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO2dCQUN2QixTQUFTLEVBQUUsSUFBSTtnQkFDZixzQkFBc0IsRUFBRSxxQkFBcUI7YUFDaEQsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU0sd0NBQVUsR0FBakIsVUFBa0IsSUFBZTtRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNMLENBQUM7SUFFTSwwQ0FBWSxHQUFuQixVQUFvQixJQUFlLEVBQUUsUUFBYTtRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQzFCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsZ0JBQWdCLEVBQUUsUUFBUTtTQUM3QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sdUNBQVMsR0FBaEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFTSx5Q0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVNLDZDQUFlLEdBQXRCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0sa0RBQW9CLEdBQTNCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVNLG1EQUFxQixHQUE1QjtRQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUN4QyxDQUFDO0lBRU0sMENBQVksR0FBbkIsVUFBb0IsYUFBMkI7UUFBM0IsOEJBQUEsRUFBQSxtQkFBMkI7UUFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVELE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVNLHlDQUFXLEdBQWxCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsQ0FBQztJQUNMLENBQUM7SUFDRSw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxNQUFNLEdBQUc7S0FDZixFQUY2RixDQUU3RixDQUFDO0lBQ0YsMEJBQUM7Q0E3RkQsQUE2RkMsSUFBQTtTQTdGWSxtQkFBbUIiLCJmaWxlIjoic2V0dGluZ3MtZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==