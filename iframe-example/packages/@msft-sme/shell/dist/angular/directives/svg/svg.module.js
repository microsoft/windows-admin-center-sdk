import { NgModule } from '@angular/core';
import { ResourceService } from '../../service';
import { SvgDirective, SvgInlineDirective } from './svg.directive';
/**
 * SVG module class to export SVG directives.
 */
var SvgModule = /** @class */ (function () {
    function SvgModule() {
    }
    SvgModule.decorators = [
        { type: NgModule, args: [{
                    exports: [
                        SvgDirective,
                        SvgInlineDirective
                    ],
                    declarations: [
                        SvgDirective,
                        SvgInlineDirective
                    ],
                    providers: [
                        ResourceService
                    ]
                },] },
    ];
    /** @nocollapse */
    SvgModule.ctorParameters = function () { return []; };
    return SvgModule;
}());
export { SvgModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvZGlyZWN0aXZlcy9zdmcvc3ZnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLGVBQUEsQ0FBZ0I7QUFDaEQsT0FBTyxFQUFFLFlBQUEsRUFBYyxrQkFBQSxFQUFtQixNQUFPLGlCQUFBLENBQWtCO0FBRW5FOztHQUVHO0FBRUg7SUFBQTtJQWtCQSxDQUFDO0lBbEIrQixvQkFBVSxHQUEwQjtRQUNwRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGtCQUFrQjtxQkFDckI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLFlBQVk7d0JBQ1osa0JBQWtCO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsZUFBZTtxQkFDbEI7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHdCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsZ0JBQUM7Q0FsQkQsQUFrQkMsSUFBQTtTQWxCWSxTQUFTIiwiZmlsZSI6InN2Zy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9