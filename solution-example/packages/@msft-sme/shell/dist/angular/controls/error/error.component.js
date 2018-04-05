import { Component, Input } from '@angular/core';
import { Logging, LogLevel } from '../../../core';
import { AlertBarService, AlertSeverity } from '../alert-bar';
var ErrorComponent = (function () {
    function ErrorComponent(alertBarService) {
        this.alertBarService = alertBarService;
    }
    Object.defineProperty(ErrorComponent.prototype, "message", {
        set: function (value) {
            if (value) {
                try {
                    this.alertBarService.show({
                        message: value,
                        severity: AlertSeverity.Error,
                        // TODO: localize
                        title: 'An Error Occurred'
                    });
                }
                catch (e) {
                    Logging.log({
                        level: LogLevel.Error,
                        message: e.message || e,
                        params: {
                            message: value,
                            severity: AlertSeverity.Error,
                            title: 'An Error Occurred'
                        },
                        source: 'ErrorComponent'
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    return ErrorComponent;
}());
export { ErrorComponent };
ErrorComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-error',
                template: ''
            },] },
];
/** @nocollapse */
ErrorComponent.ctorParameters = function () { return [
    { type: AlertBarService, },
]; };
ErrorComponent.propDecorators = {
    'message': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZXJyb3IvZXJyb3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsS0FBQSxFQUFNLE1BQU8sZUFBQSxDQUFnQjtBQUNqRCxPQUFPLEVBQUUsT0FBQSxFQUFTLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDbEQsT0FBTyxFQUFFLGVBQUEsRUFBaUIsYUFBQSxFQUFjLE1BQU8sY0FBQSxDQUFlO0FBRzlEO0lBMEJJLHdCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFFcEQsQ0FBQztJQTFCRCxzQkFBVyxtQ0FBTzthQUFsQixVQUFtQixLQUFhO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDO29CQUNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO3dCQUN0QixPQUFPLEVBQUUsS0FBSzt3QkFDZCxRQUFRLEVBQUUsYUFBYSxDQUFDLEtBQUs7d0JBQzdCLGlCQUFpQjt3QkFDakIsS0FBSyxFQUFFLG1CQUFtQjtxQkFDN0IsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNSLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSzt3QkFDckIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQzt3QkFDdkIsTUFBTSxFQUFFOzRCQUNKLE9BQU8sRUFBRSxLQUFLOzRCQUNkLFFBQVEsRUFBRSxhQUFhLENBQUMsS0FBSzs0QkFDN0IsS0FBSyxFQUFFLG1CQUFtQjt5QkFDN0I7d0JBQ0QsTUFBTSxFQUFFLGdCQUFnQjtxQkFDM0IsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBa0JOLHFCQUFDO0FBQUQsQ0ExQ0EsQUEwQ0M7O0FBYk0seUJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLEVBQUU7YUFDZixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsNkJBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRztDQUN4QixFQUY2RixDQUU3RixDQUFDO0FBQ0ssNkJBQWMsR0FBMkM7SUFDaEUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDNUIsQ0FBQyIsImZpbGUiOiJlcnJvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9