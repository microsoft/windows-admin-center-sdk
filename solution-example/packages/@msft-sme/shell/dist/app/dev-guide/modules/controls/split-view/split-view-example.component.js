import { Component } from '@angular/core';
var SplitViewExampleComponent = (function () {
    function SplitViewExampleComponent() {
    }
    return SplitViewExampleComponent;
}());
export { SplitViewExampleComponent };
SplitViewExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-split-view-example',
                template: "\n      <sme-split-view #sv>\n        <sme-split-view-pane>\n            <button (click)=\"sv.togglePane()\">Click me to toggle the pane</button>\n            <p>I'm the pane. The pane is the area that grows/shrinks.</p>\n            <p>The pane takes as much room as it needs.</p>\n            <p><b>isExpanded</b>: {{sv.isExpanded}}</p>\n            <p *ngIf=\"sv.isExpanded\">You can only see this because the pane is expanded. Because this string is longer, you'll see the pane grow when I\n              appear.</p>\n        </sme-split-view-pane>\n\n        <sme-split-view-content>\n          <div class=\"stretch-absolute\">\n            <p>I'm the content. I take up whatever room is left over.</p>\n          </div>\n        </sme-split-view-content>\n      </sme-split-view>\n    "
            },] },
];
/** @nocollapse */
SplitViewExampleComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zcGxpdC12aWV3L3NwbGl0LXZpZXctZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFHMUM7SUFBQTtJQTBCQSxDQUFDO0lBQUQsZ0NBQUM7QUFBRCxDQTFCQSxBQTBCQzs7QUExQitDLG9DQUFVLEdBQTBCO0lBQ3BGLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLHl4QkFpQlQ7YUFDSixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsd0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoic3BsaXQtdmlldy1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=