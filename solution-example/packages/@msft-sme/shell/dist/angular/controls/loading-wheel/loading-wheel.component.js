import { Component, EventEmitter, Input, Output } from '@angular/core';
var LoadingWheelComponent = (function () {
    function LoadingWheelComponent() {
        this.defaultSize = 'large';
        this.sizeMap = {
            small: '',
            medium: 'progress-medium',
            large: 'progress-large'
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
    return LoadingWheelComponent;
}());
export { LoadingWheelComponent };
LoadingWheelComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-loading-wheel',
                template: "\n      <div class=\"progress-cover\">\n          <div class=\"progress-container\">\n              <div [ngClass]=\"['progress-ring', progressSize]\">\n                  <div class=\"progress-circle\"></div>\n                  <div class=\"progress-circle\"></div>\n                  <div class=\"progress-circle\"></div>\n                  <div class=\"progress-circle\"></div>\n                  <div class=\"progress-circle\"></div>\n              </div>\n              <h4 *ngIf=\"message\" class=\"progress-text\">{{message}}</h4>\n              <div *ngIf=\"buttonLabel\" class=\"progress-text\"><a (click)=\"buttonClick.next()\">{{buttonLabel}}</a></div>\n          </div>\n      </div>\n    ",
                styles: ["\n      .progress-cover {\n          position: absolute;\n          top:0;\n          bottom: 0;\n          left: 0;\n          right: 0;\n          background: #fff;\n          z-index: 1000;\n      }\n\n      .progress-container {\n          position: absolute;\n          top: 50%;\n          left: 50%;\n          transform: translateX(-50%) translateY(-50%);\n          max-width: calc(100% - 30px);\n      }\n\n      .progress-container .progress-ring {\n          margin-left: 50%;\n          transform: translateX(-50%);\n      }\n\n      .progress-container .progress-text {\n          color: #0078D7;\n          text-align: center;\n          width: 100%;\n      }\n\n      .progress-container .progress-text > a {\n          font-size: 18px;\n      }\n    "]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvbG9hZGluZy13aGVlbC9sb2FkaW5nLXdoZWVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFlBQUEsRUFBYyxLQUFBLEVBQWtCLE1BQUEsRUFBTyxNQUFPLGVBQUEsQ0FBZ0I7QUFHbEY7SUFBQTtRQUNZLGdCQUFXLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLFlBQU8sR0FBZ0M7WUFDM0MsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLEtBQUssRUFBRSxnQkFBZ0I7U0FDMUIsQ0FBQztRQUVLLGlCQUFZLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHdEQsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUdiLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBUzFCOztXQUVHO1FBRUksZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQXVFdEUsQ0FBQztJQWpGRyxzQkFBSSx1Q0FBSTthQUFSLFVBQVMsS0FBYTtZQUNsQixLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sU0FBUyxLQUFLLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkcsQ0FBQzs7O09BQUE7SUFRRDs7T0FFRztJQUNJLDJDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBZ0VMLDRCQUFDO0FBQUQsQ0FsR0EsQUFrR0M7O0FBL0RNLGdDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFLDhyQkFjVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxpd0JBaUNSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsb0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7QUFDSyxvQ0FBYyxHQUEyQztJQUNoRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM3QixhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNqQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFHLEVBQUUsRUFBRTtJQUM1QyxhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtDQUNqQyxDQUFDIiwiZmlsZSI6ImxvYWRpbmctd2hlZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==