import { VSTSEnvironment } from '../vsts-environment';
export declare class SystemEnvironment extends VSTSEnvironment {
    /**
     * Gets a vsts system env variable
     * @param name the name of the env var to get
     */
    protected get(name: string): string;
    /**
     * The OAuth token to access the REST API.
     * See https://www.visualstudio.com/en-us/docs/build/scripts/index#oauth
     */
    readonly testResultsDirectory: string;
    /**
     * The GUID of the team foundation collection.
     */
    readonly collectionId: string;
    /**
     * The local path on the agent where your source code files are downloaded.
     * For example: 'c:\agent\_work\1\s'
     *
     * By default, new build definitions update only the changed files.
     * You can modify how files are downloaded on the Repository tab.
     */
    readonly defaultWorkingDirectory: string;
    /**
     * The ID of the build definition.
     */
    readonly definitionId: string;
    /**
     * The URI of the team foundation collection.
     * For example: https://microsoft.visualstudio.com/.
     */
    readonly teamFoundationCollectionUri: string;
    /**
     * The name of the team project that contains this build.
     */
    readonly teamProject: string;
    /**
     * The ID of the team project that this build belongs to.
     */
    readonly teamProjectId: string;
}
