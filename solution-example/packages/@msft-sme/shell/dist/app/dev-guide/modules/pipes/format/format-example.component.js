import { Component } from '@angular/core';
var FormatExampleComponent = (function () {
    function FormatExampleComponent() {
        this.formatSimple = 'Format {0} {1}';
        this.formatLinks = 'Format with {0} {1}';
        this.simple1 = 'string';
        this.simple2 = 'works';
        this.link1 = 'link';
        this.link1href = 'http://www.bing.com';
        this.link2 = 'works';
    }
    FormatExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'smeFormat';
    };
    return FormatExampleComponent;
}());
export { FormatExampleComponent };
FormatExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-format-example',
                template: "\n      <div class=\"p-xxs tool-container\">\n          <div>\n              <label>Simple Format:</label>\n              <input type=\"text\" [(ngModel)]=\"formatSimple\" />\n          </div>\n          <div class=\"m-t-xxs\">\n              <label>Simple Text 1:</label>\n              <input type=\"text\" [(ngModel)]=\"simple1\" />\n          </div>\n          <div class=\"m-t-xxs\">\n              <label>Simple Text 2:</label>\n              <input type=\"text\" [(ngModel)]=\"simple2\" />\n          </div>\n          <div class=\"m-t-xxs\">\n              <label>Link Format:</label>\n              <input type=\"text\" [(ngModel)]=\"formatLinks\" />\n          </div>\n          <div class=\"m-t-xxs\">\n              <label>Link Format Text 1:</label>\n              <input type=\"text\" [(ngModel)]=\"link1\" />\n          </div>\n          <div class=\"m-t-xxs\">\n              <label>Link Format href for Text 1:</label>\n              <input type=\"text\" [(ngModel)]=\"link1href\" />\n          </div>\n          <div class=\"m-t-xxs\">\n              <label>Link Format Text 2:</label>\n              <input type=\"text\" [(ngModel)]=\"link2\" />\n          </div>\n\n          <div class=\"m-t-xxs\" style=\"font-weight: bold\">Default Output Simple:</div>\n          <div>{{ formatSimple | smeFormat:[simple1, simple2]}}</div>\n\n          <div class=\"m-t-xxs\" style=\"font-weight: bold\">Default Output No Args:</div>\n          <div>{{ formatSimple | smeFormat}}</div>\n\n          <div class=\"m-t-xxs\" style=\"font-weight: bold\">Default Output With Links:</div>\n          <div>{{ formatLinks | smeFormat:[{text: link1, href:link1href}, link2]}}</div>\n    \n          <div class=\"m-t-xxs\" style=\"font-weight: bold\">Default Output With Links and no second arg:</div>\n          <div>{{ formatLinks | smeFormat:[{text: link1, href:link1href}]}}</div>\n\n          <div class=\"m-t-xxs\" style=\"font-weight: bold\">Format Link Html Output:</div>\n          <div [innerHTML]=\"formatLinks | smeFormat:[{text: link1, href:link1href}, link2]\"></div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
FormatExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9mb3JtYXQvZm9ybWF0LWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSzFDO0lBQUE7UUFDVyxpQkFBWSxHQUFHLGdCQUFnQixDQUFDO1FBQ2hDLGdCQUFXLEdBQUcscUJBQXFCLENBQUM7UUFDcEMsWUFBTyxHQUFHLFFBQVEsQ0FBQztRQUNuQixZQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLFVBQUssR0FBRyxNQUFNLENBQUM7UUFDZixjQUFTLEdBQUcscUJBQXFCLENBQUM7UUFDbEMsVUFBSyxHQUFHLE9BQU8sQ0FBQztJQTREM0IsQ0FBQztJQTFEaUIsc0NBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBd0RMLDZCQUFDO0FBQUQsQ0FuRUEsQUFtRUM7O0FBdkRNLGlDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLGlDQUFpQztnQkFDM0MsUUFBUSxFQUFFLG9qRUE4Q1Q7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gscUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiZm9ybWF0LWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==