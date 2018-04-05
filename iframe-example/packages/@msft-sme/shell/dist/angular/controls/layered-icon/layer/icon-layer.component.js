import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { getCssSizeString } from '../models/icon-size-helpers';
var IconLayerComponent = /** @class */ (function () {
    function IconLayerComponent(hostElement) {
        var _this = this;
        this.hostElement = hostElement;
        // It's related to the Bug 15522066: table grouping in EDGE (not Chrome) causes column mis-alignment if status is a column
        // Basically the problem is if this component has the font-size inline style in the begining of a table rendering, 
        // it messes up the table layout in Edge (only Edge).
        // The workaround is to defer the inline style rendering the Edge can handle the table layout correctly.
        setTimeout(function () {
            _this.internalFontSize = getCssSizeString(_this.hostElement.nativeElement.clientHeight, _this.size);
        });
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
            return this.internalFontSize;
        },
        enumerable: true,
        configurable: true
    });
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
    return IconLayerComponent;
}());
export { IconLayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbGF5ZXJlZC1pY29uL2xheWVyL2ljb24tbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsVUFBQSxFQUFZLFdBQUEsRUFBYSxLQUFBLEVBQU0sTUFBTyxlQUFBLENBQWdCO0FBQzFFLE9BQU8sRUFBbUIsZ0JBQUEsRUFBaUIsTUFBTyw2QkFBQSxDQUE4QjtBQUdoRjtJQXFFSSw0QkFBb0IsV0FBdUI7UUFBM0MsaUJBUUM7UUFSbUIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkMsMEhBQTBIO1FBQzFILG1IQUFtSDtRQUNuSCxxREFBcUQ7UUFDckQsd0dBQXdHO1FBQ3hHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JHLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXpDQSxzQkFBSSxzQ0FBTTtRQUhYOztXQUVHO2FBQ0Y7WUFDRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUtBLHNCQUFJLHVDQUFPO1FBSFo7O1dBRUc7YUFDRjtZQUNHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBS0Esc0JBQUksd0NBQVE7UUFIYjs7V0FFRzthQUNGO1lBQ0csTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFLQSxzQkFBSSx5Q0FBUztRQUhkOztXQUVHO2FBQ0Y7WUFDRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQU1ELHNCQUFXLHdDQUFRO1FBSm5COztXQUVHO2FBRUg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBV0UsNkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxNQUFNLEVBQUUsQ0FBQyw0S0FTUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO0tBQ25CLEVBRjZGLENBRTdGLENBQUM7SUFDSyxpQ0FBYyxHQUEyQztRQUNoRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQixLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN6QixNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM1QixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMzQixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFHLEVBQUUsRUFBRTtRQUN6RCxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFHLEVBQUUsRUFBRTtRQUMzRCxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFHLEVBQUUsRUFBRTtRQUM3RCxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFHLEVBQUUsRUFBRTtRQUMvRCxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUcsRUFBRSxFQUFFO0tBQ2hFLENBQUM7SUFDRix5QkFBQztDQTlHRCxBQThHQyxJQUFBO1NBOUdZLGtCQUFrQiIsImZpbGUiOiJpY29uLWxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=