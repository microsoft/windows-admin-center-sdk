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
import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionBarComponent } from '../../containers/action-bar/action-bar.component';
import { ActionItem, ActionItemComponent, ActionItemRendererComponent } from '../action-item.component';
var ActionButton = /** @class */ (function (_super) {
    __extends(ActionButton, _super);
    function ActionButton() {
        return _super.call(this, ActionButtonRendererComponent) || this;
    }
    ActionButton.prototype.execute = function (model) {
        this.container.executed.emit({ result: model, item: this });
    };
    return ActionButton;
}(ActionItem));
export { ActionButton };
var ActionButtonAsync = /** @class */ (function (_super) {
    __extends(ActionButtonAsync, _super);
    function ActionButtonAsync() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionButtonAsync.prototype.execute = function (target) {
        var _this = this;
        if (this.enabled) {
            this.preExecute(target);
            this.onExecute(target).take(1).subscribe(function (result) {
                _this.container.executed.emit({ result: result || target, item: _this });
            }, function (error) {
                _this.container.error.emit({ error: error, item: _this });
            }, function () {
                _this.postExecute(target);
            });
        }
    };
    ActionButtonAsync.prototype.preExecute = function (target) {
        this.busy = true;
    };
    ActionButtonAsync.prototype.onExecute = function (target) {
        // By default just return the target wrapped in observable and do nothing.
        // This should be overridden in derived classes
        return Observable.of(target);
    };
    ActionButtonAsync.prototype.postExecute = function (target) {
        this.busy = false;
    };
    return ActionButtonAsync;
}(ActionButton));
export { ActionButtonAsync };
var ActionButtonRendererComponent = /** @class */ (function (_super) {
    __extends(ActionButtonRendererComponent, _super);
    function ActionButtonRendererComponent(renderer, hostElement) {
        var _this = _super.call(this) || this;
        _this.renderer = renderer;
        _this.hostElement = hostElement;
        renderer.addClass(hostElement.nativeElement, 'sme-position-stretch-h');
        return _this;
    }
    ActionButtonRendererComponent.prototype.itemChanged = function (item) {
        _super.prototype.itemChanged.call(this, item);
    };
    ActionButtonRendererComponent.prototype.ngDoCheck = function () {
        if (this.element.nativeElement.offsetWidth === 0) {
            return;
        }
        // It looks like the CSS icon isn't being included in the offsetWidth, nor the clientWidth.
        // Adding here for simplicity and clarity.
        var cssIconWidth = 14;
        var calculatedWidth = this.element.nativeElement.offsetWidth + cssIconWidth;
        if (this.item.width !== calculatedWidth) {
            this.item.width = calculatedWidth;
        }
    };
    ActionButtonRendererComponent.prototype.execute = function () {
        if (this.item.execute) {
            this.item.execute.call(this.item, this.item.target);
        }
    };
    ActionButtonRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-action-button-renderer',
                    template: "\n      <button #actionButtonElement [ngClass]=\"['sme-button-trigger sme-button-auto-width sme-button-align-left sme-action-bar-item-height sme-position-stretch-h', item.iconClass || '']\" (click)=\"execute()\" [disabled]=\"!item.enabled || item.busy || !item.ready\"\n          type=\"button\">\n          {{item.text}}\n      </button>\n    "
                },] },
    ];
    /** @nocollapse */
    ActionButtonRendererComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    ActionButtonRendererComponent.propDecorators = {
        'element': [{ type: ViewChild, args: ['actionButtonElement',] },],
    };
    return ActionButtonRendererComponent;
}(ActionItemRendererComponent));
export { ActionButtonRendererComponent };
var ActionButtonComponent = /** @class */ (function (_super) {
    __extends(ActionButtonComponent, _super);
    function ActionButtonComponent(actionBarComponent) {
        var _this = _super.call(this) || this;
        _this.actionBarComponent = actionBarComponent;
        _this.execute = new EventEmitter(false);
        return _this;
    }
    ActionButtonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.actionBarComponent.updateActionBar();
        });
    };
    ActionButtonComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        setTimeout(function () {
            _this.actionBarComponent.updateActionBar();
        });
    };
    ActionButtonComponent.prototype.createActionItem = function () {
        var _this = this;
        var button = new ActionButton();
        button.execute = function (target) {
            _this.execute.emit(target);
        };
        return button;
    };
    ActionButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-action-button',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ActionButtonComponent.ctorParameters = function () { return [
        { type: ActionBarComponent, },
    ]; };
    ActionButtonComponent.propDecorators = {
        'execute': [{ type: Output },],
    };
    return ActionButtonComponent;
}(ActionItemComponent));
export { ActionButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9pdGVtcy9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBSVosTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFBLENBQWdCO0FBQ3ZCLE9BQU8sRUFBRSxVQUFBLEVBQW9CLE1BQU8sTUFBQSxDQUFPO0FBQzNDLE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLGtEQUFBLENBQW1EO0FBRXRGLE9BQU8sRUFBRSxVQUFBLEVBQVksbUJBQUEsRUFBcUIsMkJBQUEsRUFBNEIsTUFBTywwQkFBQSxDQUEyQjtBQUV4RztJQUFrQyxnQ0FBVTtJQUd4QztlQUNJLGtCQUFNLDZCQUE2QixDQUFDO0lBQ3hDLENBQUM7SUFFTSw4QkFBTyxHQUFkLFVBQWUsS0FBVztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDTCxtQkFBQztBQUFELENBVkEsQUFVQyxDQVZpQyxVQUFVLEdBVTNDOztBQUVEO0lBQTBDLHFDQUFZO0lBQXREOztJQThCQSxDQUFDO0lBN0JVLG1DQUFPLEdBQWQsVUFBZSxNQUFVO1FBQXpCLGlCQWNDO1FBYkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDcEMsVUFBQSxNQUFNO2dCQUNGLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxD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LElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFHLEVBQUUsRUFBRTtLQUNqRSxDQUFDO0lBQ0Ysb0NBQUM7Q0FwREQsQUFvREMsQ0FwRGtELDJCQUEyQixHQW9EN0U7U0FwRFksNkJBQTZCO0FBdUQxQztJQUEyQyx5Q0FBbUI7SUFJMUQsK0JBQW9CLGtCQUFzQztRQUExRCxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsd0JBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUZuRCxhQUFPLEdBQXNCLElBQUksWUFBWSxDQUFNLEtBQUssQ0FBQyxDQUFDOztJQUlqRSxDQUFDO0lBRU0sK0NBQWUsR0FBdEI7UUFBQSxpQkFJQztRQUhHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSwyQ0FBVyxHQUFsQjtRQUFBLGlCQUlDO1FBSEcsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLGdEQUFnQixHQUExQjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQUMsTUFBTTtZQUNwQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDRSxnQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxFQUFFO2lCQUNmLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxvQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsa0JBQWtCLEdBQUc7S0FDM0IsRUFGNkYsQ0FFN0YsQ0FBQztJQUNLLG9DQUFjLEdBQTJDO1FBQ2hFLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO0tBQzdCLENBQUM7SUFDRiw0QkFBQztDQXhDRCxBQXdDQyxDQXhDMEMsbUJBQW1CLEdBd0M3RDtTQXhDWSxxQkFBcUIiLCJmaWxlIjoiYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9