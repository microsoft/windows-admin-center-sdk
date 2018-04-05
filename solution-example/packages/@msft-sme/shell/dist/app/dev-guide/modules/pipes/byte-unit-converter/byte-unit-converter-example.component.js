import { Component } from '@angular/core';
var ByteUnitConverterExampleComponent = (function () {
    function ByteUnitConverterExampleComponent() {
        this.value = 1234567890;
    }
    ByteUnitConverterExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'smeBooleanConverter';
    };
    return ByteUnitConverterExampleComponent;
}());
export { ByteUnitConverterExampleComponent };
ByteUnitConverterExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-byte-unit-converter-example',
                template: "\n      <div class=\"p-xxs tool-container\">\n          <div>\n              <label>byte-unit-converter input (number)</label>\n              <input type=\"text\" [(ngModel)]=\"value\" />\n          </div>\n          <div>\n              <span>1024 Base Output:</span>\n              <span style=\"font-weight: bold\">{{ value | smeByteUnitConverter:1024 }}</span>\n          </div>    \n    \n          <div class=\"m-t-xxs\">\n              <span>1000 Base Output:</span>\n              <span style=\"font-weight: bold\">{{ value | smeByteUnitConverter:1000 }}</span>\n          </div>  \n      </div>\n    "
            },] },
];
/** @nocollapse */
ByteUnitConverterExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9ieXRlLXVuaXQtY29udmVydGVyL2J5dGUtdW5pdC1jb252ZXJ0ZXItZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLMUM7SUFBQTtRQUVXLFVBQUssR0FBRyxVQUFVLENBQUM7SUE4QjlCLENBQUM7SUE1QmlCLGlEQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztJQUNqQyxDQUFDO0lBMEJMLHdDQUFDO0FBQUQsQ0FoQ0EsQUFnQ0M7O0FBekJNLDRDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLDhDQUE4QztnQkFDeEQsUUFBUSxFQUFFLG1tQkFnQlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsZ0RBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiYnl0ZS11bml0LWNvbnZlcnRlci1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=