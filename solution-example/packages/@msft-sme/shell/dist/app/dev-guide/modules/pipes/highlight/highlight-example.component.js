import { Component } from '@angular/core';
var HighlightExampleComponent = (function () {
    function HighlightExampleComponent() {
        this.text = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere libero et quam dapibus facilisis. \nPhasellus scelerisque viverra sapien, vel fermentum elit tristique quis. Ut eu convallis velit. \nDonec tristique mauris sit amet quam ultrices dignissim. Nulla egestas magna vitae viverra consequat. \nSed interdum mattis pulvinar. Proin elementum in quam sit amet interdum. Sed tristique metus iaculis sodales suscipit. \nVestibulum metus justo, vehicula egestas dapibus quis, pharetra id neque.\n\nMauris elementum odio non massa blandit, quis ullamcorper lectus pretium. \nDonec varius, leo ac viverra sollicitudin, diam urna feugiat mi, non placerat sapien elit at metus. \nUt euismod tempus tellus, sit amet placerat erat sagittis commodo. \nSed sagittis pellentesque felis, non pellentesque ligula fringilla aliquam. Nam laoreet pharetra dui eget placerat. \nPellentesque vel dolor turpis. Nulla vel interdum ipsum. In eu tincidunt velit, vitae accumsan risus. \nDuis et nibh eleifend, auctor enim laoreet, venenatis felis. In felis ipsum, laoreet eget scelerisque eget, lacinia at sem. \nCras quis lacus vitae turpis congue semper in eu orci. Nulla tortor mauris, dictum ac arcu sed, dapibus tristique urna. \nPellentesque bibendum dui aliquam tellus viverra mattis.\n";
        this.search = 'qu';
        this.class = 'p-l-xxxs p-r-xxxs border-all';
    }
    HighlightExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'smeHighlight';
    };
    return HighlightExampleComponent;
}());
export { HighlightExampleComponent };
HighlightExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-highlight-example',
                template: "\n      <div class=\"p-xxs tool-container\">\n          <div>\n              <label>Input:</label>\n              <input type=\"text\" [(ngModel)]=\"text\" />\n          </div>\n          <div class=\"m-t-xxs\">\n              <label>Search:</label>\n              <input type=\"text\" [(ngModel)]=\"search\" />\n          </div>\n          <div class=\"m-t-xxs\">\n              <label>Highlight Class:</label>\n              <input type=\"text\" [(ngModel)]=\"class\" />\n          </div>\n\n          <div class=\"m-t-xxs\" style=\"font-weight: bold\">Default Output:</div>\n          <div>{{ text | smeHighlight }}</div>\n\n          <div class=\"m-t-xxs\" style=\"font-weight: bold\">Search Output:</div>\n          <div [innerHTML]=\"text | smeHighlight : search\"></div>\n\n          <div class=\"m-t-xxs\" style=\"font-weight: bold\">Custom Class Output:</div>\n          <div [innerHTML]=\"text | smeHighlight : search : class\"></div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
HighlightExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9oaWdobGlnaHQvaGlnaGxpZ2h0LWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSzFDO0lBQUE7UUFDVyxTQUFJLEdBQUcsdXdDQWVqQixDQUFDO1FBQ1MsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLFVBQUssR0FBRyw4QkFBOEIsQ0FBQztJQXNDbEQsQ0FBQztJQXBDaUIseUNBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBa0NMLGdDQUFDO0FBQUQsQ0F4REEsQUF3REM7O0FBakNNLG9DQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsUUFBUSxFQUFFLHM4QkF3QlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsd0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiaGlnaGxpZ2h0LWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==