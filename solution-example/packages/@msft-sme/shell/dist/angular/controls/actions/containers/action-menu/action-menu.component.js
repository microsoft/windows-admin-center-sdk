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
var ActionMenuComponent = (function (_super) {
    __extends(ActionMenuComponent, _super);
    function ActionMenuComponent(iterableDiffers) {
        return _super.call(this, iterableDiffers) || this;
    }
    return ActionMenuComponent;
}(ActionContainerComponent));
export { ActionMenuComponent };
ActionMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-action-menu',
                template: "\n      <div class=\"tray-actions-container flex-layout vertical\">\n          <sme-dynamic-action-item *ngFor=\"let item of actions | smeFilter:'hidden':true\" [item]=\"item\"></sme-dynamic-action-item>\n      </div>\n    ",
                styles: ["\n      .tray-actions-container {\n        background-color: #f2f2f2;\n        color: #333333;\n        max-height: 500px; \n        max-width: 208px;\n      }\n\n      :host >>> sme-action-button-renderer {\n        width: 100%;\n      }\n\n      :host >>> sme-action-button-renderer button {\n        width: 100%;\n      }\n    "]
            },] },
];
/** @nocollapse */
ActionMenuComponent.ctorParameters = function () { return [
    { type: IterableDiffers, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9jb250YWluZXJzL2FjdGlvbi1tZW51L2FjdGlvbi1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxlQUFBLEVBQWdCLE1BQU8sZUFBQSxDQUFnQjtBQUMzRCxPQUFPLEVBQUUsd0JBQUEsRUFBeUIsTUFBTywrQkFBQSxDQUFnQztBQUd6RTs7R0FFRztBQUNIO0lBQXlDLHVDQUF3QjtJQUM3RCw2QkFBWSxlQUFnQztlQUN4QyxrQkFBTSxlQUFlLENBQUM7SUFDMUIsQ0FBQztJQStCTCwwQkFBQztBQUFELENBbENBLEFBa0NDLENBbEN3Qyx3QkFBd0I7O0FBSTFELDhCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGlPQUlUO2dCQUNELE1BQU0sRUFBRSxDQUFDLDRVQWVSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsa0NBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRztDQUN4QixFQUY2RixDQUU3RixDQUFDIiwiZmlsZSI6ImFjdGlvbi1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=