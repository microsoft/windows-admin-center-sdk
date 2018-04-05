import { Component, ContentChild, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Logging, LogLevel } from '../../../core';
/**
 * The component definition of the split view content.
 */
var SplitViewContentComponent = /** @class */ (function () {
    function SplitViewContentComponent() {
    }
    SplitViewContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-split-view-content',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    SplitViewContentComponent.ctorParameters = function () { return []; };
    return SplitViewContentComponent;
}());
export { SplitViewContentComponent };
/**
 * The component definition of the split view pane.
 */
var SplitViewPaneComponent = /** @class */ (function () {
    function SplitViewPaneComponent() {
    }
    SplitViewPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-split-view-pane',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    SplitViewPaneComponent.ctorParameters = function () { return []; };
    return SplitViewPaneComponent;
}());
export { SplitViewPaneComponent };
/**
 * The component definition of the split view.
 */
var SplitViewComponent = /** @class */ (function () {
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
         *
         * TODO: setting the class this way prevent any custom class from being applied.
         * Change to setting class in the constructor using Renderer2 and ElementRef
         */
        get: function () {
            return 'sme-layout-absolute sme-position-inset-none sme-arrange-stack-v';
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
                    return 'row';
                case 'bottom':
                default:
                    return 'column';
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
    SplitViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-split-view',
                    template: "\n      <ng-container *ngIf=\"orientation==='bottom' || orientation==='right'\">\n          <section class=\"sme-layout-relative sme-position-flex-auto\">\n              <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n          </section>\n          <section class=\"sme-layout-relative sme-position-flex-none sme-border-color-base-80\" [class.sme-border-left-sm]=\"orientation === 'right'\"\n              [class.sme-border-top-sm]=\"orientation === 'bottom'\">\n              <ng-container *ngTemplateOutlet=\"pane\"></ng-container>\n          </section>\n      </ng-container>\n      <ng-container *ngIf=\"orientation==='top' || orientation==='left'\">\n          <section class=\"sme-layout-relative sme-position-flex-none sme-border-color-base-80\" [class.sme-border-right-sm]=\"orientation === 'left'\"\n              [class.sme-border-bottom-sm]=\"orientation === 'top'\">\n              <ng-container *ngTemplateOutlet=\"pane\"></ng-container>\n          </section>\n          <section class=\"sme-layout-relative sme-position-flex-auto\">\n              <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n          </section>\n      </ng-container>\n      <ng-template #content><ng-content select=\"sme-split-view-content\"></ng-content></ng-template>\n      <ng-template #pane><ng-content select=\"sme-split-view-pane\"></ng-content></ng-template>\n      <!-- The reason to use ng-tempalte to wrap the ng-content element instead of directly to use ng-content in both two ng-containers above is:\n      If we use ng-content elements directly in both 2 ng-containers, there will be 2 ng-content elements with the same selector. But Angular will only \n      resolve the first ng-content in multiple ng-content elements with same selector even the first one is in a ngIf false block.\n      So when the orientation is \"top\" or \"left\", no ng-content element will be resolved then nothing would render.\n      In order to solve this problem, we have to use ng-template to wrap the ng-content to make sure one selector maps to one ng-content.\n      Then we use ng-container and ngTemplateOutlet to call the ng-template. \n      Thx for reading till here...... -->\n    ",
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
    return SplitViewComponent;
}());
export { SplitViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc3BsaXQtdmlldy9zcGxpdC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ2UsU0FBQSxFQUFXLFlBQUEsRUFBYyxZQUFBLEVBQzNDLFVBQVUsRUFBRSxXQUFBLEVBQWEsWUFBQSxFQUFjLEtBQUEsRUFBTyxNQUFBLEVBQ2pELE1BQU0sZUFBQSxDQUFnQjtBQUN2QixPQUFPLEVBQUUsT0FBQSxFQUFTLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFRbEQ7O0dBRUc7QUFFSDtJQUFBO0lBU0EsQ0FBQztJQVQrQyxvQ0FBVSxHQUEwQjtRQUNwRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3hDLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3Q0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLGdDQUFDO0NBVEQsQUFTQyxJQUFBO1NBVFkseUJBQXlCO0FBV3RDOztHQUVHO0FBRUg7SUFBQTtJQVNBLENBQUM7SUFUNEMsaUNBQVUsR0FBMEI7UUFDakYsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsMkJBQTJCO2lCQUN4QyxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gscUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRiw2QkFBQztDQVRELEFBU0MsSUFBQTtTQVRZLHNCQUFzQjtBQVduQzs7R0FFRztBQUVIO0lBQUE7UUFDSTs7O1dBR0c7UUFDSSxrQkFBYSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBaUU1RCx1QkFBa0IsR0FBRyxL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QUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDLEVBQUU7cUJBQzNFO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNLLGlDQUFjLEdBQTJDO1FBQ2hFLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRyxFQUFFLEVBQUU7UUFDekUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLHNCQUFzQixFQUFHLEVBQUUsRUFBRTtRQUNuRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUUsRUFBRTtRQUN4RCxlQUFlLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsc0JBQXNCLEVBQUcsRUFBRSxFQUFFO1FBQzNFLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2hDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2pDLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ2xDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRyxFQUFFLEVBQUU7S0FDdEUsQ0FBQztJQUNGLHlCQUFDO0NBbkxELEFBbUxDLElBQUE7U0FuTFksa0JBQWtCIiwiZmlsZSI6InNwbGl0LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==