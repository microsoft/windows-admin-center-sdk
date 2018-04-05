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
var MessageDialogComponent = (function (_super) {
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
        this.buttonText = options.buttonText;
        this.message = options.message;
        this.title = options.title;
        this.externalLink = options.externalLink;
        return result;
    };
    /**
     * The method to call when the dialog button is clicked.
     */
    MessageDialogComponent.prototype.onClick = function () {
        this.hide();
    };
    return MessageDialogComponent;
}(BaseDialogComponent));
export { MessageDialogComponent };
MessageDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-message-dialog',
                template: "\n      <sme-dialog #dialog dialogMode=\"centered\">\n        <sme-dialog-header>\n          <h4>{{title}}</h4>\n        </sme-dialog-header>\n        <sme-dialog-content>\n          <p>{{message}}</p>\n          <a *ngIf=\"externalLink\" href=\"{{externalLink.url}}\" target=\"_blank\">{{externalLink.title}}</a>\n        </sme-dialog-content>\n        <sme-dialog-footer>\n          <div class=\"pull-right\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClick()\">{{buttonText}}</button>\n          </div>\n        </sme-dialog-footer>\n      </sme-dialog>\n    ",
                styles: ["\n      .pane {\n          position: absolute;\n          top: 0;\n          bottom: 0;\n          right: 0;\n      }\n\n      .pane.full-screen .modal-content {\n          width: 100%;\n          border: 0px;\n      }\n\n      .pane .modal-content {\n        height: 100%;\n        width: 520px;\n        overflow-y: auto;\n        margin: 0px;\n        border-top-width: 0px;\n        border-bottom-width: 0px;\n        border-right-width: 0px;\n      }\n\n      .modal-content {\n        padding: 0;\n      }\n\n      .modal-dialog .modal-body {\n        max-height: 540px;\n        overflow-y: auto;\n        overflow-x: hidden;\n      }\n\n      .modal-body {\n        margin: 0px 0px 0px 36px;\n        padding: 0px 36px 0px 0px;\n      }\n\n      .modal-header {\n        padding: 24px 36px 0 36px;\n      }\n\n      .modal-footer {\n        padding: 0 36px 24px 36px;\n      }\n      :host >>> .modal-footer .btn {\n        width: auto;\n        margin: 4px 8px 0px 0px\n      }\n\n      :host >>> h1,\n      :host >>> h2,\n      :host >>> h3,\n      :host >>> h4,\n      :host >>> h5,\n      :host >>> h6 {\n        padding-top: 0;\n        padding-bottom: 36px;\n      }\n\n      :host >>> p {\n        padding-top: 0;\n        padding-bottom: 15px;\n      }\n\n      /*:host >>> .form-group .form-group-label,\n      :host >>> .form-group label {\n        font-size: 13px;\n      }*/\n\n      :host >>> .dialog-scrollable-content {\n        max-height: 30vh;\n        overflow-y: auto;\n        margin-bottom: 2px;\n      }\n\n      :host.no-footer .modal-content .modal-footer {\n        display: none;\n      }\n\n      :host >>> .list-dialog-header,\n      :host >>> .list-dialog-footer {\n        padding-bottom: 0;\n      }\n    "]
            },] },
];
/** @nocollapse */
MessageDialogComponent.ctorParameters = function () { return [
    { type: DialogService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZGlhbG9nL21lc3NhZ2UtZGlhbG9nL21lc3NhZ2UtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBaUIsTUFBTyxlQUFBLENBQWdCO0FBRWpELE9BQU8sRUFBRSxtQkFBQSxFQUFpRCxNQUFPLDBCQUFBLENBQTJCO0FBQzVGLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyxtQkFBQSxDQUFvQjtBQXdDbEQ7SUFBNEMsMENBQXVEO0lBTS9GOztPQUVHO0lBQ0gsZ0NBQVksYUFBNEI7ZUFDcEMsa0JBQU0sYUFBYSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHFDQUFJLEdBQVgsVUFBWSxPQUE2QjtRQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7UUFDN0YsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLGlCQUFNLElBQUksWUFBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFFekMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSSx3Q0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUErR0wsNkJBQUM7QUFBRCxDQXJKQSxBQXFKQyxDQXJKMkMsbUJBQW1COztBQXVDeEQsaUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUUscWxCQWVUO2dCQUNELE1BQU0sRUFBRSxDQUFDLG10REFvRlIsQ0FBQzthQUNMLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxxQ0FBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO0NBQ3RCLEVBRjZGLENBRTdGLENBQUMiLCJmaWxlIjoibWVzc2FnZS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==