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
var TeamFoundationEnvironment = /** @class */ (function (_super) {
    __extends(TeamFoundationEnvironment, _super);
    function TeamFoundationEnvironment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a vsts team foundation env variable
     * @param name the name of the env var to get
     */
    TeamFoundationEnvironment.prototype.get = function (name) {
        return _super.prototype.get.call(this, "TF_" + name);
    };
    Object.defineProperty(TeamFoundationEnvironment.prototype, "tfBuild", {
        /**
         * true if the script is being run by a build step.
         */
        get: function () {
            return this.get('BUILD') === 'True';
        },
        enumerable: true,
        configurable: true
    });
    return TeamFoundationEnvironment;
}(vsts_environment_1.VSTSEnvironment));
exports.TeamFoundationEnvironment = TeamFoundationEnvironment;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92c3RzL2Vudmlyb25tZW50L3RlYW0tZm91bmRhdGlvbi90ZWFtLWZvdW5kYXRpb24tZW52aXJvbm1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXNEO0FBRXREO0lBQStDLDZDQUFlO0lBQTlEOztJQWVBLENBQUM7SUFkRzs7O09BR0c7SUFDTyx1Q0FBRyxHQUFiLFVBQWMsSUFBWTtRQUN0QixNQUFNLENBQUMsaUJBQU0sR0FBRyxZQUFDLFFBQU0sSUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUtELHNCQUFXLDhDQUFPO1FBSGxCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxNQUFNLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFDTCxnQ0FBQztBQUFELENBZkEsQUFlQyxDQWY4QyxrQ0FBZSxHQWU3RDtBQWZZLDhEQUF5QiIsImZpbGUiOiJ2c3RzL2Vudmlyb25tZW50L3RlYW0tZm91bmRhdGlvbi90ZWFtLWZvdW5kYXRpb24tZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
