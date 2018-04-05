import { Component, EventEmitter, HostBinding, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { DropdownService } from './dropdown.service';
/**
 * Component to create an dropdown
 */
var DropdownComponent = (function () {
    /**
     * Initializes a new instance of the DropdownDirective
     * @param dropdownService
     */
    function DropdownComponent(renderer, dropdownService) {
        this.renderer = renderer;
        this.dropdownService = dropdownService;
        /**
         * Event Emitter for when the dropdown opens or closes. Emits a boolean to indicate if the dropdown is open
         */
        this.onToggled = new EventEmitter();
        /**
         * Indicates the open state of the dropdown
         * if true, applieas the 'open' class to the host element
         */
        this.isOpen = false;
        /**
         * Indicates that dropdown should be disabled.
         */
        this.disabled = false;
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
    return DropdownComponent;
}());
export { DropdownComponent };
DropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-dropdown',
                template: "\n      <div #smeDropdownToggle class=\"sme-dropdown-toggle-container\">\n        <ng-content select=\".sme-dropdown-toggle\"></ng-content>\n      </div>\n      <div #smeDropdownContent class=\"sme-dropdown-content-container\">\n        <ng-content select=\".sme-dropdown-content\"></ng-content>\n      </div>\n    ",
                styles: ["\n      :host {\n        position: relative;\n      }\n\n      .sme-dropdown-content-container {\n        position: absolute;\n        top: 100%;\n        left: 0;\n        z-index: 1000;\n        display: none;\n        float: left;\n        min-width: 160px;\n        padding: 5px 0;\n        margin: 0;\n        list-style: none;\n        font-size: 15px;\n        text-align: left;\n        background-color: #fff;\n        border-radius: 0;\n        box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, .4);\n        background-clip: padding-box;\n      }\n\n      :host.sme-dropdown-open .sme-dropdown-content-container,\n      .sme-dropdown-toggle-container {\n        display: inline-block;\n      }\n\n      .sme-dropdown-content-container.sme-dropdown-content-right {\n        left: auto;\n        right: 0;\n      }\n      .sme-dropdown-content-container.sme-dropdown-content-left {\n        left: 0;\n        right: auto;\n      }\n    "]
            },] },
];
/** @nocollapse */
DropdownComponent.ctorParameters = function () { return [
    { type: Renderer2, },
    { type: DropdownService, },
]; };
DropdownComponent.propDecorators = {
    'onToggled': [{ type: Output },],
    'contentElement': [{ type: ViewChild, args: ['smeDropdownContent',] },],
    'toggleElement': [{ type: ViewChild, args: ['smeDropdownToggle',] },],
    'isOpen': [{ type: HostBinding, args: ['class.sme-dropdown-open',] },],
    'disabled': [{ type: HostBinding, args: ['class.disabled',] }, { type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBRVQsWUFBWSxFQUVaLFdBQVcsRUFFWCxLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFBLENBQWdCO0FBRXZCLE9BQU8sRUFBRSxlQUFBLEVBQWdCLE1BQU8sb0JBQUEsQ0FBcUI7QUFHckQ7O0dBRUc7QUFFSDtJQWtDSTs7O09BR0c7SUFDSCwyQkFBb0IsUUFBbUIsRUFBVSxlQUFnQztRQUE3RCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBcENqRjs7V0FFRztRQUNLLGNBQVMsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWM5RDs7O1dBR0c7UUFFSSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXRCOztXQUVHO1FBRU0sYUFBUSxHQUFHLEtBQUssQ0FBQztJQVEyRCxDQUFDO0lBRXRGOztPQUVHO0lBQ0ksb0NBQVEsR0FBZjtRQUFBLGlCQUdDO1FBRkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDeEksQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUNBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNsQyxDQUFD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