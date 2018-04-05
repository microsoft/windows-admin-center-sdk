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
var CommonEnvironment = /** @class */ (function (_super) {
    __extends(CommonEnvironment, _super);
    function CommonEnvironment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a vsts agent env variable
     * @param name the name of the env var to get
     */
    CommonEnvironment.prototype.get = function (name) {
        return _super.prototype.get.call(this, "COMMON_" + name);
    };
    Object.defineProperty(CommonEnvironment.prototype, "testResultsDirectory", {
        /**
         * The local path on the agent where the test results are created.
         * For example: 'c:\agent\_work\1\TestResults'
         */
        get: function () {
            return this.get('TESTRESULTSDIRECTORY');
        },
        enumerable: true,
        configurable: true
    });
    return CommonEnvironment;
}(vsts_environment_1.VSTSEnvironment));
exports.CommonEnvironment = CommonEnvironment;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92c3RzL2Vudmlyb25tZW50L2NvbW1vbi9jb21tb24tZW52aXJvbm1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXNEO0FBRXREO0lBQXVDLHFDQUFlO0lBQXREOztJQWdCQSxDQUFDO0lBZkc7OztPQUdHO0lBQ08sK0JBQUcsR0FBYixVQUFjLElBQVk7UUFDdEIsTUFBTSxDQUFDLGlCQUFNLEdBQUcsWUFBQyxZQUFVLElBQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFNRCxzQkFBVyxtREFBb0I7UUFKL0I7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBQ0wsd0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxDQWhCc0Msa0NBQWUsR0FnQnJEO0FBaEJZLDhDQUFpQiIsImZpbGUiOiJ2c3RzL2Vudmlyb25tZW50L2NvbW1vbi9jb21tb24tZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
