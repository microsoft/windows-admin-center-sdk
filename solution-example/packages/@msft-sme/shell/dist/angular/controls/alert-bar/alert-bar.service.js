import { Injectable } from '@angular/core';
import { NotificationState } from '../../../core';
import { AppContextService } from '../../service';
import { AlertSeverity } from './alert-bar.component';
var AlertBarService = (function () {
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
    return AlertBarService;
}());
export { AlertBarService };
AlertBarService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AlertBarService.ctorParameters = function () { return [
    { type: AppContextService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWxlcnQtYmFyL2FsZXJ0LWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLGVBQUEsQ0FBZ0I7QUFDbEQsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sZUFBQSxDQUFnQjtBQUVsRCxPQUFPLEVBQTRCLGFBQUEsRUFBYyxNQUFRLHVCQUFBLENBQXdCO0FBR2pGO0lBR0kseUJBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRmhELGlCQUFZLEdBQTJDLEVBQUUsQ0FBQztJQUVQLENBQUM7SUFFNUQ7Ozs7O09BS0c7SUFDSSxrQ0FBUSxHQUFmLFVBQWdCLFNBQTRCLEVBQUUsRUFBVztRQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLHlGQUF5RixDQUFDLENBQUM7UUFDL0csQ0FBQztRQUVEOzs7V0FHRztRQUVILEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDWixzSEFBc0g7WUFDdEgsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMv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