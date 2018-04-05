import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
var SettingsFormService = (function () {
    function SettingsFormService(router) {
        var _this = this;
        this.router = router;
        this.allForms = [];
        this.formAddedSubject = new Subject();
        this.formRemovedSubject = new Subject();
        this.updateFormValueData = new Subject();
        this.routerSubscription = this.router.events.filter(function (event) { return event instanceof NavigationEnd; }).subscribe(function (event) {
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
    return SettingsFormService;
}());
export { SettingsFormService };
SettingsFormService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SettingsFormService.ctorParameters = function () { return [
    { type: Router, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MtZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFzQixNQUFPLGVBQUEsQ0FBZ0I7QUFFcEUsT0FBTyxFQUdILGFBQWEsRUFFYixNQUFNLEVBR1QsTUFBTSxpQkFBQSxDQUFrQjtBQUd6QixPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8sY0FBQSxDQUFlO0FBY3ZDO0lBYUksNkJBQW9CLE1BQWM7UUFBbEMsaUJBUUM7UUFSbUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVgzQixhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUUxQixxQkFBZ0IsR0FBMkIsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFDeEUsdUJBQWtCLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7UUFDbEUsd0JBQW1CLEdBQWlDLElBQUksT0FBTyxFQUF1QixDQUFDO1FBUTNGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUN4RyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUN6QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0scUNBQU8sR0FBZCxVQUFlLElBQWUsRUFBRSxxQkFBOEI7UUFDMUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLHNCQUFzQixFQUFFLHFCQUFxQjthQUNoRCxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTSx3Q0FBVSxHQUFqQixVQUFrQixJQUFlO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0wsQ0FBQztJQUVNLDBDQUFZLEdBQW5CLFVBQW9CLElBQWUsRUFBRSxRQUFhO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7WUFDMUIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixnQkFBZ0IsRUFBRSxRQUFRO1NBQzdCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx1Q0FBUyxHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVNLHlDQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRU0sNkNBQWUsR0FBdEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFTSxrREFBb0IsR0FBM0I7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRU0sbURBQXFCLEdBQTVCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFFTSwwQ0FBWSxHQUFuQixVQUFvQixhQUEyQjtRQUEzQiw4QkFBQSxFQUFBLG1CQUEyQjtRQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO1FBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRU0seUNBQVcsR0FBbEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxDQUFDO0lBQ0wsQ0FBQztJQVFMLDBCQUFDO0FBQUQsQ0EzRkEsQUEyRkM7O0FBUE0sOEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCxrQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0NBQ2YsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJzZXR0aW5ncy1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9