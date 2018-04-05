import { VSTSEnvironment } from '../vsts-environment';
import { BuildReason } from './build-reason';
import { BuildRepositoryEnvironment } from './build-repository-environment';
export declare class BuildEnvironment extends VSTSEnvironment {
    /**
     * The Build Repository Environment configuration
     */
    readonly repository: BuildRepositoryEnvironment;
    /**
     * Gets a vsts build env variable
     * @param name the name of the env var to get
     */
    protected get(name: string): string;
    /**
     * The local path on the agent where any artifacts are copied to before being pushed to their destination.
     * For example: 'c:\agent\_work\1\a'.
     *
     * A typical way to use this folder is to publish your build artifacts with the
     * 'Copy files' (https://www.visualstudio.com/en-us/docs/build/steps/utility/copy-files) and
     * 'Publish build artifacts' (https://www.visualstudio.com/en-us/docs/build/steps/utility/publish-build-artifacts) steps
     *
     * Note: This directory is purged before each new build, so you don't have to clean it up yourself.
     *
     * Build.ArtifactStagingDirectory and Build.StagingDirectory are interchangeable.
     *
     * See https://www.visualstudio.com/en-us/docs/build/concepts/definitions/build/artifacts
     */
    readonly artifactStagingDirectory: string;
    /**
     * The ID of the record for the completed build.
     */
    readonly id: string;
    /**
     * The name of the completed build.
     * You can specify the build number format that generates this
     * value on the General tab (https://www.visualstudio.com/en-us/docs/build/define/general)
     *
     * A typical use of this variable is to make it part of the label format,
     * which you specify on the repository tab (https://www.visualstudio.com/en-us/docs/build/define/repository).
     *
     * Note: This value can contain whitespace or other invalid label characters. In these cases, the label format will fail.
     */
    readonly number: string;
    /**
     * The URI for the build.
     * For example: 'vstfs:///Build/Build/1430'.
     */
    readonly uri: string;
    /**
     * The local path on the agent you can use as an output folder for compiled binaries.
     * For example: 'c:\agent\_work\1\b'.
     *
     * By default, new build definitions are not set up to clean this directory.
     * You can define your build to clean it up on the Repository tab (https://www.visualstudio.com/en-us/docs/build/define/repository).
     */
    readonly binariesDirectory: string;
    /**
     * The name of the build definition.
     * Note: This value can contain whitespace or other invalid label characters. In these cases, the label format will fail.
     */
    readonly definitionName: string;
    /**
     * The version of the build definition.
     */
    readonly definitionVersion: string;
    /**
     * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
     * Note: This value can contain whitespace or other invalid label characters. In these cases, the label format will fail
     */
    readonly queuedBy: string;
    /**
     * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
     */
    readonly queuedById: string;
    /**
     * The event that caused the build to run
     * See
     *  - https://www.visualstudio.com/en-us/docs/build/define/triggers
     *  - https://www.visualstudio.com/en-us/docs/git/branch-policies
     */
    readonly reason: BuildReason;
    /**
     * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
     * Note: This value can contain whitespace or other invalid label characters. In these cases, the label format will fail
     */
    readonly requestedFor: string;
    /**
     * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
     */
    readonly requestedForEmail: string;
    /**
     * See 'How are the identity variables set?': https://www.visualstudio.com/en-us/docs/build/define/variables#identity_values
     */
    readonly requestedForId: string;
    /**
     * The branch the build was queued for.
     *
     * Some examples:
     *  - Git repo branch: 'refs/heads/master'
     *  - Git repo pull request: 'refs/pull/1/merge'
     *  - TFVC repo branch: '$/teamproject/main'
     *  - TFVC repo gated check-in: 'Gated_2016-06-06_05.20.51.4369;username@live.com'
     *  - TFVC repo shelveset build: 'myshelveset;username@live.com'
     *
     * When you use this variable in your build number format,
     * the forward slash characters (/) are replaced with underscore characters _).
     *
     * Note: In TFVC, if you are running a gated check-in build or manually building a shelveset,
     * you cannot use this variable in your build number format.
     */
    readonly sourceBranch: string;
    /**
     * The name of the branch the build was queued for.
     *  - Git repo branch or pull request: The last path segment in the ref.
     *      For example, in 'refs/heads/master' this value is 'master'.
     *  - TFVC repo branch: The last path segment in the root server path for the workspace.
     *      For example in '$/teamproject/main' this value is 'main'.
     *  - TFVC repo gated check-in or shelveset build is the name of the shelveset.
     *      For example, 'Gated_2016-06-06_05.20.51.4369;username@live.com' or 'myshelveset;username@live.com'.
     *
     * Note: In TFVC, if you are running a gated check-in build or manually building a shelveset,
     * you cannot use this variable in your build number format.
     */
    readonly sourceBranchName: string;
    /**
     * The local path on the agent where your source code files are downloaded.
     * For example: 'c:\agent\_work\1\s'
     *
     * By default, new build definitions update only the changed files.
     * You can modify how files are downloaded on the Repository tab.
     *
     * See https://www.visualstudio.com/en-us/docs/build/define/repository
     */
    readonly SourcesDirectory: string;
    /**
     * The latest version control change that is included in this build.
     *      - Git: The commit ID.
     *      - TFVC: the changeset number.
     */
    readonly SourceVersion: string;
    /**
     * The local path on the agent where any artifacts are copied to before being pushed to their destination.
     * For example: 'c:\agent\_work\1\a'.
     *
     * A typical way to use this folder is to publish your build artifacts with the
     * 'Copy files' (https://www.visualstudio.com/en-us/docs/build/steps/utility/copy-files) and
     * 'Publish build artifacts' (https://www.visualstudio.com/en-us/docs/build/steps/utility/publish-build-artifacts) steps
     *
     * Note: This directory is purged before each new build, so you don't have to clean it up yourself.
     *
     * Build.ArtifactStagingDirectory and Build.StagingDirectory are interchangeable.
     *
     * See https://www.visualstudio.com/en-us/docs/build/concepts/definitions/build/artifacts
     */
    readonly StagingDirectory: string;
}
