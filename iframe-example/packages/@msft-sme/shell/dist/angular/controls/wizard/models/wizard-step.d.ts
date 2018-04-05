import { Type } from '@angular/core';
import { WizardStepOptions } from './';
/**
 * The representation of a step in the wizard component.
 */
export declare class WizardStep {
    readonly renderer: Type<any>;
    /**
     * Gets whether or not the step is completed.
     */
    /**
     * Sets whether or not the step is completed.
     */
    completed: boolean;
    /**
     * Gets whether or not the step is disabled.
     */
    /**
     * Sets whether or not the step is disabled.
     */
    disabled: boolean;
    /**
     * Steps that need to be completed before this step can be accessed.
     */
    dependencies: WizardStep[];
    /**
     * The display name of the step.
     */
    name: string;
    /**
     * Whether or not the step is completed.
     */
    private isCompleted;
    /**
     * Whether or not the step is disabled.
     */
    private isDisabled;
    /**
     * Initializes a new instance of the WizardStep class.
     *
     * @param renderer - The component to dynamically render when the step is selected.
     * @param options - The options to supply the step with data.
     */
    constructor(renderer: Type<any>, options: WizardStepOptions);
    /**
     * Completes the step.
     */
    complete(): void;
    /**
     * Fails the step.
     */
    fail(): void;
}
