import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { AppContextService } from '../../../angular';
/**
 * A base class to bootstrap components.
 *
 * @template TResourceStrings The typed interface for resource strings.
 */
export declare abstract class BaseComponent<T> implements OnDestroy {
    protected appContextService: AppContextService;
    protected strings: T;
    protected subscriptions: Subscription[];
    /**
     * Initializes a new instance of the {BaseComponent} class.
     *
     * @param {AppContextService} appContextService The app context service.
     */
    constructor(appContextService: AppContextService);
    /**
     * The method to run when the component is destroyed.
     */
    ngOnDestroy(): void;
}
