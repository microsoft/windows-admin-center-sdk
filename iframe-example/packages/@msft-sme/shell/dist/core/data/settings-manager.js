import { Observable } from 'rxjs';
import { VersionedObject } from '../base/versioned-object';
import { RpcSettingsOperationType, RpcSettingsProviderType, RpcSettingsScope } from '../rpc/rpc-base';
/**
 * Manager for the settings. Provides an api for managing user and application settings.
 */
var SettingsManager = /** @class */ (function () {
    /**
     * Initializes a new instance of the SettingsManager class.
     *
     * @param rpc the RPC class instance.
     */
    function SettingsManager(rpc) {
        this.rpc = rpc;
    }
    /**
     * Get common user settings. This is currently read-only
     */
    SettingsManager.prototype.getCommonUserSettings = function () {
        // BUG: TODO: <any> is added to get around compiler error.
        // <any> must be removed. It looks like data object is defined wrongly.
        return Observable.fromPromise(this.rpc.settings({
            operation: RpcSettingsOperationType.Get,
            scope: RpcSettingsScope.User,
            provider: RpcSettingsProviderType.Common
        }));
    };
    /**
     * Get common application settings. This is currently read-only
     */
    SettingsManager.prototype.getCommonApplicationSettings = function () {
        // BUG: TODO: <any> is added to get around compiler error.
        // <any> must be removed. It looks like data object is defined wrongly.
        return Observable.fromPromise(this.rpc.settings({
            operation: RpcSettingsOperationType.Get,
            scope: RpcSettingsScope.Application,
            provider: RpcSettingsProviderType.Common
        }));
    };
    /**
     * Get extension user settings
     * Extension settings objects must be an object that extends VersionedObject or implements the VersionedObjectConstructor
     * example: if TestObject extends VersionedObject, then getExtensionSettings(TestObject) will return an Observable<TestObject>
     * you should only create 1 versioned object for your extensions user settings.
     */
    SettingsManager.prototype.getExtensionUserSettings = function (type) {
        var _this = this;
        return Observable.fromPromise(this.rpc.settings({
            operation: RpcSettingsOperationType.Get,
            scope: RpcSettingsScope.User,
            provider: RpcSettingsProviderType.Extension
        })).map(function (response) {
            // If the extension settings are not versioned (or not defined), then start with an empty settings.
            var settings = VersionedObject.ensureIsVersionedObject(response.data);
            return new type(settings, {
                save: function (object) {
                    return Observable.fromPromise(_this.rpc.settings({
                        operation: RpcSettingsOperationType.Set,
                        scope: RpcSettingsScope.User,
                        provider: RpcSettingsProviderType.Extension,
                        value: object
                    }));
                }
            });
        });
    };
    /**
     * Get extension application settings
     * Extension settings objects must be an object that extends VersionedObject or implements the VersionedObjectConstructor
     * example: if TestObject extends VersionedObject, then getExtensionSettings(TestObject) will return an Observable<TestObject>
     * you should only create 1 versioned object for your extensions application settings.
     */
    SettingsManager.prototype.getExtensionApplicationSettings = function (type) {
        var _this = this;
        return Observable.fromPromise(this.rpc.settings({
            operation: RpcSettingsOperationType.Get,
            scope: RpcSettingsScope.Application,
            provider: RpcSettingsProviderType.Extension
        })).map(function (response) {
            // If the extension settings are not versioned (or not defined), then start with an empty settings.
            var settings = VersionedObject.ensureIsVersionedObject(response.data);
            return new type(settings, {
                save: function (object) {
                    return Observable.fromPromise(_this.rpc.settings({
                        operation: RpcSettingsOperationType.Set,
                        scope: RpcSettingsScope.Application,
                        provider: RpcSettingsProviderType.Extension,
                        value: object
                    }));
                }
            });
        });
    };
    return SettingsManager;
}());
export { SettingsManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9zZXR0aW5ncy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBNkIsVUFBVSxFQUFpQixNQUFNLE1BQU0sQ0FBQztBQUU1RSxPQUFPLEVBQXdCLGVBQWUsRUFBOEIsTUFBTSwwQkFBMEIsQ0FBQztBQUU3RyxPQUFPLEVBQWUsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQXFCLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFtQnRJOztHQUVHO0FBQ0g7SUFFSTs7OztPQUlHO0lBQ0gseUJBQW9CLEdBQVE7UUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO0lBQUksQ0FBQztJQUVqQzs7T0FFRztJQUNJLCtDQUFxQixHQUE1QjtRQUNJLDBEQUEwRDtRQUMxRCx1RUFBdUU7UUFDdkUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQWM7WUFDOUQsU0FBUyxFQUFFLHdCQUF3QixDQUFDLEdBQUc7WUFDdkMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLElBQUk7WUFDNUIsUUFBUSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7O09BRUc7SUFDSSxzREFBNEIsR0FBbkM7UUFDSSwwREFBMEQ7UUFDMUQsdUVBQXVFO1FBQ3ZFLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFjO1lBQzlELFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxHQUFHO1lBQ3ZDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO1lBQ25DLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksa0RBQXdCLEdBQS9CLFVBQTJELElBQW1DO1FBQTlGLGlCQW1CQztRQWxCRyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBYztZQUN6RCxTQUFTLEVBQUUsd0JBQXdCLENBQUMsR0FBRztZQUN2QyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsSUFBSTtZQUM1QixRQUFRLEVBQUUsdUJBQXVCLENBQUMsU0FBUztTQUM5QyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRO1lBQ1osbUdBQW1HO1lBQ25HLElBQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEUsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsSUFBSSxFQUFFLFVBQUMsTUFBTTtvQkFDVCxNQUFNLENBQWtCLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQWM7d0JBQzFFLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxHQUFHO3dCQUN2QyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsSUFBSTt3QkFDNUIsUUFBUSxFQUFFLHVCQUF1QixDQUFDLFNBQVM7d0JBQzNDLEtBQUssRUFBRSxNQUFNO3FCQUNoQixDQUFDLENBQUMsQ0FBQztnQkFDUixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSx5REFBK0IsR0FBdEMsVUFBa0UsSUFBbUM7UUFBckcsaUJBbUJDO1FBbEJHLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFjO1lBQ3pELFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxHQUFHO1lBQ3ZDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO1lBQ25DLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxTQUFTO1NBQzlDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVE7WUFDWixtR0FBbUc7WUFDbkcsSUFBSSxRQUFRLEdBQUcsZUFBZSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUN0QixJQUFJLEVBQUUsVUFBQyxNQUFNO29CQUNULE1BQU0sQ0FBa0IsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBYzt3QkFDMUUsU0FBUyxFQUFFLHdCQUF3QixDQUFDLEdBQUc7d0JBQ3ZDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO3dCQUNuQyxRQUFRLEVBQUUsdUJBQXVCLENBQUMsU0FBUzt3QkFDM0MsS0FBSyxFQUFFLE1BQU07cUJBQ2hCLENBQUMsQ0FBQyxDQUFDO2dCQUNSLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxzQkFBQztBQUFELENBeEZBLEFBd0ZDLElBQUEiLCJmaWxlIjoic2V0dGluZ3MtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=