import { Directive, ElementRef, Input } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ResourceService } from '../../service';
/**
 * SVG image directive to place SVG image at background-image by CSS style class.
 */
var SvgDirective = (function () {
    /**
     * Initializes a new instance of the SvgDirective class.
     *
     * @param elementRef the element reference.
     * @param resourceService the resource service.
     */
    function SvgDirective(elementRef, resourceService) {
        this.elementRef = elementRef;
        this.resourceService = resourceService;
    }
    Object.defineProperty(SvgDirective.prototype, "smeSvg", {
        /**
         * Set "smeSvg" input as id string of SVG resource.
         *
         * @param id The identification of SVG resource.
         */
        set: function (id) {
            if (id) {
                id = id.toLowerCase();
                var className = this.resourceService.find(ResourceService.svgType, id);
                if (className) {
                    this.elementRef.nativeElement.classList.add(className);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return SvgDirective;
}());
export { SvgDirective };
SvgDirective.decorators = [
    { type: Directive, args: [{ selector: '[smeSvg]' },] },
];
/** @nocollapse */
SvgDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ResourceService, },
]; };
SvgDirective.propDecorators = {
    'smeSvg': [{ type: Input },],
};
/**
 * SVG image directive to place SVG image as inline into the element.
 */
var SvgInlineDirective = (function () {
    /**
     * Initializes a new instance of the SvgInlineDirective class.
     *
     * @param viewContainer the view container reference.
     * @param resourceService the resource service.
     */
    function SvgInlineDirective(viewContainer, resourceService) {
        this.viewContainer = viewContainer;
        this.resourceService = resourceService;
    }
    Object.defineProperty(SvgInlineDirective.prototype, "smeSvgInline", {
        set: function (id) {
            this.viewContainer.clear();
            if (id) {
                id = id.toLowerCase();
                var content = this.resourceService.find(ResourceService.svgInlineType, id);
                if (content) {
                    this.viewContainer.element.nativeElement.innerHTML = content;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return SvgInlineDirective;
}());
export { SvgInlineDirective };
SvgInlineDirective.decorators = [
    { type: Directive, args: [{ selector: '[smeSvgInline]' },] },
];
/** @nocollapse */
SvgInlineDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: ResourceService, },
]; };
SvgInlineDirective.propDecorators = {
    'smeSvgInline': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvZGlyZWN0aXZlcy9zdmcvc3ZnLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFVBQUEsRUFBWSxLQUFBLEVBQU0sTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxnQkFBQSxFQUFpQixNQUFPLGVBQUEsQ0FBZ0I7QUFDakQsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxlQUFBLENBQWdCO0FBRWhEOztHQUVHO0FBRUg7SUFDSTs7Ozs7T0FLRztJQUNILHNCQUFvQixVQUFzQixFQUFVLGVBQWdDO1FBQWhFLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDcEYsQ0FBQztJQU9BLHNCQUFJLGdDQUFNO1FBTFg7Ozs7V0FJRzthQUNGLFVBQVcsRUFBVTtZQUNsQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNMLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFTLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9FLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQVlMLG1CQUFDO0FBQUQsQ0FuQ0EsQUFtQ0M7O0FBWE0sdUJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFHLEVBQUU7Q0FDdEQsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7SUFDcEIsRUFBQyxJQUFJLEVBQUUsZUFBZSxHQUFHO0NBQ3hCLEVBSDZGLENBRzdGLENBQUM7QUFDSywyQkFBYyxHQUEyQztJQUNoRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtDQUMzQixDQUFDO0FBR0Y7O0dBRUc7QUFFSDtJQUNJOzs7OztPQUtHO0lBQ0gsNEJBQW9CLGFBQStCLEVBQVUsZUFBZ0M7UUFBekUsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQzdGLENBQUM7SUFFQSxzQkFBSSw0Q0FBWTthQUFoQixVQUFpQixFQUFVO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTCxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN0QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBUyxlQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO2dCQUNqRSxDQUFDO1lBQ0osQ0FBQztRQUNOLENBQUM7OztPQUFBO0lBWUwseUJBQUM7QUFBRCxDQS9CQSxBQStCQzs7QUFYTSw2QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRyxFQUFFO0NBQzVELENBQUM7QUFDRixrQkFBa0I7QUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEdBQUc7SUFDMUIsRUFBQyxJQUFJLEVBQUUsZUFBZSxHQUFHO0NBQ3hCLEVBSDZGLENBRzdGLENBQUM7QUFDSyxpQ0FBYyxHQUEyQztJQUNoRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtDQUNqQyxDQUFDIiwiZmlsZSI6InN2Zy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9