/**
 * Notification State
 * TODO: supported state from powershell is limited. InProgress, Error and Success.
 */
export declare enum NotificationState {
    Started = 1,
    InProgress = 2,
    Critical = 3,
    Error = 4,
    Warning = 5,
    Success = 6,
    Informational = 7,
}
