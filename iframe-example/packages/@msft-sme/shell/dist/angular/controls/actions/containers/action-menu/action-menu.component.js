var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, IterableDiffers } from '@angular/core';
import { ActionContainerComponent } from '../action-container.component';
/**
 * TODO: define html and handling for menu. After which we can define context and context "ellipses" button controls.
 */
var ActionMenuComponent = /** @class */ (function (_super) {
    __extends(ActionMenuComponent, _super);
    function ActionMenuComponent(iterableDiffers) {
        return _super.call(this, iterableDiffers) || this;
    }
    ActionMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-action-menu',
                    template: "\n      <div class=\"sme-arrange-stack-v\">\n          <sme-dynamic-action-item *ngFor=\"let item of actions | smeFilter:'hidden':true\" [item]=\"item\"></sme-dynamic-action-item>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ActionMenuComponent.ctorParameters = function () { return [
        { type: IterableDiffers, },
    ]; };
    return ActionMenuComponent;
}(ActionContainerComponent));
export { ActionMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9jb250YWluZXJzL2FjdGlvbi1tZW51L2FjdGlvbi1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxlQUFBLEVBQWdCLE1BQU8sZUFBQSxDQUFnQjtBQUMzRCxPQUFPLEVBQUUsd0JBQUEsRUFBeUIsTUFBTywrQkFBQSxDQUFnQztBQUd6RTs7R0FFRztBQUNIO0lBQXlDLHVDQUF3QjtJQUM3RCw2QkFBWSxlQUFnQztlQUN4QyxrQkFBTSxlQUFlLENBQUM7SUFDMUIsQ0FBQztJQUNFLDhCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHlNQUlUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxrQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsZUFBZSxHQUFHO0tBQ3hCLEVBRjZGLENBRTdGLENBQUM7SUFDRiwwQkFBQztDQWxCRCxBQWtCQyxDQWxCd0Msd0JBQXdCLEdBa0JoRTtTQWxCWSxtQkFBbUIiLCJmaWxlIjoiYWN0aW9uLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==