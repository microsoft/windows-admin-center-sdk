import { Component } from '@angular/core';
var ColorsComponent = /** @class */ (function () {
    function ColorsComponent() {
        this.namedColors = ['base', 'alt', 'accent'];
        this.baseColors = ['white', 'black', 'blue', 'purple', 'magenta', 'red', 'orange', 'yellow', 'green', 'teal', 'dark-blue'];
        this.mixes = [90, 80, 70, 60, 50, 40, 30, 20, 15, 10, 5];
    }
    ColorsComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Colors';
    };
    ColorsComponent.prototype.getColorName = function (color) {
        return color.charAt(0).toUpperCase() + color.slice(1);
    };
    ColorsComponent.prototype.getColorClasses = function (color, mix) {
        var classString = mix ? color + "-" + mix : color;
        return ".sme-color-" + classString + "\n.sme-background-color-" + classString + "\n.sme-border-color-" + classString + "\n.sme-border-top-color-" + classString + "\n.sme-border-left-color-" + classString + "\n.sme-border-bottom-color-" + classString + "\n.sme-border-right-color-" + classString;
    };
    ColorsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-colors',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-documentation\">\n        <h1>Colors</h1>\n        <section>\n          <p>\n            <span>In general,</span>\n            <a class=\"sme-link\" routerLink=\"/dev/styles/schemes\">Schemes</a>\n            <span>should be used instead of these color utilities.</span>\n          </p>\n          <p>Hover over a color to get the classes accosiated with it</p>\n        </section>\n        <h2>Named Colors</h2>\n        <section>\n          <p>These colors change with the current theme.</p>\n          <div *ngFor=\"let color of namedColors\">\n            <h3>{{getColorName(color)}}</h3>\n            <div class=\"sme-arrange-stack-h sme-margin-bottom-sm\">\n              <div class=\"sme-square-md\" [ngClass]=\"'sme-background-color-' + color\" [title]=\"getColorClasses(color)\"></div>\n              <div *ngFor=\"let mix of mixes\" class=\"sme-square-md\" [ngClass]=\"'sme-background-color-' + color + '-' + mix\" [title]=\"getColorClasses(color, mix)\"></div>\n            </div>\n          </div>\n        </section>\n        <h2>Base Colors</h2>\n        <section>\n          <p>These colors do not change with the current theme.</p>\n          <div *ngFor=\"let color of baseColors\">\n            <h3>{{getColorName(color)}}</h3>\n            <div class=\"sme-arrange-stack-h sme-margin-bottom-sm\">\n              <div class=\"sme-square-md\" [ngClass]=\"'sme-background-color-' + color\" [title]=\"getColorClasses(color)\"></div>\n              <div *ngFor=\"let mix of mixes\" class=\"sme-square-md\" [ngClass]=\"'sme-background-color-' + color + '-' + mix\" [title]=\"getColorClasses(color, mix)\"></div>\n            </div>\n          </div>\n        </section>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorsComponent.ctorParameters = function () { return []; };
    return ColorsComponent;
}());
export { ColorsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvY29sb3JzL2NvbG9ycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFLMUM7SUFBQTtRQUVXLGdCQUFXLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLGVBQVUsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN0SCxVQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUErRC9ELENBQUM7SUE3RGlCLCtCQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVNLHNDQUFZLEdBQW5CLFVBQW9CLEtBQWE7UUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRU0seUNBQWUsR0FBdEIsVUFBdUIsS0FBYSxFQUFFLEdBQVk7UUFDOUMsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBSSxLQUFLLFNBQUksR0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxDQUFDLGdCQUFjLFdBQVcsZ0NBQ2hCLFdBQVcsNEJBQ2YsV0FBVyxnQ0FDUCxXQUFXLGlDQUNWLFdBQVcsbUNBQ1QsV0FBVyxrQ0FDWixXQUFhLENBQUE7SUFDbkMsQ0FBQztJQUNFLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDZ1REFrQ1Q7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysc0JBQUM7Q0FuRUQsQUFtRUMsSUFBQTtTQW5FWSxlQUFlIiwiZmlsZSI6ImNvbG9ycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9