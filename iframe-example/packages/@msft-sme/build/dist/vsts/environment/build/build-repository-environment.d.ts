import { VSTSEnvironment } from '../vsts-environment';
import { RepositoryType } from './repository-type';
export declare class BuildRepositoryEnvironment extends VSTSEnvironment {
    /**
     * Gets a vsts build env variable
     * @param name the name of the env var to get
     */
    protected get(name: string): string;
    /**
     * The value you've selected for Clean on the repository tab
     * See https://www.visualstudio.com/en-us/docs/build/define/repository.
     */
    readonly clean: boolean;
    /**
     * The local path on the agent where your source code files are downloaded.
     * For example: 'c:\agent\_work\1\s'.
     *
     * By default, new build definitions update only the changed files.
     * You can modify how files are downloaded on the Repository tab.
     *
     * See https://www.visualstudio.com/en-us/docs/build/define/repository.
     */
    readonly localPath: string;
    /**
     * The name of the repository
     * See: https://www.visualstudio.com/en-us/docs/build/define/repository
     */
    readonly name: string;
    /**
     * The Repository Type for this build
     * See: https://www.visualstudio.com/en-us/docs/build/define/repository
     */
    readonly type: RepositoryType;
    /**
     * Defined for repositories of type 'TfsVersionControl'.
     * The name of the TFVC workspace used by the build agent.
     *
     * For example, if the Agent.BuildDirectory is 'c:\agent\_work\12' and the Agent.Id is 8,
     * the workspace name could be: 'ws_12_8'
     */
    readonly tfcvWorkspace: string;
    /**
     * The URL for the repository.
     *
     * For example:
     *  - Git: https://fabrikamfiber.visualstudio.com/_git/Scripts
     *  - TFVC: https://fabrikamfiber.visualstudio.com/
     */
    readonly uri: string;
}
