import { AgentEnvironment } from './environment/agent/agent-environment';
import { BuildEnvironment } from './environment/build/build-environment';
import { CommonEnvironment } from './environment/common/common-environment';
import { SystemEnvironment } from './environment/system/system-environment';
import { TeamFoundationEnvironment } from './environment/team-foundation/team-foundation-environment';
export declare const environment: {
    agent: AgentEnvironment;
    build: BuildEnvironment;
    common: CommonEnvironment;
    system: SystemEnvironment;
    teamFoundation: TeamFoundationEnvironment;
};
