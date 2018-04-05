import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Navigation } from '../../../angular';
import { EnvironmentModule, Logging, LogLevel } from '../../../core';
import { RouteHelpers } from '../../utility/route-helpers';
var CachedFramesBase = /** @class */ (function () {
    function CachedFramesBase(appContextService, elementRef, iFrameService, setIdOfFrames, numberOfFrames) {
        var _this = this;
        this.appContextService = appContextService;
        this.elementRef = elementRef;
        this.iFrameService = iFrameService;
        this.setIdOfFrames = setIdOfFrames;
        this.numberOfFrames = numberOfFrames;
        this.replay = new ReplaySubject();
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
        this.iFrameService.init(this.setIdOfFrames, this.numberOfFrames, true, this.routerHandles);
        this.serviceSubscription = this.iFrameService.frameDataEvent
            .filter(function (event) { return event.callback != null; })
            .delayWhen(function () { return _this.replay; })
            .flatMap(function (event) {
            var children = _this.elementRef.nativeElement.children[0].children;
            return event.callback(event, children[event.frameData.id], children[event.frameData.id].contentWindow);
        })
            .subscribe(function (event) { return _this.setFrame(event.frameData); });
    }
    CachedFramesBase.prototype.ngOnInit = function () {
        var _this = this;
        var children = this.elementRef.nativeElement.children[0].children;
        // even iframe is not completely attached on DOM, ngOnInit is called.
        // it makes sure the iframe is ready to load content by checking contentWindow object.
        // if it's not ready wait for onload event of iframe element.
        if (children[this.numberOfFrames - 1].contentWindow) {
            this.replay.next(true);
        }
        else {
            children[this.numberOfFrames - 1].onload = function () { return _this.replay.next(true); };
        }
    };
    CachedFramesBase.prototype.ngOnDestroy = function () {
        this.replay.complete();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2lmcmFtZS9jYWNoZWQtZnJhbWVzLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBcUIsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSTNEO0lBNkdJLDBCQUNrQixpQkFBb0MsRUFDcEMsVUFBc0IsRUFDdEIsYUFBNEIsRUFDNUIsYUFBYSxFQUNiLGNBQWM7UUFMaEMsaUJBZ0JDO1FBZmlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBQTtRQUNiLG1CQUFjLEdBQWQsY0FBYyxDQUFBO1FBL0d4QixXQUFNLEdBQUcsSUFBSSxhQUFhLEVBQVcsQ0FBQztRQUV0QyxrQkFBYSxHQUFtQjtZQUNwQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsb0JBQW9CLEVBQUUsVUFDbEIsS0FBb0IsRUFDcEIsaUJBQXlCLEVBQ3pCLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxTQUFvQjtnQkFFcEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUVoQyxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsNkJBQTZC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QUFRLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTyxtQ0FBUSxHQUFoQixVQUFpQixTQUFvQjtRQUNqQyxJQUFJLFVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBYyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLENBQUM7UUFDdEUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDWixVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUMzRCxDQUFDO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFDdEMsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0E5SkEsQUE4SkMsSUFBQSIsImZpbGUiOiJjYWNoZWQtZnJhbWVzLWJhc2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9