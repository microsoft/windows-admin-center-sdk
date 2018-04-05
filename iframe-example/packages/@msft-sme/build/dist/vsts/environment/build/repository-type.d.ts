/**
 * Vsts Repository Types.
 */
export declare enum RepositoryType {
    /**
     * A TFS Git repository
     * See https://www.visualstudio.com/en-us/docs/git/overview
     */
    tfsGit = 0,
    /**
     * A Team Foundation Version Control Repository
     * See https://www.visualstudio.com/en-us/docs/tfvc/overview
     */
    tfsVersionControl = 1,
    /**
     * A Git repository hosted on an external server
     */
    git = 2,
    /**
     * A GitHub repository
     */
    gitHub = 3,
    /**
     * A Subversion repository
     */
    svn = 4,
}
