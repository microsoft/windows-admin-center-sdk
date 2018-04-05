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
import { AppContextService, BaseDialogComponent, DialogService } from '../../../../angular';
var LoadingConnectionDialogComponent = /** @class */ (function (_super) {
    __extends(LoadingConnectionDialogComponent, _super);
    /**
     * Initializes a new instance of the Help Pane class.
     */
    function LoadingConnectionDialogComponent(dialogService, appContextService) {
        var _this = _super.call(this, dialogService) || this;
        _this.appContextService = appContextService;
        _this.strings = MsftSme.resourcesStrings().MsftSmeShell;
        _this.id = LoadingConnectionDialogComponent.dialogComponentId;
        return _this;
    }
    LoadingConnectionDialogComponent.prototype.onCancel = function () {
        this.hide({
            confirmed: false
        });
    };
    LoadingConnectionDialogComponent.dialogComponentId = 'loading-connection-dialog';
    LoadingConnectionDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-loading-connection-dialog',
                    template: "\n      <sme-dialog #dialog dialogMode=\"compact-square\">\n          <sme-dialog-header>\n              <h2 id=\"sme-dialog-title\">{{strings.App.Connections.serverStatus.connecting}}</h2>\n          </sme-dialog-header>\n          <sme-dialog-content>\n              <sme-loading-wheel></sme-loading-wheel>\n          </sme-dialog-content>\n          <sme-dialog-footer>\n          <button type=\"button\" class=\"sme-button-primary\" (click)=\"onCancel()\">{{strings.Angular.Common.cancel}}</button>\n        </sme-dialog-footer>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingConnectionDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
        { type: AppContextService, },
    ]; };
    return LoadingConnectionDialogComponent;
}(BaseDialogComponent));
export { LoadingConnectionDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvbG9hZGluZy1jb25uZWN0aW9uLWRpYWxvZy9sb2FkaW5nLWNvbm5lY3Rpb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBdUMsTUFBTyxlQUFBLENBQWdCO0FBR3ZFLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsbUJBQW1CLEVBR25CLGFBQWEsRUFDaEIsTUFBTSxxQkFBQSxDQUFzQjtBQUk3QjtJQUFzRCxvREFBZ0Q7SUFLbEc7O09BRUc7SUFDSCwwQ0FBWSxhQUE0QixFQUFVLGlCQUFvQztRQUF0RixZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQUV2QjtRQUhpRCx1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTC9FLGFBQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxZQUFZLENBQUM7UUFPOUQsS0FBSSxDQUFDLEVBQUUsR0FBRyxnQ0FBZ0MsQ0FBQyxpQkFBaUIsQ0FBQzs7SUFDakUsQ0FBQztJQUVNLG1EQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWhCYSxrREFBaUIsR0FBRywyQkFBMkIsQ0FBQztJQWlCM0QsMkNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxRQUFRLEVBQUUsaWpCQVlUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsYUFBYSxHQUFHO1FBQ3ZCLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0tBQzFCLEVBSDZGLENBRzdGLENBQUM7SUFDRix1Q0FBQztDQXpDRCxBQXlDQyxDQXpDcUQsbUJBQW1CLEdBeUN4RTtTQXpDWSxnQ0FBZ0MiLCJmaWxlIjoibG9hZGluZy1jb25uZWN0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9