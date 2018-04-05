import { Navigation } from '../../../angular';
import { EnvironmentModule, Logging, LogLevel } from '../../../core';
import { RouteHelpers } from '../../utility/route-helpers';
var CachedFramesBase = (function () {
    function CachedFramesBase(appContextService, elementRef, iFrameService, setIdOfFrames, numberOfFrames) {
        this.appContextService = appContextService;
        this.elementRef = elementRef;
        this.iFrameService = iFrameService;
        this.setIdOfFrames = setIdOfFrames;
        this.numberOfFrames = numberOfFrames;
        this.routerHandles = {
            /**
             * Handle navigation end event to verify if the change should report to iframe module (tool).
             * 1) path is current module (tool), AND
             * 2) child path was changed.
             *
             * @param event the navigation end event.
             * @param route the activated route.
             * @param router the router.
             * @param frameData the frame data object.
             * @return boolean return true to report back to Rpc, return false if not handling.
             */
            navigationEndHandler: function (event, moduleLoopbackUrl, route, router, frameData) {
                var url = router.url.split('?')[0];
                url = MsftSme.trimStart(url, '/');
                url = MsftSme.trimEnd(url, '/');
                var shellParams = RouteHelpers.getFullShellRoutingParameters(route.snapshot);
                var moduleSegment = EnvironmentModule.createFormattedEntrypoint(frameData.entryPoint);
                var friendlySegment = EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(moduleSegment, frameData.entryPoint.entryPointType);
                var toolSegment = "/tools/" + friendlySegment;
                // There is a case that new event of navigation-end happens before iframe.component gets params change
                // especially when user trying to navigate a tool to a tool too quick. That causes unexpected rpc call
                // to inactive module.
                // This check makes sure of rpc navigation to happen only current active module.
                if (url.indexOf(toolSegment) < 0) {
                    return false;
                }
                // we need to decode the URI and remove any query parameters
                return !Navigation.areEqualUrl(moduleLoopbackUrl, decodeURI(event.url).split(/[?#]/)[0]);
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
                // trim query strings.
                var url = router.url.split('?')[0];
                // trim first and last slash.
                url = MsftSme.trimStart(url, '/');
                url = MsftSme.trimEnd(url, '/');
                // get contextual route information
                var shellParams = RouteHelpers.getFullShellRoutingParameters(route.snapshot);
                var moduleSegment = EnvironmentModule.createFormattedEntrypoint(frameData.entryPoint);
                var friendlySegment = EnvironmentModule.getFriendlyUrlSegmentForEntryPoint(moduleSegment, frameData.entryPoint.entryPointType);
                // default to handling 'tools' routes: 
                // /<SolutionID>/tools/<toolsID>
                // /<SolutionID>connections/<connectionType>/<connectionName>/tools/<toolsID>
                var toolSegment = "/tools/" + friendlySegment;
                if (frameData.entryPoint.entryPointType === 'solution') {
                    // for solution entry points, our route might look more like this:
                    // /<SolutionID>
                    // /<SolutionID>connections/<connectionType>/<connectionName>
                    if (frameData.entryPoint.connections) {
                        toolSegment = "/connections/" + shellParams.connectionType + "/" + shellParams.connectionName;
                    }
                    else {
                        toolSegment = "" + friendlySegment;
                    }
                }
                // unknown url...
                if (url.indexOf(toolSegment) < 0) {
                    Logging.log({ source: 'CachedFramesBase', level: LogLevel.Error, message: 'Unexpected route navigation: {0}'.format(router.url) });
                    return '';
                }
                // translate back to inner path from entryPoint name.
                var entryPath = frameData.entryPoint.path;
                var splits = url.split(toolSegment);
                if (splits.length < 2) {
                    return entryPath;
                }
                var path = splits[1];
                var trimmed = MsftSme.trimEnd(path, '/');
                if (trimmed === '') {
                    return entryPath;
                }
                // all urls inside of the tool must be relative to the entrypoint.
                path = entryPath + "/" + MsftSme.trimStart(splits[1], '/');
                return path;
            }
        };
        this.setFrame(null);
    }
    CachedFramesBase.prototype.ngOnInit = function () {
        var _this = this;
        this.iFrameService.init(this.setIdOfFrames, this.numberOfFrames, true, this.routerHandles);
        this.children = this.elementRef.nativeElement.children[0].children;
        this.serviceSubscription = this.iFrameService.frameDataEvent
            .filter(function (event) { return event.callback != null; })
            .flatMap(function (event) {
            return event.callback(event, _this.children[event.frameData.id], _this.children[event.frameData.id].contentWindow);
        })
            .subscribe(function (event) { return _this.setFrame(event.frameData); });
    };
    CachedFramesBase.prototype.ngOnDestroy = function () {
        this.serviceSubscription.unsubscribe();
        this.iFrameService.exit(this.setIdOfFrames);
    };
    CachedFramesBase.prototype.setFrame = function (frameData) {
        var collection = [];
        for (var i = 0; i < this.numberOfFrames; i++) {
            collection[i] = { id: i, class: 'display-none-frame' };
        }
        if (frameData) {
            collection[frameData.id].class = 'display-block-frame';
        }
        this.frameCollection = collection;
    };
    return CachedFramesBase;
}());
export { CachedFramesBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2lmcmFtZS9jYWNoZWQtZnJhbWVzLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFxQixVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJM0Q7SUE2R0ksMEJBQ2MsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLGFBQTRCLEVBQzVCLGFBQWEsRUFDYixjQUFjO1FBSmQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFBO1FBQ2IsbUJBQWMsR0FBZCxjQUFjLENBQUE7UUE3R3BCLGtCQUFhLEdBQW1CO1lBQ3BDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxvQkFBb0IsRUFBRSxVQUNsQixLQUFvQixFQUNwQixpQkFBeUIsRUFDekIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFNBQW9CO2dCQUVwQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRWhDLElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTdFLElBQUksYUFBYSxHQUFHLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxVQUFVLENB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