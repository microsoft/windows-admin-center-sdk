import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Http } from '../data/http';
import { NativeQ } from '../data/native-q';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { EnvironmentModule } from './environment-modules';
/**
 * The Manifest service class.
 *  (Localized string cannot be used in this class due to initialization phase when the strings are not ready yet.)
 */
var ManifestLoader = (function () {
    function ManifestLoader() {
    }
    Object.defineProperty(ManifestLoader.prototype, "loaded", {
        /**
         * Manifest loading promise.
         */
        get: function () {
            return ManifestLoader.internalLoaded;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Load the manifest.
     */
    ManifestLoader.loadManifest = function () {
        var global = window;
        var init = global.MsftSme.Init;
        var mode = init ? init.mode : 0 /* NotUse */;
        var http = new Http();
        switch (mode) {
            case 0 /* NotUse */:
                // Turn OFF iframe feature.
                ManifestLoader.deferred.reject('no iFrame');
                break;
            case 1 /* LoadEmbedded */:
                // JSON file posting by module iframe.
                var manifest = {
                    name: init.moduleName,
                    signature: EnvironmentModule.defaultSignature,
                    shell: {
                        name: EnvironmentModule.nameOfShell,
                        origin: init.shellOrigin
                    }
                };
                // Turn ON module self-loading.
                ManifestLoader.load(http, manifest);
                break;
            case 2 /* Load */:
                // Turn ON iframe feature by Shell and Module.
                ManifestLoader.load(http);
                break;
        }
        return ManifestLoader.internalLoaded;
    };
    ;
    /**
     * Load the manifest into the MsftSme.Environment.
     *
     * @param http the http object to load the manifest.
     * @param manifest the self loading manifest.
     * @return Promise<any> the promise object.
     */
    ManifestLoader.load = function (http, manifest) {
        if (manifest) {
            ManifestLoader.update(manifest);
            return ManifestLoader.internalLoaded;
        }
        http.getNoCache(ManifestLoader.manifestFile)
            .flatMap(function (result) {
            var response = result.response;
            if (response.modules) {
                return ManifestLoader.fetchSideloadManifests(http)
                    .map(function (sideLoads) {
                    return { manifest: response, sideLoads: sideLoads };
                });
            }
            return Observable.of({ manifest: response, sideLoads: [] });
        }).subscribe(function (result) {
            var modules = result.manifest.modules;
            result.sideLoads.forEach(function (sideLoad) {
                if (sideLoad) {
                    sideLoad.isSideLoaded = true;
                    var foundIndex = modules.findIndex(function (item, index, items) { return item.name === sideLoad.name; });
                    if (foundIndex >= 0) {
                        modules.splice(foundIndex, 1, sideLoad);
                    }
                    else {
                        modules.push(sideLoad);
                    }
                }
            });
            ManifestLoader.update(result.manifest);
        }, function (error) {
            ManifestLoader.deferred.reject(error);
            throw new Error(error);
        });
        return ManifestLoader.internalLoaded;
    };
    /**
     * retrieves all of the side loaded manifests.
     *
     * @return Observable<any[]> the manifests.
     */
    ManifestLoader.fetchSideloadManifests = function (http) {
        var sideLoadList = MsftSme.sideLoad();
        if (Object.keys(sideLoadList).length === 0) {
            return Observable.of([]);
        }
        var sideLoadManifestAwaiters = [];
        MsftSme.forEachKey(sideLoadList, function (key, sideLoad) {
            sideLoadManifestAwaiters.push(http.getNoCache(sideLoad.origin + "/" + ManifestLoader.manifestFile, false)
                .map(function (result) {
                var manifest = result.response;
                manifest.origin = sideLoad.origin;
                return manifest;
            })
                .catch(function (error) {
                // no localization
                Logging.log({
                    source: 'ManifestLoader',
                    level: LogLevel.Critical,
                    message: "An error was encountered when trying to sideload \"" + sideLoad.origin + "\". " + error
                });
                return Observable.of(null);
            }));
        });
        return Observable.forkJoin.apply(Observable, sideLoadManifestAwaiters);
    };
    /**
     * Update the environment by the manifest.
     */
    ManifestLoader.update = function (manifest) {
        try {
            var global_1 = window;
            global_1.MsftSme.Environment = EnvironmentModule.createEnvironment(manifest, 'en');
            ManifestLoader.deferred.resolve();
        }
        catch (e) {
            // no localization
            var message = 'Unable to load the manifest: {0}'.format(e);
            ManifestLoader.deferred.reject(message);
            throw new Error(message);
        }
    };
    return ManifestLoader;
}());
export { ManifestLoader };
ManifestLoader.manifestFile = 'manifest.json';
ManifestLoader.deferred = NativeQ.defer();
ManifestLoader.internalLoaded = ManifestLoader.deferred.promise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbWFuaWZlc3QvbWFuaWZlc3QtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQ7OztHQUdHO0FBQ0g7SUFBQTtJQW1KQSxDQUFDO0lBM0lHLHNCQUFZLGtDQUFNO1FBSGxCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUVEOztPQUVHO0lBQ1csMkJBQVksR0FBMUI7UUFDSSxJQUFJLE1BQU0sR0FBMkIsTUFBTSxDQUFDO1FBQzVDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUE0QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksaUJBQWlDLENBQUM7UUFDdEYsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1g7Z0JBQ0ksMkJBQTJCO2dCQUMzQixjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksc0NBQXNDO2dCQUN0QyxJQUFJLFFBQVEsR0FBUTtvQkFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO29CQUNy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d0IsRUFBRTtJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDWSxxQkFBTSxHQUFyQixVQUFzQixRQUFhO1FBQy9CLElBQUksQ0FBQztZQUNELElBQUksUUFBTSxHQUEyQixNQUFNLENBQUM7WUFDNUMsUUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pGLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxrQkFBa0I7WUFDbEIsSUFBSSxPQUFPLEdBQUcsa0NBQWtDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUM7SUFDTCxxQkFBQztBQUFELENBbkpBLEFBbUpDOztBQWxKa0IsMkJBQVksR0FBRyxlQUFlLENBQUM7QUFDL0IsdUJBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFPLENBQUM7QUFDaEMsNkJBQWMsR0FBaUIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMiLCJmaWxlIjoibWFuaWZlc3QtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==