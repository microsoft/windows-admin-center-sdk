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
var ManifestLoader = /** @class */ (function () {
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
        var self = MsftSme.self();
        var mode = self.Init ? self.Init.mode : 0 /* NotUse */;
        var http = new Http();
        switch (mode) {
            case 0 /* NotUse */:
                // Turn OFF iframe feature.
                ManifestLoader.deferred.reject('no iFrame');
                break;
            case 1 /* LoadEmbedded */:
                // JSON file posting by module iframe.
                var manifest = {
                    name: self.Init.moduleName,
                    signature: EnvironmentModule.defaultSignature,
                    shell: {
                        name: EnvironmentModule.nameOfShell,
                        origin: self.Init.shellOrigin
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
            var self_1 = MsftSme.self();
            self_1.Environment = EnvironmentModule.createEnvironment(manifest, self_1.Resources.localeId);
            ManifestLoader.deferred.resolve();
        }
        catch (e) {
            // no localization
            var message = 'Unable to load the manifest: {0}'.format(e);
            ManifestLoader.deferred.reject(message);
            throw new Error(message);
        }
    };
    ManifestLoader.manifestFile = 'manifest.json';
    ManifestLoader.deferred = NativeQ.defer();
    ManifestLoader.internalLoaded = ManifestLoader.deferred.promise;
    return ManifestLoader;
}());
export { ManifestLoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbWFuaWZlc3QvbWFuaWZlc3QtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFEOzs7R0FHRztBQUNIO0lBQUE7SUFrSkEsQ0FBQztJQTFJRyxzQkFBWSxrQ0FBTTtRQUhsQjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRztJQUNXLDJCQUFZLEdBQTFCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxHQUE0QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQStCLENBQUM7UUFDaEcsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1g7Z0JBQ0ksMkJBQTJCO2dCQUMzQixjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksc0NBQXNDO2dCQUN0QyxJQUFJLFFBQVEsR0FBUTtvQkFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtvQkFDMUIsU0FBUyxFQUFFLGlCQUFpQixDQUFDLGdCQUFnQjtvQkFDN0MsS0FBSyxFQUFFO3dCQUNILElBQUksRUFBRSxpQkFBaUIsQ0FBQyxXQUFXO3dCQUNuQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO3FCQUNoQztpQkFDSixDQUFDO2dCQUVGLCtCQUErQjtnQkFDL0IsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3BDLEtBQUssQ0FBQztZQUNWO2dCQUNJLDhDQUE4QztnQkFDOUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFBQSxDQUFDO0lBRUY7Ozs7OztPQU1HO0lBQ1ksbUJBQUksR0FBbkIsVUFBb0IsSUFBVSxFQUFFLFFBQWM7UUFDMUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDekMsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQzthQUN2QyxPQUFPLENBQ0osVUFBQSxNQUFNO1lBQ0YsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7cUJBQzdDLEdBQUcsQ0FBQyxVQUFBLFNBQVM7b0JBQ1YsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQztZQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ1IsVUFBQSxNQUFNO1lBQ0YsSUFBSSxPQUFPLEdBQVUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDN0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNYLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUM3QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLElBQUssT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQTNCLENBQTJCLENBQUMsQ0FBQztvQkFDeEYsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDNUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMzQixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRVAsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDWSxxQ0FBc0IsR0FBckMsVUFBc0MsSUFBVTtRQUM1QyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsSUFBSSx3QkFBd0IsR0FBc0IsRUFBRSxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxVQUFVLENBQW1CLFlBQVksRUFBRSxVQUFDLEdBQUcsRUFBRSxRQUFRO1lBQzdELHdCQUF3QixDQUFDLElBQUksQ0FDekIsSUFBSSxDQUFDLFVBQVUsQ0FBSSxRQUFRLENBQUMsTUFBTSxTQUFJLGNBQWMsQ0FBQyxZQUFjLEVBQUUsS0FBSyxDQUFDO2lCQUN0RSxHQUFHLENBQUMsVUFBQSxNQUFNO2dCQUNQLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDUixrQkFBa0I7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQVk7b0JBQ25CLE1BQU0sRUFBRSxnQkFBZ0I7b0JBQ3hCLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUTtvQkFDeEIsT0FBTyxFQUFFLHdEQUFxRCxRQUFRLENBQUMsTUFBTSxZQUFNLEtBQU87aUJBQzdGLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FDVCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsT0FBbkIsVUFBVSxFQUFhLHdCQUF3QixFQUFFO0lBQzVELENBQUM7SUFFRDs7T0FFRztJQUNZLHFCQUFNLEdBQXJCLFVBQXNCLFFBQWE7UUFDL0IsSUFBSSxDQUFDO1lBQ0QsSUFBSSxNQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLE1BQUksQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE1BQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUYsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULGtCQUFrQjtZQUNsQixJQUFJLE9BQU8sR0FBRyxrQ0FBa0MsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQWhKYywyQkFBWSxHQUFHLGVBQWUsQ0FBQztJQUMvQix1QkFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQU8sQ0FBQztJQUNoQyw2QkFBYyxHQUFpQixjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQStJbEYscUJBQUM7Q0FsSkQsQUFrSkMsSUFBQTtTQWxKWSxjQUFjIiwiZmlsZSI6Im1hbmlmZXN0LWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=