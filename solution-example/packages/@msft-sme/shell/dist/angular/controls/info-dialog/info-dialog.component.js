import { Component, EventEmitter, Input, Output } from '@angular/core';
var InfoDialogComponent = (function () {
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
    return InfoDialogComponent;
}());
export { InfoDialogComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvaW5mby1kaWFsb2cvaW5mby1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVcsWUFBQSxFQUFjLEtBQUEsRUFBZSxNQUFBLEVBQU8sTUFBTyxlQUFBLENBQWdCO0FBRy9FO0lBQUE7UUFDSSwrR0FBK0c7UUFDL0csa0JBQWtCO1FBRVYsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXNDNUQsQ0FBQztJQXBDVSx5Q0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWtDTCwwQkFBQztBQUFELENBN0NBLEFBNkNDOztBQWpDTSw4QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSw2dEJBa0JUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLGtDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBQ0ssa0NBQWMsR0FBMkM7SUFDaEUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDN0IsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDNUIsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDaEMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7Q0FDN0IsQ0FBQyIsImZpbGUiOiJpbmZvLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9