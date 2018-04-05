var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ElementRef } from '@angular/core';
import { AppContextService } from '../../../../angular';
import { CachedFramesBase } from '../cached-frames-base';
import { IFrameService } from '../iframe.service';
var CachedFramesComponent = /** @class */ (function (_super) {
    __extends(CachedFramesComponent, _super);
    function CachedFramesComponent(appContextService, elementRef, iFrameService) {
        return _super.call(this, appContextService, elementRef, iFrameService, CachedFramesComponent.cachedFrameId, CachedFramesComponent.numberOfFrames) || this;
    }
    CachedFramesComponent.cachedFrameId = 1;
    CachedFramesComponent.numberOfFrames = 4;
    CachedFramesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-cached-frames',
                    template: "\n    <div class=\"sme-layout-absolute sme-position-inset-none inserted-frame\">\n      <iframe class=\"{{frameCollection[0].class}}\" allowfullscreen></iframe>\n      <iframe class=\"{{frameCollection[1].class}}\" allowfullscreen></iframe>\n      <iframe class=\"{{frameCollection[2].class}}\" allowfullscreen></iframe>\n      <iframe class=\"{{frameCollection[3].class}}\" allowfullscreen></iframe>\n    </div>\n    ",
                    styles: ["\n      .inserted-frame {\n          width: 100%;\n          height: 100%;\n          border: none;\n          padding: 0;\n          margin: 0;\n          overflow: hidden;\n          position: absolute;\n          top: 0;\n          left: 0;\n      }\n\n      .display-none-frame {\n          display: none;\n      }\n\n      .display-block-frame {\n          display: block;\n      }\n\n      .iframe-error {\n          position: absolute;\n          top: 0;\n          left: 0;\n          z-index: 1;\n      }\n\n      .iframe-error > h4 {\n          font-size: 24px;\n          line-height: 1;\n          padding-left: 20px;\n          padding-top: 20px;\n          padding-bottom: 14px;\n      }\n\n      .iframe-error > button {\n          margin-left: 20px;\n          margin-bottom: 20px;\n      }\n\n      .iframe-error > h5 {\n          font-size: 20px;\n          line-height: 1;\n          padding-left: 20px;\n          padding-top: 10px;\n          padding-bottom: 0px;\n      }\n\n      .iframe-error > pre {\n          font-size: 14px;\n          padding-top: 10px;\n          padding-right: 40px;\n          padding-bottom: 20px;\n          padding-left: 40px;\n          background: white;\n          color: black;\n          border: 0;\n          white-space: pre-wrap;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    CachedFramesComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: ElementRef, },
        { type: IFrameService, },
    ]; };
    return CachedFramesComponent;
}(CachedFramesBase));
export { CachedFramesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2lmcmFtZS9jYWNoZWQtZnJhbWVzL2NhY2hlZC1mcmFtZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFVBQUEsRUFBOEIsTUFBTyxlQUFBLENBQWdCO0FBQ3pFLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHFCQUFBLENBQXNCO0FBQ3hELE9BQU8sRUFBRSxnQkFBQSxFQUFpQixNQUFPLHVCQUFBLENBQXdCO0FBQ3pELE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyxtQkFBQSxDQUFvQjtBQUdsRDtJQUEyQyx5Q0FBZ0I7SUFJdkQsK0JBQ1EsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLGFBQTRCO2VBQ2hDLGtCQUFNLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUscUJBQXFCLENBQUMsYUFBYSxFQUFFLHFCQUFxQixDQUFDLGNBQWMsQ0FBQztJQUNsSSxDQUFDO0lBUmEsbUNBQWEsR0FBRyxDQUFDLENBQUM7SUFDbEIsb0NBQWMsR0FBRyxDQUFDLENBQUM7SUFROUIsZ0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsb2FBT1Q7b0JBQ0QsTUFBTSxFQUFFLENBQUMsMHhDQTREUixDQUFDO2lCQUNMLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxvQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztLQUN0QixFQUo2RixDQUk3RixDQUFDO0lBQ0YsNEJBQUM7Q0ExRkQsQUEwRkMsQ0ExRjBDLGdCQUFnQixHQTBGMUQ7U0ExRlkscUJBQXFCIiwiZmlsZSI6ImNhY2hlZC1mcmFtZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==