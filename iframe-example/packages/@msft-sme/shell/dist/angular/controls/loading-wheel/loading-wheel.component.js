import { Component, EventEmitter, Input, Output } from '@angular/core';
var LoadingWheelComponent = /** @class */ (function () {
    function LoadingWheelComponent() {
        this.defaultSize = 'large';
        this.sizeMap = {
            small: 'sme-progress-small',
            medium: 'sme-progress-medium',
            large: 'sme-progress-large'
        };
        this.progressSize = this.sizeMap[this.defaultSize];
        this.message = '';
        this.buttonLabel = null;
        /**
         * The event fired when the button is clicked.
         */
        this.buttonClick = new EventEmitter();
    }
    Object.defineProperty(LoadingWheelComponent.prototype, "size", {
        set: function (value) {
            value = value || this.defaultSize;
            var sizeClass = this.sizeMap[value.toLowerCase()];
            this.progressSize = typeof sizeClass === 'string' ? sizeClass : this.sizeMap[this.defaultSize];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroy resources.
     */
    LoadingWheelComponent.prototype.ngOnDestroy = function () {
        this.buttonClick.complete();
    };
    LoadingWheelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-loading-wheel',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-scheme-base sme-layer-over\">\n          <div class=\"sme-layout-absolute sme-position-center sme-position-center-h-inline\">\n              <div class=\"sme-progress sme-progress-indeterminate-local sme-progress-center-h\" [ngClass]=\"progressSize\" role=\"progressbar\" aria-valuetext=\"Loading...\" [attr.aria-label]=\"message\">\n                  <span></span>\n                  <span></span>\n                  <span></span>\n                  <span></span>\n                  <span></span>\n              </div>\n              <h3 *ngIf=\"message\" class=\"sme-color-accent\">{{message}}</h3>\n              <a tabindex=\"0\" *ngIf=\"buttonLabel\" class=\"sme-layout-block sme-link\" (click)=\"buttonClick.next()\">{{buttonLabel}}</a>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingWheelComponent.ctorParameters = function () { return []; };
    LoadingWheelComponent.propDecorators = {
        'message': [{ type: Input },],
        'buttonLabel': [{ type: Input },],
        'size': [{ type: Input, args: ['size',] },],
        'buttonClick': [{ type: Output },],
    };
    return LoadingWheelComponent;
}());
export { LoadingWheelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbG9hZGluZy13aGVlbC9sb2FkaW5nLXdoZWVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFlBQUEsRUFBYyxLQUFBLEVBQWtCLE1BQUEsRUFBTyxNQUFPLGVBQUEsQ0FBZ0I7QUFHbEY7SUFBQTtRQUNZLGdCQUFXLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLFlBQU8sR0FBZ0M7WUFDM0MsS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixNQUFNLEVBQUUscUJBQXFCO1lBQzdCLEtBQUssRUFBRSxvQkFBb0I7U0FDOUIsQ0FBQztRQUVLLGlCQUFZLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHdEQsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUdiLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBUzFCOztXQUVHO1FBRUksZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQXFDdEUsQ0FBQztJQS9DRyxzQkFBSSx1Q0FBSTthQUFSLFVBQVMsS0FBYTtZQUNsQixLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRyxDQUFDOzs7T0FBQTtJQVFEOztPQUVHO0lBQ0ksMkNBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDRSxnQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxtMUJBY1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0ssb0NBQWMsR0FBMkM7UUFDaEUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDN0IsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDakMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRyxFQUFFLEVBQUU7UUFDNUMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7S0FDakMsQ0FBQztJQUNGLDRCQUFDO0NBaEVELEFBZ0VDLElBQUE7U0FoRVkscUJBQXFCIiwiZmlsZSI6ImxvYWRpbmctd2hlZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==