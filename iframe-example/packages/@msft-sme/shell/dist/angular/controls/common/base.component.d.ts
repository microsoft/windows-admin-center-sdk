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
    /**
     * Static constent to provide unique ids for each component
     * @see {componentId}
     */
    private static nextComponentId;
    /**
     * The unique id of this component.
     * This is useful when controls need to use an ID (such as in forms) but may appear multiple times on the same page.
     * Using this ID as the basis for the controls internal IDs generated in @see {createIdBag} keeps the IDs unique.
     */
    protected componentId: string;
    /**
     * The localized strings for the current project
     */
    strings: T;
    /**
     * Container for active subscriptions that should be cleaned up in the OnDestroy call.
     */
    protected subscriptions: Subscription[];
    /**
     * A bag of ids generated using @see {componentId} and the map returned from @see {createIdBag}
     */
    idBag: MsftSme.StringMap<string>;
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
    /**
     * Creates the idBag used by this component to store unique element ids
     */
    protected createIdBag(): MsftSme.StringMap<string>;
}
