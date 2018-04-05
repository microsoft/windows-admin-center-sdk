import { Component } from '@angular/core';
var GuidedPanelExampleComponent = /** @class */ (function () {
    function GuidedPanelExampleComponent() {
    }
    GuidedPanelExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-guided-panel';
    };
    GuidedPanelExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-guided-panel-example',
                    template: "\n      <div class=\"tool-container sme-arrange-stack-v\">\n          <sme-guided-panel #panel firstPaneId=\"root\">\n              <sme-guided-pane #pane paneId=\"root\">\n                  <div>root content</div>\n                  <button (click)=\"panel.activate('pane1')\">Activate Pane 1</button>\n                  <button (click)=\"panel.activate('pane2')\">Activate Pane 2</button>\n              </sme-guided-pane>\n              <sme-guided-pane #pane paneId=\"pane1\">\n                  <div>I am pane 1</div>\n                  <button (click)=\"panel.activate('root')\">Activate Root Pane</button>\n                  <button (click)=\"panel.activate('pane2')\">Activate Pane 2</button>\n              </sme-guided-pane>\n              <sme-guided-pane #pane paneId=\"pane2\">\n                  <div>I am pane 2</div>\n                  <button (click)=\"panel.activate('root')\">Activate Root Pane</button>\n                  <button (click)=\"panel.activate('pane1')\">Activate Pane 1</button>\n              </sme-guided-pane>\n          </sme-guided-panel>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    GuidedPanelExampleComponent.ctorParameters = function () { return []; };
    return GuidedPanelExampleComponent;
}());
export { GuidedPanelExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9ndWlkZWQtcGFuZWwvZ3VpZGVkLXBhbmVsLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSzFDO0lBQUE7SUFrQ0EsQ0FBQztJQWhDaUIsMkNBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0lBQzlCLENBQUM7SUFDRSxzQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSx1Q0FBdUM7b0JBQ2pELFFBQVEsRUFBRSx5a0NBb0JUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwwQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLGtDQUFDO0NBbENELEFBa0NDLElBQUE7U0FsQ1ksMkJBQTJCIiwiZmlsZSI6Imd1aWRlZC1wYW5lbC1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=