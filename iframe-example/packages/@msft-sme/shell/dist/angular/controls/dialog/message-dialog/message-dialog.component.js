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
import { Component } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog.component';
import { DialogService } from '../dialog.service';
var MessageDialogComponent = /** @class */ (function (_super) {
    __extends(MessageDialogComponent, _super);
    /**
     * Initializes a new instance of the MessageDialogComponent class.
     */
    function MessageDialogComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    MessageDialogComponent.prototype.show = function (options) {
        if (!options) {
            throw new Error('MessageDialogComponent.show: Options are required to show the dialog.');
        }
        var result = _super.prototype.show.call(this, options);
        this.checkboxResult = false;
        this.buttonText = options.buttonText;
        this.checkboxText = options.checkboxText;
        this.message = options.message;
        this.title = options.title;
        this.externalLink = options.externalLink;
        return result;
    };
    /**
     * The method to call when the dialog button is clicked.
     */
    MessageDialogComponent.prototype.onClick = function () {
        this.hide({
            checkboxResult: this.checkboxResult
        });
    };
    MessageDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-message-dialog',
                    template: "\n      <sme-dialog #dialog dialogMode=\"centered\">\n          <sme-dialog-header>\n              <h2 id=\"sme-dialog-title\">{{title}}</h2>\n          </sme-dialog-header>\n          <sme-dialog-content>\n              <p id=\"sme-dialog-desc\">{{message}}</p>\n              <a *ngIf=\"externalLink\" class=\"sme-link\" href=\"{{externalLink.url}}\" target=\"_blank\">{{externalLink.title}}</a>\n              <div class=\"checkbox\" *ngIf=\"checkboxText\">\n                  <label>\n              <input type=\"checkbox\" [(ngModel)]=\"checkboxResult\"/>\n              <span>{{checkboxText}}</span>\n            </label>\n              </div>\n          </sme-dialog-content>\n          <sme-dialog-footer>\n              <button type=\"button\" class=\"sme-button-primary\" (click)=\"onClick()\">{{buttonText}}</button>\n          </sme-dialog-footer>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    MessageDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    return MessageDialogComponent;
}(BaseDialogComponent));
export { MessageDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL21lc3NhZ2UtZGlhbG9nL21lc3NhZ2UtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBaUIsTUFBTyxlQUFBLENBQWdCO0FBRWpELE9BQU8sRUFBRSxtQkFBQSxFQUFpRCxNQUFPLDBCQUFBLENBQTJCO0FBQzVGLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyxtQkFBQSxDQUFvQjtBQTJEbEQ7SUFBNEMsMENBQThEO0lBK0J0Rzs7T0FFRztJQUNILGdDQUFZLGFBQTRCO2VBQ3BDLGtCQUFNLGFBQWEsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxxQ0FBSSxHQUFYLFVBQVksT0FBNkI7UUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1FBQzdGLENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBRyxpQkFBTSxJQUFJLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUV6QyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLHdDQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3RDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRSxpQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSx3M0JBbUJUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxxQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO0tBQ3RCLEVBRjZGLENBRTdGLENBQUM7SUFDRiw2QkFBQztDQWpHRCxBQWlHQyxDQWpHMkMsbUJBQW1CLEdBaUc5RDtTQWpHWSxzQkFBc0IiLCJmaWxlIjoibWVzc2FnZS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==