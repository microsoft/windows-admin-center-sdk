import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { DropdownService } from './dropdown.service';
/**
 * Component to create an dropdown
 */
var DropdownComponent = /** @class */ (function () {
    /**
     * Initializes a new instance of the DropdownDirective
     * @param dropdownService
     */
    function DropdownComponent(renderer, element, dropdownService) {
        this.renderer = renderer;
        this.element = element;
        this.dropdownService = dropdownService;
        /**
         * Event Emitter for when the dropdown opens or closes. Emits a boolean to indicate if the dropdown is open
         */
        this.onToggled = new EventEmitter();
        /**
         * Indicates the open state of the dropdown
         */
        this.isOpen = false;
        /**
         * Indicates how far the dropdown content has been translated to remain fully on screen
         */
        this.translateX = 0;
        /**
         * Indicates how far the dropdown content has been translated to remain fully on screen
         */
        this.translateY = 0;
        /**
         * Indicates that dropdown should be disabled.
         */
        this.disabled = false;
        renderer.addClass(element.nativeElement, 'sme-layout-relative');
    }
    /**
     * Angulars On Init Lifecycle Hook
     */
    DropdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.setAttribute(this.toggleElement.nativeElement, 'aria-haspopup', 'true');
        this.unsubscribeToggleClick = this.renderer.listen(this.toggleElement.nativeElement, 'click', function (event) { return _this.onToggleClick(event); });
    };
    /**
     * Angulars On Destroy Lifecycle Hook
     */
    DropdownComponent.prototype.ngOnDestroy = function () {
        this.close();
        this.unsubscribeToggleClick();
    };
    /**
     * Opens this dropdown
     */
    DropdownComponent.prototype.open = function () {
        this.toggle(true);
    };
    /**
     * Closes this dropdown
     */
    DropdownComponent.prototype.close = function () {
        this.toggle(false);
    };
    /**
     * Toggles the dropdown
     * @param open Optional. If provided, forces the dropdown open or closed.
     */
    DropdownComponent.prototype.toggle = function (open) {
        // If we are already in the correct state, return
        if (!MsftSme.isNullOrUndefined(open) && open === this.isOpen) {
            return;
        }
        if (this.isOpen) {
            // close if opened
            this.dropdownService.close(this);
            this.renderer.setAttribute(this.toggleElement.nativeElement, 'aria-expanded', 'false');
        }
        else {
            // open if closed
            this.dropdownService.open(this);
            this.renderer.setAttribute(this.toggleElement.nativeElement, 'aria-expanded', 'true');
        }
        // emit the current state of the dropdown
        this.onToggled.emit(this.isOpen);
    };
    /**
     * Handler for the click event for the toggle element
     * @param event the mouse event of the click
     */
    DropdownComponent.prototype.onToggleClick = function (event) {
        event.stopPropagation();
        // toggle the dropdown if not disabled
        if (!this.disabled) {
            this.toggle();
        }
        return false;
    };
    DropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dropdown',
                    template: "\n      <div #smeDropdownToggle class=\"sme-dropdown-toggle-container\">\n          <ng-content select=\".sme-dropdown-toggle\"></ng-content>\n      </div>\n      <div #smeDropdownContent class=\"sme-layout-dropdown sme-layout-absolute sme-position-bottom sme-scheme-dropdown sme-layer-nav sme-shadow-dropdown\"\n          [ngClass]=\"{'sme-layout-hidden': !isOpen, 'sme-layout-inline-block': isOpen, 'sme-position-left-none': !alignToRight, 'sme-position-right-none': alignToRight}\">\n          <ng-content select=\".sme-dropdown-content\"></ng-content>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DropdownComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
        { type: DropdownService, },
    ]; };
    DropdownComponent.propDecorators = {
        'onToggled': [{ type: Output },],
        'alignToRight': [{ type: Input },],
        'contentElement': [{ type: ViewChild, args: ['smeDropdownContent',] },],
        'toggleElement': [{ type: ViewChild, args: ['smeDropdownToggle',] },],
        'disabled': [{ type: HostBinding, args: ['class.disabled',] }, { type: Input },],
    };
    return DropdownComponent;
}());
export { DropdownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFFWixXQUFXLEVBRVgsS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNaLE1BQU0sZUFBQSxDQUFnQjtBQUV2QixPQUFPLEVBQUUsZUFBQSxFQUFnQixNQUFPLG9CQUFBLENBQXFCO0FBR3JEOztHQUVHO0FBRUg7SUErQ0k7OztPQUdHO0lBQ0gsMkJBQW9CLFFBQW1CLEVBQVUsT0FBbUIsRUFBVSxlQUFnQztRQUExRixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWpEOUc7O1dBRUc7UUFDSyxjQUFTLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFtQjlEOztXQUVHO1FBQ0ksV0FBTSxHQUFHLEtBQUssQ0FBQztRQUV0Qjs7V0FFRztRQUNJLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFdEI7O1dBRUc7UUFDSSxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRXRCOztXQUVHO1FBRU0sYUFBUSxHQUFHLEtBQUssQ0FBQztRQVN0QixRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQ0FBUSxHQUFmO1FBQUEsaUJBR0M7UUFGRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztJQUN4SSxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNJLGdDQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxrQ0FBTSxHQUFiLFVBQWMsSUFBYztRQUN4QixpREFBaUQ7UUFDakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxRixDQUFDO1FBRUQseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0sseUNBQWEsR0FBckIsVUFBc0IsS0FBVTtRQUM1QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsc0NBQXNDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRSw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsaWtCQVFUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsU0FBUyxHQUFHO1FBQ25CLEVBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRztRQUNwQixFQUFDLElBQUksRUFBRSxlQUFlLEdBQUc7S0FDeEIsRUFKNkYsQ0FJN0YsQ0FBQztJQUNLLGdDQUFjLEdBQTJDO1FBQ2hFLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ2hDLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2xDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLG9CQUFvQixFQUFHLEVBQUUsRUFBRTtRQUN4RSxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsbUJBQW1CLEVBQUcsRUFBRSxFQUFFO1FBQ3RFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRyxFQUFFLEVBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7S0FDL0UsQ0FBQztJQUNGLHdCQUFDO0NBdEpELEFBc0pDLElBQUE7U0F0SlksaUJBQWlCIiwiZmlsZSI6ImRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=