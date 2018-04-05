import { Component, ContentChildren, Input } from '@angular/core';
var GuidedPanelComponent = /** @class */ (function () {
    function GuidedPanelComponent() {
        this.paneHistory = [];
    }
    GuidedPanelComponent.prototype.ngAfterContentInit = function () {
        this.reset();
    };
    /**
     * Resets the panel to the first pane
     */
    GuidedPanelComponent.prototype.reset = function () {
        if (!this.firstPaneId) {
            throw new Error("No firstPaneId Defined. Please set the firstPaneId attribute on sme-guided-panel");
        }
        this.activate(this.firstPaneId);
    };
    /**
     * deactivates the currently active pane
     * @param modifyHistory If true, adds the active pane to history before deactivating it
     */
    GuidedPanelComponent.prototype.deactivate = function (modifyHistory) {
        if (this.activePane) {
            if (modifyHistory) {
                this.paneHistory.push(this.activePane.paneId);
            }
            this.activePane.active = false;
            this.activePane = null;
        }
    };
    /**
     * Find a pane by its id
     * @param id The id of the pane
     */
    GuidedPanelComponent.prototype.find = function (id) {
        var pane = this.panes.find(function (p) { return p.paneId === id; });
        if (!pane) {
            throw new Error("Cannot find a guided pane with the id: " + id + ".");
        }
        return pane;
    };
    /**
     * Activate a pane by its id
     * @param id The id of the pane
     */
    GuidedPanelComponent.prototype.activate = function (id) {
        // deactivate the current pane
        this.deactivate(true);
        // set the new active pane
        this.activePane = this.find(id);
        // set the new active panes state to active
        this.activePane.active = true;
        // reset history if we are back at the first pane
        if (id === this.firstPaneId) {
            this.paneHistory = [];
        }
    };
    /**
     * navigates back in the pane history
     */
    GuidedPanelComponent.prototype.back = function () {
        if (!this.paneHistory || this.paneHistory.length === 0) {
            throw new Error("Cannot go back. Pane history is empty.");
        }
        // get the previous id off the stack
        var previous = this.paneHistory.pop();
        // deactivate the current pane
        this.deactivate(false);
        // activate the previous panel
        this.activate(previous);
    };
    GuidedPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-guided-panel',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-arrange-stack-v\">\n          <div class=\"sme-layout-relative sme-position-flex-auto\">\n              <ng-content></ng-content>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    GuidedPanelComponent.ctorParameters = function () { return []; };
    GuidedPanelComponent.propDecorators = {
        'panes': [{ type: ContentChildren, args: ['pane',] },],
        'firstPaneId': [{ type: Input },],
    };
    return GuidedPanelComponent;
}());
export { GuidedPanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZ3VpZGVkLXBhbmVsL2d1aWRlZC1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixTQUFBLEVBQXlCLGVBQUEsRUFBaUIsS0FBQSxFQUFpQixNQUFPLGVBQUEsQ0FBZ0I7QUFJN0c7SUFBQTtRQU9XLGdCQUFXLEdBQWEsRUFBRSxDQUFDO0lBOEZ0QyxDQUFDO0lBMUZVLGlEQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQ0FBSyxHQUFaO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLGtGQUFrRixDQUFDLENBQUM7UUFDeEcsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7SUFDSyx5Q0FBVSxHQUFsQixVQUFtQixhQUFzQjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxtQ0FBSSxHQUFaLFVBQWEsRUFBVTtRQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTBDLEVBQUUsTUFBRyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHVDQUFRLEdBQWYsVUFBZ0IsRUFBVTtRQUN0Qiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUIsaURBQWlEO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUNBQUksR0FBWDtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBQ0Qsb0NBQW9DO1FBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNFLCtCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLDhPQU1UO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNLLG1DQUFjLEdBQTJDO1FBQ2hFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUcsRUFBRSxFQUFFO1FBQ3ZELGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0tBQ2hDLENBQUM7SUFDRiwyQkFBQztDQXJHRCxBQXFHQyxJQUFBO1NBckdZLG9CQUFvQiIsImZpbGUiOiJndWlkZWQtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==