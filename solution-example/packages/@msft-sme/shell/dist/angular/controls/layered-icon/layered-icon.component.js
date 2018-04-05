import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { defaultIconSize, getCssSizeString } from './models/icon-size-helpers';
var LayeredIconComponent = (function () {
    function LayeredIconComponent(hostElement) {
        this.hostElement = hostElement;
    }
    Object.defineProperty(LayeredIconComponent.prototype, "width", {
        /**
         * Host element binding for the width of the icon
         */
        get: function () {
            return getCssSizeString(defaultIconSize, this.size);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayeredIconComponent.prototype, "height", {
        /**
         * Host element binding for the height of the icon
         */
        get: function () {
            return getCssSizeString(defaultIconSize, this.size);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayeredIconComponent.prototype, "fontSize", {
        /**
         * Host element binding for the font-size of the icon
         */
        get: function () {
            return getCssSizeString(defaultIconSize, this.size);
        },
        enumerable: true,
        configurable: true
    });
    return LayeredIconComponent;
}());
export { LayeredIconComponent };
LayeredIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-layered-icon',
                template: '<ng-content></ng-content>',
                styles: ["\n      :host {\n          position: relative;\n          display: inline-block;\n      }\n    "]
            },] },
];
/** @nocollapse */
LayeredIconComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
LayeredIconComponent.propDecorators = {
    'size': [{ type: Input },],
    'width': [{ type: HostBinding, args: ['style.width',] },],
    'height': [{ type: HostBinding, args: ['style.height',] },],
    'fontSize': [{ type: HostBinding, args: ['style.font-size',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGF5ZXJlZC1pY29uL2xheWVyZWQtaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxVQUFBLEVBQVksV0FBQSxFQUFhLEtBQUEsRUFBTSxNQUFPLGVBQUEsQ0FBZ0I7QUFDMUUsT0FBTyxFQUFFLGVBQUEsRUFBaUIsZ0JBQUEsRUFBaUIsTUFBTyw0QkFBQSxDQUE2QjtBQUcvRTtJQWlDSSw4QkFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBSSxDQUFDO0lBcEJoRCxzQkFBVyx1Q0FBSztRQUpoQjs7V0FFRzthQUVIO1lBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyx3Q0FBTTtRQUpqQjs7V0FFRzthQUVIO1lBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVywwQ0FBUTtRQUpuQjs7V0FFRzthQUVIO1lBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQzs7O09BQUE7SUF5QkwsMkJBQUM7QUFBRCxDQXhEQSxBQXdEQzs7QUF0Qk0sK0JBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxNQUFNLEVBQUUsQ0FBQyxpR0FLUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG1DQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7Q0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQztBQUNLLG1DQUFjLEdBQTJDO0lBQ2hFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzFCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUcsRUFBRSxFQUFFO0lBQzFELFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUcsRUFBRSxFQUFFO0lBQzVELFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRyxFQUFFLEVBQUU7Q0FDaEUsQ0FBQyIsImZpbGUiOiJsYXllcmVkLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==