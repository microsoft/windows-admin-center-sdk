import { AppContextService } from '../../service';
import { Alert, AlertBarComponent } from './alert-bar.component';
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
    register(component: AlertBarComponent, id?: string): void;
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
