import npm = require('../npm/npm');
import util = require('../util/util');
export declare enum ReleaseMode {
    singleBranch = 0,
    multiReleaseBranch = 1,
}
export declare enum ProjectType {
    tslib = 0,
    nglib = 1,
    ngSmeModule = 2,
}
/**
 * Options specific to the SME Build architecture.
 */
export declare class SmeOptions {
    private isProductionInternal;
    private projectTypeInternal;
    constructor(isProd: boolean, projectType: ProjectType);
    /**
     * Indicates that the build being performed against a non-release branch
     */
    readonly isProduction: boolean;
    /**
     * Flag to indicate that the type of project we are building
     */
    readonly projectType: ProjectType;
    /**
     * Flag to indicate that the build is local
     */
    readonly isLocal: boolean;
    /**
     * Flag to indicate that the build is not a release build, (therefore it is a dev build)
     */
    readonly isDev: boolean;
    /**
     * Flag to indicate that the build being performed against a release branch and conditions have not been satisfied for a full release
     */
    readonly isRC: boolean;
    /**
     * Flag to indicate that the build being performed against a release branch and conditions have been satisfied for a full release
     */
    readonly isRelease: boolean;
    /**
     * The name of the release branch we are building against. Null if not on a release branch.
     */
    readonly releaseBranchName: string;
    /**
     * Calculate if this build will result in a new latest package version being produced.
     * Returns true only in production release or RC build where the package.json version
     * is greater than the greatest release package version.
     */
    getIsLatest(pkg: npm.NpmPackage, callback: (err: Error, isLatest: boolean) => void): void;
    /**
     * Gets the new options that this package will produce.
     */
    getNewPublishOptions(pkg: npm.NpmPackage, callback: (err: Error, options: npm.PublishOptions) => void): void;
}
export declare class SMEBuild {
    optionsInternal: SmeOptions;
    constructor(isProd: boolean, projectType: ProjectType);
    readonly options: SmeOptions;
    /**
     * Reads the SME manifest or errors if it doesn't exist
     */
    readManifest(): any;
    /**
     * Writes the SME manifest
     */
    writeManifest(manifest: any): void;
    publish(confirm: boolean, callback: util.GulpDoneFunction, tags?: string[]): void;
    private preparePublish(pkg, callback);
    updateManifestForPublish(callback: util.GulpDoneFunction): void;
}
