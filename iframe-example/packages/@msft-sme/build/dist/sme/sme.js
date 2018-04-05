"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semver = require("semver");
var npm = require("../npm/npm");
var util = require("../util/util");
var vsts = require("../vsts");
var RELEASE_BRANCH_PREFIX = 'refs/heads/release';
var TAGS = {
    DEV: 'dev',
    V_NEXT: 'vNext',
    RELEASE_CANDIDATE: 'rc',
    RELEASE: 'release'
};
var PLUGIN_NAME = 'gulp-sme-build';
var MANIFEST_PATH = 'src/manifest.json';
var ReleaseMode;
(function (ReleaseMode) {
    ReleaseMode[ReleaseMode["singleBranch"] = 0] = "singleBranch";
    ReleaseMode[ReleaseMode["multiReleaseBranch"] = 1] = "multiReleaseBranch";
})(ReleaseMode = exports.ReleaseMode || (exports.ReleaseMode = {}));
var ProjectType;
(function (ProjectType) {
    ProjectType[ProjectType["tslib"] = 0] = "tslib";
    ProjectType[ProjectType["nglib"] = 1] = "nglib";
    ProjectType[ProjectType["ngSmeModule"] = 2] = "ngSmeModule";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
/**
 * Options specific to the SME Build architecture.
 */
var SmeOptions = /** @class */ (function () {
    function SmeOptions(isProd, projectType) {
        this.isProductionInternal = isProd;
        this.projectTypeInternal = projectType;
        // log some debug information
        var projectTypeString = ProjectType[projectType];
        util.log("SME Options Initialized:");
        util.log("isDev: " + this.isDev);
        util.log("isLocal: " + this.isLocal);
        util.log("isProduction: " + this.isProduction);
        util.log("isRC: " + this.isRC);
        util.log("isRelease: " + this.isRelease);
        util.log("projectType: " + projectTypeString);
        util.log("releaseBranchName: " + this.releaseBranchName);
        util.log("SourceBranch:" + vsts.environment.build.sourceBranch);
        util.log("BuildId:" + vsts.environment.build.id);
    }
    Object.defineProperty(SmeOptions.prototype, "isProduction", {
        /**
         * Indicates that the build being performed against a non-release branch
         */
        get: function () {
            return this.isProductionInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmeOptions.prototype, "projectType", {
        /**
         * Flag to indicate that the type of project we are building
         */
        get: function () {
            return this.projectTypeInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmeOptions.prototype, "isLocal", {
        /**
         * Flag to indicate that the build is local
         */
        get: function () {
            return !!this.releaseBranchName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmeOptions.prototype, "isDev", {
        /**
         * Flag to indicate that the build is not a release build, (therefore it is a dev build)
         */
        get: function () {
            return !this.isRelease && !this.isRC;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmeOptions.prototype, "isRC", {
        /**
         * Flag to indicate that the build being performed against a release branch and conditions have not been satisfied for a full release
         */
        get: function () {
            return this.isProduction && !!this.releaseBranchName && !this.isRelease;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmeOptions.prototype, "isRelease", {
        /**
         * Flag to indicate that the build being performed against a release branch and conditions have been satisfied for a full release
         */
        get: function () {
            return this.isProduction && !!this.releaseBranchName && process.env['SME_RELEASE'] === 'true';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmeOptions.prototype, "releaseBranchName", {
        /**
         * The name of the release branch we are building against. Null if not on a release branch.
         */
        get: function () {
            // if there is no branch, return null;
            if (!vsts.environment.build.sourceBranch) {
                return null;
            }
            // get the lower case branch name
            var branchName = vsts.environment.build.sourceBranch.toLowerCase();
            // if the branchName is RELEASE_BRANCH_PREFIX or does not start with RELEASE_BRANCH_PREFIX 
            // then return null. it is not a valid release branch
            if (branchName === RELEASE_BRANCH_PREFIX || !branchName.startsWith(RELEASE_BRANCH_PREFIX)) {
                return null;
            }
            // since we know now it is a valid release branch, get the branch name after RELEASE_BRANCH_PREFIX
            return branchName.substring(RELEASE_BRANCH_PREFIX.length + 1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculate if this build will result in a new latest package version being produced.
     * Returns true only in production release or RC build where the package.json version
     * is greater than the greatest release package version.
     */
    SmeOptions.prototype.getIsLatest = function (pkg, callback) {
        if (!this.isProduction || this.isDev) {
            return callback(null, false);
        }
        util.log("Getting Latest version of " + pkg.name);
        npm.getTags(pkg.name, function (err, tags) {
            if (err) {
                callback(err, false);
                return;
            }
            // if no release package has ever been published, then use 0.0.0 for the last release package.
            var latestPublishedVersion = tags['release'] || '0.0.0';
            // return true if pkg.version is greater than the latest version
            util.log("Checking if the current version " + pkg.version + " is greater than the published version of " + latestPublishedVersion);
            var greater = semver.compare(pkg.version, latestPublishedVersion) > 0;
            util.log("isGreater: " + greater);
            callback(null, greater);
        });
    };
    ;
    /**
     * Gets the new options that this package will produce.
     */
    SmeOptions.prototype.getNewPublishOptions = function (pkg, callback) {
        util.log('Getting Single Release Branch Publish Options');
        npm.getLatestVersion(pkg.name, function (err, latestPublishedVersion) {
            if (err) {
                callback(err, null);
                return;
            }
            var major = semver.major(pkg.version);
            var minor = semver.minor(pkg.version);
            var patch = semver.patch(pkg.version);
            var majorPublished = semver.major(latestPublishedVersion);
            var minorPublished = semver.minor(latestPublishedVersion);
            var patchPublished = semver.patch(latestPublishedVersion);
            var hotfix = major === majorPublished && minor === minorPublished && patch > patchPublished;
            var latest = major > majorPublished || (major === majorPublished && minor > minorPublished) || hotfix;
            callback(null, {
                version: major + "." + minor + "." + patch,
                tags: latest ? [TAGS.DEV] : []
            });
        });
    };
    return SmeOptions;
}());
exports.SmeOptions = SmeOptions;
var SMEBuild = /** @class */ (function () {
    function SMEBuild(isProd, projectType) {
        this.optionsInternal = new SmeOptions(isProd, projectType);
    }
    Object.defineProperty(SMEBuild.prototype, "options", {
        get: function () {
            return this.optionsInternal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reads the SME manifest or errors if it doesn't exist
     */
    SMEBuild.prototype.readManifest = function () {
        var manifest = util.readJSON(MANIFEST_PATH);
        if (!manifest) {
            throw new Error('manifest not found');
        }
        return manifest;
    };
    /**
     * Writes the SME manifest
     */
    SMEBuild.prototype.writeManifest = function (manifest) {
        util.writeJSON(MANIFEST_PATH, manifest);
    };
    SMEBuild.prototype.publish = function (confirm, callback, tags) {
        var _this = this;
        var pkg = npm.readPackage();
        this.preparePublish(pkg, function (prepareError, options) {
            if (prepareError) {
                callback(prepareError);
                return;
            }
            // we only go this far when preparing a package in a non production environment
            if (!_this.options.isProduction) {
                util.log("Not it production mode. Skipping actual publish");
                callback();
                return;
            }
            if (tags) {
                util.log("Custom Tags provided, overriding generated tags");
                options.tags = tags;
            }
            util.log("Publish Options:");
            util.log("version: " + options.version);
            util.log("tags: " + tags);
            // publish the package.
            npm.publish(confirm, options, function (publishError) {
                if (publishError) {
                    callback(publishError);
                    return;
                }
                callback();
            });
        });
    };
    SMEBuild.prototype.preparePublish = function (pkg, callback) {
        util.log("Preparing for publish");
        var operationCount = 2;
        var result;
        var opDone = function (err, options) {
            if (err) {
                callback(err);
                return;
            }
            if (options) {
                result = options;
            }
            operationCount--;
            if (operationCount === 0) {
                callback(null, result);
            }
        };
        this.options.getNewPublishOptions(pkg, opDone);
        npm.validateDependencies(pkg, this.options.isProduction, opDone);
    };
    SMEBuild.prototype.updateManifestForPublish = function (callback) {
        var _this = this;
        // Manifest only exists in ngSmeModules, dont try to update it if this is not an sme module
        if (this.options.projectType !== ProjectType.ngSmeModule) {
            callback();
        }
        var pkg = npm.readPackage();
        this.options.getNewPublishOptions(pkg, function (err, options) {
            if (err) {
                callback(err);
                return;
            }
            try {
                util.log("Updating manifest with package version: " + options.version);
                var manifest = _this.readManifest();
                manifest.version = options.version;
                _this.writeManifest(manifest);
                callback();
            }
            catch (ex) {
                callback(ex);
            }
        });
    };
    return SMEBuild;
}());
exports.SMEBuild = SMEBuild;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxDQUFDO2dCQUN2QixRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTSwyQ0FBd0IsR0FBL0IsVUFBZ0MsUUFBK0I7UUFBL0QsaUJBdUJDO1FBdEJHLDJGQUEyRjtRQUMzRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN2RCxRQUFRLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFRCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztZQUNoRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsSUFBSSxDQUFDO2dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsNkNBQTJDLE9BQU8sQ0FBQyxPQUFTLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxRQUFRLEdBQUcsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNuQyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdCLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FoSEEsQUFnSEMsSUFBQTtBQWhIWSw0QkFBUSIsImZpbGUiOiJzbWUvc21lLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
