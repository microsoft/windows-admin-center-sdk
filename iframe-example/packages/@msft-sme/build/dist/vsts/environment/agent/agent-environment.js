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
var AgentEnvironment = /** @class */ (function (_super) {
    __extends(AgentEnvironment, _super);
    function AgentEnvironment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a vsts agent env variable
     * @param name the name of the env var to get
     */
    AgentEnvironment.prototype.get = function (name) {
        return _super.prototype.get.call(this, "AGENT_" + name);
    };
    Object.defineProperty(AgentEnvironment.prototype, "buildDirectory", {
        /**
         * The local path on the agent where all folders for a given build definition are created.
         * For example: 'c:\agent\_work\1'
         */
        get: function () {
            return this.get('BUILDDIRECTORY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentEnvironment.prototype, "homeDirectory", {
        /**
         * The directory the agent is installed into. This contains the agent software.
         * For example: 'c:\agent\'.
         *
         * If you are using an on-premises agent, this directory is specified by you.
         * See https://www.visualstudio.com/en-us/docs/build/concepts/agents/agents.
         */
        get: function () {
            return this.get('HOMEDIRECTORY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentEnvironment.prototype, "id", {
        /**
         * The ID of the agent.
         */
        get: function () {
            return this.get('ID');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentEnvironment.prototype, "machineName", {
        /**
         * The name of the machine on which the agent is installed.
         */
        get: function () {
            return this.get('MACHINENAME');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentEnvironment.prototype, "name", {
        /**
         * The name of the agent that is registered with the pool.
         *
         * If you are using an on-premises agent, this directory is specified by you.
         * See https://www.visualstudio.com/en-us/docs/build/concepts/agents/agents.
         */
        get: function () {
            return this.get('NAME');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgentEnvironment.prototype, "WorkFolder", {
        /**
         * The working directory for this agent.
         * For example: 'c:\agent\_work'.
         */
        get: function () {
            return this.get('WORKFOLDER');
        },
        enumerable: true,
        configurable: true
    });
    return AgentEnvironment;
}(vsts_environment_1.VSTSEnvironment));
exports.AgentEnvironment = AgentEnvironment;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92c3RzL2Vudmlyb25tZW50L2FnZW50L2FnZW50LWVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFzRDtBQUV0RDtJQUFzQyxvQ0FBZTtJQUFyRDs7SUEyREEsQ0FBQztJQTFERzs7O09BR0c7SUFDTyw4QkFBRyxHQUFiLFVBQWMsSUFBWTtRQUN0QixNQUFNLENBQUMsaUJBQU0sR0FBRyxZQUFDLFdBQVMsSUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQU1ELHNCQUFXLDRDQUFjO1FBSnpCOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQVNELHNCQUFXLDJDQUFhO1FBUHhCOzs7Ozs7V0FNRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVyxnQ0FBRTtRQUhiOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHlDQUFXO1FBSHRCOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQVFELHNCQUFXLGtDQUFJO1FBTmY7Ozs7O1dBS0c7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBTUQsc0JBQVcsd0NBQVU7UUFKckI7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUNMLHVCQUFDO0FBQUQsQ0EzREEsQUEyREMsQ0EzRHFDLGtDQUFlLEdBMkRwRDtBQTNEWSw0Q0FBZ0IiLCJmaWxlIjoidnN0cy9lbnZpcm9ubWVudC9hZ2VudC9hZ2VudC1lbnZpcm9ubWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
