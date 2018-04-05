import { Injectable } from '@angular/core';
import { NotificationState } from '../../../core';
import { AppContextService } from '../../service/app-context.service';
/**
 * The levels of severity that are able to be portrayed by an alert.
 */
export var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity[AlertSeverity["Informational"] = 0] = "Informational";
    AlertSeverity[AlertSeverity["Warning"] = 1] = "Warning";
    AlertSeverity[AlertSeverity["Error"] = 2] = "Error";
})(AlertSeverity || (AlertSeverity = {}));
var AlertBarService = /** @class */ (function () {
    function AlertBarService(appContextService) {
        this.appContextService = appContextService;
        this.componentMap = {};
    }
    /**
     * Registers an alert bar with the service.
     *
     * @param {AlertBarComponent} component The alert bar component.
     * @param {string} [id] The unique identifier of the alert bar.
     */
    AlertBarService.prototype.register = function (component, id) {
        if (!component) {
            throw new Error('AlertBarService.register: \'component\' is required to register an alert bar component.');
        }
        /**
         * Commenting out the below sections until we understand cases where angular can call ngOnInit twice.
         * see: http://stackoverflow.com/questions/42700116/angular2-routing-issue-and-ngoninit-called-twice
         */
        if (id && !this.componentMap.hasOwnProperty(id)) {
            this.componentMap[id] = component;
        }
        else if (id) {
            // throw new Error(`AlertBarService.register: Attempted to register alert with ID '${id}' but ID was already found.`);
            this.componentMap[id] = component;
        }
        else if (!this.componentMap.hasOwnProperty('')) {
            this.componentMap[''] = component;
        }
        else {
            // throw new Error('AlertBarService.register: Attempted to register alert with no ID, but one was already found.');
            this.componentMap[''] = component;
        }
    };
    /**
     * Unregisters an alert bar with the service.
     *
     * @param {string} [id] The unique identifier of the alert bar.
     */
    AlertBarService.prototype.unregister = function (id) {
        if (id) {
            delete this.componentMap[id];
        }
        else {
            delete this.componentMap[''];
        }
    };
    /**
     * Shows an alert.
     *
     * @param {Alert} alert The alert to show.
     * @param {string} [id] The unique identifier of the alert bar to show the alert in.
     */
    AlertBarService.prototype.showAlert = function (item, id) {
        var component;
        if (id && this.componentMap.hasOwnProperty(id)) {
            component = this.componentMap[id];
        }
        else if (id) {
            throw new Error("AlertBarService.show: No alert bar component with ID '" + id + "' was found.");
        }
        else if (this.componentMap.hasOwnProperty('')) {
            component = this.componentMap[''];
        }
        else {
            throw new Error('AlertBarService.show: No registered alert bar component was found with no ID.');
        }
        component.show(item);
    };
    /**
     * @obsolete
     * Shows an alert.
     *
     * Use appContextService.notification.alert() or appContextService.notification.notify() instead.
     *
     * @param {Alert} alert The alert to show.
     * @param {string} [id] The unique identifier of the alert bar to show the alert in.
     */
    AlertBarService.prototype.show = function (item, id) {
        if (id || item.links) {
            this.showAlert(item, id);
            return;
        }
        var state;
        switch (item.severity) {
            case AlertSeverity.Error:
                state = NotificationState.Error;
                break;
            case AlertSeverity.Warning:
                state = NotificationState.Warning;
                break;
            case AlertSeverity.Informational:
            default:
                state = NotificationState.Informational;
                break;
        }
        this.appContextService.notification.alert('', state, item.message, item.title);
    };
    AlertBarService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AlertBarService.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    return AlertBarService;
}());
export { AlertBarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWxlcnQtYmFyL2FsZXJ0LWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLGVBQUEsQ0FBZ0I7QUFDbEQsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sbUNBQUEsQ0FBb0M7QUEyQnRFOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksYUFJWDtBQUpELFdBQVksYUFBQTtJQUNSLG1FQUFnQixDQUFBO0lBQ2hCLHVEQUFVLENBQUE7SUFDVixtREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUpXLGFBQUEsS0FBQSxhQUFBLFFBSVg7QUFvQ0Q7SUFHSSx5QkFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFGaEQsaUJBQVksR0FBa0MsRUFBRSxDQUFDO0lBRUUsQ0FBQztJQUU1RDs7Ozs7T0FLRztJQUNJLGtDQUFRLEdBQWYsVUFBZ0IsU0FBbUIsRUFBRSxFQUFXO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMseUZBQXlGLENBQUMsQ0FBQztRQUMvRyxDQUFDO1FBRUQ7OztXQUdHO1FBRUgsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNaLHNIQUFzSDtZQUN0SCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLG1IQUFtSDtZQUNuSCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxvQ0FBVSxHQUFqQixVQUFrQixFQUFXO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxtQ0FBUyxHQUFoQixVQUFpQixJQUFXLEVBQUUsRUFBVztRQUNyQyxJQUFJLFNBQW1CLENBQUM7UUFFeEIsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLDJEQUF5RCxFQUFFLGlCQUFjLENBQUMsQ0FBQztRQUMvRixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUM7UUFDckcsQ0FBQztRQUVELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksOEJBQUksR0FBWCxVQUFZLElBQVcsRUFBRSxFQUFXO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxLQUF3QixDQUFDO1FBQzdCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssYUFBYSxDQUFDLEtBQUs7Z0JBQ3BCLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQztZQUNWLEtBQUssYUFBYSxDQUFDLE9BQU87Z0JBQ3RCLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQztZQUNWLEtBQUssYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUNqQztnQkFDSSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxDQUFDO2dCQUN4QyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQ3JDLEVBQUUsRUFDRixLQUFLLEVBQ0wsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNFLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsOEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0tBQzFCLEVBRjZGLENBRTdGLENBQUM7SUFDRixzQkFBQztDQS9HRCxBQStHQyxJQUFBO1NBL0dZLGVBQWUiLCJmaWxlIjoiYWxlcnQtYmFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9