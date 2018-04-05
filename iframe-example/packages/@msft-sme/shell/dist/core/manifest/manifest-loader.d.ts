/**
 * The Manifest service class.
 *  (Localized string cannot be used in this class due to initialization phase when the strings are not ready yet.)
 */
export declare class ManifestLoader {
    private static manifestFile;
    private static deferred;
    private static internalLoaded;
    /**
     * Manifest loading promise.
     */
    readonly loaded: Promise<any>;
    /**
     * Load the manifest.
     */
    static loadManifest(): Promise<any>;
    /**
     * Load the manifest into the MsftSme.Environment.
     *
     * @param http the http object to load the manifest.
     * @param manifest the self loading manifest.
     * @return Promise<any> the promise object.
     */
    private static load(http, manifest?);
    /**
     * retrieves all of the side loaded manifests.
     *
     * @return Observable<any[]> the manifests.
     */
    private static fetchSideloadManifests(http);
    /**
     * Update the environment by the manifest.
     */
    private static update(manifest);
}
