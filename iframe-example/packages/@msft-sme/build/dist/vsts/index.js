"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agent_environment_1 = require("./environment/agent/agent-environment");
var build_environment_1 = require("./environment/build/build-environment");
var common_environment_1 = require("./environment/common/common-environment");
var system_environment_1 = require("./environment/system/system-environment");
var team_foundation_environment_1 = require("./environment/team-foundation/team-foundation-environment");
exports.environment = {
    agent: new agent_environment_1.AgentEnvironment(),
    build: new build_environment_1.BuildEnvironment(),
    common: new common_environment_1.CommonEnvironment(),
    system: new system_environment_1.SystemEnvironment(),
    teamFoundation: new team_foundation_environment_1.TeamFoundationEnvironment()
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92c3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkVBQXlFO0FBQ3pFLDJFQUF5RTtBQUN6RSw4RUFBNEU7QUFDNUUsOEVBQTRFO0FBQzVFLHlHQUFzRztBQUV6RixRQUFBLFdBQVcsR0FBRztJQUN2QixLQUFLLEVBQUUsSUFBSSxvQ0FBZ0IsRUFBRTtJQUM3QixLQUFLLEVBQUUsSUFBSSxvQ0FBZ0IsRUFBRTtJQUM3QixNQUFNLEVBQUUsSUFBSSxzQ0FBaUIsRUFBRTtJQUMvQixNQUFNLEVBQUUsSUFBSSxzQ0FBaUIsRUFBRTtJQUMvQixjQUFjLEVBQUUsSUFBSSx1REFBeUIsRUFBRTtDQUNsRCxDQUFDIiwiZmlsZSI6InZzdHMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
