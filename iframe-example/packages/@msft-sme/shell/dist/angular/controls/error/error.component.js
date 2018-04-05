import { Component, Input } from '@angular/core';
import { Logging, LogLevel } from '../../../core';
import { AlertBarService, AlertSeverity } from '../alert-bar';
var ErrorComponent = /** @class */ (function () {
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
    return ErrorComponent;
}());
export { ErrorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZXJyb3IvZXJyb3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsS0FBQSxFQUFNLE1BQU8sZUFBQSxDQUFnQjtBQUNqRCxPQUFPLEVBQUUsT0FBQSxFQUFTLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDbEQsT0FBTyxFQUFFLGVBQUEsRUFBaUIsYUFBQSxFQUFjLE1BQU8sY0FBQSxDQUFlO0FBRzlEO0lBMEJJLHdCQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFFcEQsQ0FBQztJQTFCRCxzQkFBVyxtQ0FBTzthQUFsQixVQUFtQixLQUFhO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDO29CQUNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO3dCQUN0QixPQUFPLEVBQUUsS0FBSzt3QkFDZCxRQUFRLEVBQUUsYUFBYSxDQUFDLEtBQUs7d0JBQzdCLGlCQUFpQjt3QkFDakIsS0FBSyxFQUFFLG1CQUFtQjtxQkFDN0IsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNSLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSzt3QkFDckIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQzt3QkFDdkIsTUFBTSxFQUFFOzRCQUNKLE9BQU8sRUFBRSxLQUFLOzRCQUNkLFFBQVEsRUFBRSxhQUFhLENBQUMsS0FBSzs0QkFDN0IsS0FBSyxFQUFFLG1CQUFtQjt5QkFDN0I7d0JBQ0QsTUFBTSxFQUFFLGdCQUFnQjtxQkFDM0IsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBS0MseUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLEVBQUU7aUJBQ2YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDZCQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxlQUFlLEdBQUc7S0FDeEIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNLLDZCQUFjLEdBQTJDO1FBQ2hFLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0tBQzVCLENBQUM7SUFDRixxQkFBQztDQTFDRCxBQTBDQyxJQUFBO1NBMUNZLGNBQWMiLCJmaWxlIjoiZXJyb3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==