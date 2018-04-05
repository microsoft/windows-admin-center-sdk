import { Component, Input } from '@angular/core';
var StatusIconComponent = /** @class */ (function () {
    function StatusIconComponent() {
    }
    Object.defineProperty(StatusIconComponent.prototype, "status", {
        /**
         * Input binding for the status icon type
         */
        set: function (type) {
            var layers = [];
            if (type && typeof type === 'string') {
                type = type.toLowerCase();
                if (type === 'info') {
                    layers.push('color-info sme-icon-statusCircleOuter', 'color-light sme-icon-statusCircleInfo');
                }
                if (type === 'warning') {
                    layers.push('color-warning sme-icon-statusTriangleOuter', 'color-light sme-icon-statusTriangleExclamation');
                }
                if (type === 'error') {
                    layers.push('color-error sme-icon-statusCircleOuter', 'color-light sme-icon-statusCircleExclamation');
                }
                if (type === 'success') {
                    layers.push('color-success sme-icon-statusCircleOuter', 'color-light sme-icon-statusCircleCheckmark');
                }
            }
            this.layers = layers;
        },
        enumerable: true,
        configurable: true
    });
    StatusIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-status-icon',
                    template: "\n      <sme-layered-icon [size]=\"size\">\n          <sme-icon-layer [size]=\"size\" *ngFor=\"let layer of layers\" [class]=\"'sme-icon ' + layer\"></sme-icon-layer>\n      </sme-layered-icon>\n    "
                },] },
    ];
    /** @nocollapse */
    StatusIconComponent.ctorParameters = function () { return []; };
    StatusIconComponent.propDecorators = {
        'size': [{ type: Input },],
        'status': [{ type: Input },],
    };
    return StatusIconComponent;
}());
export { StatusIconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGF5ZXJlZC1pY29uL3N0YXR1cy9zdGF0dXMtaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBd0IsS0FBQSxFQUFNLE1BQU8sZUFBQSxDQUFnQjtBQU05RDtJQUFBO0lBcURBLENBQUM7SUExQ0csc0JBQVcsdUNBQU07UUFKakI7O1dBRUc7YUFFSCxVQUFrQixJQUFnQjtZQUM5QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksR0FBZSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLHVDQUF1QyxDQUFDLENBQUM7Z0JBQ2xHLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsNENBQTRDLEVBQUUsZ0RBQWdELENBQUMsQ0FBQztnQkFDaEgsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsRUFBRSw4Q0FBOEMsQ0FBQyxDQUFDO2dCQUMxRyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxFQUFFLDRDQUE0QyxDQUFDLENBQUM7Z0JBQzFHLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFNRSw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSx5TUFJVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDSyxrQ0FBYyxHQUEyQztRQUNoRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtLQUMzQixDQUFDO0lBQ0YsMEJBQUM7Q0FyREQsQUFxREMsSUFBQTtTQXJEWSxtQkFBbUIiLCJmaWxlIjoic3RhdHVzLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==