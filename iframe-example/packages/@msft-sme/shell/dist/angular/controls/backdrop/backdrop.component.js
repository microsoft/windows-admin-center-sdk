import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
var BackdropComponent = /** @class */ (function () {
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
    BackdropComponent.zIndexPerLevel = 100000;
    BackdropComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-backdrop',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none\">\n        <div class=\"sme-layout-absolute sme-position-inset-none\" (click)=\"onClick()\" [class.sme-scheme-backdrop-opaque]=\"showBackdrop\"></div>\n        <ng-content></ng-content>\n      </div>\n    "
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
    return BackdropComponent;
}());
export { BackdropComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYmFja2Ryb3AvYmFja2Ryb3AuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsWUFBQSxFQUFjLFdBQUEsRUFBYSxLQUFBLEVBQWtCLE1BQUEsRUFBc0IsTUFBTyxlQUFBLENBQWdCO0FBRzlHO0lBQUE7UUFHWSxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsWUFBTyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBR3hELFdBQU0sR0FBRyxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFrQ3JELENBQUM7SUFoQ0c7O09BRUc7SUFDSSxtQ0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsT0FBc0I7UUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDLGNBQWMsQ0FBQztRQUNuRixDQUFDO0lBQ0wsQ0FBQztJQXBCdUIsZ0NBQWMsR0FBRyxNQUFNLENBQUM7SUFxQjdDLDRCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxpUkFLVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsZ0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDSyxnQ0FBYyxHQUEyQztRQUNoRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNsQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM5QixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFHLEVBQUUsRUFBRTtLQUM1RCxDQUFDO0lBQ0Ysd0JBQUM7Q0ExQ0QsQUEwQ0MsSUFBQTtTQTFDWSxpQkFBaUIiLCJmaWxlIjoiYmFja2Ryb3AuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==