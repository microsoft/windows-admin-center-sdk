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
import { Component, ElementRef, HostListener, IterableDiffers, Renderer2, ViewChild } from '@angular/core';
import { ActionContainerComponent } from '../action-container.component';
var ActionBarComponent = /** @class */ (function (_super) {
    __extends(ActionBarComponent, _super);
    function ActionBarComponent(iterableDiffers, renderer, hostElement) {
        var _this = _super.call(this, iterableDiffers) || this;
        _this.renderer = renderer;
        _this.hostElement = hostElement;
        _this.displayedActions = [];
        _this.trayActions = [];
        _this.strings = MsftSme.resourcesStrings();
        _this.menuWidth = 208;
        // tslint:disable-next-line:max-line-length
        renderer.addClass(hostElement.nativeElement, 'sme-position-stretch-h');
        renderer.addClass(hostElement.nativeElement, 'sme-layout-action-bar');
        renderer.addClass(hostElement.nativeElement, 'sme-arrange-stack-h');
        renderer.addClass(hostElement.nativeElement, 'sme-arrange-ws-nowrap');
        renderer.addClass(hostElement.nativeElement, 'sme-arrange-overflow-show');
        _this.moreActionsDisplay = _this.strings.MsftSmeShell.Angular.Common.more;
        return _this;
    }
    ActionBarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.updateActionBar();
        });
    };
    ActionBarComponent.prototype.onWindowResize = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.updateActionBar();
        });
    };
    ActionBarComponent.prototype.onActionItemChanged = function () {
        var _this = this;
        setTimeout(function () {
            _this.updateActionBar();
        });
    };
    ActionBarComponent.prototype.updateActionBar = function () {
        var currentFill = 0;
        // Set up the following styles during the UI calculation to make sure the html element flickering won't exceed 
        // the action bar container. 
        // The following inline styles will be removed after the UI calculation is done.
        var hostElement = this.element.nativeElement.parentElement;
        hostElement.style.overflow = 'hidden';
        hostElement.style.position = 'relative';
        this.displayedActions = [];
        this.trayActions = [];
        var style = getComputedStyle(hostElement);
        var padding = parseInt(style.getPropertyValue('padding-left'), 0) + parseInt(style.getPropertyValue('padding-right'), 0);
        var containerWidth = hostElement.offsetWidth - padding;
        // Firstly, we need to calculate the total width of all buttons without "more" button.
        var buttonsTotalWidth = 0;
        for (var i = 0; i < this.actions.length; ++i) {
            buttonsTotalWidth += this.actions[i].width;
        }
        if (buttonsTotalWidth <= containerWidth) {
            for (var index = 0; index < this.actions.length; ++index) {
                this.displayedActions.push(this.actions[index]);
            }
        }
        else {
            // If the buttons total width exceeds the container width, then we calculate which button should be
            // displayed and which button should be put into "more" dropdown.
            // Note: the avaiable container width should be the container width - "more" button's width.            
            var visibleButtonContainerWidth = containerWidth - this.dropDownButtonElement.nativeElement.offsetWidth;
            for (var index = 0; index < this.actions.length; ++index) {
                if (currentFill + this.actions[index].width > visibleButtonContainerWidth) {
                    this.trayActions.push(this.actions[index]);
                }
                else {
                    this.displayedActions.push(this.actions[index]);
                }
                currentFill += (this.actions[index].width);
            }
        }
        if (this.displayedActions.length === 0) {
            this.moreActionsDisplay = this.strings.MsftSmeShell.Angular.Common.actions;
        }
        else {
            this.moreActionsDisplay = this.strings.MsftSmeShell.Angular.Common.more;
        }
        // If any action bar width is NaN, that means not all the action-buttons finished rendering on the UI.
        // Thus "currentFill" is still NaN. Otherwise, we consider all the action-buttons finish rendering.
        // Then it's time to remove the temporiry inline styles.
        if (!!currentFill) {
            hostElement.style.overflow = '';
            hostElement.style.position = '';
        }
        this.menuDisplayRight = this.element.nativeElement.offsetWidth <= this.menuWidth;
    };
    ActionBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-action-bar',
                    template: "\n      <div class=\"sme-padding-inset-xxxs sme-position-flex-none sme-arrange-stack-h\" #actionBarElement>\n          <sme-dynamic-action-item *ngFor=\"let item of displayedActions | smeFilter:'hidden':true\" [item]=\"item\" (itemChanged)=\"onActionItemChanged()\"></sme-dynamic-action-item>\n      </div>\n      <sme-dropdown #dropDown class=\"sme-position-flex-none\" [class.sme-layout-hidden]=\"trayActions.length === 0\" [alignToRight]=\"displayedActions.length>0\">\n          <button #dropDownButton type=\"button\" role=\"button\" class=\"sme-button-trigger sme-layout-action-bar-item-height sme-dropdown-toggle\"\n              [class.sme-toggled]=\"dropDown.isOpen\">\n            <span class=\"action-button-content\">{{ moreActionsDisplay }}</span>\n            <span class=\"sme-icon sme-icon-size-xxs sme-icon-chevronDown sme-margin-left-xs\"></span>\n          </button>\n          <sme-action-menu [actions]=\"trayActions\" role=\"menu\" class=\"sme-dropdown-content\" [(target)]=\"target\" (error)=\"error.emit($event)\"\n              (executed)=\"executed.emit($event)\"></sme-action-menu>\n      </sme-dropdown>\n      <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    ActionBarComponent.ctorParameters = function () { return [
        { type: IterableDiffers, },
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    ActionBarComponent.propDecorators = {
        'element': [{ type: ViewChild, args: ['actionBarElement',] },],
        'dropDownButtonElement': [{ type: ViewChild, args: ['dropDownButton',] },],
        'onWindowResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return ActionBarComponent;
}(ActionContainerComponent));
export { ActionBarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9jb250YWluZXJzL2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBRVQsVUFBVSxFQUVWLFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFNBQVMsRUFFWixNQUFNLGVBQUEsQ0FBZ0I7QUFHdkIsT0FBTyxFQUFFLHdCQUFBLEVBQXlCLE1BQU8sK0JBQUEsQ0FBZ0M7QUFHekU7SUFBd0Msc0NBQXdCO0lBZTVELDRCQUFZLGVBQWdDLEVBQVUsUUFBbUIsRUFBVSxXQUF1QjtRQUExRyxZQUNJLGtCQUFNLGVBQWUsQ0FBQyxTQVF6QjtRQVRxRCxjQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsaUJBQVcsR0FBWCxXQUFXLENBQVk7UUFkbkcsc0JBQWdCLEdBQWlCLEVBQUUsQ0FBQztRQUNwQyxpQkFBVyxHQUFpQixFQUFFLENBQUM7UUFJOUIsYUFBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDO1FBRzlDLGVBQVMsR0FBRyxHQUFHLENBQUM7UUFRcEIsMkNBQTJDO1FBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3ZFLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3BFLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQzFFLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENB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QUM7b0JBQ3RCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxvcENBY1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGlDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxlQUFlLEdBQUc7UUFDekIsRUFBQyxJQUFJLEVBQUUsU0FBUyxHQUFHO1FBQ25CLEVBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztLQUNuQixFQUo2RixDQUk3RixDQUFDO0lBQ0ssaUNBQWMsR0FBMkM7UUFDaEUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFHLEVBQUUsRUFBRTtRQUMvRCx1QkFBdUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRyxFQUFFLEVBQUU7UUFDM0UsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUcsRUFBRSxFQUFFO0tBQ2pGLENBQUM7SUFDRix5QkFBQztDQXZJRCxBQXVJQyxDQXZJdUMsd0JBQXdCLEdBdUkvRDtTQXZJWSxrQkFBa0IiLCJmaWxlIjoiYWN0aW9uLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9