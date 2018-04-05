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
var repository_type_1 = require("./repository-type");
var BuildRepositoryEnvironment = /** @class */ (function (_super) {
    __extends(BuildRepositoryEnvironment, _super);
    function BuildRepositoryEnvironment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a vsts build env variable
     * @param name the name of the env var to get
     */
    BuildRepositoryEnvironment.prototype.get = function (name) {
        return _super.prototype.get.call(this, "BUILD_REPOSITORY_" + name);
    };
    Object.defineProperty(BuildRepositoryEnvironment.prototype, "clean", {
        /**
         * The value you've selected for Clean on the repository tab
         * See https://www.visualstudio.com/en-us/docs/build/define/repository.
         */
        get: function () {
            return this.get('CLEAN') !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildRepositoryEnvironment.prototype, "localPath", {
        /**
         * The local path on the agent where your source code files are downloaded.
         * For example: 'c:\agent\_work\1\s'.
         *
         * By default, new build definitions update only the changed files.
         * You can modify how files are downloaded on the Repository tab.
         *
         * See https://www.visualstudio.com/en-us/docs/build/define/repository.
         */
        get: function () {
            return this.get('LOCALPATH');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildRepositoryEnvironment.prototype, "name", {
        /**
         * The name of the repository
         * See: https://www.visualstudio.com/en-us/docs/build/define/repository
         */
        get: function () {
            return this.get('NAME');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildRepositoryEnvironment.prototype, "type", {
        /**
         * The Repository Type for this build
         * See: https://www.visualstudio.com/en-us/docs/build/define/repository
         */
        get: function () {
            var value = this.get('PROVIDER');
            // convert to enum for easy consumption
            var typeMap = {};
            typeMap['TfsGit'] = repository_type_1.RepositoryType.tfsGit;
            typeMap['TfsVersionControl'] = repository_type_1.RepositoryType.tfsVersionControl;
            typeMap['Git'] = repository_type_1.RepositoryType.git;
            typeMap['GitHub'] = repository_type_1.RepositoryType.gitHub;
            typeMap['Svn'] = repository_type_1.RepositoryType.svn;
            return typeMap[value];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildRepositoryEnvironment.prototype, "tfcvWorkspace", {
        /**
         * Defined for repositories of type 'TfsVersionControl'.
         * The name of the TFVC workspace used by the build agent.
         *
         * For example, if the Agent.BuildDirectory is 'c:\agent\_work\12' and the Agent.Id is 8,
         * the workspace name could be: 'ws_12_8'
         */
        get: function () {
            return this.get('TFVC_WORKSPACE');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildRepositoryEnvironment.prototype, "uri", {
        /**
         * The URL for the repository.
         *
         * For example:
         *  - Git: https://fabrikamfiber.visualstudio.com/_git/Scripts
         *  - TFVC: https://fabrikamfiber.visualstudio.com/
         */
        get: function () {
            return this.get('URI');
        },
        enumerable: true,
        configurable: true
    });
    return BuildRepositoryEnvironment;
}(vsts_environment_1.VSTSEnvironment));
exports.BuildRepositoryEnvironment = BuildRepositoryEnvironment;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92c3RzL2Vudmlyb25tZW50L2J1aWxkL2J1aWxkLXJlcG9zaXRvcnktZW52aXJvbm1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXNEO0FBQ3RELHFEQUFtRDtBQUVuRDtJQUFnRCw4Q0FBZTtJQUEvRDs7SUEyRUEsQ0FBQztJQTFFRzs7O09BR0c7SUFDTyx3Q0FBRyxHQUFiLFVBQWMsSUFBWTtRQUN0QixNQUFNLENBQUMsaUJBQU0sR0FBRyxZQUFDLHNCQUFvQixJQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBTUQsc0JBQVcsNkNBQUs7UUFKaEI7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxPQUFPLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFXRCxzQkFBVyxpREFBUztRQVRwQjs7Ozs7Ozs7V0FRRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyw0Q0FBSTtRQUpmOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyw0Q0FBSTtRQUpmOzs7V0FHRzthQUNIO1lBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyx1Q0FBdUM7WUFDdkMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxnQ0FBYyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxnQ0FBYyxDQUFDLGlCQUFpQixDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxnQ0FBYyxDQUFDLEdBQUcsQ0FBQztZQUNwQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsZ0NBQWMsQ0FBQyxNQUFNLENBQUM7WUFDMUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLGdDQUFjLENBQUMsR0FBRyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFTRCxzQkFBVyxxREFBYTtRQVB4Qjs7Ozs7O1dBTUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFTRCxzQkFBVywyQ0FBRztRQVBkOzs7Ozs7V0FNRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFDTCxpQ0FBQztBQUFELENBM0VBLEFBMkVDLENBM0UrQyxrQ0FBZSxHQTJFOUQ7QUEzRVksZ0VBQTBCIiwiZmlsZSI6InZzdHMvZW52aXJvbm1lbnQvYnVpbGQvYnVpbGQtcmVwb3NpdG9yeS1lbnZpcm9ubWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
