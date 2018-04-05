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
import { Component, HostListener, IterableDiffers, ViewChild } from '@angular/core';
import { ActionContainerComponent } from '../action-container.component';
var ActionBarComponent = (function (_super) {
    __extends(ActionBarComponent, _super);
    function ActionBarComponent(iterableDiffers) {
        var _this = _super.call(this, iterableDiffers) || this;
        _this.displayedActions = [];
        _this.trayActions = [];
        _this.strings = MsftSme.resourcesStrings();
        _this.menuWidth = 208;
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
            var visibleButtonContainerWidth = containerWidth - this.dropDownElement.nativeElement.offsetWidth;
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
    return ActionBarComponent;
}(ActionContainerComponent));
export { ActionBarComponent };
ActionBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-action-bar',
                template: "\n      <div class=\"visible-actions-container\" #actionBarElement>\n        <sme-dynamic-action-item *ngFor=\"let item of displayedActions | smeFilter:'hidden':true\" [item]=\"item\" (itemChanged)=\"onActionItemChanged()\"></sme-dynamic-action-item>\n      </div>\n      <sme-dropdown [class.show]=\"trayActions.length != 0\" [class.only]=\"this.displayedActions.length==0\">\n        <button #dropDown class=\"action-bar-ellipsis sme-dropdown-toggle\">\n          <span class=\"action-button-content\">{{ moreActionsDisplay }}</span>\n          <span class=\"sme-icon icon-win-chevronDown\"></span>\n        </button>\n        <sme-action-menu [actions]=\"trayActions\" class=\"sme-dropdown-content\" [(target)]=\"target\" [ngClass]=\"{'sme-dropdown-content-right': menuDisplayRight}\"></sme-action-menu>\n      </sme-dropdown>\n      <ng-content></ng-content>\n    ",
                styles: ["\n      :host {\n        color: #0078d7;\n        overflow: visible; \n        white-space: nowrap;\n        font-size: 15px;\n        position: relative;\n        height: 40px;\n        width: 100%;\n        flex-wrap: nowrap;\n        min-width: 140px;\n      }\n\n      :host, .visible-actions-container {\n        display: flex;  \n        flex-direction: row;\n        align-content: stretch;\n        align-items: stretch;\n        justify-content: flex-start;\n      }\n\n      .visible-actions-container {\n        position: absolute;\n        padding: 1px;\n        flex: 1 1 auto;\n        flex-wrap: nowrap;\n      }\n\n      .action-bar-ellipsis {\n        border: 1px solid transparent;\n        outline: 1px solid transparent;\n        background: transparent;\n        color: #333333;\n        padding: 8px 8px 6px 8px;\n        line-height: 20px;\n        overflow:hidden;\n      }\n\n      sme-dropdown >>> .sme-dropdown-content-container {\n        /* This is used for making sure the dropdown content is above the backdrop layer whose z-index is 990 */\n        z-index: 991;\n        background-color: #f2f2f2;\n        color: #333333;\n        left: 0px;\n        overflow-x: hidden;\n        overflow-y: auto;\n        flex-direction: column;\n        width: 208px;\n      }\n\n      sme-dropdown >>> .sme-dropdown-content-container.sme-dropdown-content-right {\n        left: 0px;\n      }\n\n      sme-dropdown {\n        padding-right: 30px;\n        position:absolute;\n        top:0;\n        right:9999px; \n        background: white;\n        /* Even the dropdown is suppored to be hidden, we still want it to be on screen then we can get its rendering size. */\n        /* So we set the right to be super right then the dropdown looks like hidden on the screen.*/\n      }\n\n      sme-dropdown.show{\n        right:0;\n      }\n\n      sme-dropdown.show.only{\n        right:auto;\n        left:17px;\n      }\n      sme-dropdown.only >>> .sme-dropdown-content-container{\n        padding-left:0;  \n      }\n\n      :host.narrow sme-dropdown {\n        padding-right: 17px;\n      }\n\n      .action-button-content {\n        margin-right: 10px;\n        display: block;\n        float: left;\n      }\n\n      :host >>> .action-bar-ellipsis+.sme-icon {\n        display: block;\n        width: 20px;\n        margin-right: 35px;\n        margin-top: 1px;\n      }\n    "]
            },] },
];
/** @nocollapse */
ActionBarComponent.ctorParameters = function () { return [
    { type: IterableDiffers, },
]; };
ActionBarComponent.propDecorators = {
    'element': [{ type: ViewChild, args: ['actionBarElement',] },],
    'dropDownElement': [{ type: ViewChild, args: ['dropDown',] },],
    'onWindowResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9jb250YWluZXJzL2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBR1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBRVosTUFBTSxlQUFBLENBQWdCO0FBR3ZCLE9BQU8sRUFBRSx3QkFBQSxFQUF5QixNQUFPLCtCQUFBLENBQWdDO0FBR3pFO0lBQXdDLHNDQUF3QjtJQWU1RCw0QkFBWSxlQUFnQztRQUE1QyxZQUNJLGtCQUFNLGVBQWUsQ0FBQyxTQUV6QjtRQWpCTSxzQkFBZ0IsR0FBaUIsRUFBRSxDQUFDO1FBQ3BDLGlCQUFXLEdBQWlCLEVBQUUsQ0FBQztRQUk5QixhQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFHOUMsZUFBUyxHQUFHLEdBQUcsQ0FBQztRQVFwQixLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0lBQzVFLENBQUM7SUFFTSw0Q0FBZSxHQUF0QjtRQUFBLGlCQUlDO1FBSEcsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdNLDJDQUFjLEdBQXJCLFVBQXNCLEtBQUs7UUFBM0IsaUJBSUM7UUFIRyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sZ0RBQW1CLEdBQTFCO1FBQUEsaUJBSUM7UUFIRyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sNENBQWUsR0FBdEI7UUFDSSxJQUFJLFdBQVcs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L0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzVFLENBQUM7UUFFRCxzR0FBc0c7UUFDdEcsbUdBQW1HO1FBQ25HLHdEQUF3RDtRQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQixXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDaEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDckYsQ0FBQztJQXlITCx5QkFBQztBQUFELENBMU5BLEFBME5DLENBMU51Qyx3QkFBd0I7O0FBa0d6RCw2QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxzMkJBWVQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsbzJFQTRGUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLGlDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxlQUFlLEdBQUc7Q0FDeEIsRUFGNkYsQ0FFN0YsQ0FBQztBQUNLLGlDQUFjLEdBQTJDO0lBQ2hFLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRyxFQUFFLEVBQUU7SUFDL0QsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFHLEVBQUUsRUFBRTtJQUMvRCxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRyxFQUFFLEVBQUU7Q0FDakYsQ0FBQyIsImZpbGUiOiJhY3Rpb24tYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=