import { NotificationState } from './notification-state';
/**
 * Type definition of Client Notification.
 */
export declare enum ClientNotificationType {
    /**
     * Display at the notification center. Using the ID, it can update the single notification.
     */
    NotificationCenter = 0,
    /**
     * Display as alert bar. ID will be ignored, and doesn't retain the notification instance and state.
     */
    AlertBar = 1,
}
/**
 * The notification produced by the client code as instant notification.
 */
export interface ClientNotification {
    /**
     * The type of client notification.
     */
    type: ClientNotificationType;
    /**
     * The session id (or instance id).
     */
    id: string;
    /**
     * The state of notification.
     */
    state: NotificationState;
    /**
     * The title of work item to display user. (localized)
     */
    title: string;
    /**
     * The description of work item to display user. (localized)
     */
    description: string;
    /**
     * The message. (localized)
     */
    message: string;
    /**
     * The success link to navigate to the object view. (optional)
     * At default, it brings to the home page of the module.
     * The path is relative to from the manifest opened point.
     */
    link?: string;
}
