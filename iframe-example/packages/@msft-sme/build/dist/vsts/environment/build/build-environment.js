"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vsts_environment_1 = require("../vsts-environment");
var build_reason_1 = require("./build-reason");
var build_repository_environment_1 = require("./build-repository-environment");
var BuildEnvironment = /** @class */ (function (_super) {
    __extends(BuildEnvironment, _super);
    function BuildEnvironment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The Build Repository Environment configuration
         */
        _this.repository = new build_repository_environment_1.BuildRepositoryEnvironment();
        return _this;
    }
    /**
     * Gets a vsts build env variable
     * @param name the name of the env var to get
     */
    BuildEnvironment.prototype.get = function (name) {
        return _super.prototype.get.call(this, "BUILD_" + name);
    };
    Object.defineProperty(BuildEnvironment.prototype, "artifactStagingDirectory", {
        /**
         * The local path on the agent where any artifacts are copied to before being pushed to their destination.
         * For example: 'c:\agent\_work\1\a'.
         *
         * A typical way to use this folder is to publish your build artifacts with the
         * 'Copy files' (https://www.visualstudio.com/en-us/docs/build/steps/utility/copy-files) and
         * 'Publish build artifacts' (https://www.visualstudio.com/en-us/docs/build/steps/utility/publish-build-artifacts) steps
         *
         * Note: This directory is purged before each new build, so you don't have to clean it up yourself.
         *
         * Build.ArtifactStagingDirectory and Build.StagingDirectory are interchangeable.
         *
         * See https://www.visualstudio.com/en-us/docs/build/concepts/definitions/build/artifacts
         */
        get: function () {
            return this.get('ARTIFACTSTAGINGDIRECTORY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "id", {
        /**
         * The ID of the record for the completed build.
         */
        get: function () {
            return this.get('BuildId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "number", {
        /**
         * The name of the completed build.
         * You can specify the build number format that generates this
         * value on the General tab (https://www.visualstudio.com/en-us/docs/build/define/general)
         *
         * A typical use of this variable is to make it part of the label format,
         * which you specify on the repository tab (https://www.visualstudio.com/en-us/docs/build/define/repository).
         *
         * Note: This value can contain whitespace or other invalid label characters. In these cases, the label format will fail.
         */
        get: function () {
            return this.get('BUILDNUMBER');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "uri", {
        /**
         * The URI for the build.
         * For example: 'vstfs:///Build/Build/1430'.
         */
        get: function () {
            return this.get('BUILDURI');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "binariesDirectory", {
        /**
         * The local path on the agent you can use as an output folder for compiled binaries.
         * For example: 'c:\agent\_work\1\b'.
         *
         * By default, new build definitions are not set up to clean this directory.
         * You can define your build to clean it up on the Repository tab (https://www.visualstudio.com/en-us/docs/build/define/repository).
         */
        get: function () {
            return this.get('BINARIESDIRECTORY ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "definitionName", {
        /**
         * The name of the build definition.
         * Note: This value can contain whitespace or other invalid label characters. In these cases, the label format will fail.
         */
        get: function () {
            return this.get('DEFINITIONNAME ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "definitionVersion", {
        /**
         * The version of the build definition.
         */
        get: function () {
            return this.get('DEFINITIONVERSION ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "queuedBy", {
        /**
         * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
         * Note: This value can contain whitespace or other invalid label characters. In these cases, the label format will fail
         */
        get: function () {
            return this.get('QUEUEDBY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "queuedById", {
        /**
         * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
         */
        get: function () {
            return this.get('QUEUEDBYID');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "reason", {
        /**
         * The event that caused the build to run
         * See
         *  - https://www.visualstudio.com/en-us/docs/build/define/triggers
         *  - https://www.visualstudio.com/en-us/docs/git/branch-policies
         */
        get: function () {
            var value = this.get('REASON');
            // convert to enum for easy consumption
            var reasonMap = {};
            reasonMap['Manual'] = build_reason_1.BuildReason.manual;
            reasonMap['IndividualCI'] = build_reason_1.BuildReason.individualCI;
            reasonMap['BatchedCI'] = build_reason_1.BuildReason.batchedCI;
            reasonMap['Schedule'] = build_reason_1.BuildReason.schedule;
            reasonMap['ValidateShelveset'] = build_reason_1.BuildReason.validateShelveset;
            reasonMap['CheckInShelveset'] = build_reason_1.BuildReason.checkInShelveset;
            reasonMap['PullRequest'] = build_reason_1.BuildReason.pullRequest;
            return reasonMap[value];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "requestedFor", {
        /**
         * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
         * Note: This value can contain whitespace or other invalid label characters. In these cases, the label format will fail
         */
        get: function () {
            return this.get('REQUESTEDFOR');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "requestedForEmail", {
        /**
         * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
         */
        get: function () {
            return this.get('REQUESTEDFOREMAIL');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "requestedForId", {
        /**
         * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
         */
        get: function () {
            return this.get('REQUESTEDFORID');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "sourceBranch", {
        /**
         * The branch the build was queued for.
         *
         * Some examples:
         *  - Git repo branch: 'refs/heads/master'
         *  - Git repo pull request: 'refs/pull/1/merge'
         *  - TFVC repo branch: '$/teamproject/main'
         *  - TFVC repo gated check-in: 'Gated_2016-06-06_05.20.51.4369;username@live.com'
         *  - TFVC repo shelveset build: 'myshelveset;username@live.com'
         *
         * When you use this variable in your build number format,
         * the forward slash characters (/) are replaced with underscore characters _).
         *
         * Note: In TFVC, if you are running a gated check-in build or manually building a shelveset,
         * you cannot use this variable in your build number format.
         */
        get: function () {
            return this.get('SOURCEBRANCH');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "sourceBranchName", {
        /**
         * The name of the branch the build was queued for.
         *  - Git repo branch or pull request: The last path segment in the ref.
         *      For example, in 'refs/heads/master' this value is 'master'.
         *  - TFVC repo branch: The last path segment in the root server path for the workspace.
         *      For example in '$/teamproject/main' this value is 'main'.
         *  - TFVC repo gated check-in or shelveset build is the name of the shelveset.
         *      For example, 'Gated_2016-06-06_05.20.51.4369;username@live.com' or 'myshelveset;username@live.com'.
         *
         * Note: In TFVC, if you are running a gated check-in build or manually building a shelveset,
         * you cannot use this variable in your build number format.
         */
        get: function () {
            return this.get('SOURCEBRANCHNAME');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "SourcesDirectory", {
        /**
         * The local path on the agent where your source code files are downloaded.
         * For example: 'c:\agent\_work\1\s'
         *
         * By default, new build definitions update only the changed files.
         * You can modify how files are downloaded on the Repository tab.
         *
         * See https://www.visualstudio.com/en-us/docs/build/define/repository
         */
        get: function () {
            return this.get('SOURCESDIRECTORY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "SourceVersion", {
        /**
         * The latest version control change that is included in this build.
         *      - Git: The commit ID.
         *      - TFVC: the changeset number.
         */
        get: function () {
            return this.get('SOURCEVERSION');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildEnvironment.prototype, "StagingDirectory", {
        /**
         * The local path on the agent where any artifacts are copied to before being pushed to their destination.
         * For example: 'c:\agent\_work\1\a'.
         *
         * A typical way to use this folder is to publish your build artifacts with the
         * 'Copy files' (https://www.visualstudio.com/en-us/docs/build/steps/utility/copy-files) and
         * 'Publish build artifacts' (https://www.visualstudio.com/en-us/docs/build/steps/utility/publish-build-artifacts) steps
         *
         * Note: This directory is purged before each new build, so you don't have to clean it up yourself.
         *
         * Build.ArtifactStagingDirectory and Build.StagingDirectory are interchangeable.
         *
         * See https://www.visualstudio.com/en-us/docs/build/concepts/definitions/build/artifacts
         */
        get: function () {
            return this.get('STAGINGDIRECTORY');
        },
        enumerable: true,
        configurable: true
    });
    return BuildEnvironment;
}(vsts_environment_1.VSTSEnvironment));
exports.BuildEnvironment = BuildEnvironment;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92c3RzL2Vudmlyb25tZW50L2J1aWxkL2J1aWxkLWVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFzRDtBQUN0RCwrQ0FBNkM7QUFDN0MsK0VBQTRFO0FBRTVFO0lBQXNDLG9DQUFlO0lBQXJEO1FBQUEscUVBNE5DO1FBMU5HOztXQUVHO1FBQ2EsZ0JBQVUsR0FBK0IsSUFBSSx5REFBMEIsRUFBRSxDQUFDOztJQXVOOUYsQ0FBQztJQXJORzs7O09BR0c7SUFDTyw4QkFBRyxHQUFiLFVBQWMsSUFBWTtRQUN0QixNQUFNLENBQUMsaUJBQU0sR0FBRyxZQUFDLFdBQVMsSUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQWdCRCxzQkFBVyxzREFBd0I7UUFkbkM7Ozs7Ozs7Ozs7Ozs7V0FhRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLGdDQUFFO1FBSGI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBWUQsc0JBQVcsb0NBQU07UUFWakI7Ozs7Ozs7OztXQVNHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFXLGlDQUFHO1FBSmQ7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQVNELHNCQUFXLCtDQUFpQjtRQVA1Qjs7Ozs7O1dBTUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyw0Q0FBYztRQUp6Qjs7O1dBR0c7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVywrQ0FBaUI7UUFINUI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyxzQ0FBUTtRQUpuQjs7O1dBR0c7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsd0NBQVU7UUFIckI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBUUQsc0JBQVcsb0NBQU07UUFOakI7Ozs7O1dBS0c7YUFDSDtZQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsdUNBQXVDO1lBQ3ZDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNuQixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsMEJBQVcsQ0FBQyxNQUFNLENBQUM7WUFDekMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLDBCQUFXLENBQUMsWUFBWSxDQUFDO1lBQ3JELFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRywwQkFBVyxDQUFDLFNBQVMsQ0FBQztZQUMvQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsMEJBQVcsQ0FBQyxRQUFRLENBQUM7WUFDN0MsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsMEJBQVcsQ0FBQyxpQkFBaUIsQ0FBQztZQUMvRCxTQUFTLENBQUMsa0JBQWtCLENBQUMsR0FBRywwQkFBVyxDQUFDLGdCQUFnQixDQUFDO1lBQzdELFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRywwQkFBVyxDQUFDLFdBQVcsQ0FBQztZQUNuRCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBTUQsc0JBQVcsMENBQVk7UUFKdkI7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLCtDQUFpQjtRQUg1Qjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDRDQUFjO1FBSHpCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBa0JELHNCQUFXLDBDQUFZO1FBaEJ2Qjs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBY0Qsc0JBQVcsOENBQWdCO1FBWjNCOzs7Ozs7Ozs7OztXQVdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBV0Qsc0JBQVcsOENBQWdCO1FBVDNCOzs7Ozs7OztXQVFHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBT0Qsc0JBQVcsMkNBQWE7UUFMeEI7Ozs7V0FJRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFnQkQsc0JBQVcsOENBQWdCO1FBZDNCOzs7Ozs7Ozs7Ozs7O1dBYUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFDTCx1QkFBQztBQUFELENBNU5BLEFBNE5DLENBNU5xQyxrQ0FBZSxHQTROcEQ7QUE1TlksNENBQWdCIiwiZmlsZSI6InZzdHMvZW52aXJvbm1lbnQvYnVpbGQvYnVpbGQtZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
