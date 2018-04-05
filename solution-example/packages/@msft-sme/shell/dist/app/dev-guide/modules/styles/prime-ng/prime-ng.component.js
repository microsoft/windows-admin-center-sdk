import { Component } from '@angular/core';
var PrimeNGComponent = (function () {
    function PrimeNGComponent() {
        this.data = [];
        this.nodes = [];
        this.simpleNodes = [];
        this.tableSelection = null;
        this.treeSelection = null;
        this.simpleSelection = null;
        this.nodes = this.generateData();
        this.simpleNodes = this.generateData();
    }
    PrimeNGComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Prime NG';
    };
    PrimeNGComponent.prototype.generateData = function (count, parent) {
        if (count === void 0) { count = 0; }
        var nodes = [];
        if (count < 5) {
            for (var i = 0; i < 2; i++) {
                var data = {
                    f1: this.makeId(),
                    f2: i,
                    f3: new Date((Math.random() + 1) * Date.now()).toISOString()
                };
                var node = {
                    label: data.f1,
                    data: data,
                    children: this.generateData(count + 1),
                    expanded: true
                };
                this.data.push(data);
                nodes.push(node);
            }
        }
        return nodes;
    };
    PrimeNGComponent.prototype.makeId = function () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 16; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    return PrimeNGComponent;
}());
export { PrimeNGComponent };
PrimeNGComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-prime-ng',
                template: "\n      <div class=\"stretch-absolute flex-layout\">\n          <div class=\"fixed-flex-size vertical-scroll-only border-right m-r-xxs\" style=\"width: 300px;\">\n              <h4>Simple Tree Table</h4>\n              <p-treeTable class=\"simple-tree\" [value]=\"simpleNodes\" selectionMode=\"single\" [(selection)]=\"simpleSelection\">\n                  <p-column field=\"f1\" header=\"Field 1\"></p-column>\n              </p-treeTable>\n          </div>\n          <div class=\"auto-flex-size relative\">\n              <div style=\"position: absolute;top:0;bottom:50%;left:0;right:0;\" class=\"flex-layout vertical\">\n                  <h4 class=\"fixed-flex-size\">Data Table</h4>\n                  <div class=\"auto-flex-size vertical-scroll-only\">\n                      <p-dataTable [value]=\"data\" selectionMode=\"single\" [(selection)]=\"tableSelection\">\n                          <p-column field=\"f1\" header=\"Field 1\" [sortable]=\"true\"></p-column>\n                          <p-column field=\"f2\" header=\"Field 2\" [sortable]=\"true\"></p-column>\n                          <p-column field=\"f3\" header=\"Field 3\" [sortable]=\"true\"></p-column>\n                      </p-dataTable>\n                  </div>\n              </div>\n\n              <div style=\"position: absolute;top:50%;bottom:0;left:0;right:0;\" class=\"flex-layout vertical\">\n                  <h4 class=\"fixed-flex-size\">Tree Table</h4>\n                  <div class=\"auto-flex-size vertical-scroll-only\">\n                      <p-treeTable [value]=\"nodes\" selectionMode=\"single\" [(selection)]=\"treeSelection\">\n                          <p-column field=\"f1\" header=\"Field 1\"></p-column>\n                          <p-column field=\"f2\" header=\"Field 2\"></p-column>\n                          <p-column field=\"f3\" header=\"Field 3\"></p-column>\n                      </p-treeTable>\n                  </div>\n              </div>\n          </div>\n      </div>\n    "
            },] },
];
/** @nocollapse */
PrimeNGComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvcHJpbWUtbmcvcHJpbWUtbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBTzFDO0lBY0k7UUFaTyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBZSxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBZSxFQUFFLENBQUM7UUFFN0IsbUJBQWMsR0FBUSxJQUFJLENBQUM7UUFDM0Isa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFDMUIsb0JBQWUsR0FBUSxJQUFJLENBQUM7UUFPL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQVBhLGdDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQU9NLHVDQUFZLEdBQW5CLFVBQW9CLEtBQWlCLEVBQUUsTUFBaUI7UUFBcEMsc0JBQUEsRUFBQSxTQUFpQjtRQUNqQyxJQUFJLEtBQUssR0FBZSxFQUFFLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN6QixJQUFJLElBQUksR0FBRztvQkFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDakIsRUFBRSxFQUFFLENBQUM7b0JBQ0wsRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRTtpQkFDL0QsQ0FBQztnQkFDRixJQUFJLElBQUksR0FBYTtvQkFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO29CQUNkLElBQUksRUFBRSxJQUFJO29CQUNWLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ3RDLFFBQVEsRUFBRSxJQUFJO2lCQUNqQixDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0saUNBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksUUFBUSxHQUFHLGdFQUFnRSxDQUFDO1FBRWhGLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUIsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQTBDTCx1QkFBQztBQUFELENBNUZBLEFBNEZDOztBQXpDTSwyQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSx5OERBZ0NUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLCtCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6InByaW1lLW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=