import { AppContextService } from '../../service/app-context.service';
/**
 * The typed interface for an alert.
 */
export interface Alert {
    /**
     * The links to include on the alert.
     */
    links?: AlertLink[];
    /**
     * The message of the alert.
     */
    message: string;
    /**
     * The severity of the alert.
     */
    severity: AlertSeverity;
    /**
     * The title of the alert.
     */
    title?: string;
}
/**
 * The levels of severity that are able to be portrayed by an alert.
 */
export declare enum AlertSeverity {
    Informational = 0,
    Warning = 1,
    Error = 2,
}
/**
 * The typed interface of an alert link.
 */
export interface AlertLink {
    /**
     * The display text of the link
     */
    displayText: string;
    /**
     * The event to invoke when the link is clicked.
     *
     * A valid route or a callback function.
     */
    event: any[] | (() => void);
}
export interface AlertInfo {
    /**
     * The @Alert Object.
     */
    alert: Alert;
    /**
     * Ref count of how many times the show() was invoked for the alert.
     */
    refCount: number;
}
export interface AlertBar {
    show(alert: Alert): void;
}
export declare class AlertBarService {
    private appContextService;
    private componentMap;
    constructor(appContextService: AppContextService);
    /**
     * Registers an alert bar with the service.
     *
     * @param {AlertBarComponent} component The alert bar component.
     * @param {string} [id] The unique identifier of the alert bar.
     */
    register(component: AlertBar, id?: string): void;
    /**
     * Unregisters an alert bar with the service.
     *
     * @param {string} [id] The unique identifier of the alert bar.
     */
    unregister(id?: string): void;
    /**
     * Shows an alert.
     *
     * @param {Alert} alert The alert to show.
     * @param {string} [id] The unique identifier of the alert bar to show the alert in.
     */
    showAlert(item: Alert, id?: string): void;
    /**
     * @obsolete
     * Shows an alert.
     *
     * Use appContextService.notification.alert() or appContextService.notification.notify() instead.
     *
     * @param {Alert} alert The alert to show.
     * @param {string} [id] The unique identifier of the alert bar to show the alert in.
     */
    show(item: Alert, id?: string): void;
}
