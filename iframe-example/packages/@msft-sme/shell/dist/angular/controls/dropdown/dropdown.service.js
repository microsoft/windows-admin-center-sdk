import { Injectable } from '@angular/core';
/**
 * Service for maintaining dropdown state.
 * Only one dropdown can be opened at a time.
 * This does not support nested dropdowns.
 */
var DropdownService = /** @class */ (function () {
    function DropdownService() {
        this.onDocumentClickBinding = this.onDocumentClick.bind(this);
        this.onDocumentKeydownBinding = this.onDocumentKeydown.bind(this);
        this.onWindowBlurBinding = this.onWindowBlur.bind(this);
    }
    /**
     * opens a dropdown and sets it to active
     * @param dropdown The dropdown to open
     */
    DropdownService.prototype.open = function (dropdown) {
        if (!this.activeDropdown) {
            // if there is not an active dropdown, add handler for auto closing the dropdown
            window.document.addEventListener('click', this.onDocumentClickBinding);
            window.document.addEventListener('keydown', this.onDocumentKeydownBinding);
            window.addEventListener('blur', this.onWindowBlurBinding);
        }
        else {
            // otherwise close the active dropdown
            this.activeDropdown.isOpen = false;
        }
        // set the new dropdown as the open dropdown
        this.activeDropdown = dropdown;
        this.activeDropdown.isOpen = true;
        this.updatePosition(dropdown);
    };
    /**
     * updates the position of a dropdown so that it remains on screen
     * @param dropdown The dropdown to update
     */
    DropdownService.prototype.updatePosition = function (dropdown) {
        // Initialize the new offset of the dropdown
        var offsetX = 0;
        var offsetY = 0;
        // get the viewport height and width
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        // get the dropdown contents current poisition in the window
        var rect = dropdown.contentElement.nativeElement.getBoundingClientRect();
        // modify the left and top position of the rect to account for any old offset
        var rectLeft = rect.left - dropdown.translateX;
        var rectTop = rect.top - dropdown.translateY;
        // we dont allow the dropdown to exceed the height or width of the window, so account for that as well
        var rectWidth = rect.width > windowWidth ? windowWidth : rect.width;
        var rectHeight = rect.height > windowHeight ? windowHeight : rect.height;
        // now were ready to position to dropdown. 
        // first adjust the left
        if (rectLeft + rectWidth > windowWidth) {
            var newLeft = windowWidth - rectWidth;
            offsetX = newLeft - rectLeft;
        }
        // then adjust the top        
        if (rectTop + rectHeight > windowHeight) {
            var newTop = windowHeight - rectHeight;
            offsetY = newTop - rectTop;
        }
        dropdown.translateX = offsetX;
        dropdown.translateY = offsetY;
        console.log("X: " + offsetX + ", Y: " + offsetY);
        dropdown.contentElement.nativeElement.style.transform = "translateX(" + offsetX + "px) translateY(" + offsetY + "px)";
    };
    /**
     * Marks a dropdown as closed, if the dropdown is the active dropdown,
     * the active dropdown is reset and event handlers are removed.
     * @param dropdown The dropdown to close
     */
    DropdownService.prototype.close = function (dropdown) {
        // mark the dropdown as closed
        dropdown.isOpen = false;
        // return if the passed in dropdown is not the active dropdown
        if (this.activeDropdown !== dropdown) {
            return;
        }
        // reset active dropdown to null and stop listening to document events
        this.activeDropdown = null;
        window.document.removeEventListener('click', this.onDocumentClickBinding);
        window.document.removeEventListener('keydown', this.onDocumentKeydownBinding);
        window.removeEventListener('blur', this.onWindowBlurBinding);
    };
    /**
     * Handles document clicks while a dropdown is open
     * @param event
     */
    DropdownService.prototype.onDocumentClick = function (event) {
        // stop if there is no dropdown
        if (!this.activeDropdown) {
            return;
        }
        // stop if the clicked element is also the toggle element for the active dropdown
        if (this.activeDropdown.toggleElement && this.activeDropdown.toggleElement.nativeElement === event.target) {
            return;
        }
        // check if the click occured an element that is inside the dropdown content
        if (this.activeDropdown.contentElement &&
            this.activeDropdown.contentElement.nativeElement.contains(event.target)) {
            // stop if the element is an element that handles input, return
            if (/input|textarea/i.test(event.target.tagName)) {
                return;
            }
            // stop if the target element has the 'sme-dropdown-interaction-enabled' class on one of its ancestors up to the content element
            var element = event.target;
            while (!this.activeDropdown.contentElement.nativeElement.isSameNode(element)) {
                if (element.classList.contains('sme-dropdown-interaction-enabled')) {
                    return;
                }
                element = element.parentElement;
            }
        }
        // otherwise, close the dropdown
        this.close(this.activeDropdown);
    };
    /**
     * Handles document keydowns while a dropdown is open
     * @param event
     */
    DropdownService.prototype.onDocumentKeydown = function (event) {
        // if the esc key is pressed, close the popup and focus on the toggle element
        if (event.keyCode === MsftSme.KeyCode.Escape) {
            if (this.activeDropdown && this.activeDropdown.toggleElement) {
                this.activeDropdown.toggleElement.nativeElement.focus();
            }
            this.close(this.activeDropdown);
            return;
        }
    };
    /**
     * Handles window blurs while a dropdown is open
     * @param event
     */
    DropdownService.prototype.onWindowBlur = function (event) {
        // close the dropdown if we leave the window (this also works to prevent to close dropdowns in iframes)
        this.close(this.activeDropdown);
    };
    DropdownService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DropdownService.ctorParameters = function () { return []; };
    return DropdownService;
}());
export { DropdownService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZHJvcGRvd24vZHJvcGRvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUkzQzs7OztHQUlHO0FBQ0g7SUFBQTtRQUNZLDJCQUFzQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELDZCQUF3QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0Qsd0JBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUE0Si9ELENBQUM7SUF6Skc7OztPQUdHO0lBQ0ksOEJBQUksR0FBWCxVQUFZLFFBQWtCO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsZ0ZBQWdGO1lBQ2hGLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QyxDQUFDO1FBQ0QsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVsQyxJQUFJLENBQUMsY0FB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NkVBQTZFO1FBQzdFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUQsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQztRQUNYLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssc0NBQVksR0FBcEIsVUFBcUIsS0FBaUI7UUFDbEMsdUdBQXVHO1FBQ3ZHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRSwwQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysc0JBQUM7Q0EvSkQsQUErSkMsSUFBQTtTQS9KWSxlQUFlIiwiZmlsZSI6ImRyb3Bkb3duLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9