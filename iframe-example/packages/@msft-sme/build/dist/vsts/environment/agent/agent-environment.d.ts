import { VSTSEnvironment } from '../vsts-environment';
export declare class AgentEnvironment extends VSTSEnvironment {
    /**
     * Gets a vsts agent env variable
     * @param name the name of the env var to get
     */
    protected get(name: string): string;
    /**
     * The local path on the agent where all folders for a given build definition are created.
     * For example: 'c:\agent\_work\1'
     */
    readonly buildDirectory: string;
    /**
     * The directory the agent is installed into. This contains the agent software.
     * For example: 'c:\agent\'.
     *
     * If you are using an on-premises agent, this directory is specified by you.
     * See https://www.visualstudio.com/en-us/docs/build/concepts/agents/agents.
     */
    readonly homeDirectory: string;
    /**
     * The ID of the agent.
     */
    readonly id: string;
    /**
     * The name of the machine on which the agent is installed.
     */
    readonly machineName: string;
    /**
     * The name of the agent that is registered with the pool.
     *
     * If you are using an on-premises agent, this directory is specified by you.
     * See https://www.visualstudio.com/en-us/docs/build/concepts/agents/agents.
     */
    readonly name: string;
    /**
     * The working directory for this agent.
     * For example: 'c:\agent\_work'.
     */
    readonly WorkFolder: string;
}
