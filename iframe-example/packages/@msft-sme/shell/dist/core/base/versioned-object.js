import { Observable } from 'rxjs';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
/**
 * Defines an object that can be upgraded from older versions to the current version upon initialization.
 */
var VersionedObject = /** @class */ (function () {
    /**
     * Initializes a new instance of a VersionedObject
     * If the current version of the object is less than the latest version,
     * then 'upgrade()' will be called until the version is updated to the latest version.
     * An error will be thrown if upgrade is called and the version is not moved forward by at least 1.
     * @param objectWrapper the simplified version of the plain object with versioning
     * @param handlers The handlers to modify the plain Object
     */
    function VersionedObject(objectWrapper, handlers) {
        this.objectWrapper = objectWrapper;
        this.handlers = handlers;
        // verify arguments
        if (MsftSme.isNullOrUndefined(objectWrapper)
            || MsftSme.isNullOrUndefined(objectWrapper.properties)
            || MsftSme.isNullOrUndefined(handlers)) {
            Logging.log({
                level: LogLevel.Error,
                // tslint:disable-next-line:max-line-length
                message: this.constructor.name + " Invalid Arguments: objectWrapper: " + objectWrapper + ", handlers: " + handlers,
                params: {
                    latestVersion: this.latestVersion,
                    objectType: this.constructor.name
                },
                source: 'VersionedObject.ctor'
            });
            return;
        }
        // save version and properties
        this.currentVersion = objectWrapper.version;
        this.properties = MsftSme.deepAssign({}, objectWrapper.properties);
        // ensure that the getter for latest version has been defined
        if (MsftSme.isNullOrUndefined(this.latestVersion)) {
            Logging.log({
                level: LogLevel.Error,
                // tslint:disable-next-line:max-line-length
                message: this.constructor.name + " does not properly extend VersionedObject. latestVersion getter is " + this.latestVersion + "'",
                params: {
                    latestVersion: this.latestVersion,
                    objectType: this.constructor.name
                },
                source: 'VersionedObject.ctor'
            });
            return;
        }
        var prevVersion = MsftSme.isNullOrUndefined(this.currentVersion) ? -1 : this.currentVersion;
        // upgrade the current version untill it is the latest version
        while (MsftSme.isNullOrUndefined(this.currentVersion) || this.currentVersion < this.latestVersion) {
            // upgrade the object
            this.upgrade();
            // check if upgrade succeded (did not downgrade and did not upgrade past latest version)
            if (prevVersion >= this.currentVersion || this.currentVersion > this.latestVersion) {
                // upgrade didnt work as intended as the version is now invalid.
                Logging.log({
                    level: LogLevel.Error,
                    message: "Calling 'upgrade()' did not upgrade the object correctly'",
                    params: {
                        previousVersion: prevVersion,
                        currentVersion: this.currentVersion,
                        upgradingToVersion: this.latestVersion,
                        objectType: this.constructor.name
                    },
                    source: 'VersionedObject.ctor'
                });
                // stop trying to upgrade
                break;
            }
            // remember the version before cycling again
            prevVersion = this.currentVersion;
        }
    }
    /**
     * Gets an initialized empty versioned object wrapper
     */
    VersionedObject.getEmptyWrapper = function () {
        return { version: null, properties: {} };
    };
    /**
     * Returns an empty versioned object if the passed in object is not correctly versioned.
     * Otherwise, returns the passed in object.
     */
    VersionedObject.ensureIsVersionedObject = function (obj) {
        if (!obj || MsftSme.isNullOrUndefined(obj.version)) {
            return VersionedObject.getEmptyWrapper();
        }
        return obj;
    };
    /**
     *  Converts this versioned object to its pure json representation
     */
    VersionedObject.prototype.toJson = function () {
        return { properties: this.properties, version: this.currentVersion };
    };
    /**
     *  Saves the current properties
     */
    VersionedObject.prototype.save = function () {
        return this.handlers.save(this.toJson());
    };
    /**
     * Attempts to save the properties after executing a function.
     * If saving fails, the properties is reverted to its previous state before emitting the error
     */
    VersionedObject.prototype.trySave = function (fn) {
        var _this = this;
        var backup = Object.assign({}, this.properties);
        fn();
        return this.save().catch(function (error, obs) {
            Object.assign(_this.properties, backup);
            // rethrow the error
            return Observable.throw(error);
        });
    };
    /**
     *  Clears the current properties
     */
    VersionedObject.prototype.clear = function () {
        this.properties = {};
    };
    /**
     * Gets a property from 'properties'
     * @param key the property key
     * @returns the properties value
     */
    VersionedObject.prototype.getProperty = function (key) {
        if (!MsftSme.isNullOrUndefined(this.properties)) {
            return this.properties[key];
        }
        else {
            Logging.log({
                level: LogLevel.Error,
                message: "Could not find a property with the name: '" + key + "'. Please wait for object properties to be defined.",
                params: {
                    key: key,
                    objectType: this.constructor.name
                },
                source: 'VersionedObject.getProperty'
            });
        }
        return null;
    };
    /**
     * Sets a property in 'properties'
     * @param key the property key
     * @param value the new value
     */
    VersionedObject.prototype.setProperty = function (key, value) {
        if (!MsftSme.isNullOrUndefined(this.properties)) {
            this.properties[key] = value;
        }
        else {
            Logging.log({
                level: LogLevel.Error,
                message: "Could not find a property with the name: '" + key + "'. Please wait for object properties to be defined.",
                params: {
                    key: key,
                    objectType: this.constructor.name
                },
                source: 'VersionedObject.setProperty'
            });
        }
    };
    return VersionedObject;
}());
export { VersionedObject };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS92ZXJzaW9uZWQtb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXVDakQ7O0dBRUc7QUFDSDtJQW1DSTs7Ozs7OztPQU9HO0lBQ0gseUJBQW9CLGFBQW1DLEVBQVUsUUFBaUM7UUFBOUUsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDOUYsbUJBQW1CO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7ZUFDckMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7ZUFDbkQsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNSLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsMkNBQTJDO2dCQUMzQyxPQUFPLEVBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDJDQUFzQyxhQUFhLG9CQUFlLFFBQVU7Z0JBQzdHLE1BQU0sRUFBRTtvQkFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7b0JBQ2pDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7aUJBQ3BDO2dCQUNELE1BQU0sRUFBRSxzQkFBc0I7YUFDakMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELDhCQUE4QjtRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFB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SUc7SUFDTyxxQ0FBVyxHQUFyQixVQUFzQixHQUFXLEVBQUUsS0FBZ0I7UUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNSLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLCtDQUE2QyxHQUFHLHdEQUFxRDtnQkFDOUcsTUFBTSxFQUFFO29CQUNKLEdBQUcsRUFBRSxHQUFHO29CQUNSLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7aUJBQ3BDO2dCQUNELE1BQU0sRUFBRSw2QkFBNkI7YUFDeEMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFDTCxzQkFBQztBQUFELENBak1BLEFBaU1DLElBQUEiLCJmaWxlIjoidmVyc2lvbmVkLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=