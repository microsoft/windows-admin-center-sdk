import { Component, ContentChild, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Logging, LogLevel } from '../../../core';
/**
 * The component definition of the split view content.
 */
var SplitViewContentComponent = (function () {
    function SplitViewContentComponent() {
    }
    return SplitViewContentComponent;
}());
export { SplitViewContentComponent };
SplitViewContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-split-view-content',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
SplitViewContentComponent.ctorParameters = function () { return []; };
/**
 * The component definition of the split view pane.
 */
var SplitViewPaneComponent = (function () {
    function SplitViewPaneComponent() {
    }
    return SplitViewPaneComponent;
}());
export { SplitViewPaneComponent };
SplitViewPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-split-view-pane',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
SplitViewPaneComponent.ctorParameters = function () { return []; };
/**
 * The component definition of the split view.
 */
var SplitViewComponent = (function () {
    function SplitViewComponent() {
        /**
         * It implements the ILayout interface. It's triggered when the layout is changed.
         * It's used to tell the child components to coordate with the layout change.
         */
        this.layoutChanged = new EventEmitter();
        this.internalIsExpanded = false;
        /**
         * The orientation of the pane.
         */
        this.orientation = 'bottom';
        /**
         * The event fired when the pane's expanded state is being toggled.
         */
        this.paneToggling = new EventEmitter();
        /**
         * The event fired when the pane's expanded state has been toggled.
         */
        this.paneToggled = new EventEmitter();
    }
    Object.defineProperty(SplitViewComponent.prototype, "hostClass", {
        /**
         * Gets the CSS classes of the component.
         */
        get: function () {
            return 'flex-layout stretch-absolute';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitViewComponent.prototype, "flexDirection", {
        /**
         * Gets the flex direction of the component.
         */
        get: function () {
            switch (this.orientation) {
                case 'left':
                    return 'row';
                case 'top':
                    return 'column';
                case 'right':
                    return 'row-reverse';
                case 'bottom':
                default:
                    return 'column-reverse';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitViewComponent.prototype, "isExpanded", {
        /**
         * Whether the pane is expanded.
         */
        get: function () {
            return this.internalIsExpanded;
        },
        set: function (value) {
            var _this = this;
            this.internalIsExpanded = value;
            this.paneToggling.emit({
                isExpanded: value
            });
            setTimeout(function () {
                _this.paneToggled.emit({
                    isExpanded: value
                });
                _this.layoutChanged.emit();
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The method called after content is initialized.
     */
    SplitViewComponent.prototype.ngAfterContentInit = function () {
        if (this.content == null) {
            Logging.log({
                level: LogLevel.Error,
                message: "The value of 'content' is either null or undefined.",
                params: {
                    content: this.content
                },
                source: 'SplitViewComponent.ngAfterContentInit'
            });
        }
        if (this.pane == null) {
            Logging.log({
                level: LogLevel.Error,
                message: "The value of 'pane' is either null or undefined.",
                params: {
                    pane: this.pane
                },
                source: 'SplitViewComponent.ngAfterContentInit'
            });
        }
    };
    SplitViewComponent.prototype.onWindowResized = function () {
        this.layoutChanged.emit();
    };
    /**
     * Toggles the expanded state of the pane.
     */
    SplitViewComponent.prototype.togglePane = function () {
        this.isExpanded = !this.isExpanded;
    };
    return SplitViewComponent;
}());
export { SplitViewComponent };
SplitViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-split-view',
                template: "\n\n      <section class=\"fixed-flex-size relative\" [class.border-left]=\"orientation === 'right'\" [class.border-right]=\"orientation === 'left'\"\n        [class.border-top]=\"orientation === 'bottom'\" [class.border-bottom]=\"orientation === 'top'\">\n        <ng-content select=\"sme-split-view-pane\"></ng-content>\n      </section>\n      <section class=\"auto-flex-size relative\">\n        <ng-content select=\"sme-split-view-content\"></ng-content>\n      </section>\n    ",
                providers: [
                    { provide: 'layout', useExisting: forwardRef(function () { return SplitViewComponent; }) }
                ]
            },] },
];
/** @nocollapse */
SplitViewComponent.ctorParameters = function () { return []; };
SplitViewComponent.propDecorators = {
    'content': [{ type: ContentChild, args: [SplitViewContentComponent,] },],
    'pane': [{ type: ContentChild, args: [SplitViewPaneComponent,] },],
    'hostClass': [{ type: HostBinding, args: ['class',] },],
    'flexDirection': [{ type: HostBinding, args: ['style.flex-direction',] },],
    'isExpanded': [{ type: Input },],
    'orientation': [{ type: Input },],
    'paneToggling': [{ type: Output },],
    'paneToggled': [{ type: Output },],
    'onWindowResized': [{ type: HostListener, args: ['window:resize',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc3BsaXQtdmlldy9zcGxpdC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ2UsU0FBQSxFQUFXLFlBQUEsRUFBYyxZQUFBLEVBQzNDLFVBQVUsRUFBRSxXQUFBLEVBQWEsWUFBQSxFQUFjLEtBQUEsRUFBTyxNQUFBLEVBQ2pELE1BQU0sZUFBQSxDQUFnQjtBQUN2QixPQUFPLEVBQUUsT0FBQSxFQUFTLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFRbEQ7O0dBRUc7QUFFSDtJQUFBO0lBU0EsQ0FBQztJQUFELGdDQUFDO0FBQUQsQ0FUQSxBQVNDOztBQVQrQyxvQ0FBVSxHQUEwQjtJQUNwRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRSwyQkFBMkI7YUFDeEMsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHdDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBR0Y7O0dBRUc7QUFFSDtJQUFBO0lBU0EsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FUQSxBQVNDOztBQVQ0QyxpQ0FBVSxHQUEwQjtJQUNqRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSwyQkFBMkI7YUFDeEMsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHFDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBR0Y7O0dBRUc7QUFFSDtJQUFBO1FBQ0k7OztXQUdHO1FBQ0ksa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQThENUQsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRW5DOztXQUVHO1FBRUks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LE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUMsRUFBRTtpQkFDM0U7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsaUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7QUFDSyxpQ0FBYyxHQUEyQztJQUNoRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMseUJBQXlCLEVBQUcsRUFBRSxFQUFFO0lBQ3pFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRyxFQUFFLEVBQUU7SUFDbkUsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRyxFQUFFLEVBQUU7SUFDeEQsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLHNCQUFzQixFQUFHLEVBQUUsRUFBRTtJQUMzRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNoQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNqQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNuQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNsQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUcsRUFBRSxFQUFFO0NBQ3RFLENBQUMiLCJmaWxlIjoic3BsaXQtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9