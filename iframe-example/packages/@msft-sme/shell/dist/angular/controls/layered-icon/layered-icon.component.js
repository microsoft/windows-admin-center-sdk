import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { defaultIconSize, getCssSizeString } from './models/icon-size-helpers';
var LayeredIconComponent = /** @class */ (function () {
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
    LayeredIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-layered-icon',
                    template: '<ng-content></ng-content>',
                    styles: ["\n      :host {\n          position: relative;\n          display: inline-block;\n          vertical-align: top;\n      }\n    "]
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
    return LayeredIconComponent;
}());
export { LayeredIconComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGF5ZXJlZC1pY29uL2xheWVyZWQtaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxVQUFBLEVBQVksV0FBQSxFQUFhLEtBQUEsRUFBTSxNQUFPLGVBQUEsQ0FBZ0I7QUFDMUUsT0FBTyxFQUFFLGVBQUEsRUFBaUIsZ0JBQUEsRUFBaUIsTUFBTyw0QkFBQSxDQUE2QjtBQUcvRTtJQWlDSSw4QkFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBSSxDQUFDO0lBcEJoRCxzQkFBVyx1Q0FBSztRQUpoQjs7V0FFRzthQUVIO1lBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyx3Q0FBTTtRQUpqQjs7V0FFRzthQUVIO1lBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVywwQ0FBUTtRQUpuQjs7V0FFRzthQUVIO1lBQ0ksTUFBTSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQzs7O09BQUE7SUFHRSwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLE1BQU0sRUFBRSxDQUFDLGlJQU1SLENBQUM7aUJBQ0wsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7S0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNLLG1DQUFjLEdBQTJDO1FBQ2hFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzFCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUcsRUFBRSxFQUFFO1FBQzFELFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUcsRUFBRSxFQUFFO1FBQzVELFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRyxFQUFFLEVBQUU7S0FDaEUsQ0FBQztJQUNGLDJCQUFDO0NBekRELEFBeURDLElBQUE7U0F6RFksb0JBQW9CIiwiZmlsZSI6ImxheWVyZWQtaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9