import { NgModule } from '@angular/core';
import { ResourceService } from '../../service';
import { SvgDirective, SvgInlineDirective } from './svg.directive';
/**
 * SVG module class to export SVG directives.
 */
var SvgModule = (function () {
    function SvgModule() {
    }
    return SvgModule;
}());
export { SvgModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvZGlyZWN0aXZlcy9zdmcvc3ZnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUN6QyxPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLGVBQUEsQ0FBZ0I7QUFDaEQsT0FBTyxFQUFFLFlBQUEsRUFBYyxrQkFBQSxFQUFtQixNQUFPLGlCQUFBLENBQWtCO0FBRW5FOztHQUVHO0FBRUg7SUFBQTtJQWtCQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQWxCQSxBQWtCQzs7QUFsQitCLG9CQUFVLEdBQTBCO0lBQ3BFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osa0JBQWtCO2lCQUNyQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsWUFBWTtvQkFDWixrQkFBa0I7aUJBQ3JCO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxlQUFlO2lCQUNsQjthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCx3QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJzdmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==