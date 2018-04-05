import { Observable } from 'rxjs';
import { JsonObject, JsonValue } from './json';
/**
 * Defines a wrapper for an object and its current version
 * All versioned data should end up in this format
 */
export interface PlainVersionedObject extends JsonObject {
    /**
     * The properties of the object
     */
    properties: JsonObject;
    /**
     * The version of the object
     */
    version: number;
}
/**
 * Defines the handlers for a versioned object
 */
export interface VersionedObjectHandlers {
    /**
     * The Save handler. Called by the consumer when changes to a versioned object need to be saved.
     * @param objectWrapper the wrapper object to save
     */
    save: (object: PlainVersionedObject) => Observable<void>;
}
/**
 * Defines the constructor of a versioned object. Used to dynamically construct classes that extend VersionedObject
 */
export interface VersionedObjectConstructor<T extends VersionedObject> {
    new (objectWrapper: PlainVersionedObject, handlers: VersionedObjectHandlers): T;
}
/**
 * Defines an object that can be upgraded from older versions to the current version upon initialization.
 */
export declare abstract class VersionedObject {
    private objectWrapper;
    private handlers;
    /**
     * Getter for the latest version of the object.
     */
    protected readonly abstract latestVersion: number;
    /**
     * The current version of the object
     */
    currentVersion: number;
    /**
     * The properties of the object
     */
    private properties;
    /**
     * Gets an initialized empty versioned object wrapper
     */
    static getEmptyWrapper(): PlainVersionedObject;
    /**
     * Returns an empty versioned object if the passed in object is not correctly versioned.
     * Otherwise, returns the passed in object.
     */
    static ensureIsVersionedObject(obj: PlainVersionedObject): PlainVersionedObject;
    /**
     * Initializes a new instance of a VersionedObject
     * If the current version of the object is less than the latest version,
     * then 'upgrade()' will be called until the version is updated to the latest version.
     * An error will be thrown if upgrade is called and the version is not moved forward by at least 1.
     * @param objectWrapper the simplified version of the plain object with versioning
     * @param handlers The handlers to modify the plain Object
     */
    constructor(objectWrapper: PlainVersionedObject, handlers: VersionedObjectHandlers);
    /**
     *  Converts this versioned object to its pure json representation
     */
    toJson(): PlainVersionedObject;
    /**
     *  Saves the current properties
     */
    save(): Observable<void>;
    /**
     * Attempts to save the properties after executing a function.
     * If saving fails, the properties is reverted to its previous state before emitting the error
     */
    trySave(fn: Function): Observable<void>;
    /**
     *  Clears the current properties
     */
    protected clear(): void;
    /**
     * Attempts to upgrade the current version of the object at least one version toward the latest version.
     * if this.currentVersion is null or undefined, then the upgrade should initialize to the latest version
     * this is called itterativly untill the current version is equal to the latest version
     */
    protected abstract upgrade(): void;
    /**
     * Gets a property from 'properties'
     * @param key the property key
     * @returns the properties value
     */
    protected getProperty(key: string): JsonValue;
    /**
     * Sets a property in 'properties'
     * @param key the property key
     * @param value the new value
     */
    protected setProperty(key: string, value: JsonValue): void;
}
