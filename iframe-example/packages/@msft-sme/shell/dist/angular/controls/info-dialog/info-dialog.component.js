import { Component, EventEmitter, Input, Output } from '@angular/core';
var InfoDialogComponent = /** @class */ (function () {
    function InfoDialogComponent() {
        // TODO: make this class take in a specific object structure so users can use one componenet for multiple types
        // TODO: add icons
        this.message = '';
        this.header = '';
        this.buttonText = '';
        this.onClick = new EventEmitter();
    }
    InfoDialogComponent.prototype.handleClick = function () {
        this.onClick.emit();
    };
    InfoDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-info-dialog',
                    template: "\n      <div class=\"error-cover\">\n          <div class=\"modal-dialog modal-sm\">\n              <div class=\"modal-content\">\n                  <div class=\"modal-header\">\n                      <div class=\"modal-title\">{{ header }}</div>\n                  </div>\n                  <div class=\"modal-body\">\n                      <p>{{ message }}</p>\n                  </div>\n                  <div class=\"modal-footer\">\n                      <div class=\"pull-right\">\n                          <button type=\"button\" class=\"btn btn-primary\" (click)=\"handleClick()\">{{ buttonText }}</button>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    InfoDialogComponent.ctorParameters = function () { return []; };
    InfoDialogComponent.propDecorators = {
        'message': [{ type: Input },],
        'header': [{ type: Input },],
        'buttonText': [{ type: Input },],
        'onClick': [{ type: Output },],
    };
    return InfoDialogComponent;
}());
export { InfoDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvaW5mby1kaWFsb2cvaW5mby1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsWUFBQSxFQUFjLEtBQUEsRUFBZSxNQUFBLEVBQU8sTUFBTyxlQUFBLENBQWdCO0FBRy9FO0lBQUE7UUFDSSwrR0FBK0c7UUFDL0csa0JBQWtCO1FBRVYsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXNDNUQsQ0FBQztJQXBDVSx5Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNFLDhCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLDZ0QkFrQlQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0ssa0NBQWMsR0FBMkM7UUFDaEUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDN0IsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDNUIsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7S0FDN0IsQ0FBQztJQUNGLDBCQUFDO0NBN0NELEFBNkNDLElBQUE7U0E3Q1ksbUJBQW1CIiwiZmlsZSI6ImluZm8tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=