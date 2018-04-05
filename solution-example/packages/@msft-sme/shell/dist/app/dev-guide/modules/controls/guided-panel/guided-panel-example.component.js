import { Component } from '@angular/core';
var GuidedPanelExampleComponent = (function () {
    function GuidedPanelExampleComponent() {
    }
    GuidedPanelExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-guided-panel';
    };
    return GuidedPanelExampleComponent;
}());
export { GuidedPanelExampleComponent };
GuidedPanelExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-guided-panel-example',
                template: "\n      <div class=\"tool-container flex-layout vertical\">\n          <sme-guided-panel #panel firstPaneId=\"root\">\n              <sme-guided-pane #pane paneId=\"root\">\n                  <div>root content</div>\n                  <button (click)=\"panel.activate('pane1')\">Activate Pane 1</button>\n                  <button (click)=\"panel.activate('pane2')\">Activate Pane 2</button>\n              </sme-guided-pane>\n              <sme-guided-pane #pane paneId=\"pane1\">\n                  <div>I am pane 1</div>            \n                  <button (click)=\"panel.activate('root')\">Activate Root Pane</button>\n                  <button (click)=\"panel.activate('pane2')\">Activate Pane 2</button>\n              </sme-guided-pane>\n              <sme-guided-pane #pane paneId=\"pane2\">\n                  <div>I am pane 2</div>    \n                  <button (click)=\"panel.activate('root')\">Activate Root Pane</button>\n                  <button (click)=\"panel.activate('pane1')\">Activate Pane 1</button>\n              </sme-guided-pane>\n          </sme-guided-panel>\n      </div>\n    "
            },] },
];
/** @nocollapse */
GuidedPanelExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9ndWlkZWQtcGFuZWwvZ3VpZGVkLXBhbmVsLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSzFDO0lBQUE7SUFrQ0EsQ0FBQztJQWhDaUIsMkNBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0lBQzlCLENBQUM7SUE4Qkwsa0NBQUM7QUFBRCxDQWxDQSxBQWtDQzs7QUE3Qk0sc0NBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCxRQUFRLEVBQUUsMGxDQW9CVDthQUNKLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCwwQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJndWlkZWQtcGFuZWwtZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9