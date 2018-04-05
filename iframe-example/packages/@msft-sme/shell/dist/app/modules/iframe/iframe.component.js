import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppContextService } from '../../../angular';
import { EnvironmentModule, Logging, LogLevel } from '../../../core';
import { RouteHelpers } from '../../utility/route-helpers';
import { CachedFramesComponent } from './cached-frames/cached-frames.component';
import { IFrameService } from './iframe.service';
export var OpenState;
(function (OpenState) {
    OpenState[OpenState["Settled"] = 0] = "Settled";
    OpenState[OpenState["Started"] = 1] = "Started";
    OpenState[OpenState["InProgress"] = 2] = "InProgress";
    OpenState[OpenState["Delayed"] = 3] = "Delayed";
    OpenState[OpenState["Canceled"] = 4] = "Canceled";
    OpenState[OpenState["Error"] = 5] = "Error";
})(OpenState || (OpenState = {}));
var IFrameComponent = /** @class */ (function () {
    function IFrameComponent(appContext, route, router, iFrameService) {
        var _this = this;
        this.appContext = appContext;
        this.route = route;
        this.router = router;
        this.iFrameService = iFrameService;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.IFrame;
        this.openState = OpenState.Settled;
        this.openStateEnum = OpenState;
        this.subscription = this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .concatMap(function (event) {
            var shellParams = RouteHelpers.getFullShellRoutingParameters(_this.route.snapshot);
            var toolsEnabled = shellParams.solution && shellParams.solution.tools && shellParams.solution.tools.enabled;
            var entryPoint = toolsEnabled ? shellParams.tool : shellParams.solution;
            _this.name = entryPoint ? entryPoint.parentModule.name : null;
            _this.entryPointName = entryPoint ? entryPoint.name : null;
            return _this.open();
        }).subscribe(function (event) { return _this.next(event); });
    }
    IFrameComponent.prototype.ngOnInit = function () {
        /** empty */
    };
    IFrameComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.iFrameService.close(CachedFramesComponent.cachedFrameId);
    };
    IFrameComponent.prototype.reopen = function () {
        var _this = this;
        if (this.reopenSubscription) {
            this.reopenSubscription.unsubscribe();
        }
        this.reopenSubscription = this.open().subscribe(function (event) { return _this.next(event); });
    };
    IFrameComponent.prototype.cancel = function () {
        if (this.openState !== OpenState.Settled) {
            this.iFrameService.cancel();
            this.openState = OpenState.Canceled;
        }
    };
    IFrameComponent.prototype.open = function () {
        var _this = this;
        var module = EnvironmentModule.getEnvironmentModule(this.name);
        var entryPoint = module.entryPoints.first(function (ep) { return ep.name === _this.entryPointName; });
        this.startTime = Date.now();
        this.errorTitle = null;
        this.openState = OpenState.Started;
        this.timer = setTimeout(function () {
            if (_this.openState === OpenState.Started) {
                _this.openState = OpenState.InProgress;
            }
            _this.timer = setTimeout(function () {
                if (_this.openState === OpenState.InProgress) {
                    _this.openState = OpenState.Delayed;
                }
            }, IFrameComponent.timeDelayed - IFrameComponent.timeInProgress);
        }, IFrameComponent.timeInProgress);
        return this.iFrameService.open(CachedFramesComponent.cachedFrameId, this.name, entryPoint, entryPoint.path);
    };
    IFrameComponent.prototype.next = function (event) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        var timeSpan = Date.now() - this.startTime;
        this.errorMessage = event.error;
        if (event.error) {
            this.openState = OpenState.Error;
            this.errorTitle = this.strings.FailedLoad.title.format(this.name);
        }
        else {
            this.openState = OpenState.Settled;
        }
        Logging.log({
            level: LogLevel.Verbose, source: 'sme-iframe', message: this.strings.LoadTime.message.format(this.name, timeSpan)
        });
    };
    IFrameComponent.timeInProgress = 1000;
    IFrameComponent.timeDelayed = 10 * 1000;
    IFrameComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-iframe',
                    template: "\n      <ng-template [ngIf]=\"openState === openStateEnum.InProgress\">\n        <sme-loading-wheel></sme-loading-wheel>\n      </ng-template>\n      <ng-template [ngIf]=\"openState === openStateEnum.Delayed\">\n        <sme-loading-wheel message=\"{{strings.TakingLonger.message}}\" buttonLabel=\"{{strings.Cancel.label}}\" (buttonClick)=\"cancel()\">\n        </sme-loading-wheel>\n      </ng-template>\n      <ng-template [ngIf]=\"openState === openStateEnum.Canceled\">\n        <sme-loading-wheel message=\"{{strings.TakingLongerCancelling.message}}\"></sme-loading-wheel>\n      </ng-template>\n      <ng-template [ngIf]=\"openState === openStateEnum.Error\">\n        <div class=\"iframe-error\">\n          <h4>{{errorTitle}}</h4>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"reopen()\">{{strings.Reload.label}}</button>\n          <h5>{{strings.ErrorDescription.title}}</h5>\n          <pre>{{errorMessage}}</pre>\n        </div>\n      </ng-template>\n    ",
                    styles: ["\n      .inserted-frame {\n          width: 100%;\n          height: 100%;\n          border: none;\n          padding: 0;\n          margin: 0;\n          overflow: hidden;\n          position: absolute;\n          top: 0;\n          left: 0;\n      }\n\n      .display-none-frame {\n          display: none;\n      }\n\n      .display-block-frame {\n          display: block;\n      }\n\n      .iframe-error {\n          position: absolute;\n          top: 0;\n          left: 0;\n          z-index: 1;\n      }\n\n      .iframe-error > h4 {\n          font-size: 24px;\n          line-height: 1;\n          padding-left: 20px;\n          padding-top: 20px;\n          padding-bottom: 14px;\n      }\n\n      .iframe-error > button {\n          margin-left: 20px;\n          margin-bottom: 20px;\n      }\n\n      .iframe-error > h5 {\n          font-size: 20px;\n          line-height: 1;\n          padding-left: 20px;\n          padding-top: 10px;\n          padding-bottom: 0px;\n      }\n\n      .iframe-error > pre {\n          font-size: 14px;\n          padding-top: 10px;\n          padding-right: 40px;\n          padding-bottom: 20px;\n          padding-left: 40px;\n          background: white;\n          color: black;\n          border: 0;\n          white-space: pre-wrap;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    IFrameComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: ActivatedRoute, },
        { type: Router, },
        { type: IFrameService, },
    ]; };
    return IFrameComponent;
}());
export { IFrameComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2lmcmFtZS9pZnJhbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsY0FBQSxFQUF3QyxhQUFBLEVBQXVCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBRXhHLE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLGtCQUFBLENBQW1CO0FBQ3JELE9BQU8sRUFBRSxpQkFBQSxFQUFtQixPQUFBLEVBQVMsUUFBQSxFQUFvQixNQUFPLGVBQUEsQ0FBZ0I7QUFFaEYsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLDZCQUFBLENBQThCO0FBQzNELE9BQU8sRUFBRSxxQkFBQSxFQUFzQixNQUFPLHlDQUFBLENBQTBDO0FBRWhGLE9BQU8sRUFBRSxhQUFBLEVBQWMsTUFBTyxrQkFBQSxDQUFtQjtBQUVqRCxNQUFNLENBQU4sSUFBWSxTQU9YO0FBUEQsV0FBWSxTQUFBO0lBQ1IsK0NBQVUsQ0FBQTtJQUNWLCtDQUFVLENBQUE7SUFDVixxREFBYSxDQUFBO0lBQ2IsK0NBQVUsQ0FBQTtJQUNWLGlEQUFXLENBQUE7SUFDWCwyQ0FBUSxDQUFBO0FBQ1osQ0FBQyxFQVBXLFNBQUEsS0FBQSxTQUFBLFFBT1g7QUFHRDtJQWlCSSx5QkFDZ0IsVUFBNkIsRUFDN0IsS0FBcUIsRUFDckIsTUFBYyxFQUNkLGFBQTRCO1FBSjVDLGlCQWVDO1FBZGUsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBakJwQyxZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFVdkUsY0FBUyxHQUFjLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDekMs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