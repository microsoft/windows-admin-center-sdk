import { VSTSEnvironment } from '../vsts-environment';
export declare class TeamFoundationEnvironment extends VSTSEnvironment {
    /**
     * Gets a vsts team foundation env variable
     * @param name the name of the env var to get
     */
    protected get(name: string): string;
    /**
     * true if the script is being run by a build step.
     */
    readonly tfBuild: boolean;
}
