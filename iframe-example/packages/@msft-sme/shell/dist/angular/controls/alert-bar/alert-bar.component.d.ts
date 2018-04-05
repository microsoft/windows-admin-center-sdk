import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert, AlertBar, AlertBarService, AlertLink } from './alert-bar.service';
export declare class AlertBarComponent implements OnInit, OnDestroy, AlertBar {
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
