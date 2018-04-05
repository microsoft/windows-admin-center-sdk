import { Component, ElementRef, EventEmitter } from '@angular/core';
import { RpcInboundCommands } from '../../../../../core';
import { IFrameService } from '../../../iframe/iframe.service';
var AddConnectionFrameComponent = (function () {
    function AddConnectionFrameComponent(appContextService, elementRef, iFrameService) {
        this.appContextService = appContextService;
        this.elementRef = elementRef;
        this.iFrameService = iFrameService;
        this.emitResult = new EventEmitter();
        this.setIdOfFrames = 101;
        this.routerHandles = {
            /**
             * Handle navigation end event.
             *
             * @param event the navigation end event.
             * @param route the activated route.
             * @param router the router.
             * @param frameData the frame data object.
             * @return string return open path to call Rpc, return null if not handling.
             */
            navigationEndHandler: function (event, moduleLoopbackUrl, route, router, frameData) {
                return false;
            },
            /**
             * Get path within the child iframe.
             *
             * @param route the activated route.
             * @param router the router.
             * @param frameData the frame data object.
             * @return string return open path to call Rpc, return null if it cannot determine.
             */
            getInnerPath: function (route, router, frameData) {
                return null;
            }
        };
        // create a frame set entry with ID=101, single frame, empty router handlers because this is not primary routing.
        this.iFrameService.init(this.setIdOfFrames, 1, false, this.routerHandles);
    }
    Object.defineProperty(AddConnectionFrameComponent.prototype, "ready", {
        get: function () {
            return this.frameData != null;
        },
        enumerable: true,
        configurable: true
    });
    AddConnectionFrameComponent.prototype.open = function (connectionType) {
        var _this = this;
        this.connectionType = connectionType;
        var element = document.createElement('iframe');
        element.setAttribute('class', 'stretch-absolute');
        this.elementRef.nativeElement.appendChild(element);
        if (element.contentWindow) {
            this.start(element);
        }
        else {
            element.onload = function () { return _this.start(element); };
        }
    };
    AddConnectionFrameComponent.prototype.close = function () {
        if (this.updateDataSubscription) {
            this.updateDataSubscription.unsubscribe();
            this.updateDataSubscription = null;
        }
        if (this.frameData) {
            var frameData = this.frameData;
            var element_1 = frameData.element;
            this.frameData = null;
            element_1.setAttribute('display', 'none');
            this.iFrameService.closeSingle(frameData).subscribe(function () { return element_1.remove(); });
        }
    };
    AddConnectionFrameComponent.prototype.start = function (element) {
        var _this = this;
        // connectionType determine the module / entryPoint to load.
        element.onload = null;
        this.frame = element.contentWindow;
        var openData = this.getConnectionTypeData(this.connectionType);
        this.iFrameService.openSingle(openData.moduleName, openData.entryPoint, openData.openPath, element, this.frame, this.setIdOfFrames)
            .subscribe(function (data) { return _this.frameData = data; });
        if (!this.updateDataSubscription) {
            this.updateDataSubscription = this.appContextService.rpc.moduleSubjects(RpcInboundCommands.UpdateData)
                .subscribe(function (data) { return _this.emitResult.emit(data.data); });
        }
    };
    AddConnectionFrameComponent.prototype.getConnectionTypeData = function (connectionType) {
        var moduleName;
        var entryPoint;
        var openPath;
        var global = window;
        var modules = global.MsftSme.Environment.modules;
        for (var i = 0; i < modules.length; i++) {
            var module_1 = modules[i];
            var found = module_1.entryPoints.find(function (x) { return x.entryPointType === 'connectionProvider' && x.connectionType === connectionType; });
            if (found) {
                return {
                    moduleName: module_1.name,
                    entryPoint: found,
                    openPath: found.path
                };
            }
        }
        return null;
    };
    return AddConnectionFrameComponent;
}());
export { AddConnectionFrameComponent };
AddConnectionFrameComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-add-connection-frame',
                template: '<div class="stretch-absolute"></div>',
                styles: ["\n      .inserted-frame {\n          width: 100%;\n          height: 100%;\n          border: none;\n          padding: 0;\n          margin: 0;\n          overflow: hidden;\n          position: absolute;\n          top: 0;\n          left: 0;\n      }\n\n      .display-none-frame {\n          display: none;\n      }\n\n      .display-block-frame {\n          display: block;\n      }\n\n      .iframe-error {\n          position: absolute;\n          top: 0;\n          left: 0;\n          z-index: 1;\n      }\n\n      .iframe-error > h4 {\n          font-size: 24px;\n          line-height: 1;\n          padding-left: 20px;\n          padding-top: 20px;\n          padding-bottom: 14px;\n      }\n\n      .iframe-error > button {\n          margin-left: 20px;\n          margin-bottom: 20px;\n      }\n\n      .iframe-error > h5 {\n          font-size: 20px;\n          line-height: 1;\n          padding-left: 20px;\n          padding-top: 10px;\n          padding-bottom: 0px;\n      }\n\n      .iframe-error > pre {\n          font-size: 14px;\n          padding-top: 10px;\n          padding-right: 40px;\n          padding-bottom: 20px;\n          padding-left: 40px;\n          background: white;\n          color: black;\n          border: 0;\n          white-space: pre-wrap;\n      }\n    "]
            },] },
];
/** @nocollapse */
AddConnectionFrameComponent.ctorParameters = function () { return [
    null,
    { type: ElementRef, },
    { type: IFrameService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvYWRkLWNvbm5lY3Rpb24tZGlhbG9nL2FkZC1jb25uZWN0aW9uLWZyYW1lL2FkZC1jb25uZWN0aW9uLWZyYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFVBQUEsRUFBWSxZQUFBLEVBQXVDLE1BQU8sZUFBQSxDQUFnQjtBQUk5RixPQUFPLEVBQzJFLGtCQUFBLEVBQ2pGLE1BQU0scUJBQUEsQ0FBc0I7QUFHN0IsT0FBTyxFQUFFLGFBQUEsRUFBYyxNQUFPLGdDQUFBLENBQWlDO0FBRy9EO0lBd0NJLHFDQUNZLGlCQUFvQyxFQUNwQyxVQUFzQixFQUN0QixhQUE0QjtRQUY1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUExQ2pDLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRCxrQkFBYSxHQUFHLEdBQUcsQ0FBQztRQUlwQixrQkFBYSxHQUFtQjtZQUNwQzs7Ozs7Ozs7ZUFRRztZQUNILG9CQUFvQixFQUFFLFVBQ2xCLEtBQW9CLEVBQ3BCLGlCQUF5QixFQUN6QixLQUFxQixFQUNyQixNQUFjLEVBQ2QsU0FBb0I7Z0JBRXBCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUVEOzs7Ozs7O2VBT0c7WUFDSCxZQUFZLEVBQUUsVUFBQyxLQUFxQixFQUFFLE1BQWMsRUFBRSxTQUFvQjtnQkFDdEUsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1NBQ0osQ0FBQztRQU1FLGlIQUFpSDtRQUNqSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxzQkFBVyw4Q0FBSzth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SSxVQUFrQixDQUFDO1FBQ3ZCLElBQUksVUFBdUMsQ0FBQztRQUM1QyxJQUFJLFFBQWdCLENBQUM7UUFDckIsSUFBSSxNQUFNLEdBQXNCLE1BQU0sQ0FBQztRQUN2QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDakQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsSUFBSSxRQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksS0FBSyxHQUFHLFFBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLGNBQWMsS0FBSyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsY0FBYyxLQUFLLGNBQWMsRUFBaEYsQ0FBZ0YsQ0FBQyxDQUFDO1lBQzNILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsTUFBTSxDQUFDO29CQUNILFVBQVUsRUFBRSxRQUFNLENBQUMsSUFBSTtvQkFDdkIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSTtpQkFDdkIsQ0FBQztZQUNOLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBMEVMLGtDQUFDO0FBQUQsQ0EzTEEsQUEyTEM7O0FBekVNLHNDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsTUFBTSxFQUFFLENBQUMsMHhDQTREUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDBDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixJQUFJO0lBQ0osRUFBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO0lBQ3BCLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztDQUN0QixFQUo2RixDQUk3RixDQUFDIiwiZmlsZSI6ImFkZC1jb25uZWN0aW9uLWZyYW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=