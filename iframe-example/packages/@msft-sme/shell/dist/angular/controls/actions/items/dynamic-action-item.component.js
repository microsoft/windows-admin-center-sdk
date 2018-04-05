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
import { Component, ComponentFactoryResolver, EventEmitter, Input, Output } from '@angular/core';
import { DynamicComponentBase } from '../../common/dynamic.component';
var DynamicActionItemComponent = /** @class */ (function (_super) {
    __extends(DynamicActionItemComponent, _super);
    function DynamicActionItemComponent(componentFactoryResolver) {
        var _this = _super.call(this, componentFactoryResolver) || this;
        _this.itemChanged = new EventEmitter();
        return _this;
    }
    Object.defineProperty(DynamicActionItemComponent.prototype, "item", {
        set: function (item) {
            this.itemRef = item;
            this.updateOptions(item);
            this.itemChanged.emit();
        },
        enumerable: true,
        configurable: true
    });
    DynamicActionItemComponent.prototype.createComponent = function () {
        this.componentType = this.itemRef.renderer;
        _super.prototype.createComponent.call(this);
        this.updateOptions(this.itemRef);
    };
    DynamicActionItemComponent.prototype.updateOptions = function (item) {
        if (this.ref && this.ref.instance.itemChanged) {
            this.ref.instance.itemChanged(item);
        }
    };
    DynamicActionItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dynamic-action-item',
                    template: '<div #container></div>',
                    styles: ["\n      :host {\n        display: inline-flex;\n        flex-direction: row;\n        justify-content:\u00A0center;\n        align-items: center;\n        align-content: center;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    DynamicActionItemComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
    ]; };
    DynamicActionItemComponent.propDecorators = {
        'item': [{ type: Input, args: ['item',] },],
        'itemChanged': [{ type: Output },],
    };
    return DynamicActionItemComponent;
}(DynamicComponentBase));
export { DynamicActionItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9pdGVtcy9keW5hbWljLWFjdGlvbi1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCx3QkFBd0IsRUFFeEIsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBSVQsTUFBTSxlQUFBLENBQWdCO0FBRXZCLE9BQU8sRUFBRSxvQkFBQSxFQUFxQixNQUFPLGdDQUFBLENBQWlDO0FBSXRFO0lBQWdELDhDQUE2RDtJQWF6RyxvQ0FBWSx3QkFBa0Q7UUFBOUQsWUFDSSxrQkFBTSx3QkFBd0IsQ0FBQyxTQUNsQztRQUpNLGlCQUFXLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7O0lBSWxFLENBQUM7SUFYRCxzQkFBSSw0Q0FBSTthQUFSLFVBQVMsSUFBZ0I7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBU1Msb0RBQWUsR0FBekI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzNDLGlCQUFNLGVBQWUsV0FBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyxrREFBYSxHQUFyQixVQUFzQixJQUFnQjtRQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFDTCxDQUFDO0lBQ0UscUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxNQUFNLEVBQUUsQ0FBQyxrTUFRUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx5Q0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsd0JBQXdCLEdBQUc7S0FDakMsRUFGNkYsQ0FFN0YsQ0FBQztJQUNLLHlDQUFjLEdBQTJDO1FBQ2hFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUcsRUFBRSxFQUFFO1FBQzVDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO0tBQ2pDLENBQUM7SUFDRixpQ0FBQztDQW5ERCxBQW1EQyxDQW5EK0Msb0JBQW9CLEdBbURuRTtTQW5EWSwwQkFBMEIiLCJmaWxlIjoiZHluYW1pYy1hY3Rpb24taXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9