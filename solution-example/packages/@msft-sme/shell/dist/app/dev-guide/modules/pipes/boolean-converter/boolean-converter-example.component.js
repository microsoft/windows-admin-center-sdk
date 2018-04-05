import { Component } from '@angular/core';
var BooleanConverterExampleComponent = (function () {
    function BooleanConverterExampleComponent() {
        this.checked = true;
        this.checkedMap = new Map([[true, 'The box is checked'], [false, 'The box is unchecked']]);
    }
    BooleanConverterExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'smeBooleanConverter';
    };
    return BooleanConverterExampleComponent;
}());
export { BooleanConverterExampleComponent };
BooleanConverterExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-boolean-converter-example',
                template: "\n      <div class=\"p-xxs tool-container\">\n          <div>\n              <label>boolean-converter input</label>\n              <input type=\"checkbox\" [checked]=\"checked\" (change)=\"checked = !checked\" />\n          </div>\n          <div>\n              <span>Default Output:</span>\n              <span style=\"font-weight: bold\">{{ checked | smeBooleanConverter }}</span>\n          </div>\n          <div>\n              <span>Mapped Pipe Output:</span>\n              <span style=\"font-weight: bold\">{{ checked | smeBooleanConverter : checkedMap }}</span>\n          </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
BooleanConverterExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9ib29sZWFuLWNvbnZlcnRlci9ib29sZWFuLWNvbnZlcnRlci1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQUFBO1FBQ1csWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGVBQVUsR0FBeUIsSUFBSSxHQUFHLENBQzdDLENBQUMsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQ2xFLENBQUM7SUE2Qk4sQ0FBQztJQTNCaUIsZ0RBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLHFCQUFxQixDQUFDO0lBQ2pDLENBQUM7SUF5QkwsdUNBQUM7QUFBRCxDQWpDQSxBQWlDQzs7QUF4Qk0sMkNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsNENBQTRDO2dCQUN0RCxRQUFRLEVBQUUsbW1CQWVUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLCtDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImJvb2xlYW4tY29udmVydGVyLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==