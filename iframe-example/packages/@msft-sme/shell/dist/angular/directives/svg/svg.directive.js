import { Directive, ElementRef, Input } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ResourceService } from '../../service';
/**
 * SVG image directive to place SVG image at background-image by CSS style class.
 */
var SvgDirective = /** @class */ (function () {
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
    return SvgDirective;
}());
export { SvgDirective };
/**
 * SVG image directive to place SVG image as inline into the element.
 */
var SvgInlineDirective = /** @class */ (function () {
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
    return SvgInlineDirective;
}());
export { SvgInlineDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvZGlyZWN0aXZlcy9zdmcvc3ZnLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFVBQUEsRUFBWSxLQUFBLEVBQU0sTUFBTyxlQUFBLENBQWdCO0FBQzdELE9BQU8sRUFBRSxnQkFBQSxFQUFpQixNQUFPLGVBQUEsQ0FBZ0I7QUFDakQsT0FBTyxFQUFFLGVBQUEsRUFBZ0IsTUFBTyxlQUFBLENBQWdCO0FBRWhEOztHQUVHO0FBRUg7SUFDSTs7Ozs7T0FLRztJQUNILHNCQUFvQixVQUFzQixFQUFVLGVBQWdDO1FBQWhFLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDcEYsQ0FBQztJQU9BLHNCQUFJLGdDQUFNO1FBTFg7Ozs7V0FJRzthQUNGLFVBQVcsRUFBVTtZQUNsQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNMLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFTLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9FLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQUNFLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRyxFQUFFO0tBQ3RELENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRztLQUN4QixFQUg2RixDQUc3RixDQUFDO0lBQ0ssMkJBQWMsR0FBMkM7UUFDaEUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7S0FDM0IsQ0FBQztJQUNGLG1CQUFDO0NBbkNELEFBbUNDLElBQUE7U0FuQ1ksWUFBWTtBQXFDekI7O0dBRUc7QUFFSDtJQUNJOzs7OztPQUtHO0lBQ0gsNEJBQW9CLGFBQStCLEVBQVUsZUFBZ0M7UUFBekUsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQzdGLENBQUM7SUFFQSxzQkFBSSw0Q0FBWTthQUFoQixVQUFpQixFQUFVO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTCxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN0QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBUyxlQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO2dCQUNqRSxDQUFDO1lBQ0osQ0FBQztRQUNOLENBQUM7OztPQUFBO0lBQ0UsNkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEVBQUcsRUFBRTtLQUM1RCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsaUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixHQUFHO1FBQzFCLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRztLQUN4QixFQUg2RixDQUc3RixDQUFDO0lBQ0ssaUNBQWMsR0FBMkM7UUFDaEUsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7S0FDakMsQ0FBQztJQUNGLHlCQUFDO0NBL0JELEFBK0JDLElBQUE7U0EvQlksa0JBQWtCIiwiZmlsZSI6InN2Zy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9