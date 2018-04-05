import { VSTSEnvironment } from '../vsts-environment';
export declare class CommonEnvironment extends VSTSEnvironment {
    /**
     * Gets a vsts agent env variable
     * @param name the name of the env var to get
     */
    protected get(name: string): string;
    /**
     * The local path on the agent where the test results are created.
     * For example: 'c:\agent\_work\1\TestResults'
     */
    readonly testResultsDirectory: string;
}
