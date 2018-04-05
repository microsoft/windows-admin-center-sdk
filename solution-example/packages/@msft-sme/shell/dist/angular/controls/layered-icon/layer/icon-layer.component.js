import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { getCssSizeString } from '../models/icon-size-helpers';
var IconLayerComponent = (function () {
    function IconLayerComponent(hostElement) {
        this.hostElement = hostElement;
    }
    Object.defineProperty(IconLayerComponent.prototype, "getTop", {
        /**
         * Host element binding for the right position of the layer
         */
        get: function () {
            return getCssSizeString('0', this.top);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconLayerComponent.prototype, "getLeft", {
        /**
         * Host element binding for the left position of the layer
         */
        get: function () {
            return getCssSizeString('0', this.left);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconLayerComponent.prototype, "getWidth", {
        /**
         * Host element binding for the width of the layer
         */
        get: function () {
            return getCssSizeString('100%', this.width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconLayerComponent.prototype, "getHeight", {
        /**
         * Host element binding for the height of the layer
         */
        get: function () {
            return getCssSizeString('100%', this.height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconLayerComponent.prototype, "fontSize", {
        /**
         * Host element binding for the font-size of the icon
         */
        get: function () {
            return getCssSizeString(this.hostElement.nativeElement.clientHeight, this.size);
        },
        enumerable: true,
        configurable: true
    });
    return IconLayerComponent;
}());
export { IconLayerComponent };
IconLayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-icon-layer',
                template: '<ng-content></ng-content>',
                styles: ["\n      :host {\n          position: absolute;\n      }\n\n      :host, :host:before, :host:after {\n          font-size: 1em;\n          line-height: 1em;\n      }\n    "]
            },] },
];
/** @nocollapse */
IconLayerComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
IconLayerComponent.propDecorators = {
    'size': [{ type: Input },],
    'top': [{ type: Input },],
    'left': [{ type: Input },],
    'height': [{ type: Input },],
    'width': [{ type: Input },],
    'getTop': [{ type: HostBinding, args: ['style.top',] },],
    'getLeft': [{ type: HostBinding, args: ['style.left',] },],
    'getWidth': [{ type: HostBinding, args: ['style.width',] },],
    'getHeight': [{ type: HostBinding, args: ['style.height',] },],
    'fontSize': [{ type: HostBinding, args: ['style.font-size',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGF5ZXJlZC1pY29uL2xheWVyL2ljb24tbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsVUFBQSxFQUFZLFdBQUEsRUFBYSxLQUFBLEVBQU0sTUFBTyxlQUFBLENBQWdCO0FBQzFFLE9BQU8sRUFBbUIsZ0JBQUEsRUFBaUIsTUFBTyw2QkFBQSxDQUE4QjtBQUdoRjtJQW9FSSw0QkFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBSSxDQUFDO0lBakMvQyxzQkFBSSxzQ0FBTTtRQUhYOztXQUVHO2FBQ0Y7WUFDRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUtBLHNCQUFJLHVDQUFPO1FBSFo7O1dBRUc7YUFDRjtZQUNHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBS0Esc0JBQUksd0NBQVE7UUFIYjs7V0FFRzthQUNGO1lBQ0csTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFLQSxzQkFBSSx5Q0FBUztRQUhkOztXQUVHO2FBQ0Y7WUFDRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQU1ELHNCQUFXLHdDQUFRO1FBSm5COztXQUVHO2FBRUg7WUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRixDQUFDOzs7T0FBQTtJQW1DTCx5QkFBQztBQUFELENBckdBLEFBcUdDOztBQWhDTSw2QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLE1BQU0sRUFBRSxDQUFDLDRLQVNSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsaUNBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztDQUNuQixFQUY2RixDQUU3RixDQUFDO0FBQ0ssaUNBQWMsR0FBMkM7SUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDMUIsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDekIsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDMUIsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDNUIsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDM0IsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRyxFQUFFLEVBQUU7SUFDekQsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRyxFQUFFLEVBQUU7SUFDM0QsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRyxFQUFFLEVBQUU7SUFDN0QsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRyxFQUFFLEVBQUU7SUFDL0QsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLGlCQUFpQixFQUFHLEVBQUUsRUFBRTtDQUNoRSxDQUFDIiwiZmlsZSI6Imljb24tbGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==