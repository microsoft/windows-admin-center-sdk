import { Observable } from 'rxjs/Observable';
import { WizardModel, WizardStepValidation } from './models';
/**
 * A base class for components dynamically rendered in a wizard.
 */
export declare abstract class WizardStepComponent<T extends WizardModel> {
    /**
     * Gets whether or not the component is valid.
     */
    /**
     * Sets whether or not the component is valid.
     */
    valid: boolean;
    /**
     * A callback to signal that the component was submitted.
     */
    componentSubmitted: () => void;
    /**
     * The data model of the wizard.
     */
    model: T;
    /**
     * A callback to run component-specific validation.
     */
    runValidation: () => Observable<WizardStepValidation>;
    /**
     * Whether or not the component is valid.
     */
    private isValid;
}
