import { Input } from '@angular/core';
/**
 * Defines the model of an action item including which renderer to use.
 * The consumer can provide an array of these to the action bar 'actions' attribute.
 */
var ActionItem = /** @class */ (function () {
    function ActionItem(renderer) {
        this.renderer = renderer;
        this.busy = false;
        this.enabled = true;
        this.hidden = false;
        this.ready = false;
    }
    ActionItem.prototype.setActionState = function (target, container) {
        this.target = target;
        this.container = container;
    };
    ActionItem.prototype.clearActionState = function () {
        this.target = null;
        this.container = null;
    };
    ActionItem.prototype.addedToContainer = function (target, container) {
        this.ready = true;
        this.setActionState(target, container);
    };
    ActionItem.prototype.removedFromContainer = function () {
        this.ready = false;
        this.clearActionState();
    };
    return ActionItem;
}());
export { ActionItem };
/**
 * The base class for the components that actually renders actions.
 * This is refereed to by the 'renderer' property of ActionItem
 * Internally it is used by the DynamicActionItemComponent to create an action item
 *
 */
var ActionItemRendererComponent = /** @class */ (function () {
    function ActionItemRendererComponent() {
    }
    ActionItemRendererComponent.prototype.itemChanged = function (item) {
        this.item = item;
    };
    return ActionItemRendererComponent;
}());
export { ActionItemRendererComponent };
/**
 * Provides the ability to add action items from html best for simple scenarios without a complex command model
 */
var ActionItemComponent = /** @class */ (function () {
    function ActionItemComponent() {
        this.action = this.createActionItem();
    }
    ActionItemComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var props = Object.keys(changes);
        props.forEach(function (prop) {
            var change = changes[prop];
            _this.action[prop] = change.currentValue;
        });
    };
    ActionItemComponent.propDecorators = {
        'enabled': [{ type: Input },],
        'text': [{ type: Input },],
        'iconClass': [{ type: Input },],
    };
    return ActionItemComponent;
}());
export { ActionItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9pdGVtcy9hY3Rpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUEsRUFBeUQsTUFBTyxlQUFBLENBQWdCO0FBSXpGOzs7R0FHRztBQUNIO0lBVUksb0JBQTRCLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFOeEMsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR2YsVUFBSyxHQUFHLEtBQUssQ0FBQztJQUM4QixDQUFDO0lBRTdDLG1DQUFjLEdBQXJCLFVBQXNCLE1BQVcsRUFBRSxTQUEwQjtRQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRU0scUNBQWdCLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVNLHFDQUFnQixHQUF2QixVQUF3QixNQUFXLEVBQUUsU0FBMEI7UUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLHlDQUFvQixHQUEzQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDTCxpQkFBQztBQUFELENBL0JBLEFBK0JDLElBQUE7O0FBRUQ7Ozs7O0dBS0c7QUFDSDtJQUFBO0lBS0EsQ0FBQztJQUhVLGlEQUFXLEdBQWxCLFVBQW1CLElBQU87UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNMLGtDQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7O0FBRUQ7O0dBRUc7QUFDSDtJQVlJO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBSU0seUNBQVcsR0FBbEIsVUFBbUIsT0FBc0I7UUFBekMsaUJBTUM7UUFMRyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2QsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRSxrQ0FBYyxHQUEyQztRQUNoRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM3QixNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQixXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtLQUM5QixDQUFDO0lBQ0YsMEJBQUM7Q0E5QkQsQUE4QkMsSUFBQTtTQTlCcUIsbUJBQW1CIiwiZmlsZSI6ImFjdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=