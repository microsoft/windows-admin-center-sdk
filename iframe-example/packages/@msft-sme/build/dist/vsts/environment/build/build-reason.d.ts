/**
 * Vsts Build reasons.
 */
export declare enum BuildReason {
    /**
     * A user manually queued the build.
     */
    manual = 0,
    /**
     * Continuous integration (CI) triggered bu a Git push or a TFVC check-in.
     */
    individualCI = 1,
    /**
     * Continuous integration (CI) triggered bu a Git push or a TFVC check-in, and the Batch changes was selected.
     */
    batchedCI = 2,
    /**
     * Scheduled trigger.
     */
    schedule = 3,
    /**
     * Gated check-in trigger.
     */
    validateShelveset = 4,
    /**
     * A user manually queued the build of a specific TFVC shelveset.
     */
    checkInShelveset = 5,
    /**
     * The build was triggered by a Git branch policy that requires a build.
     */
    pullRequest = 6,
}
