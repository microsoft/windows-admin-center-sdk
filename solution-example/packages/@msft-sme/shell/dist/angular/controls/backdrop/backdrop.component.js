import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
var BackdropComponent = (function () {
    function BackdropComponent() {
        this.showBackdrop = true;
        this.level = 1;
        this.clicked = new EventEmitter();
        this.zindex = BackdropComponent.zIndexPerLevel;
    }
    /**
     * emits clicked event
     */
    BackdropComponent.prototype.onClick = function () {
        this.clicked.emit();
    };
    BackdropComponent.prototype.ngOnChanges = function (changes) {
        if (changes['level'] !== undefined) {
            this.zindex = changes['level'].currentValue * BackdropComponent.zIndexPerLevel;
        }
    };
    return BackdropComponent;
}());
export { BackdropComponent };
BackdropComponent.zIndexPerLevel = 100000;
BackdropComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-backdrop',
                template: "\n      <div class=\"stretch-absolute\">\n        <div class=\"stretch-absolute\" (click)=\"onClick()\" [class.opaque]=\"showBackdrop\"></div>\n        <ng-content></ng-content>\n      </div>\n    ",
                styles: ["\n\n      .opaque {\n        opacity: .4;\n        background: #262626;\n      }\n    "]
            },] },
];
/** @nocollapse */
BackdropComponent.ctorParameters = function () { return []; };
BackdropComponent.propDecorators = {
    'showBackdrop': [{ type: Input },],
    'level': [{ type: Input },],
    'clicked': [{ type: Output },],
    'zindex': [{ type: HostBinding, args: ['style.z-index',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYmFja2Ryb3AvYmFja2Ryb3AuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsWUFBQSxFQUFjLFdBQUEsRUFBYSxLQUFBLEVBQWtCLE1BQUEsRUFBc0IsTUFBTyxlQUFBLENBQWdCO0FBRzlHO0lBQUE7UUFHWSxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsWUFBTyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBR3hELFdBQU0sR0FBRyxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7SUF5Q3JELENBQUM7SUF2Q0c7O09BRUc7SUFDSSxtQ0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsT0FBc0I7UUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDLGNBQWMsQ0FBQztRQUNuRixDQUFDO0lBQ0wsQ0FBQztJQTRCTCx3QkFBQztBQUFELENBakRBLEFBaURDOztBQWhEMkIsZ0NBQWMsR0FBRyxNQUFNLENBQUM7QUFxQjdDLDRCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSx1TUFLVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyx3RkFNUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLGdDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBQ0ssZ0NBQWMsR0FBMkM7SUFDaEUsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDbEMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDOUIsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRyxFQUFFLEVBQUU7Q0FDNUQsQ0FBQyIsImZpbGUiOiJiYWNrZHJvcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9