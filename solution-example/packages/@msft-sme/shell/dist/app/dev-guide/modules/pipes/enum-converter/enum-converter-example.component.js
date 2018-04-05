import { Component } from '@angular/core';
export var color;
(function (color) {
    color[color["Red"] = 0] = "Red";
    color[color["Blue"] = 1] = "Blue";
    color[color["Green"] = 2] = "Green";
})(color || (color = {}));
var EnumConverterExampleComponent = (function () {
    function EnumConverterExampleComponent() {
        this.value = color.Red;
        this.colorEnum = color;
        this.colors = [color.Red, color.Blue, color.Green];
        this.colorMap = new Map([
            [color.Red, '#F00'],
            [color.Blue, '#00F'],
            [color.Green, '#0F0']
        ]);
    }
    EnumConverterExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'smeEnumConverter';
    };
    return EnumConverterExampleComponent;
}());
export { EnumConverterExampleComponent };
EnumConverterExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-enum-converter-example',
                template: "\n      <div class=\"p-xxs tool-container\">\n          <div>\n              <label>enum-converter input</label>\n              <select [(ngModel)]=\"value\">\n                  <option [ngValue]=\"i\" *ngFor=\"let i of colors\">{{i}} - {{colorEnum[i]}}</option>\n              </select>\n          </div>\n          <div>\n              <span>Default Output:</span>\n              <span style=\"font-weight: bold\">{{ value | smeEnumConverter }}</span>\n          </div>\n          <div>\n              <span>Mapped Pipe Output:</span>\n              <span style=\"font-weight: bold\" [style.color]=\"value | smeEnumConverter : colorMap\">{{ value | smeEnumConverter : colorMap }}</span>\n          </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
EnumConverterExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9lbnVtLWNvbnZlcnRlci9lbnVtLWNvbnZlcnRlci1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUkxQyxNQUFNLENBQU4sSUFBWSxLQUlYO0FBSkQsV0FBWSxLQUFBO0lBQ1IsK0JBQU0sQ0FBQTtJQUNOLGlDQUFPLENBQUE7SUFDUCxtQ0FBUSxDQUFBO0FBQ1osQ0FBQyxFQUpXLEtBQUEsS0FBQSxLQUFBLFFBSVg7QUFHRDtJQUFBO1FBQ1csVUFBSyxHQUFVLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDekIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixXQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLGFBQVEsR0FBd0IsSUFBSSxHQUFHLENBQzFDO1lBQ0ksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztZQUNuQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1lBQ3BCLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7U0FDeEIsQ0FDSixDQUFDO0lBK0JOLENBQUM7SUE3QmlCLDZDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUM5QixDQUFDO0lBMkJMLG9DQUFDO0FBQUQsQ0F6Q0EsQUF5Q0M7O0FBMUJNLHdDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLHlDQUF5QztnQkFDbkQsUUFBUSxFQUFFLHd0QkFpQlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsNENBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiZW51bS1jb252ZXJ0ZXItZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9