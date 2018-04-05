import { Component } from '@angular/core';
var BooleanConverterExampleComponent = /** @class */ (function () {
    function BooleanConverterExampleComponent() {
        this.checked = true;
        this.checkedMap = new Map([[true, 'The box is checked'], [false, 'The box is unchecked']]);
    }
    BooleanConverterExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'smeBooleanConverter';
    };
    BooleanConverterExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-boolean-converter-example',
                    template: "\n      <div class=\"p-xxs tool-container\">\n          <div>\n              <label>boolean-converter input</label>\n              <input type=\"checkbox\" [checked]=\"checked\" (change)=\"checked = !checked\" />\n          </div>\n          <div>\n              <span>Default Output:</span>\n              <span style=\"font-weight: bold\">{{ checked | smeBooleanConverter }}</span>\n          </div>\n          <div>\n              <span>Mapped Pipe Output:</span>\n              <span style=\"font-weight: bold\">{{ checked | smeBooleanConverter : checkedMap }}</span>\n          </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    BooleanConverterExampleComponent.ctorParameters = function () { return []; };
    return BooleanConverterExampleComponent;
}());
export { BooleanConverterExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9ib29sZWFuLWNvbnZlcnRlci9ib29sZWFuLWNvbnZlcnRlci1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQUFBO1FBQ1csWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGVBQVUsR0FBeUIsSUFBSSxHQUFHLENBQzdDLENBQUMsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQ2xFLENBQUM7SUE2Qk4sQ0FBQztJQTNCaUIsZ0RBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLHFCQUFxQixDQUFDO0lBQ2pDLENBQUM7SUFDRSwyQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSw0Q0FBNEM7b0JBQ3RELFFBQVEsRUFBRSxtbUJBZVQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsdUNBQUM7Q0FqQ0QsQUFpQ0MsSUFBQTtTQWpDWSxnQ0FBZ0MiLCJmaWxlIjoiYm9vbGVhbi1jb252ZXJ0ZXItZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9