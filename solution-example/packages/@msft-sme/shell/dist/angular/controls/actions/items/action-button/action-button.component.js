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
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionBarComponent } from '../../containers/action-bar/action-bar.component';
import { ActionItem, ActionItemComponent, ActionItemRendererComponent } from '../action-item.component';
var ActionButton = (function (_super) {
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
var ActionButtonAsync = (function (_super) {
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
var ActionButtonRendererComponent = (function (_super) {
    __extends(ActionButtonRendererComponent, _super);
    function ActionButtonRendererComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return ActionButtonRendererComponent;
}(ActionItemRendererComponent));
export { ActionButtonRendererComponent };
ActionButtonRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-action-button-renderer',
                template: "\n      <button #self [class]=\"item.iconClass\" (click)=\"execute()\"\n          (mousedown)=\"self.classList.toggle('x-hidden-focus')\"\n          (mouseup)=\"self.blur(); self.classList.toggle('x-hidden-focus')\"\n          [disabled]=\"!item.enabled || item.busy || !item.ready\"\n          type=\"button\"\n          #actionButtonElement>\n          <span class=\"action-hover\">{{item.text}}</span>\n      </button>\n    ",
                styles: ["\n      button {\n        height: 38px;\n        width: auto;\n        max-width: 374px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        border: 1px solid transparent;\n        outline: 1px solid transparent;\n        cursor: pointer;\n        line-height: 20px;\n        padding: 8px 18px 12px 8px;\n        position: static;\n        text-decoration: none;\n        text-transform: none;\n        white-space: nowrap;\n        background: transparent;\n        display: inline-flex;\n        flex-direction: row;\n        justify-content:\u00A0center;\n        align-items: center;\n        align-content: center;\n        color: #333333;\n        font-size: 15px;\n      }\n\n      button.glyph:before {\n        margin-right: 10px;\n        display: inline-block;\n      }\n\n      button:hover  {\n          color: #222222;\n          background: rgba(33,33,33,0.05);\n      }\n\n      button:focus:not(.x-hidden-focus)  {\n          outline: #000 dashed 1px\n      }\n\n      button:disabled, button:disabled:hover, button:disabled:focus {\n          background: transparent;\n          color: #333333;\n          cursor: default;\n          opacity: 0.2;\n      }\n\n      button:disabled .action-hover {\n          text-decoration: none;\n      }\n\n      .sme-icon:before{\n          padding-right: 8px;\n          padding-left: 8px;\n      }\n    "]
            },] },
];
/** @nocollapse */
ActionButtonRendererComponent.ctorParameters = function () { return []; };
ActionButtonRendererComponent.propDecorators = {
    'element': [{ type: ViewChild, args: ['actionButtonElement',] },],
};
var ActionButtonComponent = (function (_super) {
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
    return ActionButtonComponent;
}(ActionItemComponent));
export { ActionButtonComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9pdGVtcy9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQUEsRUFBZ0MsWUFBQSxFQUFnQyxNQUFBLEVBQVEsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUNqSSxPQUFPLEVBQUUsVUFBQSxFQUFvQixNQUFPLE1BQUEsQ0FBTztBQUMzQyxPQUFPLEVBQUUsa0JBQUEsRUFBbUIsTUFBTyxrREFBQSxDQUFtRDtBQUV0RixPQUFPLEVBQUUsVUFBQSxFQUFZLG1CQUFBLEVBQXFCLDJCQUFBLEVBQTRCLE1BQU8sMEJBQUEsQ0FBMkI7QUFFeEc7SUFBa0MsZ0NBQVU7SUFHeEM7ZUFDSSxrQkFBTSw2QkFBNkIsQ0FBQztJQUN4QyxDQUFDO0lBRU0sOEJBQU8sR0FBZCxVQUFlLEtBQVc7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQVZBLEFBVUMsQ0FWaUMsVUFBVSxHQVUzQzs7QUFFRDtJQUEwQyxxQ0FBWTtJQUF0RDs7SUE4QkEsQ0FBQztJQTdCVSxtQ0FBTyxHQUFkLFVBQWUsTUFBVTtRQUF6QixpQkFjQztRQWJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3BDLFVBQUEsTUFBTTtnQkFDRixLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFB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