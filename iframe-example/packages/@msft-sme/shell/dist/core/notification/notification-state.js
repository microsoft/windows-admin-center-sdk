/**
 * Notification State
 * TODO: supported state from powershell is limited. InProgress, Error and Success.
 */
export var NotificationState;
(function (NotificationState) {
    NotificationState[NotificationState["Started"] = 1] = "Started";
    NotificationState[NotificationState["InProgress"] = 2] = "InProgress";
    NotificationState[NotificationState["Critical"] = 3] = "Critical";
    NotificationState[NotificationState["Error"] = 4] = "Error";
    NotificationState[NotificationState["Warning"] = 5] = "Warning";
    NotificationState[NotificationState["Success"] = 6] = "Success";
    NotificationState[NotificationState["Informational"] = 7] = "Informational";
})(NotificationState || (NotificationState = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxNQUFNLENBQU4sSUFBWSxpQkFRWDtBQVJELFdBQVksaUJBQWlCO0lBQ3pCLCtEQUFXLENBQUE7SUFDWCxxRUFBVSxDQUFBO0lBQ1YsaUVBQVEsQ0FBQTtJQUNSLDJEQUFLLENBQUE7SUFDTCwrREFBTyxDQUFBO0lBQ1AsK0RBQU8sQ0FBQTtJQUNQLDJFQUFhLENBQUE7QUFDakIsQ0FBQyxFQVJXLGlCQUFpQixLQUFqQixpQkFBaUIsUUFRNUIiLCJmaWxlIjoibm90aWZpY2F0aW9uLXN0YXRlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==