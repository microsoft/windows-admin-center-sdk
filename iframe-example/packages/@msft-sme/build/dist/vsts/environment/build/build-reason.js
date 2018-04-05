"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Vsts Build reasons.
 */
var BuildReason;
(function (BuildReason) {
    /**
     * A user manually queued the build.
     */
    BuildReason[BuildReason["manual"] = 0] = "manual";
    /**
     * Continuous integration (CI) triggered bu a Git push or a TFVC check-in.
     */
    BuildReason[BuildReason["individualCI"] = 1] = "individualCI";
    /**
     * Continuous integration (CI) triggered bu a Git push or a TFVC check-in, and the Batch changes was selected.
     */
    BuildReason[BuildReason["batchedCI"] = 2] = "batchedCI";
    /**
     * Scheduled trigger.
     */
    BuildReason[BuildReason["schedule"] = 3] = "schedule";
    /**
     * Gated check-in trigger.
     */
    BuildReason[BuildReason["validateShelveset"] = 4] = "validateShelveset";
    /**
     * A user manually queued the build of a specific TFVC shelveset.
     */
    BuildReason[BuildReason["checkInShelveset"] = 5] = "checkInShelveset";
    /**
     * The build was triggered by a Git branch policy that requires a build.
     */
    BuildReason[BuildReason["pullRequest"] = 6] = "pullRequest";
})(BuildReason = exports.BuildReason || (exports.BuildReason = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92c3RzL2Vudmlyb25tZW50L2J1aWxkL2J1aWxkLXJlYXNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsSUFBWSxXQTZCWDtBQTdCRCxXQUFZLFdBQVc7SUFDbkI7O09BRUc7SUFDSCxpREFBTSxDQUFBO0lBQ047O09BRUc7SUFDSCw2REFBWSxDQUFBO0lBQ1o7O09BRUc7SUFDSCx1REFBUyxDQUFBO0lBQ1Q7O09BRUc7SUFDSCxxREFBUSxDQUFBO0lBQ1I7O09BRUc7SUFDSCx1RUFBaUIsQ0FBQTtJQUNqQjs7T0FFRztJQUNILHFFQUFnQixDQUFBO0lBQ2hCOztPQUVHO0lBQ0gsMkRBQVcsQ0FBQTtBQUNmLENBQUMsRUE3QlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUE2QnRCIiwiZmlsZSI6InZzdHMvZW52aXJvbm1lbnQvYnVpbGQvYnVpbGQtcmVhc29uLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
