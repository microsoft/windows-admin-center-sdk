import { Injectable } from '@angular/core';
/**
 * Service for maintaining dropdown state.
 * Only one dropdown can be opened at a time.
 * This does not support nested dropdowns.
 */
var DropdownService = (function () {
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
        if (event.which === 27) {
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
    return DropdownService;
}());
export { DropdownService };
DropdownService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DropdownService.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZHJvcGRvd24vZHJvcGRvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUkzQzs7OztHQUlHO0FBQ0g7SUFBQTtRQUNZLDJCQUFzQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELDZCQUF3QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0Qsd0JBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUE2Ry9ELENBQUM7SUExR0c7OztPQUdHO0lBQ0ksOEJBQUksR0FBWCxVQUFZLFFBQWtCO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsZ0ZBQWdGO1lBQ2hGLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QyxDQUFDO1FBQ0QsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtCQUFLLEdBQVosVUFBYSxRQUFrQjtRQUMzQiw4QkFBOEI7UUFDOUIsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsOERBQThEO1FBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsc0VBQXNFO1FBQ3RFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHlDQUFlLEdBQXZCLFVBQXdCLEtBQWlCO1FBQ3JDLCtCQUErQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxpRkFBaUY7UUFDakYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCw0RUFBNEU7UUFDNUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjO1lBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUxRSwrREFBK0Q7WUFDL0QsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFPLEtBQUssQ0FBQyxNQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsZ0lBQWdJO1lBQ2hJLElBQUksT0FBTyxHQUFnQixLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzNFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGdDQUFnQztRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssMkNBQWlCLEdBQXpCLFVBQTBCLEtBQW9CO1FBQzFDLDZFQUE2RTtRQUM3RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1RCxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxzQ0FBWSxHQUFwQixVQUFxQixLQUFpQjtRQUNsQyx1R0FBdUc7UUFDdkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQU9MLHNCQUFDO0FBQUQsQ0FoSEEsQUFnSEM7O0FBTk0sMEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCw4QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJkcm9wZG93bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==