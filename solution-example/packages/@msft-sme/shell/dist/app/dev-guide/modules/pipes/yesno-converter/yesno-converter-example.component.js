import { Component } from '@angular/core';
var YesNoConverterExampleComponent = (function () {
    function YesNoConverterExampleComponent() {
        this.checked = true;
    }
    YesNoConverterExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'smeBooleanToYesNoConverter';
    };
    return YesNoConverterExampleComponent;
}());
export { YesNoConverterExampleComponent };
YesNoConverterExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-yesno-converter-example',
                template: "\n      <div class=\"p-xxs tool-container\">\n          <div>\n              <label>yesno-converter input</label>\n              <input type=\"checkbox\" [checked]=\"checked\" (change)=\"checked = !checked\" />\n          </div>\n          <div>\n              <span>IsChecked Output:</span>\n              <span style=\"font-weight: bold\">{{ checked | smeBooleanToYesNoConverter }}</span>\n          </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
YesNoConverterExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy95ZXNuby1jb252ZXJ0ZXIveWVzbm8tY29udmVydGVyLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSzFDO0lBQUE7UUFDVyxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBeUIxQixDQUFDO0lBdkJpQiw4Q0FBZSxHQUE3QixVQUE4QixpQkFBb0MsRUFBRSxRQUFnQztRQUNoRyxNQUFNLENBQUMsNEJBQTRCLENBQUM7SUFDeEMsQ0FBQztJQXFCTCxxQ0FBQztBQUFELENBMUJBLEFBMEJDOztBQXBCTSx5Q0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSwwQ0FBMEM7Z0JBQ3BELFFBQVEsRUFBRSw4YUFXVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCw2Q0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJ5ZXNuby1jb252ZXJ0ZXItZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9