import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertBarService } from './alert-bar.service';
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
export declare class AlertBarComponent implements OnInit, OnDestroy {
    private alertBarService;
    private router;
    private activatedRoute;
    id: string;
    private alertKeyToAlertInfoMap;
    alerts: Alert[];
    /**
     * Initializes a new instance of the {AlertBarComponent} class.
     *
     * @param {AlertBarService} alertBarService The alert service.
     * @param {Router} router The router.
     * @param {ActivatedRoute} activatedRoute The activated route.
     */
    constructor(alertBarService: AlertBarService, router: Router, activatedRoute: ActivatedRoute);
    /**
     * The method to run when the component is initialized.
     */
    ngOnInit(): void;
    /**
     * The method to run when the component is destroyed.
     */
    ngOnDestroy(): void;
    /**
     * Gets the theme CSS classes for a given alert.
     *
     * @param {Alert} alert The alert.
     */
    getThemeClasses(alert: Alert): string[];
    /**
     * Gets the icon CSS classes for a given alert.
     *
     * @param {Alert} item The alert.
     */
    getIconClasses(alert: Alert): string[];
    /**
     * Shows an alert.
     *
     * @param {Alert} alert The alert to show.
     */
    show(alert: Alert): void;
    /**
     * Dismisses an alert.
     *
     * @param {Alert} alert The alert to dismiss.
     */
    dismiss(alert: Alert): void;
    /**
     * Navigates to the provided route of an event or invokes the event function.
     *
     * @param {AlertLink} link The link that was clicked.
     */
    linkClick(link: AlertLink): void;
    /**
     * Create the index name in map collection.
     *
     * @param message The alert message string.
     * @param sev The severity number for the alert.
     */
    private indexName(message, severity);
}
