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
var SystemEnvironment = /** @class */ (function (_super) {
    __extends(SystemEnvironment, _super);
    function SystemEnvironment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a vsts system env variable
     * @param name the name of the env var to get
     */
    SystemEnvironment.prototype.get = function (name) {
        return _super.prototype.get.call(this, "SYSTEM_" + name);
    };
    Object.defineProperty(SystemEnvironment.prototype, "testResultsDirectory", {
        /**
         * The OAuth token to access the REST API.
         * See https://www.visualstudio.com/en-us/docs/build/scripts/index#oauth
         */
        get: function () {
            return this.get('ACCESSTOKEN');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemEnvironment.prototype, "collectionId", {
        /**
         * The GUID of the team foundation collection.
         */
        get: function () {
            return this.get('COLLECTIONID');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemEnvironment.prototype, "defaultWorkingDirectory", {
        /**
         * The local path on the agent where your source code files are downloaded.
         * For example: 'c:\agent\_work\1\s'
         *
         * By default, new build definitions update only the changed files.
         * You can modify how files are downloaded on the Repository tab.
         */
        get: function () {
            return this.get('DEFAULTWORKINGDIRECTORY ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemEnvironment.prototype, "definitionId", {
        /**
         * The ID of the build definition.
         */
        get: function () {
            return this.get('DEFINITIONID');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemEnvironment.prototype, "teamFoundationCollectionUri", {
        /**
         * The URI of the team foundation collection.
         * For example: https://microsoft.visualstudio.com/.
         */
        get: function () {
            return this.get('TEAMFOUNDATIONCOLLECTIONURI');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemEnvironment.prototype, "teamProject", {
        /**
         * The name of the team project that contains this build.
         */
        get: function () {
            return this.get('TEAMPROJECT');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemEnvironment.prototype, "teamProjectId", {
        /**
         * The ID of the team project that this build belongs to.
         */
        get: function () {
            return this.get('TEAMPROJECTID');
        },
        enumerable: true,
        configurable: true
    });
    return SystemEnvironment;
}(vsts_environment_1.VSTSEnvironment));
exports.SystemEnvironment = SystemEnvironment;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92c3RzL2Vudmlyb25tZW50L3N5c3RlbS9zeXN0ZW0tZW52aXJvbm1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXNEO0FBRXREO0lBQXVDLHFDQUFlO0lBQXREOztJQStEQSxDQUFDO0lBOURHOzs7T0FHRztJQUNPLCtCQUFHLEdBQWIsVUFBYyxJQUFZO1FBQ3RCLE1BQU0sQ0FBQyxpQkFBTSxHQUFHLFlBQUMsWUFBVSxJQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBTUQsc0JBQVcsbURBQW9CO1FBSi9COzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVywyQ0FBWTtRQUh2Qjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFTRCxzQkFBVyxzREFBdUI7UUFQbEM7Ozs7OztXQU1HO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsMkNBQVk7UUFIdkI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBTUQsc0JBQVcsMERBQTJCO1FBSnRDOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNuRCxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDBDQUFXO1FBSHRCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDRDQUFhO1FBSHhCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUNMLHdCQUFDO0FBQUQsQ0EvREEsQUErREMsQ0EvRHNDLGtDQUFlLEdBK0RyRDtBQS9EWSw4Q0FBaUIiLCJmaWxlIjoidnN0cy9lbnZpcm9ubWVudC9zeXN0ZW0vc3lzdGVtLWVudmlyb25tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
